2025-10-15T18:37:45.704650525Z
2025-10-15T18:37:45.704675671Z    .   ____          _            __ _ _
2025-10-15T18:37:45.704680210Z   /\\ / ___'_ __ _ _(_)_ __  __ _ \ \ \ \
2025-10-15T18:37:45.704684357Z  ( ( )\___ | '_ | '_| | '_ \/ _` | \ \ \ \
2025-10-15T18:37:45.704705376Z   \\/  ___)| |_)| | | | | || (_| |  ) ) ) )
2025-10-15T18:37:45.704709735Z    '  |____| .__|_| |_|_| |_\__, | / / / /
2025-10-15T18:37:45.704713341Z   =========|_|==============|___/=/_/_/_/
2025-10-15T18:37:45.704717158Z
2025-10-15T18:37:45.704720475Z   :: Spring Boot ::                (v3.4.0)
2025-10-15T18:37:45.704724562Z
2025-10-15T18:37:45.925294179Z  2025-10-15T18:37:45.917Z  INFO 85 --- [p4-backend] [           main] com.p4.backend.P4BackendApplication      : Starting P4BackendApplication v0.0.1-SNAPSHOT using Java 21.0.7 with PID 85 (/home/site/wwwroot/app.jar started by root in /home/site/wwwroot)
2025-10-15T18:37:45.945469199Z  2025-10-15T18:37:45.940Z  INFO 85 --- [p4-backend] [           main] com.p4.backend.P4BackendApplication      : The following 1 profile is active: "prod"
2025-10-15T18:37:50.414105121Z  2025-10-15T18:37:50.413Z  INFO 85 --- [p4-backend] [           main] .s.d.r.c.RepositoryConfigurationDelegate : Bootstrapping Spring Data JPA repositories in DEFAULT mode.
2025-10-15T18:37:50.805335207Z  2025-10-15T18:37:50.804Z  INFO 85 --- [p4-backend] [           main] .s.d.r.c.RepositoryConfigurationDelegate : Finished Spring Data repository scanning in 359 ms. Found 0 JPA repository interfaces.
2025-10-15T18:37:53.208050948Z  2025-10-15T18:37:53.207Z  INFO 85 --- [p4-backend] [           main] o.s.b.w.embedded.tomcat.TomcatWebServer  : Tomcat initialized with port 80 (http)
2025-10-15T18:37:53.288033496Z  2025-10-15T18:37:53.286Z  INFO 85 --- [p4-backend] [           main] w.s.c.ServletWebServerApplicationContext : Root WebApplicationContext: initialization completed in 7101 ms
2025-10-15T18:37:53.294154293Z  Standard Commons Logging discovery in action with spring-jcl: please remove commons-logging.jar from classpath in order to avoid potential conflicts
2025-10-15T18:37:54.795824945Z  2025-10-15T18:37:54.793Z  INFO 85 --- [p4-backend] [           main] com.zaxxer.hikari.HikariDataSource       : P4HikariCP - Starting...
2025-10-15T18:37:56.734219007Z  2025-10-15T18:37:56.733Z  INFO 85 --- [p4-backend] [           main] com.zaxxer.hikari.pool.HikariPool        : P4HikariCP - Added connection org.postgresql.jdbc.PgConnection@16944b58
2025-10-15T18:37:56.740364464Z  2025-10-15T18:37:56.739Z  INFO 85 --- [p4-backend] [           main] com.zaxxer.hikari.HikariDataSource       : P4HikariCP - Start completed.
2025-10-15T18:37:56.835447545Z  2025-10-15T18:37:56.834Z  INFO 85 --- [p4-backend] [           main] org.flywaydb.core.FlywayExecutor         : Database: jdbc:postgresql://ep-damp-feather-adc322wz-pooler.c-2.us-east-1.aws.neon.tech/neondb?user=neondb_owner&password=********&sslmode=require&channelBinding=require (PostgreSQL 17.5)
2025-10-15T18:37:57.366501403Z  2025-10-15T18:37:57.366Z  WARN 85 --- [p4-backend] [           main] ConfigServletWebServerApplicationContext : Exception encountered during context initialization - cancelling refresh attempt: org.springframework.beans.factory.BeanCreationException: Error creating bean with name 'entityManagerFactory' defined in class path resource [org/springframework/boot/autoconfigure/orm/jpa/HibernateJpaConfiguration.class]: Failed to initialize dependency 'flywayInitializer' of LoadTimeWeaverAware bean 'entityManagerFactory': Error creating bean with name 'flywayInitializer' defined in class path resource [org/springframework/boot/autoconfigure/flyway/FlywayAutoConfiguration$FlywayConfiguration.class]: Validate failed: Migrations have failed validation
2025-10-15T18:37:57.366537415Z  Migration checksum mismatch for migration version 1
2025-10-15T18:37:57.366542023Z  -> Applied to database : 1219399782
2025-10-15T18:37:57.366545769Z  -> Resolved locally    : 1171126237
2025-10-15T18:37:57.366549656Z  Either revert the changes to the migration, or run repair to update the schema history.
2025-10-15T18:37:57.366553483Z  Migration checksum mismatch for migration version 2
2025-10-15T18:37:57.366556899Z  -> Applied to database : -1507228808
2025-10-15T18:37:57.366560244Z  -> Resolved locally    : -135648218
2025-10-15T18:37:57.366563720Z  Either revert the changes to the migration, or run repair to update the schema history.
2025-10-15T18:37:57.366567727Z  Need more flexibility with validation rules? Learn more: https://rd.gt/3AbJUZE
2025-10-15T18:37:57.371507072Z  2025-10-15T18:37:57.370Z  INFO 85 --- [p4-backend] [           main] com.zaxxer.hikari.HikariDataSource       : P4HikariCP - Shutdown initiated...
2025-10-15T18:37:57.454485014Z  2025-10-15T18:37:57.453Z  INFO 85 --- [p4-backend] [           main] com.zaxxer.hikari.HikariDataSource       : P4HikariCP - Shutdown completed.
2025-10-15T18:37:57.517631136Z  2025-10-15T18:37:57.516Z  INFO 85 --- [p4-backend] [           main] .s.b.a.l.ConditionEvaluationReportLogger :
2025-10-15T18:37:57.517690307Z
2025-10-15T18:37:57.517697389Z  Error starting ApplicationContext. To display the condition evaluation report re-run your application with 'debug' enabled.
2025-10-15T18:37:57.550104259Z  2025-10-15T18:37:57.544Z ERROR 85 --- [p4-backend] [           main] o.s.boot.SpringApplication               : Application run failed
2025-10-15T18:37:57.550155047Z
2025-10-15T18:37:57.550160836Z  org.springframework.beans.factory.BeanCreationException: Error creating bean with name 'entityManagerFactory' defined in class path resource [org/springframework/boot/autoconfigure/orm/jpa/HibernateJpaConfiguration.class]: Failed to initialize dependency 'flywayInitializer' of LoadTimeWeaverAware bean 'entityManagerFactory': Error creating bean with name 'flywayInitializer' defined in class path resource [org/springframework/boot/autoconfigure/flyway/FlywayAutoConfiguration$FlywayConfiguration.class]: Validate failed: Migrations have failed validation
2025-10-15T18:37:57.550166396Z  Migration checksum mismatch for migration version 1
2025-10-15T18:37:57.550170843Z  -> Applied to database : 1219399782
2025-10-15T18:37:57.550175251Z  -> Resolved locally    : 1171126237
2025-10-15T18:37:57.550179368Z  Either revert the changes to the migration, or run repair to update the schema history.
2025-10-15T18:37:57.550183826Z  Migration checksum mismatch for migration version 2
2025-10-15T18:37:57.550187472Z  -> Applied to database : -1507228808
2025-10-15T18:37:57.550192040Z  -> Resolved locally    : -135648218
2025-10-15T18:37:57.550195977Z  Either revert the changes to the migration, or run repair to update the schema history.
2025-10-15T18:37:57.550199723Z  Need more flexibility with validation rules? Learn more: https://rd.gt/3AbJUZE
2025-10-15T18:37:57.550203480Z  	at org.springframework.beans.factory.support.AbstractBeanFactory.doGetBean(AbstractBeanFactory.java:325) ~[spring-beans-6.2.0.jar!/:6.2.0]
2025-10-15T18:37:57.550208308Z  	at org.springframework.beans.factory.support.AbstractBeanFactory.getBean(AbstractBeanFactory.java:204) ~[spring-beans-6.2.0.jar!/:6.2.0]
2025-10-15T18:37:57.550212866Z  	at org.springframework.context.support.AbstractApplicationContext.finishBeanFactoryInitialization(AbstractApplicationContext.java:970) ~[spring-context-6.2.0.jar!/:6.2.0]
2025-10-15T18:37:57.550216732Z  	at org.springframework.context.support.AbstractApplicationContext.refresh(AbstractApplicationContext.java:627) ~[spring-context-6.2.0.jar!/:6.2.0]
2025-10-15T18:37:57.550220739Z  	at org.springframework.boot.web.servlet.context.ServletWebServerApplicationContext.refresh(ServletWebServerApplicationContext.java:146) ~[spring-boot-3.4.0.jar!/:3.4.0]
2025-10-15T18:37:57.550227421Z  	at org.springframework.boot.SpringApplication.refresh(SpringApplication.java:752) ~[spring-boot-3.4.0.jar!/:3.4.0]
2025-10-15T18:37:57.550231578Z  	at org.springframework.boot.SpringApplication.refreshContext(SpringApplication.java:439) ~[spring-boot-3.4.0.jar!/:3.4.0]
2025-10-15T18:37:57.550235254Z  	at org.springframework.boot.SpringApplication.run(SpringApplication.java:318) ~[spring-boot-3.4.0.jar!/:3.4.0]
2025-10-15T18:37:57.550238960Z  	at org.springframework.boot.SpringApplication.run(SpringApplication.java:1361) ~[spring-boot-3.4.0.jar!/:3.4.0]
2025-10-15T18:37:57.550242837Z  	at org.springframework.boot.SpringApplication.run(SpringApplication.java:1350) ~[spring-boot-3.4.0.jar!/:3.4.0]
2025-10-15T18:37:57.550253045Z  	at com.p4.backend.P4BackendApplication.main(P4BackendApplication.java:15) ~[!/:0.0.1-SNAPSHOT]
2025-10-15T18:37:57.550256751Z  	at java.base/jdk.internal.reflect.DirectMethodHandleAccessor.invoke(DirectMethodHandleAccessor.java:103) ~[na:na]
2025-10-15T18:37:57.550260598Z  	at java.base/java.lang.reflect.Method.invoke(Method.java:580) ~[na:na]
2025-10-15T18:37:57.550264314Z  	at org.springframework.boot.loader.launch.Launcher.launch(Launcher.java:102) ~[app.jar:0.0.1-SNAPSHOT]
2025-10-15T18:37:57.550267940Z  	at org.springframework.boot.loader.launch.Launcher.launch(Launcher.java:64) ~[app.jar:0.0.1-SNAPSHOT]
2025-10-15T18:37:57.550271647Z  	at org.springframework.boot.loader.launch.JarLauncher.main(JarLauncher.java:40) ~[app.jar:0.0.1-SNAPSHOT]
2025-10-15T18:37:57.550275924Z  Caused by: org.springframework.beans.factory.BeanCreationException: Error creating bean with name 'flywayInitializer' defined in class path resource [org/springframework/boot/autoconfigure/flyway/FlywayAutoConfiguration$FlywayConfiguration.class]: Validate failed: Migrations have failed validation
2025-10-15T18:37:57.550280792Z  Migration checksum mismatch for migration version 1
2025-10-15T18:37:57.550284789Z  -> Applied to database : 1219399782
2025-10-15T18:37:57.550288946Z  -> Resolved locally    : 1171126237
2025-10-15T18:37:57.550292933Z  Either revert the changes to the migration, or run repair to update the schema history.
2025-10-15T18:37:57.550297481Z  Migration checksum mismatch for migration version 2
2025-10-15T18:37:57.550301378Z  -> Applied to database : -1507228808
2025-10-15T18:37:57.550308751Z  -> Resolved locally    : -135648218
2025-10-15T18:37:57.550313388Z  Either revert the changes to the migration, or run repair to update the schema history.
2025-10-15T18:37:57.550317205Z  Need more flexibility with validation rules? Learn more: https://rd.gt/3AbJUZE
2025-10-15T18:37:57.550321803Z  	at org.springframework.beans.factory.support.AbstractAutowireCapableBeanFactory.initializeBean(AbstractAutowireCapableBeanFactory.java:1802) ~[spring-beans-6.2.0.jar!/:6.2.0]
2025-10-15T18:37:57.550325800Z  	at org.springframework.beans.factory.support.AbstractAutowireCapableBeanFactory.doCreateBean(AbstractAutowireCapableBeanFactory.java:601) ~[spring-beans-6.2.0.jar!/:6.2.0]
2025-10-15T18:37:57.550329736Z  	at org.springframework.beans.factory.support.AbstractAutowireCapableBeanFactory.createBean(AbstractAutowireCapableBeanFactory.java:523) ~[spring-beans-6.2.0.jar!/:6.2.0]
2025-10-15T18:37:57.550333593Z  	at org.springframework.beans.factory.support.AbstractBeanFactory.lambda$doGetBean$0(AbstractBeanFactory.java:336) ~[spring-beans-6.2.0.jar!/:6.2.0]
2025-10-15T18:37:57.550337550Z  	at org.springframework.beans.factory.support.DefaultSingletonBeanRegistry.getSingleton(DefaultSingletonBeanRegistry.java:288) ~[spring-beans-6.2.0.jar!/:6.2.0]
2025-10-15T18:37:57.550341507Z  	at org.springframework.beans.factory.support.AbstractBeanFactory.doGetBean(AbstractBeanFactory.java:334) ~[spring-beans-6.2.0.jar!/:6.2.0]
2025-10-15T18:37:57.550351784Z  	at org.springframework.beans.factory.support.AbstractBeanFactory.getBean(AbstractBeanFactory.java:199) ~[spring-beans-6.2.0.jar!/:6.2.0]
2025-10-15T18:37:57.550355711Z  	at org.springframework.beans.factory.support.AbstractBeanFactory.doGetBean(AbstractBeanFactory.java:312) ~[spring-beans-6.2.0.jar!/:6.2.0]
2025-10-15T18:37:57.550359788Z  	... 15 common frames omitted
2025-10-15T18:37:57.550363735Z  Caused by: org.flywaydb.core.api.exception.FlywayValidateException: Validate failed: Migrations have failed validation
2025-10-15T18:37:57.550367842Z  Migration checksum mismatch for migration version 1
2025-10-15T18:37:57.550371438Z  -> Applied to database : 1219399782
2025-10-15T18:37:57.550375325Z  -> Resolved locally    : 1171126237
2025-10-15T18:37:57.550379422Z  Either revert the changes to the migration, or run repair to update the schema history.
2025-10-15T18:37:57.550383739Z  Migration checksum mismatch for migration version 2
2025-10-15T18:37:57.550387726Z  -> Applied to database : -1507228808
2025-10-15T18:37:57.550392083Z  -> Resolved locally    : -135648218
2025-10-15T18:37:57.550396601Z  Either revert the changes to the migration, or run repair to update the schema history.
2025-10-15T18:37:57.550400899Z  Need more flexibility with validation rules? Learn more: https://rd.gt/3AbJUZE
2025-10-15T18:37:57.550404575Z  	at org.flywaydb.core.Flyway.lambda$migrate$1(Flyway.java:190) ~[flyway-core-10.21.0.jar!/:na]
2025-10-15T18:37:57.550408712Z  	at org.flywaydb.core.FlywayExecutor.execute(FlywayExecutor.java:213) ~[flyway-core-10.21.0.jar!/:na]
2025-10-15T18:37:57.550414462Z  	at org.flywaydb.core.Flyway.migrate(Flyway.java:177) ~[flyway-core-10.21.0.jar!/:na]
2025-10-15T18:37:57.550420833Z  	at org.springframework.boot.autoconfigure.flyway.FlywayMigrationInitializer.afterPropertiesSet(FlywayMigrationInitializer.java:66) ~[spring-boot-autoconfigure-3.4.0.jar!/:3.4.0]
2025-10-15T18:37:57.550425010Z  	at org.springframework.beans.factory.support.AbstractAutowireCapableBeanFactory.invokeInitMethods(AbstractAutowireCapableBeanFactory.java:1849) ~[spring-beans-6.2.0.jar!/:6.2.0]
2025-10-15T18:37:57.550429007Z  	at org.springframework.beans.factory.support.AbstractAutowireCapableBeanFactory.initializeBean(AbstractAutowireCapableBeanFactory.java:1798) ~[spring-beans-6.2.0.jar!/:6.2.0]
2025-10-15T18:37:57.550432954Z  	... 22 common frames omitted
2025-10-15T18:37:57.550436690Z
2025-10-15T18:37:57.617155248Z  Wait for pid == 85 either returned successfully or was interrupted due to a signal 85
2025-10-15T18:37:57.617939013Z  Done waiting for main process. GLOBAL_PID_MAIN=85.
2025-10-15T18:37:57.617949561Z  Exiting entry script!