# Action Logs

## 2025-10-16
- Failure: Spring Security filter chain misconfiguration prevented the backend from starting.
- Fix: Prioritized the `/api/test/**` filter chain via `@Order(1)` and set the default chain to `Ordered.LOWEST_PRECEDENCE` in `SecurityConfig`.

```text
2025-10-16T08:39:04.070180621Z
2025-10-16T08:39:04.079075152Z    .   ____          _            __ _ _
2025-10-16T08:39:04.079104166Z   /\\ / ___'_ __ _ _(_)_ __  __ _ \ \ \ \
2025-10-16T08:39:04.079109066Z  ( ( )\___ | '_ | '_| | '_ \/ _` | \ \ \ \
2025-10-16T08:39:04.079131698Z   \\/  ___)| |_)| | | | | || (_| |  ) ) ) )
2025-10-16T08:39:04.079135726Z    '  |____| .__|_| |_|_| |_\__, | / / / /
2025-10-16T08:39:04.079139523Z   =========|_|==============|___/=/_/_/_/
2025-10-16T08:39:04.079143070Z
2025-10-16T08:39:04.079146526Z   :: Spring Boot ::                (v3.4.0)
2025-10-16T08:39:04.079150694Z
2025-10-16T08:39:04.846307219Z  2025-10-16T08:39:04.841Z  INFO 84 --- [p4-backend] [           main] com.p4.backend.P4BackendApplication      : Starting P4BackendApplication v0.0.1-SNAPSHOT using Java 21.0.7 with PID 84 (/home/site/wwwroot/app.jar started by root in /home/site/wwwroot)
2025-10-16T08:39:04.897232261Z  2025-10-16T08:39:04.885Z  INFO 84 --- [p4-backend] [           main] com.p4.backend.P4BackendApplication      : The following 1 profile is active: "prod"
2025-10-16T08:39:18.069348217Z  2025-10-16T08:39:18.068Z  INFO 84 --- [p4-backend] [           main] .s.d.r.c.RepositoryConfigurationDelegate : Bootstrapping Spring Data JPA repositories in DEFAULT mode.
2025-10-16T08:39:18.283813900Z  2025-10-16T08:39:18.282Z  INFO 84 --- [p4-backend] [           main] .s.d.r.c.RepositoryConfigurationDelegate : Finished Spring Data repository scanning in 91 ms. Found 0 JPA repository interfaces.
2025-10-16T08:39:24.317064048Z  2025-10-16T08:39:24.316Z  INFO 84 --- [p4-backend] [           main] o.s.b.w.embedded.tomcat.TomcatWebServer  : Tomcat initialized with port 80 (http)
2025-10-16T08:39:24.635271191Z  2025-10-16T08:39:24.634Z  INFO 84 --- [p4-backend] [           main] w.s.c.ServletWebServerApplicationContext : Root WebApplicationContext: initialization completed in 19065 ms
2025-10-16T08:39:24.642405044Z  Standard Commons Logging discovery in action with spring-jcl: please remove commons-logging.jar from classpath in order to avoid potential conflicts
2025-10-16T08:39:27.493610313Z  2025-10-16T08:39:27.488Z  INFO 84 --- [p4-backend] [           main] com.zaxxer.hikari.HikariDataSource       : P4HikariCP - Starting...
2025-10-16T08:39:29.325194223Z  2025-10-16T08:39:29.323Z  INFO 84 --- [p4-backend] [           main] com.zaxxer.hikari.pool.HikariPool        : P4HikariCP - Added connection org.postgresql.jdbc.PgConnection@54f25b42
2025-10-16T08:39:29.330810268Z  2025-10-16T08:39:29.330Z  INFO 84 --- [p4-backend] [           main] com.zaxxer.hikari.HikariDataSource       : P4HikariCP - Start completed.
2025-10-16T08:39:29.490060197Z  2025-10-16T08:39:29.489Z  INFO 84 --- [p4-backend] [           main] org.flywaydb.core.FlywayExecutor         : Database: jdbc:postgresql://ep-damp-feather-adc322wz-pooler.c-2.us-east-1.aws.neon.tech/neondb?user=neondb_owner&password=********&sslmode=require&channelBinding=require (PostgreSQL 17.5)
2025-10-16T08:39:30.233959257Z  2025-10-16T08:39:30.228Z  INFO 84 --- [p4-backend] [           main] o.f.core.internal.command.DbValidate     : Successfully validated 2 migrations (execution time 00:00.364s)
2025-10-16T08:39:30.627698607Z  2025-10-16T08:39:30.626Z  INFO 84 --- [p4-backend] [           main] o.f.core.internal.command.DbMigrate      : Current version of schema "public": 2
2025-10-16T08:39:30.671720032Z  2025-10-16T08:39:30.669Z  INFO 84 --- [p4-backend] [           main] o.f.core.internal.command.DbMigrate      : Schema "public" is up to date. No migration necessary.
2025-10-16T08:39:31.353477468Z  2025-10-16T08:39:31.350Z  INFO 84 --- [p4-backend] [           main] o.hibernate.jpa.internal.util.LogHelper  : HHH000204: Processing PersistenceUnitInfo [name: default]
2025-10-16T08:39:31.840910730Z  2025-10-16T08:39:31.839Z  INFO 84 --- [p4-backend] [           main] org.hibernate.Version                    : HHH000412: Hibernate ORM core version 6.6.2.Final
2025-10-16T08:39:32.006751164Z  2025-10-16T08:39:32.005Z  INFO 84 --- [p4-backend] [           main] o.h.c.internal.RegionFactoryInitiator    : HHH000026: Second-level cache disabled
2025-10-16T08:39:33.632168598Z  2025-10-16T08:39:33.631Z  INFO 84 --- [p4-backend] [           main] o.s.o.j.p.SpringPersistenceUnitInfo      : No LoadTimeWeaver setup: ignoring JPA class transformer
2025-10-16T08:39:33.926499435Z  2025-10-16T08:39:33.925Z  WARN 84 --- [p4-backend] [           main] org.hibernate.orm.deprecation            : HHH90000025: PostgreSQLDialect does not need to be specified explicitly using 'hibernate.dialect' (remove the property setting and it will be selected by default)
2025-10-16T08:39:34.037387045Z  2025-10-16T08:39:34.027Z  INFO 84 --- [p4-backend] [           main] org.hibernate.orm.connections.pooling    : HHH10001005: Database info:
2025-10-16T08:39:34.037971194Z  	Database JDBC URL [Connecting through datasource 'HikariDataSource (P4HikariCP)']
2025-10-16T08:39:34.039244239Z  	Database driver: undefined/unknown
2025-10-16T08:39:34.039254769Z  	Database version: 17.5
2025-10-16T08:39:34.039259307Z  	Autocommit mode: undefined/unknown
2025-10-16T08:39:34.039262954Z  	Isolation level: undefined/unknown
2025-10-16T08:39:34.039266661Z  	Minimum pool size: undefined/unknown
2025-10-16T08:39:34.044612930Z  	Maximum pool size: undefined/unknown
2025-10-16T08:39:35.684964810Z  2025-10-16T08:39:35.684Z  INFO 84 --- [p4-backend] [           main] o.h.e.t.j.p.i.JtaPlatformInitiator       : HHH000489: No JTA platform available (set 'hibernate.transaction.jta.platform' to enable JTA platform integration)
2025-10-16T08:39:35.704113657Z  2025-10-16T08:39:35.703Z  INFO 84 --- [p4-backend] [           main] j.LocalContainerEntityManagerFactoryBean : Initialized JPA EntityManagerFactory for persistence unit 'default'
2025-10-16T08:39:37.147622528Z  2025-10-16T08:39:37.144Z  WARN 84 --- [p4-backend] [           main] JpaBaseConfiguration$JpaWebConfiguration : spring.jpa.open-in-view is enabled by default. Therefore, database queries may be performed during view rendering. Explicitly configure spring.jpa.open-in-view to disable this warning
2025-10-16T08:39:37.477420168Z  2025-10-16T08:39:37.476Z  INFO 84 --- [p4-backend] [           main] r$InitializeUserDetailsManagerConfigurer : Global AuthenticationManager configured with UserDetailsService bean with name userDetailsService
2025-10-16T08:39:38.919888807Z  2025-10-16T08:39:38.916Z  INFO 84 --- [p4-backend] [           main] o.s.b.a.e.web.EndpointLinksResolver      : Exposing 3 endpoints beneath base path '/actuator'
2025-10-16T08:39:39.354060311Z  2025-10-16T08:39:39.353Z  WARN 84 --- [p4-backend] [           main] ConfigServletWebServerApplicationContext : Exception encountered during context initialization - cancelling refresh attempt: org.springframework.beans.factory.BeanCreationException: Error creating bean with name 'springSecurityFilterChain': Cannot create inner bean '(inner bean)#7bb50747' while setting constructor argument with key [1]
2025-10-16T08:39:39.356455809Z  2025-10-16T08:39:39.356Z  INFO 84 --- [p4-backend] [           main] j.LocalContainerEntityManagerFactoryBean : Closing JPA EntityManagerFactory for persistence unit 'default'
2025-10-16T08:39:39.387752651Z  2025-10-16T08:39:39.385Z  INFO 84 --- [p4-backend] [           main] com.zaxxer.hikari.HikariDataSource       : P4HikariCP - Shutdown initiated...
2025-10-16T08:39:39.533746446Z  2025-10-16T08:39:39.525Z  INFO 84 --- [p4-backend] [           main] com.zaxxer.hikari.HikariDataSource       : P4HikariCP - Shutdown completed.
2025-10-16T08:39:39.891329702Z  2025-10-16T08:39:39.890Z  INFO 84 --- [p4-backend] [           main] .s.b.a.l.ConditionEvaluationReportLogger :
2025-10-16T08:39:39.891413852Z
2025-10-16T08:39:39.891421687Z  Error starting ApplicationContext. To display the condition evaluation report re-run your application with 'debug' enabled.
2025-10-16T08:39:40.160001154Z  2025-10-16T08:39:40.121Z ERROR 84 --- [p4-backend] [           main] o.s.boot.SpringApplication               : Application run failed
2025-10-16T08:39:40.160046921Z
2025-10-16T08:39:40.160054325Z  org.springframework.beans.factory.BeanCreationException: Error creating bean with name 'springSecurityFilterChain': Cannot create inner bean '(inner bean)#7bb50747' while setting constructor argument with key [1]
2025-10-16T08:39:40.160061719Z  	at org.springframework.beans.factory.support.BeanDefinitionValueResolver.resolveInnerBeanValue(BeanDefinitionValueResolver.java:421) ~[spring-beans-6.2.0.jar!/:6.2.0]
2025-10-16T08:39:40.160067740Z  	at org.springframework.beans.factory.support.BeanDefinitionValueResolver.lambda$resolveValueIfNecessary$1(BeanDefinitionValueResolver.java:153) ~[spring-beans-6.2.0.jar!/:6.2.0]
2025-10-16T08:39:40.160073181Z  	at org.springframework.beans.factory.support.BeanDefinitionValueResolver.resolveInnerBean(BeanDefinitionValueResolver.java:262) ~[spring-beans-6.2.0.jar!/:6.2.0]
2025-10-16T08:39:40.160079182Z  	at org.springframework.beans.factory.support.BeanDefinitionValueResolver.resolveValueIfNecessary(BeanDefinitionValueResolver.java:152) ~[spring-beans-6.2.0.jar!/:6.2.0]
2025-10-16T08:39:40.160084702Z  	at org.springframework.beans.factory.support.BeanDefinitionValueResolver.resolveManagedList(BeanDefinitionValueResolver.java:460) ~[spring-beans-6.2.0.jar!/:6.2.0]
2025-10-16T08:39:40.160091475Z  	at org.springframework.beans.factory.support.BeanDefinitionValueResolver.resolveValueIfNecessary(BeanDefinitionValueResolver.java:191) ~[spring-beans-6.2.0.jar!/:6.2.0]
2025-10-16T08:39:40.160097507Z  	at org.springframework.beans.factory.support.ConstructorResolver.resolveConstructorArguments(ConstructorResolver.java:691) ~[spring-beans-6.2.0.jar!/:6.2.0]
2025-10-16T08:39:40.160102687Z  	at org.springframework.beans.factory.support.ConstructorResolver.autowireConstructor(ConstructorResolver.java:206) ~[spring-beans-6.2.0.jar!/:6.2.0]
2025-10-16T08:39:40.160107887Z  	at org.springframework.beans.factory.support.AbstractAutowireCapableBeanFactory.autowireConstructor(AbstractAutowireCapableBeanFactory.java:1371) ~[spring-beans-6.2.0.jar!/:6.2.0]
2025-10-16T08:39:40.160115591Z  	at org.springframework.beans.factory.support.AbstractAutowireCapableBeanFactory.createBeanInstance(AbstractAutowireCapableBeanFactory.java:1208) ~[spring-beans-6.2.0.jar!/:6.2.0]
2025-10-16T08:39:40.160143645Z  	at org.springframework.beans.factory.support.AbstractAutowireCapableBeanFactory.doCreateBean(AbstractAutowireCapableBeanFactory.java:563) ~[spring-beans-6.2.0.jar!/:6.2.0]
2025-10-16T08:39:40.160148634Z  	at org.springframework.beans.factory.support.AbstractAutowireCapableBeanFactory.createBean(AbstractAutowireCapableBeanFactory.java:523) ~[spring-beans-6.2.0.jar!/:6.2.0]
2025-10-16T08:39:40.160152952Z  	at org.springframework.beans.factory.support.AbstractBeanFactory.lambda$doGetBean$0(AbstractBeanFactory.java:336) ~[spring-beans-6.2.0.jar!/:6.2.0]
2025-10-16T08:39:40.160157691Z  	at org.springframework.beans.factory.support.DefaultSingletonBeanRegistry.getSingleton(DefaultSingletonBeanRegistry.java:288) ~[spring-beans-6.2.0.jar!/:6.2.0]
2025-10-16T08:39:40.160161749Z  	at org.springframework.beans.factory.support.AbstractBeanFactory.doGetBean(AbstractBeanFactory.java:334) ~[spring-beans-6.2.0.jar!/:6.2.0]
2025-10-16T08:39:40.160165917Z  	at org.springframework.beans.factory.support.AbstractBeanFactory.getBean(AbstractBeanFactory.java:199) ~[spring-beans-6.2.0.jar!/:6.2.0]
2025-10-16T08:39:40.160169784Z  	at org.springframework.beans.factory.support.AbstractBeanFactory.doGetBean(AbstractBeanFactory.java:312) ~[spring-beans-6.2.0.jar!/:6.2.0]
2025-10-16T08:39:40.160173662Z  	at org.springframework.beans.factory.support.AbstractBeanFactory.getBean(AbstractBeanFactory.java:199) ~[spring-beans-6.2.0.jar!/:6.2.0]
2025-10-16T08:39:40.160177830Z  	at org.springframework.beans.factory.support.DefaultListableBeanFactory.instantiateSingleton(DefaultListableBeanFactory.java:1122) ~[spring-beans-6.2.0.jar!/:6.2.0]
2025-10-16T08:39:40.160182258Z  	at org.springframework.beans.factory.support.DefaultListableBeanFactory.preInstantiateSingleton(DefaultListableBeanFactory.java:1093) ~[spring-beans-6.2.0.jar!/:6.2.0]
2025-10-16T08:39:40.160186275Z  	at org.springframework.beans.factory.support.DefaultListableBeanFactory.preInstantiateSingletons(DefaultListableBeanFactory.java:1030) ~[spring-beans-6.2.0.jar!/:6.2.0]
2025-10-16T08:39:40.160190213Z  	at org.springframework.context.support.AbstractApplicationContext.finishBeanFactoryInitialization(AbstractApplicationContext.java:987) ~[spring-context-6.2.0.jar!/:6.2.0]
2025-10-16T08:39:40.160194190Z  	at org.springframework.context.support.AbstractApplicationContext.refresh(AbstractApplicationContext.java:627) ~[spring-context-6.2.0.jar!/:6.2.0]
2025-10-16T08:39:40.160198078Z  	at org.springframework.boot.web.servlet.context.ServletWebServerApplicationContext.refresh(ServletWebServerApplicationContext.java:146) ~[spring-boot-3.4.0.jar!/:3.4.0]
2025-10-16T08:39:40.160201885Z  	at org.springframework.boot.SpringApplication.refresh(SpringApplication.java:752) ~[spring-boot-3.4.0.jar!/:3.4.0]
2025-10-16T08:39:40.160205732Z  	at org.springframework.boot.SpringApplication.refreshContext(SpringApplication.java:439) ~[spring-boot-3.4.0.jar!/:3.4.0]
2025-10-16T08:39:40.160209630Z  	at org.springframework.boot.SpringApplication.run(SpringApplication.java:318) ~[spring-boot-3.4.0.jar!/:3.4.0]
2025-10-16T08:39:40.160213317Z  	at org.springframework.boot.SpringApplication.run(SpringApplication.java:1361) ~[spring-boot-3.4.0.jar!/:3.4.0]
2025-10-16T08:39:40.160216934Z  	at org.springframework.boot.SpringApplication.run(SpringApplication.java:1350) ~[spring-boot-3.4.0.jar!/:3.4.0]
2025-10-16T08:39:40.160227504Z  	at com.p4.backend.P4BackendApplication.main(P4BackendApplication.java:15) ~[!/:0.0.1-SNAPSHOT]
2025-10-16T08:39:40.160232073Z  	at java.base/jdk.internal.reflect.DirectMethodHandleAccessor.invoke(DirectMethodHandleAccessor.java:103) ~[na:na]
2025-10-16T08:39:40.160236511Z  	at java.base/java.lang.reflect.Method.invoke(Method.java:580) ~[na:na]
2025-10-16T08:39:40.160241099Z  	at org.springframework.boot.loader.launch.Launcher.launch(Launcher.java:102) ~[app.jar:0.0.1-SNAPSHOT]
2025-10-16T08:39:40.160245538Z  	at org.springframework.boot.loader.launch.Launcher.launch(Launcher.java:64) ~[app.jar:0.0.1-SNAPSHOT]
2025-10-16T08:39:40.160249355Z  	at org.springframework.boot.loader.launch.JarLauncher.main(JarLauncher.java:40) ~[app.jar:0.0.1-SNAPSHOT]
2025-10-16T08:39:40.160254926Z  Caused by: org.springframework.beans.factory.BeanCreationException: Error creating bean with name '(inner bean)#7bb50747' defined in class path resource [org/springframework/security/config/annotation/web/configuration/WebSecurityConfiguration.class]: Failed to instantiate [jakarta.servlet.Filter]: Factory method 'springSecurityFilterChain' threw exception with message: A filter chain that matches any request [DefaultSecurityFilterChain defined as 'filterChain' in [class path resource [com/p4/backend/config/security/SecurityConfig.class]] matching [any request] and having filters [DisableEncodeUrl, WebAsyncManagerIntegration, SecurityContextHolder, HeaderWriter, Logout, BasicAuthentication, RequestCacheAware, SecurityContextHolderAwareRequest, AnonymousAuthentication, ExceptionTranslation, Authorization]] has already been configured, which means that this filter chain [DefaultSecurityFilterChain defined as 'testEndpointsFilterChain' in [class path resource [com/p4/backend/config/security/TestEndpointsSecurityConfig.class]] matching [Or [Mvc [pattern='/api/test/**']]] and having filters [DisableEncodeUrl, WebAsyncManagerIntegration, SecurityContextHolder, HeaderWriter, Logout, RequestCacheAware, SecurityContextHolderAwareRequest, AnonymousAuthentication, ExceptionTranslation, Authorization]] will never get invoked. Please use `HttpSecurity#securityMatcher` to ensure that there is only one filter chain configured for 'any request' and that the 'any request' filter chain is published last.
2025-10-16T08:39:40.160262891Z  	at org.springframework.beans.factory.support.ConstructorResolver.instantiate(ConstructorResolver.java:657) ~[spring-beans-6.2.0.jar!/:6.2.0]
2025-10-16T08:39:40.160266768Z  	at org.springframework.beans.factory.support.ConstructorResolver.instantiateUsingFactoryMethod(ConstructorResolver.java:489) ~[spring-beans-6.2.0.jar!/:6.2.0]
2025-10-16T08:39:40.160270445Z  	at org.springframework.beans.factory.support.AbstractAutowireCapableBeanFactory.instantiateUsingFactoryMethod(AbstractAutowireCapableBeanFactory.java:1351) ~[spring-beans-6.2.0.jar!/:6.2.0]
2025-10-16T08:39:40.160274202Z  	at org.springframework.beans.factory.support.AbstractAutowireCapableBeanFactory.createBeanInstance(AbstractAutowireCapableBeanFactory.java:1181) ~[spring-beans-6.2.0.jar!/:6.2.0]
2025-10-16T08:39:40.160277779Z  	at org.springframework.beans.factory.support.AbstractAutowireCapableBeanFactory.doCreateBean(AbstractAutowireCapableBeanFactory.java:563) ~[spring-beans-6.2.0.jar!/:6.2.0]
2025-10-16T08:39:40.160281787Z  	at org.springframework.beans.factory.support.AbstractAutowireCapableBeanFactory.createBean(AbstractAutowireCapableBeanFactory.java:523) ~[spring-beans-6.2.0.jar!/:6.2.0]
2025-10-16T08:39:40.160290674Z  	at org.springframework.beans.factory.support.BeanDefinitionValueResolver.resolveInnerBeanValue(BeanDefinitionValueResolver.java:407) ~[spring-beans-6.2.0.jar!/:6.2.0]
2025-10-16T08:39:40.160294812Z  	... 34 common frames omitted
2025-10-16T08:39:40.160298398Z  Caused by: org.springframework.beans.BeanInstantiationException: Failed to instantiate [jakarta.servlet.Filter]: Factory method 'springSecurityFilterChain' threw exception with message: A filter chain that matches any request [DefaultSecurityFilterChain defined as 'filterChain' in [class path resource [com/p4/backend/config/security/SecurityConfig.class]] matching [any request] and having filters [DisableEncodeUrl, WebAsyncManagerIntegration, SecurityContextHolder, HeaderWriter, Logout, BasicAuthentication, RequestCacheAware, SecurityContextHolderAwareRequest, AnonymousAuthentication, ExceptionTranslation, Authorization]] has already been configured, which means that this filter chain [DefaultSecurityFilterChain defined as 'testEndpointsFilterChain' in [class path resource [com/p4/backend/config/security/TestEndpointsSecurityConfig.class]] matching [Or [Mvc [pattern='/api/test/**']]] and having filters [DisableEncodeUrl, WebAsyncManagerIntegration, SecurityContextHolder, HeaderWriter, Logout, RequestCacheAware, SecurityContextHolderAwareRequest, AnonymousAuthentication, ExceptionTranslation, Authorization]] will never get invoked. Please use `HttpSecurity#securityMatcher` to ensure that there is only one filter chain configured for 'any request' and that the 'any request' filter chain is published last.
2025-10-16T08:39:40.160481195Z  	at org.springframework.beans.factory.support.SimpleInstantiationStrategy.lambda$instantiate$0(SimpleInstantiationStrategy.java:199) ~[spring-beans-6.2.0.jar!/:6.2.0]
2025-10-16T08:39:40.160487607Z  	at org.springframework.beans.factory.support.SimpleInstantiationStrategy.instantiateWithFactoryMethod(SimpleInstantiationStrategy.java:88) ~[spring-beans-6.2.0.jar!/:6.2.0]
2025-10-16T08:39:40.160491705Z  	at org.springframework.beans.factory.support.SimpleInstantiationStrategy.instantiate(SimpleInstantiationStrategy.java:168) ~[spring-beans-6.2.0.jar!/:6.2.0]
2025-10-16T08:39:40.160495863Z  	at org.springframework.beans.factory.support.ConstructorResolver.instantiate(ConstructorResolver.java:653) ~[spring-beans-6.2.0.jar!/:6.2.0]
2025-10-16T08:39:40.160500582Z  	... 40 common frames omitted
2025-10-16T08:39:40.160700722Z  Caused by: java.lang.IllegalArgumentException: A filter chain that matches any request [DefaultSecurityFilterChain defined as 'filterChain' in [class path resource [com/p4/backend/config/security/SecurityConfig.class]] matching [any request] and having filters [DisableEncodeUrl, WebAsyncManagerIntegration, SecurityContextHolder, HeaderWriter, Logout, BasicAuthentication, RequestCacheAware, SecurityContextHolderAwareRequest, AnonymousAuthentication, ExceptionTranslation, Authorization]] has already been configured, which means that this filter chain [DefaultSecurityFilterChain defined as 'testEndpointsFilterChain' in [class path resource [com/p4/backend/config/security/TestEndpointsSecurityConfig.class]] matching [Or [Mvc [pattern='/api/test/**']]] and having filters [DisableEncodeUrl, WebAsyncManagerIntegration, SecurityContextHolder, HeaderWriter, Logout, RequestCacheAware, SecurityContextHolderAwareRequest, AnonymousAuthentication, ExceptionTranslation, Authorization]] will never get invoked. Please use `HttpSecurity#securityMatcher` to ensure that there is only one filter chain configured for 'any request' and that the 'any request' filter chain is published last.
2025-10-16T08:39:40.160721472Z  	at org.springframework.security.config.annotation.web.builders.WebSecurity.performBuild(WebSecurity.java:312) ~[spring-security-config-6.4.1.jar!/:6.4.1]
2025-10-16T08:39:40.160726401Z  	at org.springframework.security.config.annotation.web.builders.WebSecurity.performBuild(WebSecurity.java:94) ~[spring-security-config-6.4.1.jar!/:6.4.1]
2025-10-16T08:39:40.160730579Z  	at org.springframework.security.config.annotation.AbstractConfiguredSecurityBuilder.doBuild(AbstractConfiguredSecurityBuilder.java:333) ~[spring-security-config-6.4.1.jar!/:6.4.1]
2025-10-16T08:39:40.160734957Z  	at org.springframework.security.config.annotation.AbstractSecurityBuilder.build(AbstractSecurityBuilder.java:38) ~[spring-security-config-6.4.1.jar!/:6.4.1]
2025-10-16T08:39:40.160739325Z  	at org.springframework.security.config.annotation.web.configuration.WebSecurityConfiguration.springSecurityFilterChain(WebSecurityConfiguration.java:121) ~[spring-security-config-6.4.1.jar!/:6.4.1]
2025-10-16T08:39:40.160744185Z  	at java.base/jdk.internal.reflect.DirectMethodHandleAccessor.invoke(DirectMethodHandleAccessor.java:103) ~[na:na]
2025-10-16T08:39:40.160748373Z  	at java.base/java.lang.reflect.Method.invoke(Method.java:580) ~[na:na]
2025-10-16T08:39:40.160752150Z  	at org.springframework.beans.factory.support.SimpleInstantiationStrategy.lambda$instantiate$0(SimpleInstantiationStrategy.java:171) ~[spring-beans-6.2.0.jar!/:6.2.0]
2025-10-16T08:39:40.160756498Z  	... 43 common frames omitted
2025-10-16T08:39:40.160760225Z
2025-10-16T08:39:40.446896928Z  Wait for pid == 84 either returned successfully or was interrupted due to a signal 84
2025-10-16T08:39:40.454141970Z  Done waiting for main process. GLOBAL_PID_MAIN=84.
2025-10-16T08:39:40.480447941Z  Exiting entry script!
```
