Downloaded from central: https://repo.maven.apache.org/maven2/org/codehaus/plexus/plexus-compiler-javac/2.13.0/plexus-compiler-javac-2.13.0.jar (23 kB at 195 kB/s)
[INFO] Changes detected - recompiling the module! :source
[INFO] Compiling 21 source files with javac [debug release 21] to target/classes
[INFO] 
[INFO] --- resources:3.3.1:testResources (default-testResources) @ b2b-marketplace-backend ---
[INFO] skip non existing resourceDirectory /home/runner/work/b2b-marketplace/b2b-marketplace/backend/src/test/resources
[INFO] 
[INFO] --- compiler:3.11.0:testCompile (default-testCompile) @ b2b-marketplace-backend ---
[INFO] Changes detected - recompiling the module! :dependency
[INFO] Compiling 8 source files with javac [debug release 21] to target/test-classes
[INFO] /home/runner/work/b2b-marketplace/b2b-marketplace/backend/src/test/java/com/p4/backend/common/GlobalExceptionHandlerTest.java: /home/runner/work/b2b-marketplace/b2b-marketplace/backend/src/test/java/com/p4/backend/common/GlobalExceptionHandlerTest.java uses unchecked or unsafe operations.
[INFO] /home/runner/work/b2b-marketplace/b2b-marketplace/backend/src/test/java/com/p4/backend/common/GlobalExceptionHandlerTest.java: Recompile with -Xlint:unchecked for details.
[INFO] -------------------------------------------------------------
Error:  COMPILATION ERROR : 
[INFO] -------------------------------------------------------------
Error:  /home/runner/work/b2b-marketplace/b2b-marketplace/backend/src/test/java/com/p4/backend/catalog/service/ProductServiceTest.java:[41,23] productRepository has private access in com.p4.backend.catalog.service.ProductService
[INFO] 1 error
[INFO] -------------------------------------------------------------
[INFO] ------------------------------------------------------------------------
[INFO] BUILD FAILURE
[INFO] ------------------------------------------------------------------------
[INFO] Total time:  18.223 s
[INFO] Finished at: 2025-10-30T15:44:32Z
[INFO] ------------------------------------------------------------------------
Error:  Failed to execute goal org.apache.maven.plugins:maven-compiler-plugin:3.11.0:testCompile (default-testCompile) on project b2b-marketplace-backend: Compilation failure
Error:  /home/runner/work/b2b-marketplace/b2b-marketplace/backend/src/test/java/com/p4/backend/catalog/service/ProductServiceTest.java:[41,23] productRepository has private access in com.p4.backend.catalog.service.ProductService
Error:  
Error:  -> [Help 1]
Error:  
Error:  To see the full stack trace of the errors, re-run Maven with the -e switch.
Error:  Re-run Maven using the -X switch to enable full debug logging.
Error:  
Error:  For more information about the errors and possible solutions, please read the following articles:
Error:  [Help 1] http://cwiki.apache.org/confluence/display/MAVEN/MojoFailureException
Error: Process completed with exit code 1.