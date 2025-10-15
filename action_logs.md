2025-10-15T17:26:21.4471069Z
2025-10-15T17:26:21.4471748Z   .   ____          _            __ _ _
2025-10-15T17:26:21.4471808Z  /\\ / ___'_ __ _ _(_)_ __  __ _ \ \ \ \
2025-10-15T17:26:21.4471846Z ( ( )\___ | '_ | '_| | '_ \/ _` | \ \ \ \
2025-10-15T17:26:21.447188Z  \\/  ___)| |_)| | | | | || (_| |  ) ) ) )
2025-10-15T17:26:21.4471911Z   '  |____| .__|_| |_|_| |_\__, | / / / /
2025-10-15T17:26:21.4471944Z  =========|_|==============|___/=/_/_/_/
2025-10-15T17:26:21.4471973Z
2025-10-15T17:26:21.4486733Z [32m :: Spring Boot :: [39m              [2m (v3.4.0)[0;39m
2025-10-15T17:26:21.4486888Z
2025-10-15T17:26:21.8247064Z [2m2025-10-15T17:26:21.809Z[0;39m [32m INFO[0;39m [35m69[0;39m [2m--- [p4-backend] [           main] [0;39m[36mcom.p4.backend.P4BackendApplication     [0;39m [2m:[0;39m Starting P4BackendApplication v0.0.1-SNAPSHOT using Java 21.0.7 with PID 69 (/home/site/wwwroot/app.jar started by root in /home/site/wwwroot)
2025-10-15T17:26:21.8315912Z [2m2025-10-15T17:26:21.831Z[0;39m [32m INFO[0;39m [35m69[0;39m [2m--- [p4-backend] [           main] [0;39m[36mcom.p4.backend.P4BackendApplication     [0;39m [2m:[0;39m The following 1 profile is active: "prod"
2025-10-15T17:26:25.1513993Z [2m2025-10-15T17:26:25.150Z[0;39m [32m INFO[0;39m [35m69[0;39m [2m--- [p4-backend] [           main] [0;39m[36m.s.d.r.c.RepositoryConfigurationDelegate[0;39m [2m:[0;39m Bootstrapping Spring Data JPA repositories in DEFAULT mode.
2025-10-15T17:26:25.2005998Z [2m2025-10-15T17:26:25.200Z[0;39m [32m INFO[0;39m [35m69[0;39m [2m--- [p4-backend] [           main] [0;39m[36m.s.d.r.c.RepositoryConfigurationDelegate[0;39m [2m:[0;39m Finished Spring Data repository scanning in 31 ms. Found 0 JPA repository interfaces.
2025-10-15T17:26:27.7410839Z [2m2025-10-15T17:26:27.740Z[0;39m [32m INFO[0;39m [35m69[0;39m [2m--- [p4-backend] [           main] [0;39m[36mo.s.b.w.embedded.tomcat.TomcatWebServer [0;39m [2m:[0;39m Tomcat initialized with port 80 (http)
2025-10-15T17:26:27.8201008Z [2m2025-10-15T17:26:27.819Z[0;39m [32m INFO[0;39m [35m69[0;39m [2m--- [p4-backend] [           main] [0;39m[36mw.s.c.ServletWebServerApplicationContext[0;39m [2m:[0;39m Root WebApplicationContext: initialization completed in 5800 ms
2025-10-15T17:26:27.8269507Z Standard Commons Logging discovery in action with spring-jcl: please remove commons-logging.jar from classpath in order to avoid potential conflicts
2025-10-15T17:26:29.0673443Z [2m2025-10-15T17:26:29.065Z[0;39m [32m INFO[0;39m [35m69[0;39m [2m--- [p4-backend] [           main] [0;39m[36mcom.zaxxer.hikari.HikariDataSource      [0;39m [2m:[0;39m P4HikariCP - Starting...
2025-10-15T17:26:31.8277118Z [2m2025-10-15T17:26:31.827Z[0;39m [32m INFO[0;39m [35m69[0;39m [2m--- [p4-backend] [           main] [0;39m[36mcom.zaxxer.hikari.pool.HikariPool       [0;39m [2m:[0;39m P4HikariCP - Added connection org.postgresql.jdbc.PgConnection@12421766
2025-10-15T17:26:31.8342904Z [2m2025-10-15T17:26:31.833Z[0;39m [32m INFO[0;39m [35m69[0;39m [2m--- [p4-backend] [           main] [0;39m[36mcom.zaxxer.hikari.HikariDataSource      [0;39m [2m:[0;39m P4HikariCP - Start completed.
2025-10-15T17:26:31.9583381Z [2m2025-10-15T17:26:31.957Z[0;39m [32m INFO[0;39m [35m69[0;39m [2m--- [p4-backend] [           main] [0;39m[36morg.flywaydb.core.FlywayExecutor        [0;39m [2m:[0;39m Database: jdbc:postgresql://ep-damp-feather-adc322wz-pooler.c-2.us-east-1.aws.neon.tech/neondb?user=neondb_owner&password=********&sslmode=require&channelBinding=require (PostgreSQL 17.5)
2025-10-15T17:26:32.5599989Z [2m2025-10-15T17:26:32.559Z[0;39m [33m WARN[0;39m [35m69[0;39m [2m--- [p4-backend] [           main] [0;39m[36mConfigServletWebServerApplicationContext[0;39m [2m:[0;39m Exception encountered during context initialization - cancelling refresh attempt: org.springframework.beans.factory.BeanCreationException: Error creating bean with name 'entityManagerFactory' defined in class path resource [org/springframework/boot/autoconfigure/orm/jpa/HibernateJpaConfiguration.class]: Failed to initialize dependency 'flywayInitializer' of LoadTimeWeaverAware bean 'entityManagerFactory': Error creating bean with name 'flywayInitializer' defined in class path resource [org/springframework/boot/autoconfigure/flyway/FlywayAutoConfiguration$FlywayConfiguration.class]: Validate failed: Migrations have failed validation
2025-10-15T17:26:32.5600908Z Migration checksum mismatch for migration version 1
2025-10-15T17:26:32.5600957Z -> Applied to database : 1730059603
2025-10-15T17:26:32.5600988Z -> Resolved locally    : -561047601
2025-10-15T17:26:32.5601024Z Either revert the changes to the migration, or run repair to update the schema history.
2025-10-15T17:26:32.5601078Z Need more flexibility with validation rules? Learn more: https://rd.gt/3AbJUZE
2025-10-15T17:26:32.5625921Z [2m2025-10-15T17:26:32.562Z[0;39m [32m INFO[0;39m [35m69[0;39m [2m--- [p4-backend] [           main] [0;39m[36mcom.zaxxer.hikari.HikariDataSource      [0;39m [2m:[0;39m P4HikariCP - Shutdown initiated...
2025-10-15T17:26:32.7386826Z [2m2025-10-15T17:26:32.738Z[0;39m [32m INFO[0;39m [35m69[0;39m [2m--- [p4-backend] [           main] [0;39m[36mcom.zaxxer.hikari.HikariDataSource      [0;39m [2m:[0;39m P4HikariCP - Shutdown completed.
2025-10-15T17:26:32.7919178Z [2m2025-10-15T17:26:32.790Z[0;39m [32m INFO[0;39m [35m69[0;39m [2m--- [p4-backend] [           main] [0;39m[36m.s.b.a.l.ConditionEvaluationReportLogger[0;39m [2m:[0;39m
2025-10-15T17:26:32.7919851Z
2025-10-15T17:26:32.7919971Z Error starting ApplicationContext. To display the condition evaluation report re-run your application with 'debug' enabled.
2025-10-15T17:26:32.8624251Z [2m2025-10-15T17:26:32.844Z[0;39m [31mERROR[0;39m [35m69[0;39m [2m--- [p4-backend] [           main] [0;39m[36mo.s.boot.SpringApplication              [0;39m [2m:[0;39m Application run failed
2025-10-15T17:26:32.8624975Z
2025-10-15T17:26:32.8625056Z org.springframework.beans.factory.BeanCreationException: Error creating bean with name 'entityManagerFactory' defined in class path resource [org/springframework/boot/autoconfigure/orm/jpa/HibernateJpaConfiguration.class]: Failed to initialize dependency 'flywayInitializer' of LoadTimeWeaverAware bean 'entityManagerFactory': Error creating bean with name 'flywayInitializer' defined in class path resource [org/springframework/boot/autoconfigure/flyway/FlywayAutoConfiguration$FlywayConfiguration.class]: Validate failed: Migrations have failed validation
2025-10-15T17:26:32.8625151Z Migration checksum mismatch for migration version 1
2025-10-15T17:26:32.8625185Z -> Applied to database : 1730059603
2025-10-15T17:26:32.8625215Z -> Resolved locally    : -561047601
2025-10-15T17:26:32.8625248Z Either revert the changes to the migration, or run repair to update the schema history.
2025-10-15T17:26:32.8625282Z Need more flexibility with validation rules? Learn more: https://rd.gt/3AbJUZE
2025-10-15T17:26:32.8625335Z 	at org.springframework.beans.factory.support.AbstractBeanFactory.doGetBean(AbstractBeanFactory.java:325) ~[spring-beans-6.2.0.jar!/:6.2.0]
2025-10-15T17:26:32.8625371Z 	at org.springframework.beans.factory.support.AbstractBeanFactory.getBean(AbstractBeanFactory.java:204) ~[spring-beans-6.2.0.jar!/:6.2.0]
2025-10-15T17:26:32.8625408Z 	at org.springframework.context.support.AbstractApplicationContext.finishBeanFactoryInitialization(AbstractApplicationContext.java:970) ~[spring-context-6.2.0.jar!/:6.2.0]
2025-10-15T17:26:32.8625445Z 	at org.springframework.context.support.AbstractApplicationContext.refresh(AbstractApplicationContext.java:627) ~[spring-context-6.2.0.jar!/:6.2.0]
2025-10-15T17:26:32.8625482Z 	at org.springframework.boot.web.servlet.context.ServletWebServerApplicationContext.refresh(ServletWebServerApplicationContext.java:146) ~[spring-boot-3.4.0.jar!/:3.4.0]
2025-10-15T17:26:32.8625528Z 	at org.springframework.boot.SpringApplication.refresh(SpringApplication.java:752) ~[spring-boot-3.4.0.jar!/:3.4.0]
2025-10-15T17:26:32.8625563Z 	at org.springframework.boot.SpringApplication.refreshContext(SpringApplication.java:439) ~[spring-boot-3.4.0.jar!/:3.4.0]
2025-10-15T17:26:32.8625598Z 	at org.springframework.boot.SpringApplication.run(SpringApplication.java:318) ~[spring-boot-3.4.0.jar!/:3.4.0]
2025-10-15T17:26:32.8625632Z 	at org.springframework.boot.SpringApplication.run(SpringApplication.java:1361) ~[spring-boot-3.4.0.jar!/:3.4.0]
2025-10-15T17:26:32.8625692Z 	at org.springframework.boot.SpringApplication.run(SpringApplication.java:1350) ~[spring-boot-3.4.0.jar!/:3.4.0]
2025-10-15T17:26:32.8625739Z 	at com.p4.backend.P4BackendApplication.main(P4BackendApplication.java:15) ~[!/:0.0.1-SNAPSHOT]
2025-10-15T17:26:32.8625773Z 	at java.base/jdk.internal.reflect.DirectMethodHandleAccessor.invoke(DirectMethodHandleAccessor.java:103) ~[na:na]
2025-10-15T17:26:32.8625805Z 	at java.base/java.lang.reflect.Method.invoke(Method.java:580) ~[na:na]
2025-10-15T17:26:32.8625839Z 	at org.springframework.boot.loader.launch.Launcher.launch(Launcher.java:102) ~[app.jar:0.0.1-SNAPSHOT]
2025-10-15T17:26:32.8625873Z 	at org.springframework.boot.loader.launch.Launcher.launch(Launcher.java:64) ~[app.jar:0.0.1-SNAPSHOT]
2025-10-15T17:26:32.8625917Z 	at org.springframework.boot.loader.launch.JarLauncher.main(JarLauncher.java:40) ~[app.jar:0.0.1-SNAPSHOT]
2025-10-15T17:26:32.8625961Z Caused by: org.springframework.beans.factory.BeanCreationException: Error creating bean with name 'flywayInitializer' defined in class path resource [org/springframework/boot/autoconfigure/flyway/FlywayAutoConfiguration$FlywayConfiguration.class]: Validate failed: Migrations have failed validation
2025-10-15T17:26:32.8625993Z Migration checksum mismatch for migration version 1
2025-10-15T17:26:32.8626023Z -> Applied to database : 1730059603
2025-10-15T17:26:32.8626053Z -> Resolved locally    : -561047601
2025-10-15T17:26:32.8626096Z Either revert the changes to the migration, or run repair to update the schema history.
2025-10-15T17:26:32.8626128Z Need more flexibility with validation rules? Learn more: https://rd.gt/3AbJUZE
2025-10-15T17:26:32.8626165Z 	at org.springframework.beans.factory.support.AbstractAutowireCapableBeanFactory.initializeBean(AbstractAutowireCapableBeanFactory.java:1802) ~[spring-beans-6.2.0.jar!/:6.2.0]
2025-10-15T17:26:32.8626202Z 	at org.springframework.beans.factory.support.AbstractAutowireCapableBeanFactory.doCreateBean(AbstractAutowireCapableBeanFactory.java:601) ~[spring-beans-6.2.0.jar!/:6.2.0]
2025-10-15T17:26:32.8626475Z 	at org.springframework.beans.factory.support.AbstractAutowireCapableBeanFactory.createBean(AbstractAutowireCapableBeanFactory.java:523) ~[spring-beans-6.2.0.jar!/:6.2.0]
2025-10-15T17:26:32.8626539Z 	at org.springframework.beans.factory.support.AbstractBeanFactory.lambda$doGetBean$0(AbstractBeanFactory.java:336) ~[spring-beans-6.2.0.jar!/:6.2.0]
2025-10-15T17:26:32.8626577Z 	at org.springframework.beans.factory.support.DefaultSingletonBeanRegistry.getSingleton(DefaultSingletonBeanRegistry.java:288) ~[spring-beans-6.2.0.jar!/:6.2.0]
2025-10-15T17:26:32.8626612Z 	at org.springframework.beans.factory.support.AbstractBeanFactory.doGetBean(AbstractBeanFactory.java:334) ~[spring-beans-6.2.0.jar!/:6.2.0]
2025-10-15T17:26:32.8626648Z 	at org.springframework.beans.factory.support.AbstractBeanFactory.getBean(AbstractBeanFactory.java:199) ~[spring-beans-6.2.0.jar!/:6.2.0]
2025-10-15T17:26:32.8626694Z 	at org.springframework.beans.factory.support.AbstractBeanFactory.doGetBean(AbstractBeanFactory.java:312) ~[spring-beans-6.2.0.jar!/:6.2.0]
2025-10-15T17:26:32.8626725Z 	... 15 common frames omitted
2025-10-15T17:26:32.862676Z Caused by: org.flywaydb.core.api.exception.FlywayValidateException: Validate failed: Migrations have failed validation
2025-10-15T17:26:32.8626792Z Migration checksum mismatch for migration version 1
2025-10-15T17:26:32.8626821Z -> Applied to database : 1730059603
2025-10-15T17:26:32.8626851Z -> Resolved locally    : -561047601
2025-10-15T17:26:32.86269Z Either revert the changes to the migration, or run repair to update the schema history.
2025-10-15T17:26:32.8626932Z Need more flexibility with validation rules? Learn more: https://rd.gt/3AbJUZE
2025-10-15T17:26:32.8626966Z 	at org.flywaydb.core.Flyway.lambda$migrate$1(Flyway.java:190) ~[flyway-core-10.21.0.jar!/:na]
2025-10-15T17:26:32.8626998Z 	at org.flywaydb.core.FlywayExecutor.execute(FlywayExecutor.java:213) ~[flyway-core-10.21.0.jar!/:na]
2025-10-15T17:26:32.8627031Z 	at org.flywaydb.core.Flyway.migrate(Flyway.java:177) ~[flyway-core-10.21.0.jar!/:na]
2025-10-15T17:26:32.8627078Z 	at org.springframework.boot.autoconfigure.flyway.FlywayMigrationInitializer.afterPropertiesSet(FlywayMigrationInitializer.java:66) ~[spring-boot-autoconfigure-3.4.0.jar!/:3.4.0]
2025-10-15T17:26:32.8627116Z 	at org.springframework.beans.factory.support.AbstractAutowireCapableBeanFactory.invokeInitMethods(AbstractAutowireCapableBeanFactory.java:1849) ~[spring-beans-6.2.0.jar!/:6.2.0]
2025-10-15T17:26:32.8627154Z 	at org.springframework.beans.factory.support.AbstractAutowireCapableBeanFactory.initializeBean(AbstractAutowireCapableBeanFactory.java:1798) ~[spring-beans-6.2.0.jar!/:6.2.0]
2025-10-15T17:26:32.8627185Z 	... 22 common frames omitted
2025-10-15T17:26:32.8627213Z
2025-10-15T17:26:32.9219145Z Wait for pid == 69 either returned successfully or was interrupted due to a signal 69
2025-10-15T17:26:32.9224579Z Done waiting for main process. GLOBAL_PID_MAIN=69.
2025-10-15T17:26:32.9229659Z Exiting entry script!