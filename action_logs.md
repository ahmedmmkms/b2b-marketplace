2025-10-16T05:59:23.472523721Z
2025-10-16T05:59:23.473680416Z    .   ____          _            __ _ _
2025-10-16T05:59:23.473691456Z   /\\ / ___'_ __ _ _(_)_ __  __ _ \ \ \ \
2025-10-16T05:59:23.473696636Z  ( ( )\___ | '_ | '_| | '_ \/ _` | \ \ \ \
2025-10-16T05:59:23.473721613Z   \\/  ___)| |_)| | | | | || (_| |  ) ) ) )
2025-10-16T05:59:23.473726712Z    '  |____| .__|_| |_|_| |_\__, | / / / /
2025-10-16T05:59:23.473730479Z   =========|_|==============|___/=/_/_/_/
2025-10-16T05:59:23.473734356Z
2025-10-16T05:59:23.473738434Z   :: Spring Boot ::                (v3.4.0)
2025-10-16T05:59:23.473743123Z
2025-10-16T05:59:23.878454873Z  2025-10-16T05:59:23.870Z  INFO 85 --- [p4-backend] [           main] com.p4.backend.P4BackendApplication      : Starting P4BackendApplication v0.0.1-SNAPSHOT using Java 21.0.7 with PID 85 (/home/site/wwwroot/app.jar started by root in /home/site/wwwroot)
2025-10-16T05:59:23.893808701Z  2025-10-16T05:59:23.892Z  INFO 85 --- [p4-backend] [           main] com.p4.backend.P4BackendApplication      : The following 1 profile is active: "prod"
2025-10-16T05:59:27.193639915Z  2025-10-16T05:59:27.187Z  INFO 85 --- [p4-backend] [           main] .s.d.r.c.RepositoryConfigurationDelegate : Bootstrapping Spring Data JPA repositories in DEFAULT mode.
2025-10-16T05:59:27.233392639Z  2025-10-16T05:59:27.232Z  INFO 85 --- [p4-backend] [           main] .s.d.r.c.RepositoryConfigurationDelegate : Finished Spring Data repository scanning in 20 ms. Found 0 JPA repository interfaces.
2025-10-16T05:59:29.235046340Z  2025-10-16T05:59:29.234Z  INFO 85 --- [p4-backend] [           main] o.s.b.w.embedded.tomcat.TomcatWebServer  : Tomcat initialized with port 80 (http)
2025-10-16T05:59:29.321041351Z  2025-10-16T05:59:29.320Z  INFO 85 --- [p4-backend] [           main] w.s.c.ServletWebServerApplicationContext : Root WebApplicationContext: initialization completed in 5204 ms
2025-10-16T05:59:29.325759562Z  Standard Commons Logging discovery in action with spring-jcl: please remove commons-logging.jar from classpath in order to avoid potential conflicts
2025-10-16T05:59:30.280019002Z  2025-10-16T05:59:30.278Z  INFO 85 --- [p4-backend] [           main] com.zaxxer.hikari.HikariDataSource       : P4HikariCP - Starting...
2025-10-16T05:59:31.419566393Z  2025-10-16T05:59:31.418Z  INFO 85 --- [p4-backend] [           main] com.zaxxer.hikari.pool.HikariPool        : P4HikariCP - Added connection org.postgresql.jdbc.PgConnection@7981963f
2025-10-16T05:59:31.423515602Z  2025-10-16T05:59:31.422Z  INFO 85 --- [p4-backend] [           main] com.zaxxer.hikari.HikariDataSource       : P4HikariCP - Start completed.
2025-10-16T05:59:31.512692171Z  2025-10-16T05:59:31.512Z  INFO 85 --- [p4-backend] [           main] org.flywaydb.core.FlywayExecutor         : Database: jdbc:postgresql://ep-damp-feather-adc322wz-pooler.c-2.us-east-1.aws.neon.tech/neondb?user=neondb_owner&password=********&sslmode=require&channelBinding=require (PostgreSQL 17.5)
2025-10-16T05:59:31.912938296Z  2025-10-16T05:59:31.911Z  INFO 85 --- [p4-backend] [           main] o.f.core.internal.command.DbValidate     : Successfully validated 2 migrations (execution time 00:00.157s)
2025-10-16T05:59:32.244464879Z  2025-10-16T05:59:32.243Z  INFO 85 --- [p4-backend] [           main] o.f.core.internal.command.DbMigrate      : Current version of schema "public": 2
2025-10-16T05:59:32.276639935Z  2025-10-16T05:59:32.275Z  INFO 85 --- [p4-backend] [           main] o.f.core.internal.command.DbMigrate      : Schema "public" is up to date. No migration necessary.
2025-10-16T05:59:32.796466257Z  2025-10-16T05:59:32.795Z  INFO 85 --- [p4-backend] [           main] o.hibernate.jpa.internal.util.LogHelper  : HHH000204: Processing PersistenceUnitInfo [name: default]
2025-10-16T05:59:33.030064595Z  2025-10-16T05:59:33.029Z  INFO 85 --- [p4-backend] [           main] org.hibernate.Version                    : HHH000412: Hibernate ORM core version 6.6.2.Final
2025-10-16T05:59:33.110276230Z  2025-10-16T05:59:33.109Z  INFO 85 --- [p4-backend] [           main] o.h.c.internal.RegionFactoryInitiator    : HHH000026: Second-level cache disabled
2025-10-16T05:59:33.762077654Z  2025-10-16T05:59:33.761Z  INFO 85 --- [p4-backend] [           main] o.s.o.j.p.SpringPersistenceUnitInfo      : No LoadTimeWeaver setup: ignoring JPA class transformer
2025-10-16T05:59:33.980386119Z  2025-10-16T05:59:33.979Z  WARN 85 --- [p4-backend] [           main] org.hibernate.orm.deprecation            : HHH90000025: PostgreSQLDialect does not need to be specified explicitly using 'hibernate.dialect' (remove the property setting and it will be selected by default)
2025-10-16T05:59:34.071907910Z  2025-10-16T05:59:34.067Z  INFO 85 --- [p4-backend] [           main] org.hibernate.orm.connections.pooling    : HHH10001005: Database info:
2025-10-16T05:59:34.071935221Z  	Database JDBC URL [Connecting through datasource 'HikariDataSource (P4HikariCP)']
2025-10-16T05:59:34.071955559Z  	Database driver: undefined/unknown
2025-10-16T05:59:34.071959296Z  	Database version: 17.5
2025-10-16T05:59:34.071962702Z  	Autocommit mode: undefined/unknown
2025-10-16T05:59:34.071966118Z  	Isolation level: undefined/unknown
2025-10-16T05:59:34.071969515Z  	Minimum pool size: undefined/unknown
2025-10-16T05:59:34.071972931Z  	Maximum pool size: undefined/unknown
2025-10-16T05:59:35.118697164Z  2025-10-16T05:59:35.114Z  INFO 85 --- [p4-backend] [           main] o.h.e.t.j.p.i.JtaPlatformInitiator       : HHH000489: No JTA platform available (set 'hibernate.transaction.jta.platform' to enable JTA platform integration)
2025-10-16T05:59:35.128770646Z  2025-10-16T05:59:35.128Z  INFO 85 --- [p4-backend] [           main] j.LocalContainerEntityManagerFactoryBean : Initialized JPA EntityManagerFactory for persistence unit 'default'
2025-10-16T05:59:35.562396699Z  2025-10-16T05:59:35.558Z  WARN 85 --- [p4-backend] [           main] ConfigServletWebServerApplicationContext : Exception encountered during context initialization - cancelling refresh attempt: org.springframework.beans.factory.UnsatisfiedDependencyException: Error creating bean with name 'configTestController': Unsatisfied dependency expressed through field 'redisConfig': Error creating bean with name 'redisConfigurationProperties': Could not bind properties to 'RedisConfigurationProperties' : prefix=spring.redis, ignoreInvalidFields=false, ignoreUnknownFields=true
2025-10-16T05:59:35.562434259Z  2025-10-16T05:59:35.558Z  INFO 85 --- [p4-backend] [           main] j.LocalContainerEntityManagerFactoryBean : Closing JPA EntityManagerFactory for persistence unit 'default'
2025-10-16T05:59:35.565729241Z  2025-10-16T05:59:35.565Z  INFO 85 --- [p4-backend] [           main] com.zaxxer.hikari.HikariDataSource       : P4HikariCP - Shutdown initiated...
2025-10-16T05:59:35.696420067Z  2025-10-16T05:59:35.695Z  INFO 85 --- [p4-backend] [           main] com.zaxxer.hikari.HikariDataSource       : P4HikariCP - Shutdown completed.
2025-10-16T05:59:35.760428527Z  2025-10-16T05:59:35.742Z  INFO 85 --- [p4-backend] [           main] .s.b.a.l.ConditionEvaluationReportLogger :
2025-10-16T05:59:35.760459074Z
2025-10-16T05:59:35.760464635Z  Error starting ApplicationContext. To display the condition evaluation report re-run your application with 'debug' enabled.
2025-10-16T05:59:35.777241655Z  2025-10-16T05:59:35.776Z ERROR 85 --- [p4-backend] [           main] o.s.b.d.LoggingFailureAnalysisReporter   :
2025-10-16T05:59:35.777292239Z
2025-10-16T05:59:35.777299182Z  ***************************
2025-10-16T05:59:35.777303600Z  APPLICATION FAILED TO START
2025-10-16T05:59:35.777307468Z  ***************************
2025-10-16T05:59:35.777311114Z
2025-10-16T05:59:35.777314921Z  Description:
2025-10-16T05:59:35.777318508Z
2025-10-16T05:59:35.777322105Z  Failed to bind properties under 'spring.redis.jedis.pool.max-wait' to int:
2025-10-16T05:59:35.777326072Z
2025-10-16T05:59:35.777329619Z      Property: spring.redis.jedis.pool.max-wait
2025-10-16T05:59:35.777333256Z      Value: "${REDIS_POOL_MAX_WAIT:-1ms}"
2025-10-16T05:59:35.777337263Z      Origin: class path resource [application.yml] from app.jar - 166:19
2025-10-16T05:59:35.777341201Z      Reason: failed to convert java.lang.String to int (caused by java.lang.NumberFormatException: For input string: "-1ms")
2025-10-16T05:59:35.777345128Z
2025-10-16T05:59:35.777348524Z  Action:
2025-10-16T05:59:35.777351981Z
2025-10-16T05:59:35.777355407Z  Update your application's configuration
2025-10-16T05:59:35.777359154Z
2025-10-16T05:59:35.840821026Z  Wait for pid == 85 either returned successfully or was interrupted due to a signal 85
2025-10-16T05:59:35.841688205Z  Done waiting for main process. GLOBAL_PID_MAIN=85.
2025-10-16T05:59:35.841725204Z  Exiting entry script!