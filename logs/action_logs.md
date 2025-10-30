Downloaded from central: https://repo.maven.apache.org/maven2/org/codehaus/plexus/plexus-compiler-javac/2.13.0/plexus-compiler-javac-2.13.0.jar (23 kB at 168 kB/s)
[INFO] Changes detected - recompiling the module! :source
[INFO] Compiling 15 source files with javac [debug release 21] to target/classes
[INFO] Some messages have been simplified; recompile with -Xdiags:verbose to get full output
[INFO] -------------------------------------------------------------
Error:  COMPILATION ERROR : 
[INFO] -------------------------------------------------------------
Error:  /home/runner/work/b2b-marketplace/b2b-marketplace/backend/src/main/java/com/p4/backend/common/GlobalExceptionHandler.java:[32,57] incompatible types: org.springframework.http.HttpStatusCode cannot be converted to org.springframework.http.HttpStatus
[INFO] 1 error
[INFO] -------------------------------------------------------------
[INFO] ------------------------------------------------------------------------
[INFO] BUILD FAILURE
[INFO] ------------------------------------------------------------------------
[INFO] Total time:  18.896 s
[INFO] Finished at: 2025-10-30T13:59:22Z
[INFO] ------------------------------------------------------------------------
Error:  Failed to execute goal org.apache.maven.plugins:maven-compiler-plugin:3.11.0:compile (default-compile) on project b2b-marketplace-backend: Compilation failure
Error:  /home/runner/work/b2b-marketplace/b2b-marketplace/backend/src/main/java/com/p4/backend/common/GlobalExceptionHandler.java:[32,57] incompatible types: org.springframework.http.HttpStatusCode cannot be converted to org.springframework.http.HttpStatus
Error:  
Error:  -> [Help 1]
Error:  
Error:  To see the full stack trace of the errors, re-run Maven with the -e switch.
Error:  Re-run Maven using the -X switch to enable full debug logging.
Error:  
Error:  For more information about the errors and possible solutions, please read the following articles:
Error:  [Help 1] http://cwiki.apache.org/confluence/display/MAVEN/MojoFailureException
Error: Process completed with exit code 1.