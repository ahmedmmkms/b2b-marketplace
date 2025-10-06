package com.p4.backend.shared.util;

import com.fasterxml.uuid.Generators;
import com.fasterxml.uuid.impl.RandomBasedGenerator;
import org.hibernate.HibernateException;
import org.hibernate.engine.spi.SharedSessionContractImplementor;
import org.hibernate.id.IdentifierGenerator;

import java.lang.invoke.MethodHandles;
import java.security.SecureRandom;
import java.time.Instant;
import java.time.ZoneOffset;
import java.time.format.DateTimeFormatter;
import java.util.concurrent.atomic.AtomicLong;

/**
 * Utility class for generating ULIDs (Universally Unique Lexicographically Sortable Identifiers)
 * This implementation follows the ULID specification and integrates with Hibernate
 */
public class UlidUtil implements IdentifierGenerator {

    private static final String ENCODING = "0123456789ABCDEFGHJKMNPQRSTVWXYZ"; // Crockford's Base32 (removed confusing chars)
    private static final int ENCODING_LENGTH = ENCODING.length();
    private static final int TIMESTAMP_LENGTH = 10;
    private static final int RANDOM_LENGTH = 16;
    private static final int ULID_LENGTH = TIMESTAMP_LENGTH + RANDOM_LENGTH;
    private static final long ULID_EPOCH = 1469918400000L; // 2016-07-29 00:00:00 UTC (AWS Lambda launch date)

    private static final RandomBasedGenerator UUID_GENERATOR = Generators.randomBasedGenerator(new SecureRandom());
    private static final AtomicLong counter = new AtomicLong(System.currentTimeMillis());

    public static String generateUlid() {
        long currentTimeMillis = System.currentTimeMillis();
        long timeSinceEpoch = currentTimeMillis - ULID_EPOCH;

        // Get timestamp part (first 10 characters)
        char[] ulidChars = new char[ULID_LENGTH];
        encodeTimestamp(timeSinceEpoch, ulidChars);

        // Get random part (last 16 characters)
        encodeRandom(ulidChars);

        return new String(ulidChars);
    }

    private static void encodeTimestamp(long timeSinceEpoch, char[] ulidChars) {
        for (int i = TIMESTAMP_LENGTH - 1; i >= 0; i--) {
            ulidChars[i] = ENCODING.charAt((int) (timeSinceEpoch % ENCODING_LENGTH));
            timeSinceEpoch /= ENCODING_LENGTH;
        }
    }

    private static void encodeRandom(char[] ulidChars) {
        byte[] randomBytes = UUID_GENERATOR.generate().toString().getBytes();
        for (int i = TIMESTAMP_LENGTH; i < ULID_LENGTH; i++) {
            int randomIndex = Math.abs(randomBytes[i - TIMESTAMP_LENGTH] % ENCODING_LENGTH);
            ulidChars[i] = ENCODING.charAt(randomIndex);
        }
    }

    @Override
    public java.io.Serializable generate(SharedSessionContractImplementor session, Object object) throws HibernateException {
        return generateUlid();
    }

    public static boolean isValidUlid(String ulid) {
        if (ulid == null || ulid.length() != ULID_LENGTH) {
            return false;
        }
        for (int i = 0; i < ULID_LENGTH; i++) {
            if (ENCODING.indexOf(Character.toUpperCase(ulid.charAt(i))) == -1) {
                return false;
            }
        }
        return true;
    }

    public static long extractTimestamp(String ulid) {
        if (!isValidUlid(ulid)) {
            throw new IllegalArgumentException("Invalid ULID format: " + ulid);
        }

        long timestamp = 0;
        for (int i = 0; i < TIMESTAMP_LENGTH; i++) {
            timestamp = timestamp * ENCODING_LENGTH + ENCODING.indexOf(Character.toUpperCase(ulid.charAt(i)));
        }

        return timestamp + ULID_EPOCH;
    }

    public static Instant getInstant(String ulid) {
        return Instant.ofEpochMilli(extractTimestamp(ulid));
    }

    public static String formatInstant(Instant instant) {
        return instant.atOffset(ZoneOffset.UTC)
                .format(DateTimeFormatter.ofPattern("'ULID:'yyyyMMdd-HHmmss-SSS"));
    }
}