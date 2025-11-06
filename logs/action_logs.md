  .   ____          _            __ _ _
 /\\ / ___'_ __ _ _(_)_ __  __ _ \ \ \ \
( ( )\___ | '_ | '_| | '_ \/ _` | \ \ \ \
 \\/  ___)| |_)| | | | | || (_| |  ) ) ) )
  '  |____| .__|_| |_|_| |_\__, | / / / /
 =========|_|==============|___/=/_/_/_/
 :: Spring Boot ::                (v3.2.0)

2025-11-06T09:45:23.219+02:00  INFO 33944 --- [b2b-marketplace] [           main] com.p4.backend.BackendApplication        : Starting BackendApplication using Java 21.0.8 with PID 33944 (D:\Projects\b2b-marketplace\backend\target\classes started by ahmed in D:\Projects\b2b-marketplace\backend)
2025-11-06T09:45:23.223+02:00  INFO 33944 --- [b2b-marketplace] [           main] com.p4.backend.BackendApplication        : The following 1 profile is active: "prod"
2025-11-06T09:45:24.419+02:00  INFO 33944 --- [b2b-marketplace] [           main] .s.d.r.c.RepositoryConfigurationDelegate : Bootstrapping Spring Data JPA repositories in DEFAULT mode.
2025-11-06T09:45:24.552+02:00  INFO 33944 --- [b2b-marketplace] [           main] .s.d.r.c.RepositoryConfigurationDelegate : Finished Spring Data repository scanning in 121 ms. Found 13 JPA repository interfaces.
2025-11-06T09:45:28.154+02:00  INFO 33944 --- [b2b-marketplace] [           main] o.s.b.w.embedded.tomcat.TomcatWebServer  : Tomcat initialized with port 8080 (http)
2025-11-06T09:45:28.238+02:00  INFO 33944 --- [b2b-marketplace] [           main] o.apache.catalina.core.StandardService   : Starting service [Tomcat]
2025-11-06T09:45:28.239+02:00  INFO 33944 --- [b2b-marketplace] [           main] o.apache.catalina.core.StandardEngine    : Starting Servlet engine: [Apache Tomcat/10.1.16]
2025-11-06T09:45:28.956+02:00  INFO 33944 --- [b2b-marketplace] [           main] o.a.c.c.C.[Tomcat].[localhost].[/]       : Initializing Spring embedded WebApplicationContext
2025-11-06T09:45:28.957+02:00  INFO 33944 --- [b2b-marketplace] [           main] w.s.c.ServletWebServerApplicationContext : Root WebApplicationContext: initialization completed in 5639 ms
2025-11-06T09:45:29.171+02:00  INFO 33944 --- [b2b-marketplace] [           main] com.zaxxer.hikari.HikariDataSource       : HikariPool-1 - Starting...
2025-11-06T09:45:32.987+02:00  INFO 33944 --- [b2b-marketplace] [           main] com.zaxxer.hikari.pool.HikariPool        : HikariPool-1 - Added connection org.postgresql.jdbc.PgConnection@4fd80300
2025-11-06T09:45:32.989+02:00  INFO 33944 --- [b2b-marketplace] [           main] com.zaxxer.hikari.HikariDataSource       : HikariPool-1 - Start completed.
2025-11-06T09:45:33.270+02:00  INFO 33944 --- [b2b-marketplace] [           main] o.f.c.internal.license.VersionPrinter    : Flyway Community Edition 9.22.3 by Redgate
2025-11-06T09:45:33.272+02:00  INFO 33944 --- [b2b-marketplace] [           main] o.f.c.internal.license.VersionPrinter    : See release notes here: https://rd.gt/416ObMi
2025-11-06T09:45:33.272+02:00  INFO 33944 --- [b2b-marketplace] [           main] o.f.c.internal.license.VersionPrinter    :
2025-11-06T09:45:33.439+02:00  INFO 33944 --- [b2b-marketplace] [           main] org.flywaydb.core.FlywayExecutor         : Database: jdbc:postgresql://ep-damp-feather-adc322wz-pooler.c-2.us-east-1.aws.neon.tech/neondb (PostgreSQL 17.5)
2025-11-06T09:45:34.483+02:00  WARN 33944 --- [b2b-marketplace] [           main] o.f.c.internal.database.base.Database    : Flyway upgrade recommended: PostgreSQL 17.5 is newer than this version of Flyway and support has not been tested. The latest supported version of PostgreSQL is 15.
2025-11-06T09:45:35.281+02:00  INFO 33944 --- [b2b-marketplace] [           main] o.f.core.internal.command.DbValidate     : Successfully validated ┘خ migrations (execution time ┘ب┘ب:┘ب┘ب.┘خ┘ث┘جs)
2025-11-06T09:45:37.072+02:00  INFO 33944 --- [b2b-marketplace] [           main] o.f.core.internal.command.DbMigrate      : Current version of schema "public": 005
2025-11-06T09:45:37.230+02:00  INFO 33944 --- [b2b-marketplace] [           main] o.f.core.internal.command.DbMigrate      : Schema "public" is up to date. No migration necessary.
2025-11-06T09:45:38.267+02:00  INFO 33944 --- [b2b-marketplace] [           main] o.hibernate.jpa.internal.util.LogHelper  : HHH000204: Processing PersistenceUnitInfo [name: default]
2025-11-06T09:45:38.358+02:00  INFO 33944 --- [b2b-marketplace] [           main] org.hibernate.Version                    : HHH000412: Hibernate ORM core version 6.3.1.Final
2025-11-06T09:45:38.413+02:00  INFO 33944 --- [b2b-marketplace] [           main] o.h.c.internal.RegionFactoryInitiator    : HHH000026: Second-level cache disabled
2025-11-06T09:45:38.723+02:00  INFO 33944 --- [b2b-marketplace] [           main] o.s.o.j.p.SpringPersistenceUnitInfo      : No LoadTimeWeaver setup: ignoring JPA class transformer
2025-11-06T09:45:39.106+02:00  WARN 33944 --- [b2b-marketplace] [           main] org.hibernate.orm.deprecation            : HHH90000025: PostgreSQLDialect does not need to be specified explicitly using 'hibernate.dialect' (remove the property setting and it will be selected by default)
2025-11-06T09:45:40.821+02:00  INFO 33944 --- [b2b-marketplace] [           main] o.h.e.t.j.p.i.JtaPlatformInitiator       : HHH000489: No JTA platform available (set 'hibernate.transaction.jta.platform' to enable JTA platform integration)
2025-11-06T09:45:40.825+02:00  INFO 33944 --- [b2b-marketplace] [           main] j.LocalContainerEntityManagerFactoryBean : Initialized JPA EntityManagerFactory for persistence unit 'default'
2025-11-06T09:45:41.624+02:00  WARN 33944 --- [b2b-marketplace] [           main] o.s.aop.framework.CglibAopProxy          : Unable to proxy interface-implementing method [public final void org.springframework.web.filter.OncePerRequestFilter.doFilter(jakarta.servlet.ServletRequest,jakarta.servlet.ServletResponse,jakarta.servlet.FilterChain) throws jakarta.servlet.ServletException,java.io.IOException] because it is marked as final, consider using interface-based JDK proxies instead.
2025-11-06T09:45:41.625+02:00  WARN 33944 --- [b2b-marketplace] [           main] o.s.aop.framework.CglibAopProxy          : Unable to proxy interface-implementing method [public final void org.springframework.web.filter.GenericFilterBean.init(jakarta.servlet.FilterConfig) throws jakarta.servlet.ServletException] because it is marked as final, consider using interface-based JDK proxies instead.
2025-11-06T09:45:41.793+02:00  INFO 33944 --- [b2b-marketplace] [           main] o.s.d.j.r.query.QueryEnhancerFactory     : Hibernate is in classpath; If applicable, HQL parser will be used.
2025-11-06T09:45:43.198+02:00  WARN 33944 --- [b2b-marketplace] [           main] JpaBaseConfiguration$JpaWebConfiguration : spring.jpa.open-in-view is enabled by default. Therefore, database queries may be performed during view rendering. Explicitly configure spring.jpa.open-in-view to disable this warning
2025-11-06T09:45:43.921+02:00  INFO 33944 --- [b2b-marketplace] [           main] o.s.b.a.e.web.EndpointLinksResolver      : Exposing 2 endpoint(s) beneath base path '/actuator'
2025-11-06T09:45:44.035+02:00  INFO 33944 --- [b2b-marketplace] [           main] o.s.s.web.DefaultSecurityFilterChain     : Will secure any request with [org.springframework.security.web.session.DisableEncodeUrlFilter@5596f2bb, org.springframework.security.web.context.request.async.WebAsyncManagerIntegrationFilter@44e4fa97, org.springframework.security.web.context.SecurityContextHolderFilter@78a6ffe3, org.springframework.security.web.header.HeaderWriterFilter@7f218b0c, org.springframework.web.filter.CorsFilter@5c10216f, org.springframework.security.web.authentication.logout.LogoutFilter@5b4e1899, com.p4.backend.common.security.filter.JwtAuthenticationFilter@12f85dc8, org.springframework.security.web.savedrequest.RequestCacheAwareFilter@2dd7a886, org.springframework.security.web.servletapi.SecurityContextHolderAwareRequestFilter@1f9c9485, org.springframework.security.web.authentication.AnonymousAuthenticationFilter@53534c15, org.springframework.security.web.session.SessionManagementFilter@293af2f1, org.springframework.security.web.access.ExceptionTranslationFilter@3c48e78b, org.springframework.security.web.access.intercept.AuthorizationFilter@41c77861]
2025-11-06T09:45:44.769+02:00  INFO 33944 --- [b2b-marketplace] [           main] o.s.b.w.embedded.tomcat.TomcatWebServer  : Tomcat started on port 8080 (http) with context path ''
2025-11-06T09:45:44.785+02:00  INFO 33944 --- [b2b-marketplace] [           main] com.p4.backend.BackendApplication        : Started BackendApplication in 22.381 seconds (process running for 22.992)
2025-11-06T09:46:09.511+02:00  INFO 33944 --- [b2b-marketplace] [nio-8080-exec-1] o.a.c.c.C.[Tomcat].[localhost].[/]       : Initializing Spring DispatcherServlet 'dispatcherServlet'
2025-11-06T09:46:09.511+02:00  INFO 33944 --- [b2b-marketplace] [nio-8080-exec-1] o.s.web.servlet.DispatcherServlet        : Initializing Servlet 'dispatcherServlet'
2025-11-06T09:46:09.513+02:00  INFO 33944 --- [b2b-marketplace] [nio-8080-exec-1] o.s.web.servlet.DispatcherServlet        : Completed initialization in 1 ms
2025-11-06T09:46:09.544+02:00  WARN 33944 --- [b2b-marketplace] [nio-8080-exec-1] o.s.w.s.h.HandlerMappingIntrospector     : Cache miss for REQUEST dispatch to '/auth/login' (previous null). Performing CorsConfiguration lookup. This is logged once only at WARN level, and every time at TRACE.
2025-11-06T09:46:09.556+02:00  WARN 33944 --- [b2b-marketplace] [nio-8080-exec-1] o.s.w.s.h.HandlerMappingIntrospector     : Cache miss for REQUEST dispatch to '/auth/login' (previous null). Performing MatchableHandlerMapping lookup. This is logged once only at WARN level, and every time at TRACE.
2025-11-06T09:46:30.399+02:00  WARN 33944 --- [b2b-marketplace] [io-8080-exec-10] o.h.engine.jdbc.spi.SqlExceptionHelper   : SQL Error: 0, SQLState: 42804
2025-11-06T09:46:30.399+02:00 ERROR 33944 --- [b2b-marketplace] [io-8080-exec-10] o.h.engine.jdbc.spi.SqlExceptionHelper   : ERROR: column "raw_payload" is of type jsonb but expression is of type bytea
  Hint: You will need to rewrite or cast the expression.
  Position: 131
2025-11-06T09:46:30.553+02:00 ERROR 33944 --- [b2b-marketplace] [io-8080-exec-10] o.a.c.c.C.[.[.[/].[dispatcherServlet]    : Servlet.service() for servlet [dispatcherServlet] in context with path [] threw exception [Request processing failed: org.springframework.dao.InvalidDataAccessResourceUsageException: could not execute statement [ERROR: column "raw_payload" is of type jsonb but expression is of type bytea
  Hint: You will need to rewrite or cast the expression.
  Position: 131] [insert into payments (amount,created_at,currency,idempotency_key,method,order_id,raw_payload,status,id) values (?,?,?,?,?,?,?,?,?)]; SQL [insert into payments (amount,created_at,currency,idempotency_key,method,order_id,raw_payload,status,id) values (?,?,?,?,?,?,?,?,?)]] with root cause

org.postgresql.util.PSQLException: ERROR: column "raw_payload" is of type jsonb but expression is of type bytea
  Hint: You will need to rewrite or cast the expression.
  Position: 131
        at org.postgresql.core.v3.QueryExecutorImpl.receiveErrorResponse(QueryExecutorImpl.java:2713) ~[postgresql-42.6.0.jar:42.6.0]
        at org.postgresql.core.v3.QueryExecutorImpl.processResults(QueryExecutorImpl.java:2401) ~[postgresql-42.6.0.jar:42.6.0]
        at org.postgresql.core.v3.QueryExecutorImpl.execute(QueryExecutorImpl.java:368) ~[postgresql-42.6.0.jar:42.6.0]
        at org.postgresql.jdbc.PgStatement.executeInternal(PgStatement.java:498) ~[postgresql-42.6.0.jar:42.6.0]
        at org.postgresql.jdbc.PgStatement.execute(PgStatement.java:415) ~[postgresql-42.6.0.jar:42.6.0]
        at org.postgresql.jdbc.PgPreparedStatement.executeWithFlags(PgPreparedStatement.java:190) ~[postgresql-42.6.0.jar:42.6.0]
        at org.postgresql.jdbc.PgPreparedStatement.executeUpdate(PgPreparedStatement.java:152) ~[postgresql-42.6.0.jar:42.6.0]
        at com.zaxxer.hikari.pool.ProxyPreparedStatement.executeUpdate(ProxyPreparedStatement.java:61) ~[HikariCP-5.0.1.jar:na]
        at com.zaxxer.hikari.pool.HikariProxyPreparedStatement.executeUpdate(HikariProxyPreparedStatement.java) ~[HikariCP-5.0.1.jar:na]       
        at org.hibernate.engine.jdbc.internal.ResultSetReturnImpl.executeUpdate(ResultSetReturnImpl.java:280) ~[hibernate-core-6.3.1.Final.jar:6.3.1.Final]
        at org.hibernate.engine.jdbc.mutation.internal.AbstractMutationExecutor.performNonBatchedMutation(AbstractMutationExecutor.java:107) ~[hibernate-core-6.3.1.Final.jar:6.3.1.Final]
        at org.hibernate.engine.jdbc.mutation.internal.MutationExecutorSingleNonBatched.performNonBatchedOperations(MutationExecutorSingleNonBatched.java:40) ~[hibernate-core-6.3.1.Final.jar:6.3.1.Final]
        at org.hibernate.engine.jdbc.mutation.internal.AbstractMutationExecutor.execute(AbstractMutationExecutor.java:52) ~[hibernate-core-6.3.1.Final.jar:6.3.1.Final]
        at org.hibernate.persister.entity.mutation.InsertCoordinator.doStaticInserts(InsertCoordinator.java:171) ~[hibernate-core-6.3.1.Final.jar:6.3.1.Final]
        at org.hibernate.persister.entity.mutation.InsertCoordinator.coordinateInsert(InsertCoordinator.java:112) ~[hibernate-core-6.3.1.Final.jar:6.3.1.Final]
        at org.hibernate.persister.entity.AbstractEntityPersister.insert(AbstractEntityPersister.java:2865) ~[hibernate-core-6.3.1.Final.jar:6.3.1.Final]
        at org.hibernate.action.internal.EntityInsertAction.execute(EntityInsertAction.java:102) ~[hibernate-core-6.3.1.Final.jar:6.3.1.Final] 
        at org.hibernate.engine.spi.ActionQueue.executeActions(ActionQueue.java:631) ~[hibernate-core-6.3.1.Final.jar:6.3.1.Final]
        at org.hibernate.engine.spi.ActionQueue.executeActions(ActionQueue.java:498) ~[hibernate-core-6.3.1.Final.jar:6.3.1.Final]
        at org.hibernate.event.internal.AbstractFlushingEventListener.performExecutions(AbstractFlushingEventListener.java:363) ~[hibernate-core-6.3.1.Final.jar:6.3.1.Final]
        at org.hibernate.event.internal.DefaultFlushEventListener.onFlush(DefaultFlushEventListener.java:39) ~[hibernate-core-6.3.1.Final.jar:6.3.1.Final]
        at org.hibernate.event.service.internal.EventListenerGroupImpl.fireEventOnEachListener(EventListenerGroupImpl.java:127) ~[hibernate-core-6.3.1.Final.jar:6.3.1.Final]
        at org.hibernate.internal.SessionImpl.doFlush(SessionImpl.java:1415) ~[hibernate-core-6.3.1.Final.jar:6.3.1.Final]
        at org.hibernate.internal.SessionImpl.managedFlush(SessionImpl.java:496) ~[hibernate-core-6.3.1.Final.jar:6.3.1.Final]
        at org.hibernate.internal.SessionImpl.flushBeforeTransactionCompletion(SessionImpl.java:2325) ~[hibernate-core-6.3.1.Final.jar:6.3.1.Final]
        at org.hibernate.internal.SessionImpl.beforeTransactionCompletion(SessionImpl.java:1988) ~[hibernate-core-6.3.1.Final.jar:6.3.1.Final] 
        at org.hibernate.engine.jdbc.internal.JdbcCoordinatorImpl.beforeTransactionCompletion(JdbcCoordinatorImpl.java:439) ~[hibernate-core-6.3.1.Final.jar:6.3.1.Final]
        at org.hibernate.resource.transaction.backend.jdbc.internal.JdbcResourceLocalTransactionCoordinatorImpl.beforeCompletionCallback(JdbcResourceLocalTransactionCoordinatorImpl.java:169) ~[hibernate-core-6.3.1.Final.jar:6.3.1.Final]
        at org.hibernate.resource.transaction.backend.jdbc.internal.JdbcResourceLocalTransactionCoordinatorImpl$TransactionDriverControlImpl.commit(JdbcResourceLocalTransactionCoordinatorImpl.java:267) ~[hibernate-core-6.3.1.Final.jar:6.3.1.Final]
        at org.hibernate.engine.transaction.internal.TransactionImpl.commit(TransactionImpl.java:101) ~[hibernate-core-6.3.1.Final.jar:6.3.1.Final]
        at org.springframework.orm.jpa.JpaTransactionManager.doCommit(JpaTransactionManager.java:561) ~[spring-orm-6.1.1.jar:6.1.1]
        at org.springframework.transaction.support.AbstractPlatformTransactionManager.processCommit(AbstractPlatformTransactionManager.java:794) ~[spring-tx-6.1.1.jar:6.1.1]
        at org.springframework.transaction.support.AbstractPlatformTransactionManager.commit(AbstractPlatformTransactionManager.java:757) ~[spring-tx-6.1.1.jar:6.1.1]
        at org.springframework.transaction.interceptor.TransactionAspectSupport.commitTransactionAfterReturning(TransactionAspectSupport.java:669) ~[spring-tx-6.1.1.jar:6.1.1]
        at org.springframework.transaction.interceptor.TransactionAspectSupport.invokeWithinTransaction(TransactionAspectSupport.java:419) ~[spring-tx-6.1.1.jar:6.1.1]
        at org.springframework.transaction.interceptor.TransactionInterceptor.invoke(TransactionInterceptor.java:119) ~[spring-tx-6.1.1.jar:6.1.1]
        at org.springframework.aop.framework.ReflectiveMethodInvocation.proceed(ReflectiveMethodInvocation.java:184) ~[spring-aop-6.1.1.jar:6.1.1]
        at org.springframework.aop.framework.CglibAopProxy$CglibMethodInvocation.proceed(CglibAopProxy.java:765) ~[spring-aop-6.1.1.jar:6.1.1] 
        at org.springframework.aop.framework.CglibAopProxy$DynamicAdvisedInterceptor.intercept(CglibAopProxy.java:717) ~[spring-aop-6.1.1.jar:6.1.1]
        at com.p4.backend.orders.service.PaymentService$$SpringCGLIB$$0.payOrderWithWallet(<generated>) ~[classes/:na]
        at com.p4.backend.orders.controller.PaymentController.payOrderWithWallet(PaymentController.java:24) ~[classes/:na]
        at java.base/jdk.internal.reflect.DirectMethodHandleAccessor.invoke(DirectMethodHandleAccessor.java:103) ~[na:na]
        at java.base/java.lang.reflect.Method.invoke(Method.java:580) ~[na:na]
        at org.springframework.web.method.support.InvocableHandlerMethod.doInvoke(InvocableHandlerMethod.java:254) ~[spring-web-6.1.1.jar:6.1.1]
        at org.springframework.web.method.support.InvocableHandlerMethod.invokeForRequest(InvocableHandlerMethod.java:182) ~[spring-web-6.1.1.jar:6.1.1]
        at org.springframework.web.servlet.mvc.method.annotation.ServletInvocableHandlerMethod.invokeAndHandle(ServletInvocableHandlerMethod.java:118) ~[spring-webmvc-6.1.1.jar:6.1.1]
        at org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerAdapter.invokeHandlerMethod(RequestMappingHandlerAdapter.java:917) ~[spring-webmvc-6.1.1.jar:6.1.1]
        at org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerAdapter.handleInternal(RequestMappingHandlerAdapter.java:829) ~[spring-webmvc-6.1.1.jar:6.1.1]
        at org.springframework.web.servlet.mvc.method.AbstractHandlerMethodAdapter.handle(AbstractHandlerMethodAdapter.java:87) ~[spring-webmvc-6.1.1.jar:6.1.1]
        at org.springframework.web.servlet.DispatcherServlet.doDispatch(DispatcherServlet.java:1089) ~[spring-webmvc-6.1.1.jar:6.1.1]
        at org.springframework.web.servlet.DispatcherServlet.doService(DispatcherServlet.java:979) ~[spring-webmvc-6.1.1.jar:6.1.1]
        at org.springframework.web.servlet.FrameworkServlet.processRequest(FrameworkServlet.java:1014) ~[spring-webmvc-6.1.1.jar:6.1.1]        
        at org.springframework.web.servlet.FrameworkServlet.doPost(FrameworkServlet.java:914) ~[spring-webmvc-6.1.1.jar:6.1.1]
        at jakarta.servlet.http.HttpServlet.service(HttpServlet.java:590) ~[tomcat-embed-core-10.1.16.jar:6.0]
        at org.springframework.web.servlet.FrameworkServlet.service(FrameworkServlet.java:885) ~[spring-webmvc-6.1.1.jar:6.1.1]
        at jakarta.servlet.http.HttpServlet.service(HttpServlet.java:658) ~[tomcat-embed-core-10.1.16.jar:6.0]
        at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:205) ~[tomcat-embed-core-10.1.16.jar:10.1.16]
        at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:149) ~[tomcat-embed-core-10.1.16.jar:10.1.16]  
        at org.apache.tomcat.websocket.server.WsFilter.doFilter(WsFilter.java:51) ~[tomcat-embed-websocket-10.1.16.jar:10.1.16]
        at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:174) ~[tomcat-embed-core-10.1.16.jar:10.1.16]
        at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:149) ~[tomcat-embed-core-10.1.16.jar:10.1.16]  
        at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:110) ~[spring-web-6.1.1.jar:6.1.1]
        at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:174) ~[tomcat-embed-core-10.1.16.jar:10.1.16]
        at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:149) ~[tomcat-embed-core-10.1.16.jar:10.1.16]  
        at org.springframework.security.web.FilterChainProxy.lambda$doFilterInternal$3(FilterChainProxy.java:231) ~[spring-security-web-6.2.0.jar:6.2.0]
        at org.springframework.security.web.ObservationFilterChainDecorator$FilterObservation$SimpleFilterObservation.lambda$wrap$1(ObservationFilterChainDecorator.java:479) ~[spring-security-web-6.2.0.jar:6.2.0]
        at org.springframework.security.web.ObservationFilterChainDecorator$AroundFilterObservation$SimpleAroundFilterObservation.lambda$wrap$1(ObservationFilterChainDecorator.java:340) ~[spring-security-web-6.2.0.jar:6.2.0]
        at org.springframework.security.web.ObservationFilterChainDecorator.lambda$wrapSecured$0(ObservationFilterChainDecorator.java:82) ~[spring-security-web-6.2.0.jar:6.2.0]
        at org.springframework.security.web.ObservationFilterChainDecorator$VirtualFilterChain.doFilter(ObservationFilterChainDecorator.java:128) ~[spring-security-web-6.2.0.jar:6.2.0]
        at org.springframework.security.web.access.intercept.AuthorizationFilter.doFilter(AuthorizationFilter.java:100) ~[spring-security-web-6.2.0.jar:6.2.0]
        at org.springframework.security.web.ObservationFilterChainDecorator$ObservationFilter.wrapFilter(ObservationFilterChainDecorator.java:240) ~[spring-security-web-6.2.0.jar:6.2.0]
        at org.springframework.security.web.ObservationFilterChainDecorator$ObservationFilter.doFilter(ObservationFilterChainDecorator.java:227) ~[spring-security-web-6.2.0.jar:6.2.0]
        at org.springframework.security.web.ObservationFilterChainDecorator$VirtualFilterChain.doFilter(ObservationFilterChainDecorator.java:137) ~[spring-security-web-6.2.0.jar:6.2.0]
        at org.springframework.security.web.access.ExceptionTranslationFilter.doFilter(ExceptionTranslationFilter.java:126) ~[spring-security-web-6.2.0.jar:6.2.0]
        at org.springframework.security.web.access.ExceptionTranslationFilter.doFilter(ExceptionTranslationFilter.java:120) ~[spring-security-web-6.2.0.jar:6.2.0]
        at org.springframework.security.web.ObservationFilterChainDecorator$ObservationFilter.wrapFilter(ObservationFilterChainDecorator.java:240) ~[spring-security-web-6.2.0.jar:6.2.0]
        at org.springframework.security.web.ObservationFilterChainDecorator$ObservationFilter.doFilter(ObservationFilterChainDecorator.java:227) ~[spring-security-web-6.2.0.jar:6.2.0]
        at org.springframework.security.web.ObservationFilterChainDecorator$VirtualFilterChain.doFilter(ObservationFilterChainDecorator.java:137) ~[spring-security-web-6.2.0.jar:6.2.0]
        at org.springframework.security.web.session.SessionManagementFilter.doFilter(SessionManagementFilter.java:131) ~[spring-security-web-6.2.0.jar:6.2.0]
        at org.springframework.security.web.session.SessionManagementFilter.doFilter(SessionManagementFilter.java:85) ~[spring-security-web-6.2.0.jar:6.2.0]
        at org.springframework.security.web.ObservationFilterChainDecorator$ObservationFilter.wrapFilter(ObservationFilterChainDecorator.java:240) ~[spring-security-web-6.2.0.jar:6.2.0]
        at org.springframework.security.web.ObservationFilterChainDecorator$ObservationFilter.doFilter(ObservationFilterChainDecorator.java:227) ~[spring-security-web-6.2.0.jar:6.2.0]
        at org.springframework.security.web.ObservationFilterChainDecorator$VirtualFilterChain.doFilter(ObservationFilterChainDecorator.java:137) ~[spring-security-web-6.2.0.jar:6.2.0]
        at org.springframework.security.web.authentication.AnonymousAuthenticationFilter.doFilter(AnonymousAuthenticationFilter.java:100) ~[spring-security-web-6.2.0.jar:6.2.0]
        at org.springframework.security.web.ObservationFilterChainDecorator$ObservationFilter.wrapFilter(ObservationFilterChainDecorator.java:240) ~[spring-security-web-6.2.0.jar:6.2.0]
        at org.springframework.security.web.ObservationFilterChainDecorator$ObservationFilter.doFilter(ObservationFilterChainDecorator.java:227) ~[spring-security-web-6.2.0.jar:6.2.0]
        at org.springframework.security.web.ObservationFilterChainDecorator$VirtualFilterChain.doFilter(ObservationFilterChainDecorator.java:137) ~[spring-security-web-6.2.0.jar:6.2.0]
        at org.springframework.security.web.servletapi.SecurityContextHolderAwareRequestFilter.doFilter(SecurityContextHolderAwareRequestFilter.java:179) ~[spring-security-web-6.2.0.jar:6.2.0]
        at org.springframework.security.web.ObservationFilterChainDecorator$ObservationFilter.wrapFilter(ObservationFilterChainDecorator.java:240) ~[spring-security-web-6.2.0.jar:6.2.0]
        at org.springframework.security.web.ObservationFilterChainDecorator$ObservationFilter.doFilter(ObservationFilterChainDecorator.java:227) ~[spring-security-web-6.2.0.jar:6.2.0]
        at org.springframework.security.web.ObservationFilterChainDecorator$VirtualFilterChain.doFilter(ObservationFilterChainDecorator.java:137) ~[spring-security-web-6.2.0.jar:6.2.0]
        at org.springframework.security.web.savedrequest.RequestCacheAwareFilter.doFilter(RequestCacheAwareFilter.java:63) ~[spring-security-web-6.2.0.jar:6.2.0]
        at org.springframework.security.web.ObservationFilterChainDecorator$ObservationFilter.wrapFilter(ObservationFilterChainDecorator.java:240) ~[spring-security-web-6.2.0.jar:6.2.0]
        at org.springframework.security.web.ObservationFilterChainDecorator$ObservationFilter.doFilter(ObservationFilterChainDecorator.java:227) ~[spring-security-web-6.2.0.jar:6.2.0]
        at org.springframework.security.web.ObservationFilterChainDecorator$VirtualFilterChain.doFilter(ObservationFilterChainDecorator.java:137) ~[spring-security-web-6.2.0.jar:6.2.0]
        at com.p4.backend.common.security.filter.JwtAuthenticationFilter.doFilterInternal(JwtAuthenticationFilter.java:71) ~[classes/:na]      
        at java.base/jdk.internal.reflect.DirectMethodHandleAccessor.invoke(DirectMethodHandleAccessor.java:103) ~[na:na]
        at java.base/java.lang.reflect.Method.invoke(Method.java:580) ~[na:na]
        at org.springframework.aop.support.AopUtils.invokeJoinpointUsingReflection(AopUtils.java:352) ~[spring-aop-6.1.1.jar:6.1.1]
        at org.springframework.aop.framework.CglibAopProxy$DynamicAdvisedInterceptor.intercept(CglibAopProxy.java:713) ~[spring-aop-6.1.1.jar:6.1.1]
        at com.p4.backend.common.security.filter.JwtAuthenticationFilter$$SpringCGLIB$$0.doFilterInternal(<generated>) ~[classes/:na]
        at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:116) ~[spring-web-6.1.1.jar:6.1.1]
        at org.springframework.security.web.ObservationFilterChainDecorator$ObservationFilter.wrapFilter(ObservationFilterChainDecorator.java:240) ~[spring-security-web-6.2.0.jar:6.2.0]
        at org.springframework.security.web.ObservationFilterChainDecorator$ObservationFilter.doFilter(ObservationFilterChainDecorator.java:227) ~[spring-security-web-6.2.0.jar:6.2.0]
        at org.springframework.security.web.ObservationFilterChainDecorator$VirtualFilterChain.doFilter(ObservationFilterChainDecorator.java:137) ~[spring-security-web-6.2.0.jar:6.2.0]
        at org.springframework.security.web.authentication.logout.LogoutFilter.doFilter(LogoutFilter.java:107) ~[spring-security-web-6.2.0.jar:6.2.0]
        at org.springframework.security.web.authentication.logout.LogoutFilter.doFilter(LogoutFilter.java:93) ~[spring-security-web-6.2.0.jar:6.2.0]
        at org.springframework.security.web.ObservationFilterChainDecorator$ObservationFilter.wrapFilter(ObservationFilterChainDecorator.java:240) ~[spring-security-web-6.2.0.jar:6.2.0]
        at org.springframework.security.web.ObservationFilterChainDecorator$ObservationFilter.doFilter(ObservationFilterChainDecorator.java:227) ~[spring-security-web-6.2.0.jar:6.2.0]
        at org.springframework.security.web.ObservationFilterChainDecorator$VirtualFilterChain.doFilter(ObservationFilterChainDecorator.java:137) ~[spring-security-web-6.2.0.jar:6.2.0]
        at org.springframework.web.filter.CorsFilter.doFilterInternal(CorsFilter.java:91) ~[spring-web-6.1.1.jar:6.1.1]
        at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:116) ~[spring-web-6.1.1.jar:6.1.1]
        at org.springframework.security.web.ObservationFilterChainDecorator$ObservationFilter.wrapFilter(ObservationFilterChainDecorator.java:240) ~[spring-security-web-6.2.0.jar:6.2.0]
        at org.springframework.security.web.ObservationFilterChainDecorator$ObservationFilter.doFilter(ObservationFilterChainDecorator.java:227) ~[spring-security-web-6.2.0.jar:6.2.0]
        at org.springframework.security.web.ObservationFilterChainDecorator$VirtualFilterChain.doFilter(ObservationFilterChainDecorator.java:137) ~[spring-security-web-6.2.0.jar:6.2.0]
        at org.springframework.security.web.header.HeaderWriterFilter.doHeadersAfter(HeaderWriterFilter.java:90) ~[spring-security-web-6.2.0.jar:6.2.0]
        at org.springframework.security.web.header.HeaderWriterFilter.doFilterInternal(HeaderWriterFilter.java:75) ~[spring-security-web-6.2.0.jar:6.2.0]
        at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:116) ~[spring-web-6.1.1.jar:6.1.1]
        at org.springframework.security.web.ObservationFilterChainDecorator$ObservationFilter.wrapFilter(ObservationFilterChainDecorator.java:240) ~[spring-security-web-6.2.0.jar:6.2.0]
        at org.springframework.security.web.ObservationFilterChainDecorator$ObservationFilter.doFilter(ObservationFilterChainDecorator.java:227) ~[spring-security-web-6.2.0.jar:6.2.0]
        at org.springframework.security.web.ObservationFilterChainDecorator$VirtualFilterChain.doFilter(ObservationFilterChainDecorator.java:137) ~[spring-security-web-6.2.0.jar:6.2.0]
        at org.springframework.security.web.context.SecurityContextHolderFilter.doFilter(SecurityContextHolderFilter.java:82) ~[spring-security-web-6.2.0.jar:6.2.0]
        at org.springframework.security.web.context.SecurityContextHolderFilter.doFilter(SecurityContextHolderFilter.java:69) ~[spring-security-web-6.2.0.jar:6.2.0]
        at org.springframework.security.web.ObservationFilterChainDecorator$ObservationFilter.wrapFilter(ObservationFilterChainDecorator.java:240) ~[spring-security-web-6.2.0.jar:6.2.0]
        at org.springframework.security.web.ObservationFilterChainDecorator$ObservationFilter.doFilter(ObservationFilterChainDecorator.java:227) ~[spring-security-web-6.2.0.jar:6.2.0]
        at org.springframework.security.web.ObservationFilterChainDecorator$VirtualFilterChain.doFilter(ObservationFilterChainDecorator.java:137) ~[spring-security-web-6.2.0.jar:6.2.0]
        at org.springframework.security.web.context.request.async.WebAsyncManagerIntegrationFilter.doFilterInternal(WebAsyncManagerIntegrationFilter.java:62) ~[spring-security-web-6.2.0.jar:6.2.0]
        at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:116) ~[spring-web-6.1.1.jar:6.1.1]
        at org.springframework.security.web.ObservationFilterChainDecorator$ObservationFilter.wrapFilter(ObservationFilterChainDecorator.java:240) ~[spring-security-web-6.2.0.jar:6.2.0]
        at org.springframework.security.web.ObservationFilterChainDecorator$ObservationFilter.doFilter(ObservationFilterChainDecorator.java:227) ~[spring-security-web-6.2.0.jar:6.2.0]
        at org.springframework.security.web.ObservationFilterChainDecorator$VirtualFilterChain.doFilter(ObservationFilterChainDecorator.java:137) ~[spring-security-web-6.2.0.jar:6.2.0]
        at org.springframework.security.web.session.DisableEncodeUrlFilter.doFilterInternal(DisableEncodeUrlFilter.java:42) ~[spring-security-web-6.2.0.jar:6.2.0]
        at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:116) ~[spring-web-6.1.1.jar:6.1.1]
        at org.springframework.security.web.ObservationFilterChainDecorator$ObservationFilter.wrapFilter(ObservationFilterChainDecorator.java:240) ~[spring-security-web-6.2.0.jar:6.2.0]
        at org.springframework.security.web.ObservationFilterChainDecorator$AroundFilterObservation$SimpleAroundFilterObservation.lambda$wrap$0(ObservationFilterChainDecorator.java:323) ~[spring-security-web-6.2.0.jar:6.2.0]
        at org.springframework.security.web.ObservationFilterChainDecorator$ObservationFilter.doFilter(ObservationFilterChainDecorator.java:224) ~[spring-security-web-6.2.0.jar:6.2.0]
        at org.springframework.security.web.ObservationFilterChainDecorator$VirtualFilterChain.doFilter(ObservationFilterChainDecorator.java:137) ~[spring-security-web-6.2.0.jar:6.2.0]
        at org.springframework.security.web.FilterChainProxy.doFilterInternal(FilterChainProxy.java:233) ~[spring-security-web-6.2.0.jar:6.2.0]
        at org.springframework.security.web.FilterChainProxy.doFilter(FilterChainProxy.java:191) ~[spring-security-web-6.2.0.jar:6.2.0]        
        at org.springframework.web.filter.DelegatingFilterProxy.invokeDelegate(DelegatingFilterProxy.java:352) ~[spring-web-6.1.1.jar:6.1.1]   
        at org.springframework.web.filter.DelegatingFilterProxy.doFilter(DelegatingFilterProxy.java:268) ~[spring-web-6.1.1.jar:6.1.1]
        at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:174) ~[tomcat-embed-core-10.1.16.jar:10.1.16]
        at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:149) ~[tomcat-embed-core-10.1.16.jar:10.1.16]  
        at org.springframework.web.filter.RequestContextFilter.doFilterInternal(RequestContextFilter.java:100) ~[spring-web-6.1.1.jar:6.1.1]   
        at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:116) ~[spring-web-6.1.1.jar:6.1.1]
        at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:174) ~[tomcat-embed-core-10.1.16.jar:10.1.16]
        at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:149) ~[tomcat-embed-core-10.1.16.jar:10.1.16]  
        at org.springframework.web.filter.FormContentFilter.doFilterInternal(FormContentFilter.java:93) ~[spring-web-6.1.1.jar:6.1.1]
        at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:116) ~[spring-web-6.1.1.jar:6.1.1]
        at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:174) ~[tomcat-embed-core-10.1.16.jar:10.1.16]
        at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:149) ~[tomcat-embed-core-10.1.16.jar:10.1.16]  
        at org.springframework.web.filter.ServerHttpObservationFilter.doFilterInternal(ServerHttpObservationFilter.java:109) ~[spring-web-6.1.1.jar:6.1.1]
        at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:116) ~[spring-web-6.1.1.jar:6.1.1]
        at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:174) ~[tomcat-embed-core-10.1.16.jar:10.1.16]
        at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:149) ~[tomcat-embed-core-10.1.16.jar:10.1.16]  
        at org.springframework.web.filter.CharacterEncodingFilter.doFilterInternal(CharacterEncodingFilter.java:201) ~[spring-web-6.1.1.jar:6.1.1]
        at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:116) ~[spring-web-6.1.1.jar:6.1.1]
        at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:174) ~[tomcat-embed-core-10.1.16.jar:10.1.16]
        at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:149) ~[tomcat-embed-core-10.1.16.jar:10.1.16]  
        at org.apache.catalina.core.StandardWrapperValve.invoke(StandardWrapperValve.java:167) ~[tomcat-embed-core-10.1.16.jar:10.1.16]        
        at org.apache.catalina.core.StandardContextValve.invoke(StandardContextValve.java:90) ~[tomcat-embed-core-10.1.16.jar:10.1.16]
        at org.apache.catalina.authenticator.AuthenticatorBase.invoke(AuthenticatorBase.java:482) ~[tomcat-embed-core-10.1.16.jar:10.1.16]     
        at org.apache.catalina.core.StandardHostValve.invoke(StandardHostValve.java:115) ~[tomcat-embed-core-10.1.16.jar:10.1.16]
        at org.apache.catalina.valves.ErrorReportValve.invoke(ErrorReportValve.java:93) ~[tomcat-embed-core-10.1.16.jar:10.1.16]
        at org.apache.catalina.core.StandardEngineValve.invoke(StandardEngineValve.java:74) ~[tomcat-embed-core-10.1.16.jar:10.1.16]
        at org.apache.catalina.connector.CoyoteAdapter.service(CoyoteAdapter.java:340) ~[tomcat-embed-core-10.1.16.jar:10.1.16]
        at org.apache.coyote.http11.Http11Processor.service(Http11Processor.java:391) ~[tomcat-embed-core-10.1.16.jar:10.1.16]
        at org.apache.coyote.AbstractProcessorLight.process(AbstractProcessorLight.java:63) ~[tomcat-embed-core-10.1.16.jar:10.1.16]
        at org.apache.coyote.AbstractProtocol$ConnectionHandler.process(AbstractProtocol.java:896) ~[tomcat-embed-core-10.1.16.jar:10.1.16]    
        at org.apache.tomcat.util.net.NioEndpoint$SocketProcessor.doRun(NioEndpoint.java:1744) ~[tomcat-embed-core-10.1.16.jar:10.1.16]        
        at org.apache.tomcat.util.net.SocketProcessorBase.run(SocketProcessorBase.java:52) ~[tomcat-embed-core-10.1.16.jar:10.1.16]
        at org.apache.tomcat.util.threads.ThreadPoolExecutor.runWorker(ThreadPoolExecutor.java:1191) ~[tomcat-embed-core-10.1.16.jar:10.1.16]  
        at org.apache.tomcat.util.threads.ThreadPoolExecutor$Worker.run(ThreadPoolExecutor.java:659) ~[tomcat-embed-core-10.1.16.jar:10.1.16]  
        at org.apache.tomcat.util.threads.TaskThread$WrappingRunnable.run(TaskThread.java:61) ~[tomcat-embed-core-10.1.16.jar:10.1.16]
        at java.base/java.lang.Thread.run(Thread.java:1583) ~[na:na]