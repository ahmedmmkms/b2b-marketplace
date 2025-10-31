2025-10-30T18:18:11.085349759Z   =========|_|==============|___/=/_/_/_/
2025-10-30T18:18:11.102753426Z   :: Spring Boot ::                (v3.2.0)
2025-10-30T18:18:11.106067121Z
2025-10-30T18:18:12.029460132Z  2025-10-30T18:18:12.025Z  INFO 83 --- [b2b-marketplace] [           main] com.p4.backend.BackendApplication        : Starting BackendApplication v0.0.1-SNAPSHOT using Java 21.0.7 with PID 83 (/home/site/wwwroot/app.jar started by root in /home/site/wwwroot)
2025-10-30T18:18:12.053489123Z  2025-10-30T18:18:12.052Z  INFO 83 --- [b2b-marketplace] [           main] com.p4.backend.BackendApplication        : The following 1 profile is active: "prod"
2025-10-30T18:18:22.810320786Z  2025-10-30T18:18:22.807Z  INFO 83 --- [b2b-marketplace] [           main] .s.d.r.c.RepositoryConfigurationDelegate : Bootstrapping Spring Data JPA repositories in DEFAULT mode.
2025-10-30T18:18:23.322328256Z  2025-10-30T18:18:23.290Z  INFO 83 --- [b2b-marketplace] [           main] .s.d.r.c.RepositoryConfigurationDelegate : Finished Spring Data repository scanning in 411 ms. Found 3 JPA repository interfaces.
2025-10-30T18:18:28.382963104Z  2025-10-30T18:18:28.381Z  INFO 83 --- [b2b-marketplace] [           main] o.s.b.w.embedded.tomcat.TomcatWebServer  : Tomcat initialized with port 80 (http)
2025-10-30T18:18:28.590061491Z  2025-10-30T18:18:28.586Z  INFO 83 --- [b2b-marketplace] [           main] w.s.c.ServletWebServerApplicationContext : Root WebApplicationContext: initialization completed in 15639 ms
2025-10-30T18:18:29.177831297Z  2025-10-30T18:18:29.174Z  INFO 83 --- [b2b-marketplace] [           main] com.zaxxer.hikari.HikariDataSource       : HikariPool-1 - Starting...
2025-10-30T18:18:32.605526203Z  2025-10-30T18:18:32.603Z  INFO 83 --- [b2b-marketplace] [           main] com.zaxxer.hikari.pool.HikariPool        : HikariPool-1 - Added connection org.postgresql.jdbc.PgConnection@7afe0e67
2025-10-30T18:18:32.610862244Z  2025-10-30T18:18:32.609Z  INFO 83 --- [b2b-marketplace] [           main] com.zaxxer.hikari.HikariDataSource       : HikariPool-1 - Start completed.
2025-10-30T18:18:33.254667470Z  2025-10-30T18:18:33.253Z  INFO 83 --- [b2b-marketplace] [           main] o.f.c.internal.license.VersionPrinter    : Flyway Community Edition 9.22.3 by Redgate
2025-10-30T18:18:33.282177518Z  2025-10-30T18:18:33.276Z  INFO 83 --- [b2b-marketplace] [           main] o.f.c.internal.license.VersionPrinter    : See release notes here: https://rd.gt/416ObMi
2025-10-30T18:18:33.294251646Z  2025-10-30T18:18:33.288Z  INFO 83 --- [b2b-marketplace] [           main] o.f.c.internal.license.VersionPrinter    :
2025-10-30T18:18:33.389949099Z  2025-10-30T18:18:33.385Z  INFO 83 --- [b2b-marketplace] [           main] org.flywaydb.core.FlywayExecutor         : Database: jdbc:postgresql://ep-damp-feather-adc322wz-pooler.c-2.us-east-1.aws.neon.tech/neondb (PostgreSQL 17.5)
2025-10-30T18:18:33.584315731Z  2025-10-30T18:18:33.583Z  WARN 83 --- [b2b-marketplace] [           main] o.f.c.internal.database.base.Database    : Flyway upgrade recommended: PostgreSQL 17.5 is newer than this version of Flyway and support has not been tested. The latest supported version of PostgreSQL is 15.
2025-10-30T18:18:33.798221563Z  2025-10-30T18:18:33.795Z  INFO 83 --- [b2b-marketplace] [           main] o.f.core.internal.command.DbValidate     : Successfully validated 5 migrations (execution time 00:00.168s)
2025-10-30T18:18:34.121977442Z  2025-10-30T18:18:34.120Z  INFO 83 --- [b2b-marketplace] [           main] o.f.core.internal.command.DbMigrate      : Current version of schema "public": 1
2025-10-30T18:18:34.332461330Z  2025-10-30T18:18:34.329Z  INFO 83 --- [b2b-marketplace] [           main] o.f.core.internal.command.DbMigrate      : Migrating schema "public" to version "002 - catalog"
2025-10-30T18:18:34.466160302Z  2025-10-30T18:18:34.465Z ERROR 83 --- [b2b-marketplace] [           main] o.f.core.internal.command.DbMigrate      : Migration of schema "public" to version "002 - catalog" failed! Changes successfully rolled back.
2025-10-30T18:18:34.640062192Z  2025-10-30T18:18:34.638Z ERROR 83 --- [b2b-marketplace] [           main] o.s.b.web.embedded.tomcat.TomcatStarter  : Error starting Tomcat context. Exception: org.springframework.beans.factory.UnsatisfiedDependencyException. Message: Error creating bean with name 'webConfig': Unsatisfied dependency expressed through field 'featureFlagFilter': Error creating bean with name 'featureFlagFilter': Unsatisfied dependency expressed through field 'featureFlagService': Error creating bean with name 'featureFlagService': Unsatisfied dependency expressed through field 'featureFlagRepository': Error creating bean with name 'featureFlagRepository' defined in com.p4.backend.common.feature.FeatureFlagRepository defined in @EnableJpaRepositories declared on JpaRepositoriesRegistrar.EnableJpaRepositoriesConfiguration: Cannot resolve reference to bean 'jpaSharedEM_entityManagerFactory' while setting bean property 'entityManager'
2025-10-30T18:18:34.791499829Z  2025-10-30T18:18:34.790Z  WARN 83 --- [b2b-marketplace] [           main] ConfigServletWebServerApplicationContext : Exception encountered during context initialization - cancelling refresh attempt: org.springframework.context.ApplicationContextException: Unable to start web server
2025-10-30T18:18:34.792521101Z  2025-10-30T18:18:34.791Z  INFO 83 --- [b2b-marketplace] [           main] com.zaxxer.hikari.HikariDataSource       : HikariPool-1 - Shutdown initiated...
2025-10-30T18:18:34.994211876Z  2025-10-30T18:18:34.988Z  INFO 83 --- [b2b-marketplace] [           main] com.zaxxer.hikari.HikariDataSource       : HikariPool-1 - Shutdown completed.
2025-10-30T18:18:35.041867959Z  2025-10-30T18:18:35.038Z  INFO 83 --- [b2b-marketplace] [           main] .s.b.a.l.ConditionEvaluationReportLogger :
2025-10-30T18:18:35.041923697Z
2025-10-30T18:18:35.041931351Z  Error starting ApplicationContext. To display the condition evaluation report re-run your application with 'debug' enabled.
2025-10-30T18:18:35.144887883Z  2025-10-30T18:18:35.120Z ERROR 83 --- [b2b-marketplace] [           main] o.s.boot.SpringApplication               : Application run failed
2025-10-30T18:18:35.145487084Z
2025-10-30T18:18:35.145499618Z  org.springframework.context.ApplicationContextException: Unable to start web server
2025-10-30T18:18:35.145504698Z  	at org.springframework.boot.web.servlet.context.ServletWebServerApplicationContext.onRefresh(ServletWebServerApplicationContext.java:165) ~[spring-boot-3.2.0.jar!/:3.2.0]
2025-10-30T18:18:35.145509106Z  	at org.springframework.context.support.AbstractApplicationContext.refresh(AbstractApplicationContext.java:610) ~[spring-context-6.1.1.jar!/:6.1.1]
2025-10-30T18:18:35.145513064Z  	at org.springframework.boot.web.servlet.context.ServletWebServerApplicationContext.refresh(ServletWebServerApplicationContext.java:146) ~[spring-boot-3.2.0.jar!/:3.2.0]
2025-10-30T18:18:35.145516962Z  	at org.springframework.boot.SpringApplication.refresh(SpringApplication.java:753) ~[spring-boot-3.2.0.jar!/:3.2.0]
2025-10-30T18:18:35.145520408Z  	at org.springframework.boot.SpringApplication.refreshContext(SpringApplication.java:455) ~[spring-boot-3.2.0.jar!/:3.2.0]
2025-10-30T18:18:35.145524085Z  	at org.springframework.boot.SpringApplication.run(SpringApplication.java:323) ~[spring-boot-3.2.0.jar!/:3.2.0]
2025-10-30T18:18:35.145527692Z  	at org.springframework.boot.SpringApplication.run(SpringApplication.java:1342) ~[spring-boot-3.2.0.jar!/:3.2.0]
2025-10-30T18:18:35.145531239Z  	at org.springframework.boot.SpringApplication.run(SpringApplication.java:1331) ~[spring-boot-3.2.0.jar!/:3.2.0]
2025-10-30T18:18:35.145534886Z  	at com.p4.backend.BackendApplication.main(BackendApplication.java:9) ~[!/:0.0.1-SNAPSHOT]
2025-10-30T18:18:35.145538343Z  	at java.base/jdk.internal.reflect.DirectMethodHandleAccessor.invoke(DirectMethodHandleAccessor.java:103) ~[na:na]
2025-10-30T18:18:35.145541860Z  	at java.base/java.lang.reflect.Method.invoke(Method.java:580) ~[na:na]
2025-10-30T18:18:35.145545377Z  	at org.springframework.boot.loader.launch.Launcher.launch(Launcher.java:91) ~[app.jar:0.0.1-SNAPSHOT]
2025-10-30T18:18:35.145548883Z  	at org.springframework.boot.loader.launch.Launcher.launch(Launcher.java:53) ~[app.jar:0.0.1-SNAPSHOT]
2025-10-30T18:18:35.145552400Z  	at org.springframework.boot.loader.launch.JarLauncher.main(JarLauncher.java:58) ~[app.jar:0.0.1-SNAPSHOT]
2025-10-30T18:18:35.145558191Z  Caused by: org.springframework.boot.web.server.WebServerException: Unable to start embedded Tomcat
2025-10-30T18:18:35.145561768Z  	at org.springframework.boot.web.embedded.tomcat.TomcatWebServer.initialize(TomcatWebServer.java:142) ~[spring-boot-3.2.0.jar!/:3.2.0]
2025-10-30T18:18:35.145565476Z  	at org.springframework.boot.web.embedded.tomcat.TomcatWebServer.<init>(TomcatWebServer.java:104) ~[spring-boot-3.2.0.jar!/:3.2.0]
2025-10-30T18:18:35.145569303Z  	at org.springframework.boot.web.embedded.tomcat.TomcatServletWebServerFactory.getTomcatWebServer(TomcatServletWebServerFactory.java:501) ~[spring-boot-3.2.0.jar!/:3.2.0]
2025-10-30T18:18:35.145586576Z  	at org.springframework.boot.web.embedded.tomcat.TomcatServletWebServerFactory.getWebServer(TomcatServletWebServerFactory.java:218) ~[spring-boot-3.2.0.jar!/:3.2.0]
2025-10-30T18:18:35.145590494Z  	at org.springframework.boot.web.servlet.context.ServletWebServerApplicationContext.createWebServer(ServletWebServerApplicationContext.java:188) ~[spring-boot-3.2.0.jar!/:3.2.0]
2025-10-30T18:18:35.145594231Z  	at org.springframework.boot.web.servlet.context.ServletWebServerApplicationContext.onRefresh(ServletWebServerApplicationContext.java:162) ~[spring-boot-3.2.0.jar!/:3.2.0]
2025-10-30T18:18:35.145597938Z  	... 13 common frames omitted
2025-10-30T18:18:35.145601405Z  Caused by: org.springframework.beans.factory.UnsatisfiedDependencyException: Error creating bean with name 'webConfig': Unsatisfied dependency expressed through field 'featureFlagFilter': Error creating bean with name 'featureFlagFilter': Unsatisfied dependency expressed through field 'featureFlagService': Error creating bean with name 'featureFlagService': Unsatisfied dependency expressed through field 'featureFlagRepository': Error creating bean with name 'featureFlagRepository' defined in com.p4.backend.common.feature.FeatureFlagRepository defined in @EnableJpaRepositories declared on JpaRepositoriesRegistrar.EnableJpaRepositoriesConfiguration: Cannot resolve reference to bean 'jpaSharedEM_entityManagerFactory' while setting bean property 'entityManager'
2025-10-30T18:18:35.145606605Z  	at org.springframework.beans.factory.annotation.AutowiredAnnotationBeanPostProcessor$AutowiredFieldElement.resolveFieldValue(AutowiredAnnotationBeanPostProcessor.java:772) ~[spring-beans-6.1.1.jar!/:6.1.1]
2025-10-30T18:18:35.145610913Z  	at org.springframework.beans.factory.annotation.AutowiredAnnotationBeanPostProcessor$AutowiredFieldElement.inject(AutowiredAnnotationBeanPostProcessor.java:752) ~[spring-beans-6.1.1.jar!/:6.1.1]
2025-10-30T18:18:35.145614651Z  	at org.springframework.beans.factory.annotation.InjectionMetadata.inject(InjectionMetadata.java:145) ~[spring-beans-6.1.1.jar!/:6.1.1]
2025-10-30T18:18:35.145618288Z  	at org.springframework.beans.factory.annotation.AutowiredAnnotationBeanPostProcessor.postProcessProperties(AutowiredAnnotationBeanPostProcessor.java:493) ~[spring-beans-6.1.1.jar!/:6.1.1]
2025-10-30T18:18:35.145622075Z  	at org.springframework.beans.factory.support.AbstractAutowireCapableBeanFactory.populateBean(AbstractAutowireCapableBeanFactory.java:1420) ~[spring-beans-6.1.1.jar!/:6.1.1]
2025-10-30T18:18:35.145625772Z  	at org.springframework.beans.factory.support.AbstractAutowireCapableBeanFactory.doCreateBean(AbstractAutowireCapableBeanFactory.java:600) ~[spring-beans-6.1.1.jar!/:6.1.1]
2025-10-30T18:18:35.145629600Z  	at org.springframework.beans.factory.support.AbstractAutowireCapableBeanFactory.createBean(AbstractAutowireCapableBeanFactory.java:523) ~[spring-beans-6.1.1.jar!/:6.1.1]
2025-10-30T18:18:35.145633688Z  	at org.springframework.beans.factory.support.AbstractBeanFactory.lambda$doGetBean$0(AbstractBeanFactory.java:325) ~[spring-beans-6.1.1.jar!/:6.1.1]
2025-10-30T18:18:35.145637505Z  	at org.springframework.beans.factory.support.DefaultSingletonBeanRegistry.getSingleton(DefaultSingletonBeanRegistry.java:234) ~[spring-beans-6.1.1.jar!/:6.1.1]
2025-10-30T18:18:35.146319045Z  	at org.springframework.beans.factory.support.AbstractBeanFactory.doGetBean(AbstractBeanFactory.java:323) ~[spring-beans-6.1.1.jar!/:6.1.1]
2025-10-30T18:18:35.146324306Z  	at org.springframework.beans.factory.support.AbstractBeanFactory.getBean(AbstractBeanFactory.java:199) ~[spring-beans-6.1.1.jar!/:6.1.1]
2025-10-30T18:18:35.150186296Z  	at org.springframework.beans.factory.support.ConstructorResolver.instantiateUsingFactoryMethod(ConstructorResolver.java:413) ~[spring-beans-6.1.1.jar!/:6.1.1]
2025-10-30T18:18:35.150209942Z  	at org.springframework.beans.factory.support.AbstractAutowireCapableBeanFactory.instantiateUsingFactoryMethod(AbstractAutowireCapableBeanFactory.java:1336) ~[spring-beans-6.1.1.jar!/:6.1.1]
2025-10-30T18:18:35.150219290Z  	at org.springframework.beans.factory.support.AbstractAutowireCapableBeanFactory.createBeanInstance(AbstractAutowireCapableBeanFactory.java:1166) ~[spring-beans-6.1.1.jar!/:6.1.1]
2025-10-30T18:18:35.150223398Z  	at org.springframework.beans.factory.support.AbstractAutowireCapableBeanFactory.doCreateBean(AbstractAutowireCapableBeanFactory.java:563) ~[spring-beans-6.1.1.jar!/:6.1.1]
2025-10-30T18:18:35.150227135Z  	at org.springframework.beans.factory.support.AbstractAutowireCapableBeanFactory.createBean(AbstractAutowireCapableBeanFactory.java:523) ~[spring-beans-6.1.1.jar!/:6.1.1]
2025-10-30T18:18:35.150230652Z  	at org.springframework.beans.factory.support.AbstractBeanFactory.lambda$doGetBean$0(AbstractBeanFactory.java:325) ~[spring-beans-6.1.1.jar!/:6.1.1]
2025-10-30T18:18:35.150234279Z  	at org.springframework.beans.factory.support.DefaultSingletonBeanRegistry.getSingleton(DefaultSingletonBeanRegistry.java:234) ~[spring-beans-6.1.1.jar!/:6.1.1]
2025-10-30T18:18:35.150237896Z  	at org.springframework.beans.factory.support.AbstractBeanFactory.doGetBean(AbstractBeanFactory.java:323) ~[spring-beans-6.1.1.jar!/:6.1.1]
2025-10-30T18:18:35.150241403Z  	at org.springframework.beans.factory.support.AbstractBeanFactory.getBean(AbstractBeanFactory.java:204) ~[spring-beans-6.1.1.jar!/:6.1.1]
2025-10-30T18:18:35.150244859Z  	at org.springframework.boot.web.servlet.ServletContextInitializerBeans.getOrderedBeansOfType(ServletContextInitializerBeans.java:210) ~[spring-boot-3.2.0.jar!/:3.2.0]
2025-10-30T18:18:35.150249007Z  	at org.springframework.boot.web.servlet.ServletContextInitializerBeans.getOrderedBeansOfType(ServletContextInitializerBeans.java:201) ~[spring-boot-3.2.0.jar!/:3.2.0]
2025-10-30T18:18:35.150253776Z  	at org.springframework.boot.web.servlet.ServletContextInitializerBeans.addServletContextInitializerBeans(ServletContextInitializerBeans.java:96) ~[spring-boot-3.2.0.jar!/:3.2.0]
2025-10-30T18:18:35.150258155Z  	at org.springframework.boot.web.servlet.ServletContextInitializerBeans.<init>(ServletContextInitializerBeans.java:85) ~[spring-boot-3.2.0.jar!/:3.2.0]
2025-10-30T18:18:35.150262714Z  	at org.springframework.boot.web.servlet.context.ServletWebServerApplicationContext.getServletContextInitializerBeans(ServletWebServerApplicationContext.java:266) ~[spring-boot-3.2.0.jar!/:3.2.0]
2025-10-30T18:18:35.150267723Z  	at org.springframework.boot.web.servlet.context.ServletWebServerApplicationContext.selfInitialize(ServletWebServerApplicationContext.java:240) ~[spring-boot-3.2.0.jar!/:3.2.0]
2025-10-30T18:18:35.150294876Z  	at org.springframework.boot.web.embedded.tomcat.TomcatStarter.onStartup(TomcatStarter.java:52) ~[spring-boot-3.2.0.jar!/:3.2.0]
2025-10-30T18:18:35.150298954Z  	at org.apache.catalina.core.StandardContext.startInternal(StandardContext.java:4850) ~[tomcat-embed-core-10.1.16.jar!/:na]
2025-10-30T18:18:35.150302511Z  	at org.apache.catalina.util.LifecycleBase.start(LifecycleBase.java:171) ~[tomcat-embed-core-10.1.16.jar!/:na]
2025-10-30T18:18:35.150306118Z  	at org.apache.catalina.core.ContainerBase$StartChild.call(ContainerBase.java:1332) ~[tomcat-embed-core-10.1.16.jar!/:na]
2025-10-30T18:18:35.150309785Z  	at org.apache.catalina.core.ContainerBase$StartChild.call(ContainerBase.java:1322) ~[tomcat-embed-core-10.1.16.jar!/:na]
2025-10-30T18:18:35.150313362Z  	at java.base/java.util.concurrent.FutureTask.run(FutureTask.java:317) ~[na:na]
2025-10-30T18:18:35.150316799Z  	at org.apache.tomcat.util.threads.InlineExecutorService.execute(InlineExecutorService.java:75) ~[tomcat-embed-core-10.1.16.jar!/:na]
2025-10-30T18:18:35.150320516Z  	at java.base/java.util.concurrent.AbstractExecutorService.submit(AbstractExecutorService.java:145) ~[na:na]
2025-10-30T18:18:35.150324063Z  	at org.apache.catalina.core.ContainerBase.startInternal(ContainerBase.java:866) ~[tomcat-embed-core-10.1.16.jar!/:na]
2025-10-30T18:18:35.150327599Z  	at org.apache.catalina.core.StandardHost.startInternal(StandardHost.java:845) ~[tomcat-embed-core-10.1.16.jar!/:na]
2025-10-30T18:18:35.150518750Z  	at org.apache.catalina.util.LifecycleBase.start(LifecycleBase.java:171) ~[tomcat-embed-core-10.1.16.jar!/:na]
2025-10-30T18:18:35.150524741Z  	at org.apache.catalina.core.ContainerBase$StartChild.call(ContainerBase.java:1332) ~[tomcat-embed-core-10.1.16.jar!/:na]
2025-10-30T18:18:35.150529040Z  	at org.apache.catalina.core.ContainerBase$StartChild.call(ContainerBase.java:1322) ~[tomcat-embed-core-10.1.16.jar!/:na]
2025-10-30T18:18:35.150532887Z  	at java.base/java.util.concurrent.FutureTask.run(FutureTask.java:317) ~[na:na]
2025-10-30T18:18:35.150536454Z  	at org.apache.tomcat.util.threads.InlineExecutorService.execute(InlineExecutorService.java:75) ~[tomcat-embed-core-10.1.16.jar!/:na]
2025-10-30T18:18:35.150540061Z  	at java.base/java.util.concurrent.AbstractExecutorService.submit(AbstractExecutorService.java:145) ~[na:na]
2025-10-30T18:18:35.150543598Z  	at org.apache.catalina.core.ContainerBase.startInternal(ContainerBase.java:866) ~[tomcat-embed-core-10.1.16.jar!/:na]
2025-10-30T18:18:35.150548147Z  	at org.apache.catalina.core.StandardEngine.startInternal(StandardEngine.java:240) ~[tomcat-embed-core-10.1.16.jar!/:na]
2025-10-30T18:18:35.150551573Z  	at org.apache.catalina.util.LifecycleBase.start(LifecycleBase.java:171) ~[tomcat-embed-core-10.1.16.jar!/:na]
2025-10-30T18:18:35.150555040Z  	at org.apache.catalina.core.StandardService.startInternal(StandardService.java:433) ~[tomcat-embed-core-10.1.16.jar!/:na]
2025-10-30T18:18:35.150558537Z  	at org.apache.catalina.util.LifecycleBase.start(LifecycleBase.java:171) ~[tomcat-embed-core-10.1.16.jar!/:na]
2025-10-30T18:18:35.150561954Z  	at org.apache.catalina.core.StandardServer.startInternal(StandardServer.java:917) ~[tomcat-embed-core-10.1.16.jar!/:na]
2025-10-30T18:18:35.150576332Z  	at org.apache.catalina.util.LifecycleBase.start(LifecycleBase.java:171) ~[tomcat-embed-core-10.1.16.jar!/:na]
2025-10-30T18:18:35.150579959Z  	at org.apache.catalina.startup.Tomcat.start(Tomcat.java:488) ~[tomcat-embed-core-10.1.16.jar!/:na]
2025-10-30T18:18:35.150584237Z  	at org.springframework.boot.web.embedded.tomcat.TomcatWebServer.initialize(TomcatWebServer.java:123) ~[spring-boot-3.2.0.jar!/:3.2.0]
2025-10-30T18:18:35.150588836Z  	... 18 common frames omitted
2025-10-30T18:18:35.150593304Z  Caused by: org.springframework.beans.factory.UnsatisfiedDependencyException: Error creating bean with name 'featureFlagFilter': Unsatisfied dependency expressed through field 'featureFlagService': Error creating bean with name 'featureFlagService': Unsatisfied dependency expressed through field 'featureFlagRepository': Error creating bean with name 'featureFlagRepository' defined in com.p4.backend.common.feature.FeatureFlagRepository defined in @EnableJpaRepositories declared on JpaRepositoriesRegistrar.EnableJpaRepositoriesConfiguration: Cannot resolve reference to bean 'jpaSharedEM_entityManagerFactory' while setting bean property 'entityManager'
2025-10-30T18:18:35.150599537Z  	at org.springframework.beans.factory.annotation.AutowiredAnnotationBeanPostProcessor$AutowiredFieldElement.resolveFieldValue(AutowiredAnnotationBeanPostProcessor.java:772) ~[spring-beans-6.1.1.jar!/:6.1.1]
2025-10-30T18:18:35.150603935Z  	at org.springframework.beans.factory.annotation.AutowiredAnnotationBeanPostProcessor$AutowiredFieldElement.inject(AutowiredAnnotationBeanPostProcessor.java:752) ~[spring-beans-6.1.1.jar!/:6.1.1]
2025-10-30T18:18:35.150608744Z  	at org.springframework.beans.factory.annotation.InjectionMetadata.inject(InjectionMetadata.java:145) ~[spring-beans-6.1.1.jar!/:6.1.1]
2025-10-30T18:18:35.150613393Z  	at org.springframework.beans.factory.annotation.AutowiredAnnotationBeanPostProcessor.postProcessProperties(AutowiredAnnotationBeanPostProcessor.java:493) ~[spring-beans-6.1.1.jar!/:6.1.1]
2025-10-30T18:18:35.150617672Z  	at org.springframework.beans.factory.support.AbstractAutowireCapableBeanFactory.populateBean(AbstractAutowireCapableBeanFactory.java:1420) ~[spring-beans-6.1.1.jar!/:6.1.1]
2025-10-30T18:18:35.150621579Z  	at org.springframework.beans.factory.support.AbstractAutowireCapableBeanFactory.doCreateBean(AbstractAutowireCapableBeanFactory.java:600) ~[spring-beans-6.1.1.jar!/:6.1.1]
2025-10-30T18:18:35.150626358Z  	at org.springframework.beans.factory.support.AbstractAutowireCapableBeanFactory.createBean(AbstractAutowireCapableBeanFactory.java:523) ~[spring-beans-6.1.1.jar!/:6.1.1]
2025-10-30T18:18:35.150630777Z  	at org.springframework.beans.factory.support.AbstractBeanFactory.lambda$doGetBean$0(AbstractBeanFactory.java:325) ~[spring-beans-6.1.1.jar!/:6.1.1]
2025-10-30T18:18:35.150634815Z  	at org.springframework.beans.factory.support.DefaultSingletonBeanRegistry.getSingleton(DefaultSingletonBeanRegistry.java:234) ~[spring-beans-6.1.1.jar!/:6.1.1]
2025-10-30T18:18:35.150638652Z  	at org.springframework.beans.factory.support.AbstractBeanFactory.doGetBean(AbstractBeanFactory.java:323) ~[spring-beans-6.1.1.jar!/:6.1.1]
2025-10-30T18:18:35.150642520Z  	at org.springframework.beans.factory.support.AbstractBeanFactory.getBean(AbstractBeanFactory.java:199) ~[spring-beans-6.1.1.jar!/:6.1.1]
2025-10-30T18:18:35.150652469Z  	at org.springframework.beans.factory.config.DependencyDescriptor.resolveCandidate(DependencyDescriptor.java:254) ~[spring-beans-6.1.1.jar!/:6.1.1]
2025-10-30T18:18:35.150656216Z  	at org.springframework.beans.factory.support.DefaultListableBeanFactory.doResolveDependency(DefaultListableBeanFactory.java:1441) ~[spring-beans-6.1.1.jar!/:6.1.1]
2025-10-30T18:18:35.150659934Z  	at org.springframework.beans.factory.support.DefaultListableBeanFactory.resolveDependency(DefaultListableBeanFactory.java:1348) ~[spring-beans-6.1.1.jar!/:6.1.1]
2025-10-30T18:18:35.150663450Z  	at org.springframework.beans.factory.annotation.AutowiredAnnotationBeanPostProcessor$AutowiredFieldElement.resolveFieldValue(AutowiredAnnotationBeanPostProcessor.java:769) ~[spring-beans-6.1.1.jar!/:6.1.1]
2025-10-30T18:18:35.150667027Z  	... 68 common frames omitted
2025-10-30T18:18:35.150672267Z  Caused by: org.springframework.beans.factory.UnsatisfiedDependencyException: Error creating bean with name 'featureFlagService': Unsatisfied dependency expressed through field 'featureFlagRepository': Error creating bean with name 'featureFlagRepository' defined in com.p4.backend.common.feature.FeatureFlagRepository defined in @EnableJpaRepositories declared on JpaRepositoriesRegistrar.EnableJpaRepositoriesConfiguration: Cannot resolve reference to bean 'jpaSharedEM_entityManagerFactory' while setting bean property 'entityManager'
2025-10-30T18:18:35.150676515Z  	at org.springframework.beans.factory.annotation.AutowiredAnnotationBeanPostProcessor$AutowiredFieldElement.resolveFieldValue(AutowiredAnnotationBeanPostProcessor.java:772) ~[spring-beans-6.1.1.jar!/:6.1.1]
2025-10-30T18:18:35.150680834Z  	at org.springframework.beans.factory.annotation.AutowiredAnnotationBeanPostProcessor$AutowiredFieldElement.inject(AutowiredAnnotationBeanPostProcessor.java:752) ~[spring-beans-6.1.1.jar!/:6.1.1]
2025-10-30T18:18:35.150685383Z  	at org.springframework.beans.factory.annotation.InjectionMetadata.inject(InjectionMetadata.java:145) ~[spring-beans-6.1.1.jar!/:6.1.1]
2025-10-30T18:18:35.150689400Z  	at org.springframework.beans.factory.annotation.AutowiredAnnotationBeanPostProcessor.postProcessProperties(AutowiredAnnotationBeanPostProcessor.java:493) ~[spring-beans-6.1.1.jar!/:6.1.1]
2025-10-30T18:18:35.150693879Z  	at org.springframework.beans.factory.support.AbstractAutowireCapableBeanFactory.populateBean(AbstractAutowireCapableBeanFactory.java:1420) ~[spring-beans-6.1.1.jar!/:6.1.1]
2025-10-30T18:18:35.150698809Z  	at org.springframework.beans.factory.support.AbstractAutowireCapableBeanFactory.doCreateBean(AbstractAutowireCapableBeanFactory.java:600) ~[spring-beans-6.1.1.jar!/:6.1.1]
2025-10-30T18:18:35.150703548Z  	at org.springframework.beans.factory.support.AbstractAutowireCapableBeanFactory.createBean(AbstractAutowireCapableBeanFactory.java:523) ~[spring-beans-6.1.1.jar!/:6.1.1]
2025-10-30T18:18:35.150707806Z  	at org.springframework.beans.factory.support.AbstractBeanFactory.lambda$doGetBean$0(AbstractBeanFactory.java:325) ~[spring-beans-6.1.1.jar!/:6.1.1]
2025-10-30T18:18:35.150712365Z  	at org.springframework.beans.factory.support.DefaultSingletonBeanRegistry.getSingleton(DefaultSingletonBeanRegistry.java:234) ~[spring-beans-6.1.1.jar!/:6.1.1]
2025-10-30T18:18:35.150717074Z  	at org.springframework.beans.factory.support.AbstractBeanFactory.doGetBean(AbstractBeanFactory.java:323) ~[spring-beans-6.1.1.jar!/:6.1.1]
2025-10-30T18:18:35.150726583Z  	at org.springframework.beans.factory.support.AbstractBeanFactory.getBean(AbstractBeanFactory.java:199) ~[spring-beans-6.1.1.jar!/:6.1.1]
2025-10-30T18:18:35.150730600Z  	at org.springframework.beans.factory.config.DependencyDescriptor.resolveCandidate(DependencyDescriptor.java:254) ~[spring-beans-6.1.1.jar!/:6.1.1]
2025-10-30T18:18:35.150734518Z  	at org.springframework.beans.factory.support.DefaultListableBeanFactory.doResolveDependency(DefaultListableBeanFactory.java:1441) ~[spring-beans-6.1.1.jar!/:6.1.1]
2025-10-30T18:18:35.150738616Z  	at org.springframework.beans.factory.support.DefaultListableBeanFactory.resolveDependency(DefaultListableBeanFactory.java:1348) ~[spring-beans-6.1.1.jar!/:6.1.1]
2025-10-30T18:18:35.150743195Z  	at org.springframework.beans.factory.annotation.AutowiredAnnotationBeanPostProcessor$AutowiredFieldElement.resolveFieldValue(AutowiredAnnotationBeanPostProcessor.java:769) ~[spring-beans-6.1.1.jar!/:6.1.1]
2025-10-30T18:18:35.150747934Z  	... 82 common frames omitted
2025-10-30T18:18:35.150751671Z  Caused by: org.springframework.beans.factory.BeanCreationException: Error creating bean with name 'featureFlagRepository' defined in com.p4.backend.common.feature.FeatureFlagRepository defined in @EnableJpaRepositories declared on JpaRepositoriesRegistrar.EnableJpaRepositoriesConfiguration: Cannot resolve reference to bean 'jpaSharedEM_entityManagerFactory' while setting bean property 'entityManager'
2025-10-30T18:18:35.150756461Z  	at org.springframework.beans.factory.support.BeanDefinitionValueResolver.resolveReference(BeanDefinitionValueResolver.java:377) ~[spring-beans-6.1.1.jar!/:6.1.1]
2025-10-30T18:18:35.150760188Z  	at org.springframework.beans.factory.support.BeanDefinitionValueResolver.resolveValueIfNecessary(BeanDefinitionValueResolver.java:135) ~[spring-beans-6.1.1.jar!/:6.1.1]
2025-10-30T18:18:35.150763815Z  	at org.springframework.beans.factory.support.AbstractAutowireCapableBeanFactory.applyPropertyValues(AbstractAutowireCapableBeanFactory.java:1686) ~[spring-beans-6.1.1.jar!/:6.1.1]
2025-10-30T18:18:35.150768143Z  	at org.springframework.beans.factory.support.AbstractAutowireCapableBeanFactory.populateBean(AbstractAutowireCapableBeanFactory.java:1435) ~[spring-beans-6.1.1.jar!/:6.1.1]
2025-10-30T18:18:35.150772311Z  	at org.springframework.beans.factory.support.AbstractAutowireCapableBeanFactory.doCreateBean(AbstractAutowireCapableBeanFactory.java:600) ~[spring-beans-6.1.1.jar!/:6.1.1]
2025-10-30T18:18:35.150776960Z  	at org.springframework.beans.factory.support.AbstractAutowireCapableBeanFactory.createBean(AbstractAutowireCapableBeanFactory.java:523) ~[spring-beans-6.1.1.jar!/:6.1.1]
2025-10-30T18:18:35.150781399Z  	at org.springframework.beans.factory.support.AbstractBeanFactory.lambda$doGetBean$0(AbstractBeanFactory.java:325) ~[spring-beans-6.1.1.jar!/:6.1.1]
2025-10-30T18:18:35.150785867Z  	at org.springframework.beans.factory.support.DefaultSingletonBeanRegistry.getSingleton(DefaultSingletonBeanRegistry.java:234) ~[spring-beans-6.1.1.jar!/:6.1.1]
2025-10-30T18:18:35.150789745Z  	at org.springframework.beans.factory.support.AbstractBeanFactory.doGetBean(AbstractBeanFactory.java:323) ~[spring-beans-6.1.1.jar!/:6.1.1]
2025-10-30T18:18:35.150793943Z  	at org.springframework.beans.factory.support.AbstractBeanFactory.getBean(AbstractBeanFactory.java:199) ~[spring-beans-6.1.1.jar!/:6.1.1]
2025-10-30T18:18:35.150803933Z  	at org.springframework.beans.factory.config.DependencyDescriptor.resolveCandidate(DependencyDescriptor.java:254) ~[spring-beans-6.1.1.jar!/:6.1.1]
2025-10-30T18:18:35.150807870Z  	at org.springframework.beans.factory.support.DefaultListableBeanFactory.doResolveDependency(DefaultListableBeanFactory.java:1441) ~[spring-beans-6.1.1.jar!/:6.1.1]
2025-10-30T18:18:35.150811708Z  	at org.springframework.beans.factory.support.DefaultListableBeanFactory.resolveDependency(DefaultListableBeanFactory.java:1348) ~[spring-beans-6.1.1.jar!/:6.1.1]
2025-10-30T18:18:35.150816707Z  	at org.springframework.beans.factory.annotation.AutowiredAnnotationBeanPostProcessor$AutowiredFieldElement.resolveFieldValue(AutowiredAnnotationBeanPostProcessor.java:769) ~[spring-beans-6.1.1.jar!/:6.1.1]
2025-10-30T18:18:35.150821096Z  	... 96 common frames omitted
2025-10-30T18:18:35.150825364Z  Caused by: org.springframework.beans.factory.BeanCreationException: Error creating bean with name 'jpaSharedEM_entityManagerFactory': Cannot resolve reference to bean 'entityManagerFactory' while setting constructor argument
2025-10-30T18:18:35.150830504Z  	at org.springframework.beans.factory.support.BeanDefinitionValueResolver.resolveReference(BeanDefinitionValueResolver.java:377) ~[spring-beans-6.1.1.jar!/:6.1.1]
2025-10-30T18:18:35.150834862Z  	at org.springframework.beans.factory.support.BeanDefinitionValueResolver.resolveValueIfNecessary(BeanDefinitionValueResolver.java:135) ~[spring-beans-6.1.1.jar!/:6.1.1]
2025-10-30T18:18:35.150838930Z  	at org.springframework.beans.factory.support.ConstructorResolver.resolveConstructorArguments(ConstructorResolver.java:689) ~[spring-beans-6.1.1.jar!/:6.1.1]
2025-10-30T18:18:35.150843650Z  	at org.springframework.beans.factory.support.ConstructorResolver.instantiateUsingFactoryMethod(ConstructorResolver.java:513) ~[spring-beans-6.1.1.jar!/:6.1.1]
2025-10-30T18:18:35.150848178Z  	at org.springframework.beans.factory.support.AbstractAutowireCapableBeanFactory.instantiateUsingFactoryMethod(AbstractAutowireCapableBeanFactory.java:1336) ~[spring-beans-6.1.1.jar!/:6.1.1]
2025-10-30T18:18:35.150852537Z  	at org.springframework.beans.factory.support.AbstractAutowireCapableBeanFactory.createBeanInstance(AbstractAutowireCapableBeanFactory.java:1166) ~[spring-beans-6.1.1.jar!/:6.1.1]
2025-10-30T18:18:35.150856374Z  	at org.springframework.beans.factory.support.AbstractAutowireCapableBeanFactory.doCreateBean(AbstractAutowireCapableBeanFactory.java:563) ~[spring-beans-6.1.1.jar!/:6.1.1]
2025-10-30T18:18:35.150860282Z  	at org.springframework.beans.factory.support.AbstractAutowireCapableBeanFactory.createBean(AbstractAutowireCapableBeanFactory.java:523) ~[spring-beans-6.1.1.jar!/:6.1.1]
2025-10-30T18:18:35.150864059Z  	at org.springframework.beans.factory.support.AbstractBeanFactory.lambda$doGetBean$0(AbstractBeanFactory.java:325) ~[spring-beans-6.1.1.jar!/:6.1.1]
2025-10-30T18:18:35.150867856Z  	at org.springframework.beans.factory.support.DefaultSingletonBeanRegistry.getSingleton(DefaultSingletonBeanRegistry.java:234) ~[spring-beans-6.1.1.jar!/:6.1.1]
2025-10-30T18:18:35.150871894Z  	at org.springframework.beans.factory.support.AbstractBeanFactory.doGetBean(AbstractBeanFactory.java:323) ~[spring-beans-6.1.1.jar!/:6.1.1]
2025-10-30T18:18:35.150881573Z  	at org.springframework.beans.factory.support.AbstractBeanFactory.getBean(AbstractBeanFactory.java:199) ~[spring-beans-6.1.1.jar!/:6.1.1]
2025-10-30T18:18:35.150885540Z  	at org.springframework.beans.factory.support.BeanDefinitionValueResolver.resolveReference(BeanDefinitionValueResolver.java:365) ~[spring-beans-6.1.1.jar!/:6.1.1]
2025-10-30T18:18:35.150889448Z  	... 109 common frames omitted
2025-10-30T18:18:35.150893747Z  Caused by: org.springframework.beans.factory.BeanCreationException: Error creating bean with name 'flywayInitializer' defined in class path resource [org/springframework/boot/autoconfigure/flyway/FlywayAutoConfiguration$FlywayConfiguration.class]: Migration V002__catalog.sql failed
2025-10-30T18:18:35.150898035Z  ----------------------------------
2025-10-30T18:18:35.150901772Z  SQL State  : 42P07
2025-10-30T18:18:35.150905319Z  Error Code : 0
2025-10-30T18:18:35.150908986Z  Message    : ERROR: relation "products" already exists
2025-10-30T18:18:35.150913304Z  Location   : db/migration/V002__catalog.sql (/home/site/wwwroot/nested:/home/site/wwwroot/app.jar/!BOOT-INF/classes/!/db/migration/V002__catalog.sql)
2025-10-30T18:18:35.150918344Z  Line       : 3
2025-10-30T18:18:35.150922292Z  Statement  : -- ========== Catalog Tables ==========
2025-10-30T18:18:35.150926600Z
2025-10-30T18:18:35.150930708Z  CREATE TABLE products (
2025-10-30T18:18:35.150935027Z    id            ulid PRIMARY KEY,
2025-10-30T18:18:35.150938914Z    vendor_id     ulid NOT NULL REFERENCES organizations(id) ON DELETE RESTRICT,
2025-10-30T18:18:35.150942771Z    sku           text NOT NULL,
2025-10-30T18:18:35.150946479Z    name          text NOT NULL,
2025-10-30T18:18:35.150950086Z    description   text,
2025-10-30T18:18:35.150953683Z    category      text,
2025-10-30T18:18:35.150956929Z    price_currency char(3) DEFAULT 'USD',
2025-10-30T18:18:35.150960296Z    -- optional reference price for browsing; quotes carry final prices
2025-10-30T18:18:35.150963952Z    reference_price numeric(18,4),
2025-10-30T18:18:35.150967429Z    media_urls    jsonb DEFAULT '[]'::jsonb, -- array of object-storage URLs/keys
2025-10-30T18:18:35.150971046Z    attributes    jsonb DEFAULT '{}'::jsonb, -- free-form facets
2025-10-30T18:18:35.150974693Z    is_active     boolean NOT NULL DEFAULT true,
2025-10-30T18:18:35.150978320Z    created_at    timestamptz NOT NULL DEFAULT now(),
2025-10-30T18:18:35.150982007Z    updated_at    timestamptz NOT NULL DEFAULT now()
2025-10-30T18:18:35.150985464Z  )
2025-10-30T18:18:35.150989011Z
2025-10-30T18:18:35.150992488Z  	at org.springframework.beans.factory.support.AbstractAutowireCapableBeanFactory.initializeBean(AbstractAutowireCapableBeanFactory.java:1775) ~[spring-beans-6.1.1.jar!/:6.1.1]
2025-10-30T18:18:35.150996446Z  	at org.springframework.beans.factory.support.AbstractAutowireCapableBeanFactory.doCreateBean(AbstractAutowireCapableBeanFactory.java:601) ~[spring-beans-6.1.1.jar!/:6.1.1]
2025-10-30T18:18:35.151006595Z  	at org.springframework.beans.factory.support.AbstractAutowireCapableBeanFactory.createBean(AbstractAutowireCapableBeanFactory.java:523) ~[spring-beans-6.1.1.jar!/:6.1.1]
2025-10-30T18:18:35.151010793Z  	at org.springframework.beans.factory.support.AbstractBeanFactory.lambda$doGetBean$0(AbstractBeanFactory.java:325) ~[spring-beans-6.1.1.jar!/:6.1.1]
2025-10-30T18:18:35.151015392Z  	at org.springframework.beans.factory.support.DefaultSingletonBeanRegistry.getSingleton(DefaultSingletonBeanRegistry.java:234) ~[spring-beans-6.1.1.jar!/:6.1.1]
2025-10-30T18:18:35.151019310Z  	at org.springframework.beans.factory.support.AbstractBeanFactory.doGetBean(AbstractBeanFactory.java:323) ~[spring-beans-6.1.1.jar!/:6.1.1]
2025-10-30T18:18:35.151023388Z  	at org.springframework.beans.factory.support.AbstractBeanFactory.getBean(AbstractBeanFactory.java:199) ~[spring-beans-6.1.1.jar!/:6.1.1]
2025-10-30T18:18:35.151027386Z  	at org.springframework.beans.factory.support.AbstractBeanFactory.doGetBean(AbstractBeanFactory.java:312) ~[spring-beans-6.1.1.jar!/:6.1.1]
2025-10-30T18:18:35.153503666Z  	at org.springframework.beans.factory.support.AbstractBeanFactory.getBean(AbstractBeanFactory.java:199) ~[spring-beans-6.1.1.jar!/:6.1.1]
2025-10-30T18:18:35.153516681Z  	at org.springframework.beans.factory.support.BeanDefinitionValueResolver.resolveReference(BeanDefinitionValueResolver.java:365) ~[spring-beans-6.1.1.jar!/:6.1.1]
2025-10-30T18:18:35.153521270Z  	... 121 common frames omitted
2025-10-30T18:18:35.153524987Z  Caused by: org.flywaydb.core.internal.command.DbMigrate$FlywayMigrateException: Migration V002__catalog.sql failed
2025-10-30T18:18:35.153528785Z  ----------------------------------
2025-10-30T18:18:35.153532171Z  SQL State  : 42P07
2025-10-30T18:18:35.153535848Z  Error Code : 0
2025-10-30T18:18:35.153539125Z  Message    : ERROR: relation "products" already exists
2025-10-30T18:18:35.153542792Z  Location   : db/migration/V002__catalog.sql (/home/site/wwwroot/nested:/home/site/wwwroot/app.jar/!BOOT-INF/classes/!/db/migration/V002__catalog.sql)
2025-10-30T18:18:35.153546629Z  Line       : 3
2025-10-30T18:18:35.153549996Z  Statement  : -- ========== Catalog Tables ==========
2025-10-30T18:18:35.153553563Z
2025-10-30T18:18:35.153557120Z  CREATE TABLE products (
2025-10-30T18:18:35.153560847Z    id            ulid PRIMARY KEY,
2025-10-30T18:18:35.153564444Z    vendor_id     ulid NOT NULL REFERENCES organizations(id) ON DELETE RESTRICT,
2025-10-30T18:18:35.153568301Z    sku           text NOT NULL,
2025-10-30T18:18:35.153571688Z    name          text NOT NULL,
2025-10-30T18:18:35.153575164Z    description   text,
2025-10-30T18:18:35.153578461Z    category      text,
2025-10-30T18:18:35.153581767Z    price_currency char(3) DEFAULT 'USD',
2025-10-30T18:18:35.153585054Z    -- optional reference price for browsing; quotes carry final prices
2025-10-30T18:18:35.153600654Z    reference_price numeric(18,4),
2025-10-30T18:18:35.153604291Z    media_urls    jsonb DEFAULT '[]'::jsonb, -- array of object-storage URLs/keys
2025-10-30T18:18:35.153607798Z    attributes    jsonb DEFAULT '{}'::jsonb, -- free-form facets
2025-10-30T18:18:35.153611515Z    is_active     boolean NOT NULL DEFAULT true,
2025-10-30T18:18:35.153615162Z    created_at    timestamptz NOT NULL DEFAULT now(),
2025-10-30T18:18:35.153618819Z    updated_at    timestamptz NOT NULL DEFAULT now()
2025-10-30T18:18:35.153622376Z  )
2025-10-30T18:18:35.153625913Z
2025-10-30T18:18:35.153631514Z  	at org.flywaydb.core.internal.command.DbMigrate.doMigrateGroup(DbMigrate.java:382) ~[flyway-core-9.22.3.jar!/:na]
2025-10-30T18:18:35.153635572Z  	at org.flywaydb.core.internal.command.DbMigrate.lambda$applyMigrations$1(DbMigrate.java:272) ~[flyway-core-9.22.3.jar!/:na]
2025-10-30T18:18:35.153639569Z  	at org.flywaydb.core.internal.jdbc.TransactionalExecutionTemplate.execute(TransactionalExecutionTemplate.java:55) ~[flyway-core-9.22.3.jar!/:na]
2025-10-30T18:18:35.153643367Z  	at org.flywaydb.core.internal.command.DbMigrate.applyMigrations(DbMigrate.java:271) ~[flyway-core-9.22.3.jar!/:na]
2025-10-30T18:18:35.153647184Z  	at org.flywaydb.core.internal.command.DbMigrate.migrateGroup(DbMigrate.java:244) ~[flyway-core-9.22.3.jar!/:na]
2025-10-30T18:18:35.153650681Z  	at org.flywaydb.core.internal.command.DbMigrate.lambda$migrateAll$0(DbMigrate.java:139) ~[flyway-core-9.22.3.jar!/:na]
2025-10-30T18:18:35.153654609Z  	at org.flywaydb.core.internal.database.postgresql.PostgreSQLAdvisoryLockTemplate.execute(PostgreSQLAdvisoryLockTemplate.java:73) ~[flyway-core-9.22.3.jar!/:na]
2025-10-30T18:18:35.153658546Z  	at org.flywaydb.core.internal.database.postgresql.PostgreSQLAdvisoryLockTemplate.lambda$execute$0(PostgreSQLAdvisoryLockTemplate.java:56) ~[flyway-core-9.22.3.jar!/:na]
2025-10-30T18:18:35.153662273Z  	at org.flywaydb.core.internal.jdbc.TransactionalExecutionTemplate.execute(TransactionalExecutionTemplate.java:55) ~[flyway-core-9.22.3.jar!/:na]
2025-10-30T18:18:35.153666131Z  	at org.flywaydb.core.internal.database.postgresql.PostgreSQLAdvisoryLockTemplate.execute(PostgreSQLAdvisoryLockTemplate.java:56) ~[flyway-core-9.22.3.jar!/:na]
2025-10-30T18:18:35.153670168Z  	at org.flywaydb.core.internal.database.postgresql.PostgreSQLConnection.lock(PostgreSQLConnection.java:96) ~[flyway-core-9.22.3.jar!/:na]
2025-10-30T18:18:35.153754943Z  	at org.flywaydb.core.internal.schemahistory.JdbcTableSchemaHistory.lock(JdbcTableSchemaHistory.java:144) ~[flyway-core-9.22.3.jar!/:na]
2025-10-30T18:18:35.153765483Z  	at org.flywaydb.core.internal.command.DbMigrate.migrateAll(DbMigrate.java:139) ~[flyway-core-9.22.3.jar!/:na]
2025-10-30T18:18:35.153769571Z  	at org.flywaydb.core.internal.command.DbMigrate.migrate(DbMigrate.java:97) ~[flyway-core-9.22.3.jar!/:na]
2025-10-30T18:18:35.153773168Z  	at org.flywaydb.core.Flyway.lambda$migrate$0(Flyway.java:188) ~[flyway-core-9.22.3.jar!/:na]
2025-10-30T18:18:35.153776845Z  	at org.flywaydb.core.FlywayExecutor.execute(FlywayExecutor.java:213) ~[flyway-core-9.22.3.jar!/:na]
2025-10-30T18:18:35.153786514Z  	at org.flywaydb.core.Flyway.migrate(Flyway.java:140) ~[flyway-core-9.22.3.jar!/:na]
2025-10-30T18:18:35.153790993Z  	at org.springframework.boot.autoconfigure.flyway.FlywayMigrationInitializer.afterPropertiesSet(FlywayMigrationInitializer.java:66) ~[spring-boot-autoconfigure-3.2.0.jar!/:3.2.0]
2025-10-30T18:18:35.153794990Z  	at org.springframework.beans.factory.support.AbstractAutowireCapableBeanFactory.invokeInitMethods(AbstractAutowireCapableBeanFactory.java:1822) ~[spring-beans-6.1.1.jar!/:6.1.1]
2025-10-30T18:18:35.153799018Z  	at org.springframework.beans.factory.support.AbstractAutowireCapableBeanFactory.initializeBean(AbstractAutowireCapableBeanFactory.java:1771) ~[spring-beans-6.1.1.jar!/:6.1.1]
2025-10-30T18:18:35.153803357Z  	... 130 common frames omitted
2025-10-30T18:18:35.153807474Z  Caused by: org.flywaydb.core.internal.sqlscript.FlywaySqlScriptException: Migration V002__catalog.sql failed
2025-10-30T18:18:35.153811853Z  ----------------------------------
2025-10-30T18:18:35.153815330Z  SQL State  : 42P07
2025-10-30T18:18:35.153818646Z  Error Code : 0
2025-10-30T18:18:35.153822013Z  Message    : ERROR: relation "products" already exists
2025-10-30T18:18:35.153825520Z  Location   : db/migration/V002__catalog.sql (/home/site/wwwroot/nested:/home/site/wwwroot/app.jar/!BOOT-INF/classes/!/db/migration/V002__catalog.sql)
2025-10-30T18:18:35.153829136Z  Line       : 3
2025-10-30T18:18:35.153832734Z  Statement  : -- ========== Catalog Tables ==========
2025-10-30T18:18:35.153836180Z
2025-10-30T18:18:35.153839677Z  CREATE TABLE products (
2025-10-30T18:18:35.153843314Z    id            ulid PRIMARY KEY,
2025-10-30T18:18:35.153846921Z    vendor_id     ulid NOT NULL REFERENCES organizations(id) ON DELETE RESTRICT,
2025-10-30T18:18:35.153850879Z    sku           text NOT NULL,
2025-10-30T18:18:35.153854546Z    name          text NOT NULL,
2025-10-30T18:18:35.153857882Z    description   text,
2025-10-30T18:18:35.153861670Z    category      text,
2025-10-30T18:18:35.153865217Z    price_currency char(3) DEFAULT 'USD',
2025-10-30T18:18:35.153868753Z    -- optional reference price for browsing; quotes carry final prices
2025-10-30T18:18:35.153872571Z    reference_price numeric(18,4),
2025-10-30T18:18:35.153876238Z    media_urls    jsonb DEFAULT '[]'::jsonb, -- array of object-storage URLs/keys
2025-10-30T18:18:35.153879995Z    attributes    jsonb DEFAULT '{}'::jsonb, -- free-form facets
2025-10-30T18:18:35.153886528Z    is_active     boolean NOT NULL DEFAULT true,
2025-10-30T18:18:35.153890255Z    created_at    timestamptz NOT NULL DEFAULT now(),
2025-10-30T18:18:35.153893822Z    updated_at    timestamptz NOT NULL DEFAULT now()
2025-10-30T18:18:35.153897539Z  )
2025-10-30T18:18:35.153901056Z
2025-10-30T18:18:35.153904563Z  	at org.flywaydb.core.internal.sqlscript.DefaultSqlScriptExecutor.handleException(DefaultSqlScriptExecutor.java:267) ~[flyway-core-9.22.3.jar!/:na]
2025-10-30T18:18:35.153914532Z  	at org.flywaydb.core.internal.sqlscript.DefaultSqlScriptExecutor.executeStatement(DefaultSqlScriptExecutor.java:222) ~[flyway-core-9.22.3.jar!/:na]
2025-10-30T18:18:35.153920153Z  	at org.flywaydb.core.internal.sqlscript.DefaultSqlScriptExecutor.execute(DefaultSqlScriptExecutor.java:126) ~[flyway-core-9.22.3.jar!/:na]
2025-10-30T18:18:35.153924301Z  	at org.flywaydb.core.internal.resolver.sql.SqlMigrationExecutor.executeOnce(SqlMigrationExecutor.java:68) ~[flyway-core-9.22.3.jar!/:na]
2025-10-30T18:18:35.153928299Z  	at org.flywaydb.core.internal.resolver.sql.SqlMigrationExecutor.lambda$execute$0(SqlMigrationExecutor.java:57) ~[flyway-core-9.22.3.jar!/:na]
2025-10-30T18:18:35.153932276Z  	at org.flywaydb.core.internal.database.DefaultExecutionStrategy.execute(DefaultExecutionStrategy.java:27) ~[flyway-core-9.22.3.jar!/:na]
2025-10-30T18:18:35.153936415Z  	at org.flywaydb.core.internal.resolver.sql.SqlMigrationExecutor.execute(SqlMigrationExecutor.java:56) ~[flyway-core-9.22.3.jar!/:na]
2025-10-30T18:18:35.153940362Z  	at org.flywaydb.core.internal.command.DbMigrate.doMigrateGroup(DbMigrate.java:374) ~[flyway-core-9.22.3.jar!/:na]
2025-10-30T18:18:35.153944059Z  	... 149 common frames omitted
2025-10-30T18:18:35.153947726Z  Caused by: org.postgresql.util.PSQLException: ERROR: relation "products" already exists
2025-10-30T18:18:35.153951514Z  	at org.postgresql.core.v3.QueryExecutorImpl.receiveErrorResponse(QueryExecutorImpl.java:2713) ~[postgresql-42.6.0.jar!/:42.6.0]
2025-10-30T18:18:35.153955561Z  	at org.postgresql.core.v3.QueryExecutorImpl.processResults(QueryExecutorImpl.java:2401) ~[postgresql-42.6.0.jar!/:42.6.0]
2025-10-30T18:18:35.153959419Z  	at org.postgresql.core.v3.QueryExecutorImpl.execute(QueryExecutorImpl.java:368) ~[postgresql-42.6.0.jar!/:42.6.0]
2025-10-30T18:18:35.153963287Z  	at org.postgresql.jdbc.PgStatement.executeInternal(PgStatement.java:498) ~[postgresql-42.6.0.jar!/:42.6.0]
2025-10-30T18:18:35.153966984Z  	at org.postgresql.jdbc.PgStatement.execute(PgStatement.java:415) ~[postgresql-42.6.0.jar!/:42.6.0]
2025-10-30T18:18:35.153970671Z  	at org.postgresql.jdbc.PgStatement.executeWithFlags(PgStatement.java:335) ~[postgresql-42.6.0.jar!/:42.6.0]
2025-10-30T18:18:35.153974488Z  	at org.postgresql.jdbc.PgStatement.executeCachedSql(PgStatement.java:321) ~[postgresql-42.6.0.jar!/:42.6.0]
2025-10-30T18:18:35.153978366Z  	at org.postgresql.jdbc.PgStatement.executeWithFlags(PgStatement.java:297) ~[postgresql-42.6.0.jar!/:42.6.0]
2025-10-30T18:18:35.153982273Z  	at org.postgresql.jdbc.PgStatement.execute(PgStatement.java:292) ~[postgresql-42.6.0.jar!/:42.6.0]
2025-10-30T18:18:35.153986221Z  	at com.zaxxer.hikari.pool.ProxyStatement.execute(ProxyStatement.java:94) ~[HikariCP-5.0.1.jar!/:na]
2025-10-30T18:18:35.153990459Z  	at com.zaxxer.hikari.pool.HikariProxyStatement.execute(HikariProxyStatement.java) ~[HikariCP-5.0.1.jar!/:na]
2025-10-30T18:18:35.153994296Z  	at org.flywaydb.core.internal.jdbc.JdbcTemplate.executeStatement(JdbcTemplate.java:201) ~[flyway-core-9.22.3.jar!/:na]
2025-10-30T18:18:35.154003204Z  	at org.flywaydb.core.internal.sqlscript.ParsedSqlStatement.execute(ParsedSqlStatement.java:95) ~[flyway-core-9.22.3.jar!/:na]
2025-10-30T18:18:35.154007172Z  	at org.flywaydb.core.internal.sqlscript.DefaultSqlScriptExecutor.executeStatement(DefaultSqlScriptExecutor.java:210) ~[flyway-core-9.22.3.jar!/:na]
2025-10-30T18:18:35.154011089Z  	... 155 common frames omitted
2025-10-30T18:18:35.154014626Z
2025-10-30T18:18:35.223852552Z  Wait for pid == 83 either returned successfully or was interrupted due to a signal 83
2025-10-30T18:18:35.225121401Z  Done waiting for main process. GLOBAL_PID_MAIN=83.
2025-10-30T18:18:35.225132101Z  Exiting entry script!