2025-10-16T06:12:44.621415181Z
2025-10-16T06:12:44.621449665Z    .   ____          _            __ _ _
2025-10-16T06:12:44.621456508Z   /\\ / ___'_ __ _ _(_)_ __  __ _ \ \ \ \
2025-10-16T06:12:44.621462980Z  ( ( )\___ | '_ | '_| | '_ \/ _` | \ \ \ \
2025-10-16T06:12:44.621485211Z   \\/  ___)| |_)| | | | | || (_| |  ) ) ) )
2025-10-16T06:12:44.621490421Z    '  |____| .__|_| |_|_| |_\__, | / / / /
2025-10-16T06:12:44.621495160Z   =========|_|==============|___/=/_/_/_/
2025-10-16T06:12:44.621499358Z
2025-10-16T06:12:44.621503215Z   :: Spring Boot ::                (v3.4.0)
2025-10-16T06:12:44.621508194Z
2025-10-16T06:12:44.872146994Z  2025-10-16T06:12:44.866Z  INFO 85 --- [p4-backend] [           main] com.p4.backend.P4BackendApplication      : Starting P4BackendApplication v0.0.1-SNAPSHOT using Java 21.0.7 with PID 85 (/home/site/wwwroot/app.jar started by root in /home/site/wwwroot)
2025-10-16T06:12:44.880353474Z  2025-10-16T06:12:44.879Z  INFO 85 --- [p4-backend] [           main] com.p4.backend.P4BackendApplication      : The following 1 profile is active: "prod"
2025-10-16T06:12:49.492063848Z  2025-10-16T06:12:49.487Z  INFO 85 --- [p4-backend] [           main] .s.d.r.c.RepositoryConfigurationDelegate : Bootstrapping Spring Data JPA repositories in DEFAULT mode.
2025-10-16T06:12:49.568374094Z  2025-10-16T06:12:49.567Z  INFO 85 --- [p4-backend] [           main] .s.d.r.c.RepositoryConfigurationDelegate : Finished Spring Data repository scanning in 44 ms. Found 0 JPA repository interfaces.
2025-10-16T06:12:52.674102587Z  2025-10-16T06:12:52.673Z  INFO 85 --- [p4-backend] [           main] o.s.b.w.embedded.tomcat.TomcatWebServer  : Tomcat initialized with port 80 (http)
2025-10-16T06:12:53.012218034Z  2025-10-16T06:12:53.011Z  INFO 85 --- [p4-backend] [           main] w.s.c.ServletWebServerApplicationContext : Root WebApplicationContext: initialization completed in 8025 ms
2025-10-16T06:12:53.029896289Z  Standard Commons Logging discovery in action with spring-jcl: please remove commons-logging.jar from classpath in order to avoid potential conflicts
2025-10-16T06:12:55.550072741Z  2025-10-16T06:12:55.534Z  INFO 85 --- [p4-backend] [           main] com.zaxxer.hikari.HikariDataSource       : P4HikariCP - Starting...
2025-10-16T06:12:59.053449023Z  2025-10-16T06:12:59.041Z  INFO 85 --- [p4-backend] [           main] com.zaxxer.hikari.pool.HikariPool        : P4HikariCP - Added connection org.postgresql.jdbc.PgConnection@9f2fe2e
2025-10-16T06:12:59.084687711Z  2025-10-16T06:12:59.084Z  INFO 85 --- [p4-backend] [           main] com.zaxxer.hikari.HikariDataSource       : P4HikariCP - Start completed.
2025-10-16T06:12:59.421770663Z  2025-10-16T06:12:59.417Z  INFO 85 --- [p4-backend] [           main] org.flywaydb.core.FlywayExecutor         : Database: jdbc:postgresql://ep-damp-feather-adc322wz-pooler.c-2.us-east-1.aws.neon.tech/neondb?user=neondb_owner&password=********&sslmode=require&channelBinding=require (PostgreSQL 17.5)
2025-10-16T06:13:00.015398835Z  2025-10-16T06:13:00.014Z  INFO 85 --- [p4-backend] [           main] o.f.core.internal.command.DbValidate     : Successfully validated 2 migrations (execution time 00:00.248s)
2025-10-16T06:13:00.517236009Z  2025-10-16T06:13:00.507Z  INFO 85 --- [p4-backend] [           main] o.f.core.internal.command.DbMigrate      : Current version of schema "public": 2
2025-10-16T06:13:00.625413035Z  2025-10-16T06:13:00.624Z  INFO 85 --- [p4-backend] [           main] o.f.core.internal.command.DbMigrate      : Schema "public" is up to date. No migration necessary.
2025-10-16T06:13:02.002389520Z  2025-10-16T06:13:02.001Z  INFO 85 --- [p4-backend] [           main] o.hibernate.jpa.internal.util.LogHelper  : HHH000204: Processing PersistenceUnitInfo [name: default]
2025-10-16T06:13:02.651127773Z  2025-10-16T06:13:02.650Z  INFO 85 --- [p4-backend] [           main] org.hibernate.Version                    : HHH000412: Hibernate ORM core version 6.6.2.Final
2025-10-16T06:13:02.784396294Z  2025-10-16T06:13:02.783Z  INFO 85 --- [p4-backend] [           main] o.h.c.internal.RegionFactoryInitiator    : HHH000026: Second-level cache disabled
2025-10-16T06:13:04.137283274Z  2025-10-16T06:13:04.135Z  INFO 85 --- [p4-backend] [           main] o.s.o.j.p.SpringPersistenceUnitInfo      : No LoadTimeWeaver setup: ignoring JPA class transformer
2025-10-16T06:13:04.477396787Z  2025-10-16T06:13:04.476Z  WARN 85 --- [p4-backend] [           main] org.hibernate.orm.deprecation            : HHH90000025: PostgreSQLDialect does not need to be specified explicitly using 'hibernate.dialect' (remove the property setting and it will be selected by default)
2025-10-16T06:13:04.579641514Z  2025-10-16T06:13:04.571Z  INFO 85 --- [p4-backend] [           main] org.hibernate.orm.connections.pooling    : HHH10001005: Database info:
2025-10-16T06:13:04.579679655Z  	Database JDBC URL [Connecting through datasource 'HikariDataSource (P4HikariCP)']
2025-10-16T06:13:04.579703449Z  	Database driver: undefined/unknown
2025-10-16T06:13:04.579841306Z  	Database version: 17.5
2025-10-16T06:13:04.579851906Z  	Autocommit mode: undefined/unknown
2025-10-16T06:13:04.579856805Z  	Isolation level: undefined/unknown
2025-10-16T06:13:04.579860872Z  	Minimum pool size: undefined/unknown
2025-10-16T06:13:04.579864319Z  	Maximum pool size: undefined/unknown
2025-10-16T06:13:05.575453221Z  2025-10-16T06:13:05.574Z  INFO 85 --- [p4-backend] [           main] o.h.e.t.j.p.i.JtaPlatformInitiator       : HHH000489: No JTA platform available (set 'hibernate.transaction.jta.platform' to enable JTA platform integration)
2025-10-16T06:13:05.590117870Z  2025-10-16T06:13:05.589Z  INFO 85 --- [p4-backend] [           main] j.LocalContainerEntityManagerFactoryBean : Initialized JPA EntityManagerFactory for persistence unit 'default'
2025-10-16T06:13:06.114793716Z  2025-10-16T06:13:06.114Z  WARN 85 --- [p4-backend] [           main] ConfigServletWebServerApplicationContext : Exception encountered during context initialization - cancelling refresh attempt: org.springframework.beans.factory.UnsatisfiedDependencyException: Error creating bean with name 'configTestController': Unsatisfied dependency expressed through field 'redisConfig': Error creating bean with name 'redisConfigurationProperties': Could not bind properties to 'RedisConfigurationProperties' : prefix=spring.redis, ignoreInvalidFields=false, ignoreUnknownFields=true
2025-10-16T06:13:06.124677162Z  2025-10-16T06:13:06.114Z  INFO 85 --- [p4-backend] [           main] j.LocalContainerEntityManagerFactoryBean : Closing JPA EntityManagerFactory for persistence unit 'default'
2025-10-16T06:13:06.134819981Z  2025-10-16T06:13:06.133Z  INFO 85 --- [p4-backend] [           main] com.zaxxer.hikari.HikariDataSource       : P4HikariCP - Shutdown initiated...
2025-10-16T06:13:06.267407174Z  2025-10-16T06:13:06.266Z  INFO 85 --- [p4-backend] [           main] com.zaxxer.hikari.HikariDataSource       : P4HikariCP - Shutdown completed.
2025-10-16T06:13:06.404061935Z  2025-10-16T06:13:06.403Z  INFO 85 --- [p4-backend] [           main] .s.b.a.l.ConditionEvaluationReportLogger :
2025-10-16T06:13:06.404129341Z
2025-10-16T06:13:06.404134521Z  Error starting ApplicationContext. To display the condition evaluation report re-run your application with 'debug' enabled.
2025-10-16T06:13:06.446844756Z  2025-10-16T06:13:06.446Z ERROR 85 --- [p4-backend] [           main] o.s.b.d.LoggingFailureAnalysisReporter   :
2025-10-16T06:13:06.446914677Z
2025-10-16T06:13:06.446921219Z  ***************************
2025-10-16T06:13:06.446925477Z  APPLICATION FAILED TO START
2025-10-16T06:13:06.446929454Z  ***************************
2025-10-16T06:13:06.446933342Z
2025-10-16T06:13:06.446937209Z  Description:
2025-10-16T06:13:06.446941096Z
2025-10-16T06:13:06.446945074Z  Binding to target com.p4.backend.config.RedisConfigurationProperties$$SpringCGLIB$$0 failed:
2025-10-16T06:13:06.446949161Z
2025-10-16T06:13:06.446952668Z      Property: spring.redis.database
2025-10-16T06:13:06.446956405Z      Value: "0"
2025-10-16T06:13:06.446959871Z      Origin: class path resource [application.yml] from app.jar - 159:15
2025-10-16T06:13:06.446963328Z      Reason: must be greater than 0
2025-10-16T06:13:06.446966834Z
2025-10-16T06:13:06.446970301Z
2025-10-16T06:13:06.446973997Z  Action:
2025-10-16T06:13:06.447098640Z
2025-10-16T06:13:06.447103058Z  Update your application's configuration
2025-10-16T06:13:06.447107176Z
2025-10-16T06:13:06.532355115Z  Wait for pid == 85 either returned successfully or was interrupted due to a signal 85
2025-10-16T06:13:06.533483950Z  Done waiting for main process. GLOBAL_PID_MAIN=85.
2025-10-16T06:13:06.533495952Z  Exiting entry script!