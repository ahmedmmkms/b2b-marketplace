2025-10-16T18:59:28.9094185Z                    
2025-10-16T18:59:28.9097079Z Downloaded from central: https://repo.maven.apache.org/maven2/org/codehaus/plexus/plexus-compiler-javac/2.15.0/plexus-compiler-javac-2.15.0.jar (26 kB at 330 kB/s)
2025-10-16T18:59:29.1368157Z [INFO] Recompiling the module because of changed source code.
2025-10-16T18:59:29.1593229Z [INFO] Compiling 49 source files with javac [debug parameters release 21] to target/classes
2025-10-16T18:59:33.8356211Z [INFO] Annotation processing is enabled because one or more processors were found
2025-10-16T18:59:33.8357057Z   on the class path. A future release of javac may disable annotation processing
2025-10-16T18:59:33.8357910Z   unless at least one processor is specified by name (-processor), or a search
2025-10-16T18:59:33.8358926Z   path is specified (--processor-path, --processor-module-path), or annotation
2025-10-16T18:59:33.8359667Z   processing is enabled explicitly (-proc:only, -proc:full).
2025-10-16T18:59:33.8360235Z   Use -Xlint:-options to suppress this message.
2025-10-16T18:59:33.8360738Z   Use -proc:none to disable annotation processing.
2025-10-16T18:59:33.8362681Z [INFO] /home/runner/work/b2b-marketplace/b2b-marketplace/backend/src/main/java/com/p4/backend/shared/kernel/Base.java: /home/runner/work/b2b-marketplace/b2b-marketplace/backend/src/main/java/com/p4/backend/shared/kernel/Base.java uses or overrides a deprecated API.
2025-10-16T18:59:33.8365362Z [INFO] /home/runner/work/b2b-marketplace/b2b-marketplace/backend/src/main/java/com/p4/backend/shared/kernel/Base.java: Recompile with -Xlint:deprecation for details.
2025-10-16T18:59:33.8368163Z [INFO] /home/runner/work/b2b-marketplace/b2b-marketplace/backend/src/main/java/com/p4/backend/shared/kernel/AuditService.java: /home/runner/work/b2b-marketplace/b2b-marketplace/backend/src/main/java/com/p4/backend/shared/kernel/AuditService.java uses unchecked or unsafe operations.
2025-10-16T18:59:33.8371135Z [INFO] /home/runner/work/b2b-marketplace/b2b-marketplace/backend/src/main/java/com/p4/backend/shared/kernel/AuditService.java: Recompile with -Xlint:unchecked for details.
2025-10-16T18:59:33.8372505Z [INFO] -------------------------------------------------------------
2025-10-16T18:59:33.8373001Z [ERROR] COMPILATION ERROR : 
2025-10-16T18:59:33.8373435Z [INFO] -------------------------------------------------------------
2025-10-16T18:59:33.8374656Z [ERROR] /home/runner/work/b2b-marketplace/b2b-marketplace/backend/src/main/java/com/p4/backend/shared/kernel/file/B2FileUploadService.java:[55,67] cannot find symbol
2025-10-16T18:59:33.8376251Z   symbol:   method errorCode()
2025-10-16T18:59:33.8376855Z   location: variable e of type software.amazon.awssdk.services.s3.model.S3Exception
2025-10-16T18:59:33.8377469Z [INFO] 1 error
2025-10-16T18:59:33.8377830Z [INFO] -------------------------------------------------------------
2025-10-16T18:59:33.8398532Z [INFO] ------------------------------------------------------------------------
2025-10-16T18:59:33.8399098Z [INFO] BUILD FAILURE
2025-10-16T18:59:33.8399549Z [INFO] ------------------------------------------------------------------------
2025-10-16T18:59:33.8406896Z [INFO] Total time:  35.916 s
2025-10-16T18:59:33.8409318Z [INFO] Finished at: 2025-10-16T18:59:33Z
2025-10-16T18:59:33.8410045Z [INFO] ------------------------------------------------------------------------
2025-10-16T18:59:33.8417111Z [ERROR] Failed to execute goal org.apache.maven.plugins:maven-compiler-plugin:3.13.0:compile (default-compile) on project p4-backend: Compilation failure
2025-10-16T18:59:33.8421343Z [ERROR] /home/runner/work/b2b-marketplace/b2b-marketplace/backend/src/main/java/com/p4/backend/shared/kernel/file/B2FileUploadService.java:[55,67] cannot find symbol
2025-10-16T18:59:33.8422941Z [ERROR]   symbol:   method errorCode()
2025-10-16T18:59:33.8424306Z [ERROR]   location: variable e of type software.amazon.awssdk.services.s3.model.S3Exception
2025-10-16T18:59:33.8448766Z [ERROR] 
2025-10-16T18:59:33.8449334Z [ERROR] -> [Help 1]
2025-10-16T18:59:33.8449862Z [ERROR] 
2025-10-16T18:59:33.8450542Z [ERROR] To see the full stack trace of the errors, re-run Maven with the -e switch.
2025-10-16T18:59:33.8451581Z [ERROR] Re-run Maven using the -X switch to enable full debug logging.
2025-10-16T18:59:33.8452305Z [ERROR] 
2025-10-16T18:59:33.8453099Z [ERROR] For more information about the errors and possible solutions, please read the following articles:
2025-10-16T18:59:33.8454302Z [ERROR] [Help 1] http://cwiki.apache.org/confluence/display/MAVEN/MojoFailureException
2025-10-16T18:59:33.8837208Z ##[error]Process completed with exit code 1.
2025-10-16T18:59:33.8941634Z Post job cleanup.
2025-10-16T18:59:34.0792473Z Post job cleanup.
2025-10-16T18:59:34.1781128Z [command]/usr/bin/git version
2025-10-16T18:59:34.1819632Z git version 2.51.0
2025-10-16T18:59:34.1878777Z Temporarily overriding HOME='/home/runner/work/_temp/f185a2e8-bd19-40c8-8368-817fdf6d5b28' before making global git config changes
2025-10-16T18:59:34.1879843Z Adding repository directory to the temporary git global config as a safe directory
2025-10-16T18:59:34.1887356Z [command]/usr/bin/git config --global --add safe.directory /home/runner/work/b2b-marketplace/b2b-marketplace
2025-10-16T18:59:34.1939977Z [command]/usr/bin/git config --local --name-only --get-regexp core\.sshCommand
2025-10-16T18:59:34.1986967Z [command]/usr/bin/git submodule foreach --recursive sh -c "git config --local --name-only --get-regexp 'core\.sshCommand' && git config --local --unset-all 'core.sshCommand' || :"
2025-10-16T18:59:34.2261584Z [command]/usr/bin/git config --local --name-only --get-regexp http\.https\:\/\/github\.com\/\.extraheader
2025-10-16T18:59:34.2291192Z http.https://github.com/.extraheader
2025-10-16T18:59:34.2310568Z [command]/usr/bin/git config --local --unset-all http.https://github.com/.extraheader
2025-10-16T18:59:34.2353836Z [command]/usr/bin/git submodule foreach --recursive sh -c "git config --local --name-only --get-regexp 'http\.https\:\/\/github\.com\/\.extraheader' && git config --local --unset-all 'http.https://github.com/.extraheader' || :"
2025-10-16T18:59:34.2740522Z Cleaning up orphan processes