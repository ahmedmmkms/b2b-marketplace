2025-10-31T21:25:48.636+02:00  INFO 38040 --- [b2b-marketplace] [           main] com.p4.backend.BackendApplication        : Starting BackendApplication using Java 21.0.8 with PID 38040 (D:\Projects\b2b-marketplace\backend\target\classes started by ahmed in D:\Projects\b2b-marketplace\backend)
2025-10-31T21:25:48.640+02:00  INFO 38040 --- [b2b-marketplace] [           main] com.p4.backend.BackendApplication        : The following 1 profile is active: "prod"
2025-10-31T21:25:50.111+02:00  INFO 38040 --- [b2b-marketplace] [           main] .s.d.r.c.RepositoryConfigurationDelegate : Bootstrapping Spring Data JPA repositories in DEFAULT mode.
2025-10-31T21:25:50.279+02:00  INFO 38040 --- [b2b-marketplace] [           main] .s.d.r.c.RepositoryConfigurationDelegate : Finished Spring Data repository scanning in 146 ms. Found 6 JPA repository interfaces.
2025-10-31T21:25:51.632+02:00  INFO 38040 --- [b2b-marketplace] [           main] o.s.b.w.embedded.tomcat.TomcatWebServer  : Tomcat initialized with port 8080 (http)
2025-10-31T21:25:51.646+02:00  INFO 38040 --- [b2b-marketplace] [           main] o.apache.catalina.core.StandardService   : Starting service [Tomcat]
2025-10-31T21:25:51.646+02:00  INFO 38040 --- [b2b-marketplace] [           main] o.apache.catalina.core.StandardEngine    : Starting Servlet engine: [Apache Tomcat/10.1.16]
2025-10-31T21:25:51.760+02:00  INFO 38040 --- [b2b-marketplace] [           main] o.a.c.c.C.[Tomcat].[localhost].[/]       : Initializing Spring embedded WebApplicationContext
2025-10-31T21:25:51.762+02:00  INFO 38040 --- [b2b-marketplace] [           main] w.s.c.ServletWebServerApplicationContext : Root WebApplicationContext: initialization completed in 3037 ms
2025-10-31T21:25:51.934+02:00  INFO 38040 --- [b2b-marketplace] [           main] com.zaxxer.hikari.HikariDataSource       : HikariPool-1 - Starting...
2025-10-31T21:25:54.396+02:00  INFO 38040 --- [b2b-marketplace] [           main] com.zaxxer.hikari.pool.HikariPool        : HikariPool-1 - Added connection org.postgresql.jdbc.PgConnection@2bfc2f8b
2025-10-31T21:25:54.398+02:00  INFO 38040 --- [b2b-marketplace] [           main] com.zaxxer.hikari.HikariDataSource       : HikariPool-1 - Start completed.
2025-10-31T21:25:54.662+02:00  INFO 38040 --- [b2b-marketplace] [           main] o.f.c.internal.license.VersionPrinter    : Flyway Community Edition 9.22.3 by Redgate
2025-10-31T21:25:54.662+02:00  INFO 38040 --- [b2b-marketplace] [           main] o.f.c.internal.license.VersionPrinter    : See release notes here: https://rd.gt/416ObMi
2025-10-31T21:25:54.662+02:00  INFO 38040 --- [b2b-marketplace] [           main] o.f.c.internal.license.VersionPrinter    :
2025-10-31T21:25:54.825+02:00  INFO 38040 --- [b2b-marketplace] [           main] org.flywaydb.core.FlywayExecutor         : Database: jdbc:postgresql://ep-damp-feather-adc322wz-pooler.c-2.us-east-1.aws.neon.tech/neondb (PostgreSQL 17.5)
2025-10-31T21:25:55.781+02:00  WARN 38040 --- [b2b-marketplace] [           main] o.f.c.internal.database.base.Database    : Flyway upgrade recommended: PostgreSQL 17.5 is newer than this version of Flyway and support has not been tested. The latest supported version of PostgreSQL is 15.
2025-10-31T21:25:56.579+02:00  INFO 38040 --- [b2b-marketplace] [           main] o.f.core.internal.command.DbValidate     : Successfully validated ┘ح migrations (execution time ┘ب┘ب:┘ب┘ب.┘خ┘ة┘ةs)
2025-10-31T21:25:58.259+02:00  INFO 38040 --- [b2b-marketplace] [           main] o.f.core.internal.command.DbMigrate      : Current version of schema "public": 004
2025-10-31T21:25:58.405+02:00  INFO 38040 --- [b2b-marketplace] [           main] o.f.core.internal.command.DbMigrate      : Schema "public" is up to date. No migration necessary.
2025-10-31T21:25:59.391+02:00  INFO 38040 --- [b2b-marketplace] [           main] o.hibernate.jpa.internal.util.LogHelper  : HHH000204: Processing PersistenceUnitInfo [name: default]
2025-10-31T21:25:59.468+02:00  INFO 38040 --- [b2b-marketplace] [           main] org.hibernate.Version                    : HHH000412: Hibernate ORM core version 6.3.1.Final
2025-10-31T21:25:59.522+02:00  INFO 38040 --- [b2b-marketplace] [           main] o.h.c.internal.RegionFactoryInitiator    : HHH000026: Second-level cache disabled
2025-10-31T21:25:59.888+02:00  INFO 38040 --- [b2b-marketplace] [           main] o.s.o.j.p.SpringPersistenceUnitInfo      : No LoadTimeWeaver setup: ignoring JPA class transformer
2025-10-31T21:26:00.245+02:00  WARN 38040 --- [b2b-marketplace] [           main] org.hibernate.orm.deprecation            : HHH90000025: PostgreSQLDialect does not need to be specified explicitly using 'hibernate.dialect' (remove the property setting and it will be selected by default)
2025-10-31T21:26:01.826+02:00  INFO 38040 --- [b2b-marketplace] [           main] o.h.e.t.j.p.i.JtaPlatformInitiator       : HHH000489: No JTA platform available (set 'hibernate.transaction.jta.platform' to enable JTA platform integration)
2025-10-31T21:26:01.832+02:00  INFO 38040 --- [b2b-marketplace] [           main] j.LocalContainerEntityManagerFactoryBean : Initialized JPA EntityManagerFactory for persistence unit 'default'
2025-10-31T21:26:02.896+02:00  INFO 38040 --- [b2b-marketplace] [           main] o.s.d.j.r.query.QueryEnhancerFactory     : Hibernate is in classpath; If applicable, HQL parser will be used.
2025-10-31T21:26:03.823+02:00  WARN 38040 --- [b2b-marketplace] [           main] JpaBaseConfiguration$JpaWebConfiguration : spring.jpa.open-in-view is enabled by default. Therefore, database queries may be performed during view rendering. Explicitly configure spring.jpa.open-in-view to disable this warning
2025-10-31T21:26:04.842+02:00  INFO 38040 --- [b2b-marketplace] [           main] o.s.b.a.e.web.EndpointLinksResolver      : Exposing 2 endpoint(s) beneath base path '/actuator'
2025-10-31T21:26:04.964+02:00  INFO 38040 --- [b2b-marketplace] [           main] o.s.b.w.embedded.tomcat.TomcatWebServer  : Tomcat started on port 8080 (http) with context path ''
2025-10-31T21:26:04.979+02:00  INFO 38040 --- [b2b-marketplace] [           main] com.p4.backend.BackendApplication        : Started BackendApplication in 16.998 seconds (process running for 17.862)
2025-10-31T21:26:18.383+02:00  INFO 38040 --- [b2b-marketplace] [nio-8080-exec-1] o.a.c.c.C.[Tomcat].[localhost].[/]       : Initializing Spring DispatcherServlet 'dispatcherServlet'
2025-10-31T21:26:18.384+02:00  INFO 38040 --- [b2b-marketplace] [nio-8080-exec-1] o.s.web.servlet.DispatcherServlet        : Initializing Servlet 'dispatcherServlet'
2025-10-31T21:26:18.386+02:00  INFO 38040 --- [b2b-marketplace] [nio-8080-exec-1] o.s.web.servlet.DispatcherServlet        : Completed initialization in 2 ms
2025-10-31T21:26:27.508+02:00  WARN 38040 --- [b2b-marketplace] [nio-8080-exec-8] .w.s.m.s.DefaultHandlerExceptionResolver : Resolved [org.springframework.web.HttpRequestMethodNotSupportedException: Request method 'GET' is not supported]