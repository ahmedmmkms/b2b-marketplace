2025-10-15T12:01:22.6742802Z Downloaded from central: https://repo.maven.apache.org/maven2/org/codehaus/plexus/plexus-compiler-javac/2.15.0/plexus-compiler-javac-2.15.0.jar (26 kB at 343 kB/s)
2025-10-15T12:01:22.7988111Z [INFO] Recompiling the module because of changed source code.
2025-10-15T12:01:22.8203064Z [INFO] Compiling 3 source files with javac [debug parameters release 21] to target/classes
2025-10-15T12:01:24.6275095Z [INFO] Annotation processing is enabled because one or more processors were found
2025-10-15T12:01:24.6276424Z   on the class path. A future release of javac may disable annotation processing
2025-10-15T12:01:24.6277212Z   unless at least one processor is specified by name (-processor), or a search
2025-10-15T12:01:24.6277695Z   path is specified (--processor-path, --processor-module-path), or annotation
2025-10-15T12:01:24.6278154Z   processing is enabled explicitly (-proc:only, -proc:full).
2025-10-15T12:01:24.6278508Z   Use -Xlint:-options to suppress this message.
2025-10-15T12:01:24.6278811Z   Use -proc:none to disable annotation processing.
2025-10-15T12:01:24.6279180Z [INFO] -------------------------------------------------------------
2025-10-15T12:01:24.6279482Z [ERROR] COMPILATION ERROR : 
2025-10-15T12:01:24.6279750Z [INFO] -------------------------------------------------------------
2025-10-15T12:01:24.6280447Z [ERROR] /home/runner/work/b2b-marketplace/b2b-marketplace/backend/src/main/java/com/p4/backend/config/ULIDConfig.java:[15,16] invalid method reference
2025-10-15T12:01:24.6281352Z   cannot find symbol
2025-10-15T12:01:24.6281703Z     symbol:   method generate()
2025-10-15T12:01:24.6282172Z     location: class com.github.f4b6a3.ulid.UlidCreator
2025-10-15T12:01:24.6284096Z [INFO] 1 error
2025-10-15T12:01:24.6284560Z [INFO] -------------------------------------------------------------
2025-10-15T12:01:24.6285234Z [INFO] ------------------------------------------------------------------------
2025-10-15T12:01:24.6285784Z [INFO] BUILD FAILURE
2025-10-15T12:01:24.6286249Z [INFO] ------------------------------------------------------------------------
2025-10-15T12:01:24.6295071Z [INFO] Total time:  25.028 s
2025-10-15T12:01:24.6298065Z [INFO] Finished at: 2025-10-15T12:01:24Z
2025-10-15T12:01:24.6298766Z [INFO] ------------------------------------------------------------------------
2025-10-15T12:01:24.6304606Z [ERROR] Failed to execute goal org.apache.maven.plugins:maven-compiler-plugin:3.13.0:compile (default-compile) on project p4-backend: Compilation failure
2025-10-15T12:01:24.6306591Z [ERROR] /home/runner/work/b2b-marketplace/b2b-marketplace/backend/src/main/java/com/p4/backend/config/ULIDConfig.java:[15,16] invalid method reference
2025-10-15T12:01:24.6307785Z [ERROR]   cannot find symbol
2025-10-15T12:01:24.6308181Z [ERROR]     symbol:   method generate()
2025-10-15T12:01:24.6308728Z [ERROR]     location: class com.github.f4b6a3.ulid.UlidCreator
2025-10-15T12:01:24.6309226Z [ERROR] 
2025-10-15T12:01:24.6309499Z [ERROR] -> [Help 1]
2025-10-15T12:01:24.6309801Z [ERROR] 
2025-10-15T12:01:24.6310294Z [ERROR] To see the full stack trace of the errors, re-run Maven with the -e switch.
2025-10-15T12:01:24.6311106Z [ERROR] Re-run Maven using the -X switch to enable full debug logging.
2025-10-15T12:01:24.6311671Z [ERROR] 
2025-10-15T12:01:24.6312289Z [ERROR] For more information about the errors and possible solutions, please read the following articles:
2025-10-15T12:01:24.6313366Z [ERROR] [Help 1] http://cwiki.apache.org/confluence/display/MAVEN/MojoFailureException
2025-10-15T12:01:24.6570773Z ##[error]Process completed with exit code 1.
2025-10-15T12:01:24.6685931Z Post job cleanup.
2025-10-15T12:01:24.8445974Z Post job cleanup.
2025-10-15T12:01:24.9428803Z [command]/usr/bin/git version
2025-10-15T12:01:24.9465540Z git version 2.51.0
2025-10-15T12:01:24.9508572Z Temporarily overriding HOME='/home/runner/work/_temp/b63a46e4-4bc6-49f7-b31d-3f0a45b526f4' before making global git config changes
2025-10-15T12:01:24.9509624Z Adding repository directory to the temporary git global config as a safe directory
2025-10-15T12:01:24.9514059Z [command]/usr/bin/git config --global --add safe.directory /home/runner/work/b2b-marketplace/b2b-marketplace
2025-10-15T12:01:24.9549099Z [command]/usr/bin/git config --local --name-only --get-regexp core\.sshCommand
2025-10-15T12:01:24.9581910Z [command]/usr/bin/git submodule foreach --recursive sh -c "git config --local --name-only --get-regexp 'core\.sshCommand' && git config --local --unset-all 'core.sshCommand' || :"
2025-10-15T12:01:24.9804649Z [command]/usr/bin/git config --local --name-only --get-regexp http\.https\:\/\/github\.com\/\.extraheader
2025-10-15T12:01:24.9824868Z http.https://github.com/.extraheader
2025-10-15T12:01:24.9837104Z [command]/usr/bin/git config --local --unset-all http.https://github.com/.extraheader
2025-10-15T12:01:24.9868504Z [command]/usr/bin/git submodule foreach --recursive sh -c "git config --local --name-only --get-regexp 'http\.https\:\/\/github\.com\/\.extraheader' && git config --local --unset-all 'http.https://github.com/.extraheader' || :"
2025-10-15T12:01:25.0200597Z Cleaning up orphan processes