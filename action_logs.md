Run chmod +x ./mvnw
[INFO] Scanning for projects...
[INFO] 
[INFO] -------------------------< com.p4:p4-backend >--------------------------
[INFO] Building p4-backend 0.0.1-SNAPSHOT
[INFO]   from pom.xml
[INFO] --------------------------------[ jar ]---------------------------------
[INFO] 
[INFO] --- flyway:10.20.1:repair (default-cli) @ p4-backend ---
[INFO] ------------------------------------------------------------------------
[INFO] BUILD FAILURE
[INFO] ------------------------------------------------------------------------
[INFO] Total time:  29.352 s
[INFO] Finished at: 2025-10-15T19:10:38Z
[INFO] ------------------------------------------------------------------------
Error:  Failed to execute goal org.flywaydb:flyway-maven-plugin:10.20.1:repair (default-cli) on project p4-backend: org.flywaydb.core.api.FlywayException: Unable to connect to the database. Configure the url, user and password! -> [Help 1]
Error:  
Error:  To see the full stack trace of the errors, re-run Maven with the -e switch.
Error:  Re-run Maven using the -X switch to enable full debug logging.
Error:  
Error:  For more information about the errors and possible solutions, please read the following articles:
Error:  [Help 1] http://cwiki.apache.org/confluence/display/MAVEN/MojoExecutionException
Error: Process completed with exit code 1.