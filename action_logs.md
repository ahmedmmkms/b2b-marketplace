2025-10-16T06:06:36.482851494Z
2025-10-16T06:06:36.483782981Z    .   ____          _            __ _ _
2025-10-16T06:06:36.483791417Z   /\\ / ___'_ __ _ _(_)_ __  __ _ \ \ \ \
2025-10-16T06:06:36.483794843Z  ( ( )\___ | '_ | '_| | '_ \/ _` | \ \ \ \
2025-10-16T06:06:36.483917201Z   \\/  ___)| |_)| | | | | || (_| |  ) ) ) )
2025-10-16T06:06:36.495718917Z    '  |____| .__|_| |_|_| |_\__, | / / / /
2025-10-16T06:06:36.495734837Z   =========|_|==============|___/=/_/_/_/
2025-10-16T06:06:36.495739255Z
2025-10-16T06:06:36.495747149Z   :: Spring Boot ::                (v3.4.0)
2025-10-16T06:06:36.495752039Z
2025-10-16T06:06:36.662221938Z  2025-10-16T06:06:36.660Z  INFO 86 --- [p4-backend] [           main] com.p4.backend.P4BackendApplication      : Starting P4BackendApplication v0.0.1-SNAPSHOT using Java 21.0.7 with PID 86 (/home/site/wwwroot/app.jar started by root in /home/site/wwwroot)
2025-10-16T06:06:36.664453809Z  2025-10-16T06:06:36.664Z  INFO 86 --- [p4-backend] [           main] com.p4.backend.P4BackendApplication      : The following 1 profile is active: "prod"
2025-10-16T06:06:40.250481083Z  2025-10-16T06:06:40.248Z  INFO 86 --- [p4-backend] [           main] .s.d.r.c.RepositoryConfigurationDelegate : Bootstrapping Spring Data JPA repositories in DEFAULT mode.
2025-10-16T06:06:40.316003274Z  2025-10-16T06:06:40.313Z  INFO 86 --- [p4-backend] [           main] .s.d.r.c.RepositoryConfigurationDelegate : Finished Spring Data repository scanning in 33 ms. Found 0 JPA repository interfaces.
2025-10-16T06:06:42.936555551Z  2025-10-16T06:06:42.935Z  INFO 86 --- [p4-backend] [           main] o.s.b.w.embedded.tomcat.TomcatWebServer  : Tomcat initialized with port 80 (http)
2025-10-16T06:06:43.041533049Z  2025-10-16T06:06:43.038Z  INFO 86 --- [p4-backend] [           main] w.s.c.ServletWebServerApplicationContext : Root WebApplicationContext: initialization completed in 6170 ms
2025-10-16T06:06:43.043914593Z  Standard Commons Logging discovery in action with spring-jcl: please remove commons-logging.jar from classpath in order to avoid potential conflicts
2025-10-16T06:06:44.260235921Z  2025-10-16T06:06:44.253Z  INFO 86 --- [p4-backend] [           main] com.zaxxer.hikari.HikariDataSource       : P4HikariCP - Starting...
2025-10-16T06:06:47.254693199Z  2025-10-16T06:06:47.254Z  INFO 86 --- [p4-backend] [           main] com.zaxxer.hikari.pool.HikariPool        : P4HikariCP - Added connection org.postgresql.jdbc.PgConnection@4e26987b
2025-10-16T06:06:47.260939093Z  2025-10-16T06:06:47.259Z  INFO 86 --- [p4-backend] [           main] com.zaxxer.hikari.HikariDataSource       : P4HikariCP - Start completed.
2025-10-16T06:06:47.360226437Z  2025-10-16T06:06:47.359Z  INFO 86 --- [p4-backend] [           main] org.flywaydb.core.FlywayExecutor         : Database: jdbc:postgresql://ep-damp-feather-adc322wz-pooler.c-2.us-east-1.aws.neon.tech/neondb?user=neondb_owner&password=********&sslmode=require&channelBinding=require (PostgreSQL 17.5)
2025-10-16T06:06:47.860130406Z  2025-10-16T06:06:47.859Z  INFO 86 --- [p4-backend] [           main] o.f.core.internal.command.DbValidate     : Successfully validated 2 migrations (execution time 00:00.183s)
2025-10-16T06:06:48.169329703Z  2025-10-16T06:06:48.168Z  INFO 86 --- [p4-backend] [           main] o.f.core.internal.command.DbMigrate      : Current version of schema "public": 2
2025-10-16T06:06:48.310520786Z  2025-10-16T06:06:48.310Z  INFO 86 --- [p4-backend] [           main] o.f.core.internal.command.DbMigrate      : Schema "public" is up to date. No migration necessary.
2025-10-16T06:06:48.716165448Z  2025-10-16T06:06:48.715Z  INFO 86 --- [p4-backend] [           main] o.hibernate.jpa.internal.util.LogHelper  : HHH000204: Processing PersistenceUnitInfo [name: default]
2025-10-16T06:06:48.912032802Z  2025-10-16T06:06:48.911Z  INFO 86 --- [p4-backend] [           main] org.hibernate.Version                    : HHH000412: Hibernate ORM core version 6.6.2.Final
2025-10-16T06:06:49.003218101Z  2025-10-16T06:06:48.999Z  INFO 86 --- [p4-backend] [           main] o.h.c.internal.RegionFactoryInitiator    : HHH000026: Second-level cache disabled
2025-10-16T06:06:49.695890448Z  2025-10-16T06:06:49.694Z  INFO 86 --- [p4-backend] [           main] o.s.o.j.p.SpringPersistenceUnitInfo      : No LoadTimeWeaver setup: ignoring JPA class transformer
2025-10-16T06:06:49.910877107Z  2025-10-16T06:06:49.910Z  WARN 86 --- [p4-backend] [           main] org.hibernate.orm.deprecation            : HHH90000025: PostgreSQLDialect does not need to be specified explicitly using 'hibernate.dialect' (remove the property setting and it will be selected by default)
2025-10-16T06:06:49.981374866Z  2025-10-16T06:06:49.980Z  INFO 86 --- [p4-backend] [           main] org.hibernate.orm.connections.pooling    : HHH10001005: Database info:
2025-10-16T06:06:49.981568678Z  	Database JDBC URL [Connecting through datasource 'HikariDataSource (P4HikariCP)']
2025-10-16T06:06:49.981593654Z  	Database driver: undefined/unknown
2025-10-16T06:06:49.984848392Z  	Database version: 17.5
2025-10-16T06:06:49.984863180Z  	Autocommit mode: undefined/unknown
2025-10-16T06:06:49.984868149Z  	Isolation level: undefined/unknown
2025-10-16T06:06:49.984872287Z  	Minimum pool size: undefined/unknown
2025-10-16T06:06:49.984876184Z  	Maximum pool size: undefined/unknown
2025-10-16T06:06:50.739232056Z  2025-10-16T06:06:50.731Z  INFO 86 --- [p4-backend] [           main] o.h.e.t.j.p.i.JtaPlatformInitiator       : HHH000489: No JTA platform available (set 'hibernate.transaction.jta.platform' to enable JTA platform integration)
2025-10-16T06:06:50.740353796Z  2025-10-16T06:06:50.739Z  INFO 86 --- [p4-backend] [           main] j.LocalContainerEntityManagerFactoryBean : Initialized JPA EntityManagerFactory for persistence unit 'default'
2025-10-16T06:06:51.209737929Z  2025-10-16T06:06:51.206Z  WARN 86 --- [p4-backend] [           main] ConfigServletWebServerApplicationContext : Exception encountered during context initialization - cancelling refresh attempt: org.springframework.beans.factory.UnsatisfiedDependencyException: Error creating bean with name 'configTestController': Unsatisfied dependency expressed through field 'redisConfig': Error creating bean with name 'redisConfigurationProperties': Could not bind properties to 'RedisConfigurationProperties' : prefix=spring.redis, ignoreInvalidFields=false, ignoreUnknownFields=true
2025-10-16T06:06:51.209762284Z  2025-10-16T06:06:51.207Z  INFO 86 --- [p4-backend] [           main] j.LocalContainerEntityManagerFactoryBean : Closing JPA EntityManagerFactory for persistence unit 'default'
2025-10-16T06:06:51.213889987Z  2025-10-16T06:06:51.213Z  INFO 86 --- [p4-backend] [           main] com.zaxxer.hikari.HikariDataSource       : P4HikariCP - Shutdown initiated...
2025-10-16T06:06:51.361894017Z  2025-10-16T06:06:51.361Z  INFO 86 --- [p4-backend] [           main] com.zaxxer.hikari.HikariDataSource       : P4HikariCP - Shutdown completed.
2025-10-16T06:06:51.392665483Z  2025-10-16T06:06:51.392Z  INFO 86 --- [p4-backend] [           main] .s.b.a.l.ConditionEvaluationReportLogger :
2025-10-16T06:06:51.392721197Z
2025-10-16T06:06:51.392726206Z  Error starting ApplicationContext. To display the condition evaluation report re-run your application with 'debug' enabled.
2025-10-16T06:06:51.429841254Z  2025-10-16T06:06:51.421Z ERROR 86 --- [p4-backend] [           main] o.s.b.d.LoggingFailureAnalysisReporter   :
2025-10-16T06:06:51.429878944Z
2025-10-16T06:06:51.429884745Z  ***************************
2025-10-16T06:06:51.429889384Z  APPLICATION FAILED TO START
2025-10-16T06:06:51.429893421Z  ***************************
2025-10-16T06:06:51.429897168Z
2025-10-16T06:06:51.429900765Z  Description:
2025-10-16T06:06:51.429905093Z
2025-10-16T06:06:51.429909090Z  Failed to bind properties under 'spring.redis.timeout' to int:
2025-10-16T06:06:51.429913188Z
2025-10-16T06:06:51.429916955Z      Property: spring.redis.timeout
2025-10-16T06:06:51.429920983Z      Value: "${REDIS_TIMEOUT:2000ms}"
2025-10-16T06:06:51.429924940Z      Origin: class path resource [application.yml] from app.jar - 160:14
2025-10-16T06:06:51.429928907Z      Reason: failed to convert java.lang.String to int (caused by java.lang.NumberFormatException: For input string: "2000ms")
2025-10-16T06:06:51.429932875Z
2025-10-16T06:06:51.429936381Z  Action:
2025-10-16T06:06:51.429939798Z
2025-10-16T06:06:51.429943104Z  Update your application's configuration
2025-10-16T06:06:51.429947212Z
2025-10-16T06:06:51.484193094Z  Wait for pid == 86 either returned successfully or was interrupted due to a signal 86
2025-10-16T06:06:51.485272396Z  Done waiting for main process. GLOBAL_PID_MAIN=86.
2025-10-16T06:06:51.485282494Z  Exiting entry script!