2025-10-16T06:31:00.037593472Z
2025-10-16T06:31:00.037631192Z    .   ____          _            __ _ _
2025-10-16T06:31:00.037635420Z   /\\ / ___'_ __ _ _(_)_ __  __ _ \ \ \ \
2025-10-16T06:31:00.037642965Z  ( ( )\___ | '_ | '_| | '_ \/ _` | \ \ \ \
2025-10-16T06:31:00.037667971Z   \\/  ___)| |_)| | | | | || (_| |  ) ) ) )
2025-10-16T06:31:00.037672149Z    '  |____| .__|_| |_|_| |_\__, | / / / /
2025-10-16T06:31:00.037676066Z   =========|_|==============|___/=/_/_/_/
2025-10-16T06:31:00.037679954Z
2025-10-16T06:31:00.046169544Z   :: Spring Boot ::                (v3.4.0)
2025-10-16T06:31:00.046255655Z
2025-10-16T06:31:00.855673875Z  2025-10-16T06:31:00.843Z  INFO 85 --- [p4-backend] [           main] com.p4.backend.P4BackendApplication      : Starting P4BackendApplication v0.0.1-SNAPSHOT using Java 21.0.7 with PID 85 (/home/site/wwwroot/app.jar started by root in /home/site/wwwroot)
2025-10-16T06:31:00.861397486Z  2025-10-16T06:31:00.860Z  INFO 85 --- [p4-backend] [           main] com.p4.backend.P4BackendApplication      : The following 1 profile is active: "prod"
2025-10-16T06:31:11.546693472Z  2025-10-16T06:31:11.546Z  INFO 85 --- [p4-backend] [           main] .s.d.r.c.RepositoryConfigurationDelegate : Bootstrapping Spring Data JPA repositories in DEFAULT mode.
2025-10-16T06:31:11.697871159Z  2025-10-16T06:31:11.697Z  INFO 85 --- [p4-backend] [           main] .s.d.r.c.RepositoryConfigurationDelegate : Finished Spring Data repository scanning in 80 ms. Found 0 JPA repository interfaces.
2025-10-16T06:31:16.945330647Z  2025-10-16T06:31:16.944Z  INFO 85 --- [p4-backend] [           main] o.s.b.w.embedded.tomcat.TomcatWebServer  : Tomcat initialized with port 80 (http)
2025-10-16T06:31:17.204258133Z  2025-10-16T06:31:17.203Z  INFO 85 --- [p4-backend] [           main] w.s.c.ServletWebServerApplicationContext : Root WebApplicationContext: initialization completed in 15882 ms
2025-10-16T06:31:17.223892208Z  Standard Commons Logging discovery in action with spring-jcl: please remove commons-logging.jar from classpath in order to avoid potential conflicts
2025-10-16T06:31:20.204177883Z  2025-10-16T06:31:20.196Z  INFO 85 --- [p4-backend] [           main] com.zaxxer.hikari.HikariDataSource       : P4HikariCP - Starting...
2025-10-16T06:31:22.159872726Z  2025-10-16T06:31:22.159Z  INFO 85 --- [p4-backend] [           main] com.zaxxer.hikari.pool.HikariPool        : P4HikariCP - Added connection org.postgresql.jdbc.PgConnection@9f2fe2e
2025-10-16T06:31:22.171205470Z  2025-10-16T06:31:22.170Z  INFO 85 --- [p4-backend] [           main] com.zaxxer.hikari.HikariDataSource       : P4HikariCP - Start completed.
2025-10-16T06:31:22.324021747Z  2025-10-16T06:31:22.321Z  INFO 85 --- [p4-backend] [           main] org.flywaydb.core.FlywayExecutor         : Database: jdbc:postgresql://ep-damp-feather-adc322wz-pooler.c-2.us-east-1.aws.neon.tech/neondb?user=neondb_owner&password=********&sslmode=require&channelBinding=require (PostgreSQL 17.5)
2025-10-16T06:31:23.011063116Z  2025-10-16T06:31:23.010Z  INFO 85 --- [p4-backend] [           main] o.f.core.internal.command.DbValidate     : Successfully validated 2 migrations (execution time 00:00.287s)
2025-10-16T06:31:23.435707432Z  2025-10-16T06:31:23.429Z  INFO 85 --- [p4-backend] [           main] o.f.core.internal.command.DbMigrate      : Current version of schema "public": 2
2025-10-16T06:31:23.752802499Z  2025-10-16T06:31:23.752Z  INFO 85 --- [p4-backend] [           main] o.f.core.internal.command.DbMigrate      : Schema "public" is up to date. No migration necessary.
2025-10-16T06:31:24.482249462Z  2025-10-16T06:31:24.481Z  INFO 85 --- [p4-backend] [           main] o.hibernate.jpa.internal.util.LogHelper  : HHH000204: Processing PersistenceUnitInfo [name: default]
2025-10-16T06:31:25.079106684Z  2025-10-16T06:31:25.078Z  INFO 85 --- [p4-backend] [           main] org.hibernate.Version                    : HHH000412: Hibernate ORM core version 6.6.2.Final
2025-10-16T06:31:25.348081013Z  2025-10-16T06:31:25.346Z  INFO 85 --- [p4-backend] [           main] o.h.c.internal.RegionFactoryInitiator    : HHH000026: Second-level cache disabled
2025-10-16T06:31:29.431255846Z  2025-10-16T06:31:29.430Z  INFO 85 --- [p4-backend] [           main] o.s.o.j.p.SpringPersistenceUnitInfo      : No LoadTimeWeaver setup: ignoring JPA class transformer
2025-10-16T06:31:29.943706926Z  2025-10-16T06:31:29.942Z  WARN 85 --- [p4-backend] [           main] org.hibernate.orm.deprecation            : HHH90000025: PostgreSQLDialect does not need to be specified explicitly using 'hibernate.dialect' (remove the property setting and it will be selected by default)
2025-10-16T06:31:30.087220485Z  2025-10-16T06:31:30.084Z  INFO 85 --- [p4-backend] [           main] org.hibernate.orm.connections.pooling    : HHH10001005: Database info:
2025-10-16T06:31:30.087268003Z  	Database JDBC URL [Connecting through datasource 'HikariDataSource (P4HikariCP)']
2025-10-16T06:31:30.087342813Z  	Database driver: undefined/unknown
2025-10-16T06:31:30.087347291Z  	Database version: 17.5
2025-10-16T06:31:30.087350788Z  	Autocommit mode: undefined/unknown
2025-10-16T06:31:30.087354274Z  	Isolation level: undefined/unknown
2025-10-16T06:31:30.087357641Z  	Minimum pool size: undefined/unknown
2025-10-16T06:31:30.087361317Z  	Maximum pool size: undefined/unknown
2025-10-16T06:31:32.494083200Z  2025-10-16T06:31:32.493Z  INFO 85 --- [p4-backend] [           main] o.h.e.t.j.p.i.JtaPlatformInitiator       : HHH000489: No JTA platform available (set 'hibernate.transaction.jta.platform' to enable JTA platform integration)
2025-10-16T06:31:32.531034791Z  2025-10-16T06:31:32.530Z  INFO 85 --- [p4-backend] [           main] j.LocalContainerEntityManagerFactoryBean : Initialized JPA EntityManagerFactory for persistence unit 'default'
2025-10-16T06:31:34.363986465Z  2025-10-16T06:31:34.360Z  WARN 85 --- [p4-backend] [           main] JpaBaseConfiguration$JpaWebConfiguration : spring.jpa.open-in-view is enabled by default. Therefore, database queries may be performed during view rendering. Explicitly configure spring.jpa.open-in-view to disable this warning
2025-10-16T06:31:36.608384790Z  2025-10-16T06:31:36.607Z  WARN 85 --- [p4-backend] [           main] ion$DefaultTemplateResolverConfiguration : Cannot find template location: classpath:/templates/ (please add some templates, check your Thymeleaf configuration, or set spring.thymeleaf.check-template-location=false)
2025-10-16T06:31:39.431651755Z  2025-10-16T06:31:39.419Z  WARN 85 --- [p4-backend] [           main] .s.s.UserDetailsServiceAutoConfiguration :
2025-10-16T06:31:39.431698051Z
2025-10-16T06:31:39.431703181Z  Using generated security password: f2bdbf63-9461-435e-ac64-a4c5a67adb18
2025-10-16T06:31:39.431706868Z
2025-10-16T06:31:39.431710825Z  This generated password is for development use only. Your security configuration must be updated before running your application in production.
2025-10-16T06:31:39.431714763Z
2025-10-16T06:31:39.578178382Z  2025-10-16T06:31:39.577Z  INFO 85 --- [p4-backend] [           main] r$InitializeUserDetailsManagerConfigurer : Global AuthenticationManager configured with UserDetailsService bean with name inMemoryUserDetailsManager
2025-10-16T06:31:40.403791407Z  2025-10-16T06:31:40.401Z  INFO 85 --- [p4-backend] [           main] o.s.b.a.e.web.EndpointLinksResolver      : Exposing 3 endpoints beneath base path '/actuator'
2025-10-16T06:31:41.443376884Z  2025-10-16T06:31:41.440Z  INFO 85 --- [p4-backend] [           main] o.s.b.w.embedded.tomcat.TomcatWebServer  : Tomcat started on port 80 (http) with context path '/'
2025-10-16T06:31:41.487748955Z  2025-10-16T06:31:41.487Z  INFO 85 --- [p4-backend] [           main] com.p4.backend.P4BackendApplication      : Started P4BackendApplication in 44.641 seconds (process running for 49.196)
2025-10-16T06:31:41.946625259Z  Testing ULID generation in production environment...
2025-10-16T06:31:41.946659413Z  Base API URL: https://b2b-marketplace-dcd9azhpefdkdve4.canadacentral-01.azurewebsites.net
2025-10-16T06:31:41.946665324Z
2025-10-16T06:31:41.946669882Z  Local ULID generation test:
2025-10-16T06:31:42.008501646Z  Generated ULID: 01K7NVF65Q0RVKC8S6CYCF2Q22 | Valid: true
2025-10-16T06:31:42.009390034Z  Generated ULID: 01K7NVF65RRKDHFJ7P9Q0CD7JP | Valid: true
2025-10-16T06:31:42.009395745Z  Generated ULID: 01K7NVF65RWDNZ1558Y5B6A6W8 | Valid: true
2025-10-16T06:31:42.009399753Z
2025-10-16T06:31:42.009403540Z  Production ULID functionality test:
2025-10-16T06:31:42.009407497Z  Note: Actual API endpoints may not be available yet in early sprints.
2025-10-16T06:31:42.009411103Z  The following is a template for how to test against production:
2025-10-16T06:31:42.009414750Z
2025-10-16T06:31:42.009418447Z  Example endpoint: https://b2b-marketplace-dcd9azhpefdkdve4.canadacentral-01.azurewebsites.net/api/test/ulid-generation
2025-10-16T06:31:42.009422264Z  Method: GET or POST (depending on implementation)
2025-10-16T06:31:42.009425981Z  Expected response: Entity with ULID as ID field
2025-10-16T06:31:42.009855432Z  Validation: ID should be 26 characters and match ULID format
2025-10-16T06:31:42.009862756Z  2025-10-16T06:31:42.008Z  INFO 85 --- [p4-backend] [           main] com.p4.backend.FlywayRepairRunner        : Running Flyway repair to fix checksum mismatch...
2025-10-16T06:31:42.100006671Z  2025-10-16T06:31:42.099Z  INFO 85 --- [p4-backend] [p-nio-80-exec-1] o.s.web.servlet.DispatcherServlet        : Initializing Servlet 'dispatcherServlet'
2025-10-16T06:31:42.102620033Z  2025-10-16T06:31:42.102Z  INFO 85 --- [p4-backend] [p-nio-80-exec-1] o.s.web.servlet.DispatcherServlet        : Completed initialization in 1 ms
2025-10-16T06:31:42.151139811Z  2025-10-16T06:31:42.150Z  INFO 85 --- [p4-backend] [           main] org.flywaydb.core.FlywayExecutor         : Database: jdbc:postgresql://ep-damp-feather-adc322wz-pooler.c-2.us-east-1.aws.neon.tech/neondb?user=neondb_owner&password=********&sslmode=require&channelBinding=require (PostgreSQL 17.5)
2025-10-16T06:31:42.475907143Z  2025-10-16T06:31:42.475Z  INFO 85 --- [p4-backend] [           main] o.f.c.i.s.JdbcTableSchemaHistory         : Repair of failed migration in Schema History table "public"."flyway_schema_history" not necessary. No failed migration detected.
2025-10-16T06:31:42.590836828Z  2025-10-16T06:31:42.583Z  INFO 85 --- [p4-backend] [           main] o.f.core.internal.command.DbRepair       : Successfully repaired schema history table "public"."flyway_schema_history" (execution time 00:00.237s).
2025-10-16T06:31:42.813714769Z  2025-10-16T06:31:42.811Z  INFO 85 --- [p4-backend] [           main] com.p4.backend.FlywayRepairRunner        : Flyway repair completed successfully.
2025-10-16T06:43:57.976108077Z  Received signal SIGTERM
2025-10-16T06:43:57.979654303Z  Sending SIGTERM to main process. Child Process ID: 85
2025-10-16T06:44:00.634039935Z  Exception in thread "SpringApplicationShutdownHook" java.lang.NoClassDefFoundError: ch/qos/logback/classic/spi/ThrowableProxy
2025-10-16T06:44:00.651135300Z  	at ch.qos.logback.classic.spi.LoggingEvent.<init>(LoggingEvent.java:145)
2025-10-16T06:44:00.651168221Z  	at ch.qos.logback.classic.Logger.buildLoggingEventAndAppend(Logger.java:424)
2025-10-16T06:44:00.651175274Z  	at ch.qos.logback.classic.Logger.filterAndLog_0_Or3Plus(Logger.java:386)
2025-10-16T06:44:00.651181196Z  	at ch.qos.logback.classic.Logger.log(Logger.java:780)
2025-10-16T06:44:00.651186575Z  	at org.apache.commons.logging.LogAdapter$Slf4jLocationAwareLog.warn(LogAdapter.java:445)
2025-10-16T06:44:00.651191945Z  	at org.springframework.context.support.AbstractApplicationContext.doClose(AbstractApplicationContext.java:1175)
2025-10-16T06:44:00.651197436Z  	at org.springframework.boot.web.servlet.context.ServletWebServerApplicationContext.doClose(ServletWebServerApplicationContext.java:174)
2025-10-16T06:44:00.652218147Z  	at org.springframework.context.support.AbstractApplicationContext.close(AbstractApplicationContext.java:1126)
2025-10-16T06:44:00.652230310Z  	at org.springframework.boot.SpringApplicationShutdownHook.closeAndWait(SpringApplicationShutdownHook.java:145)
2025-10-16T06:44:00.652234478Z  	at java.base/java.lang.Iterable.forEach(Iterable.java:75)
2025-10-16T06:44:00.652238345Z  	at org.springframework.boot.SpringApplicationShutdownHook.run(SpringApplicationShutdownHook.java:114)
2025-10-16T06:44:00.652242021Z  	at java.base/java.lang.Thread.run(Thread.java:1583)
2025-10-16T06:44:00.653448018Z  Caused by: java.lang.ClassNotFoundException: ch.qos.logback.classic.spi.ThrowableProxy
2025-10-16T06:44:00.653797158Z  	... 12 more
2025-10-16T06:44:01.083032251Z  Done processing signal SIGTERM. Exiting now!