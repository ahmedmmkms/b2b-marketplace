2025-10-16T04:54:12.8190684Z                     
2025-10-16T04:54:12.8191559Z Downloaded from central: https://repo.maven.apache.org/maven2/com/thoughtworks/qdox/qdox/2.0.3/qdox-2.0.3.jar (334 kB at 4.1 MB/s)
2025-10-16T04:54:12.9273182Z [INFO] Recompiling the module because of changed source code.
2025-10-16T04:54:12.9426790Z [INFO] Compiling 8 source files with javac [debug parameters release 21] to target/classes
2025-10-16T04:54:14.6437080Z [INFO] Annotation processing is enabled because one or more processors were found
2025-10-16T04:54:14.6437979Z   on the class path. A future release of javac may disable annotation processing
2025-10-16T04:54:14.6439848Z   unless at least one processor is specified by name (-processor), or a search
2025-10-16T04:54:14.6441627Z   path is specified (--processor-path, --processor-module-path), or annotation
2025-10-16T04:54:14.6442110Z   processing is enabled explicitly (-proc:only, -proc:full).
2025-10-16T04:54:14.6442635Z   Use -Xlint:-options to suppress this message.
2025-10-16T04:54:14.6442964Z   Use -proc:none to disable annotation processing.
2025-10-16T04:54:14.6443304Z [INFO] -------------------------------------------------------------
2025-10-16T04:54:14.6444112Z [ERROR] COMPILATION ERROR : 
2025-10-16T04:54:14.6444574Z [INFO] -------------------------------------------------------------
2025-10-16T04:54:14.6445902Z [ERROR] /home/runner/work/b2b-marketplace/b2b-marketplace/backend/src/main/java/com/p4/backend/util/ULIDGeneratorService.java:[70,27] cannot find symbol
2025-10-16T04:54:14.6447203Z   symbol:   method getUlidFromTimestamp(long)
2025-10-16T04:54:14.6447754Z   location: class com.github.f4b6a3.ulid.UlidCreator
2025-10-16T04:54:14.6449437Z [ERROR] /home/runner/work/b2b-marketplace/b2b-marketplace/backend/src/main/java/com/p4/backend/util/ULIDGeneratorService.java:[81,37] cannot find symbol
2025-10-16T04:54:14.6450696Z   symbol:   method getTimestamp()
2025-10-16T04:54:14.6451186Z   location: class com.github.f4b6a3.ulid.Ulid
2025-10-16T04:54:14.6451640Z [INFO] 2 errors 
2025-10-16T04:54:14.6452054Z [INFO] -------------------------------------------------------------
2025-10-16T04:54:14.6453711Z [INFO] ------------------------------------------------------------------------
2025-10-16T04:54:14.6454225Z [INFO] BUILD FAILURE
2025-10-16T04:54:14.6454652Z [INFO] ------------------------------------------------------------------------
2025-10-16T04:54:14.6482986Z [INFO] Total time:  32.373 s
2025-10-16T04:54:14.6483670Z [INFO] Finished at: 2025-10-16T04:54:14Z
2025-10-16T04:54:14.6484422Z [INFO] ------------------------------------------------------------------------
2025-10-16T04:54:14.6486032Z [ERROR] Failed to execute goal org.apache.maven.plugins:maven-compiler-plugin:3.13.0:compile (default-compile) on project p4-backend: Compilation failure: Compilation failure: 
2025-10-16T04:54:14.6488224Z [ERROR] /home/runner/work/b2b-marketplace/b2b-marketplace/backend/src/main/java/com/p4/backend/util/ULIDGeneratorService.java:[70,27] cannot find symbol
2025-10-16T04:54:14.6489821Z [ERROR]   symbol:   method getUlidFromTimestamp(long)
2025-10-16T04:54:14.6490616Z [ERROR]   location: class com.github.f4b6a3.ulid.UlidCreator
2025-10-16T04:54:14.6492196Z [ERROR] /home/runner/work/b2b-marketplace/b2b-marketplace/backend/src/main/java/com/p4/backend/util/ULIDGeneratorService.java:[81,37] cannot find symbol
2025-10-16T04:54:14.6493904Z [ERROR]   symbol:   method getTimestamp()
2025-10-16T04:54:14.6494706Z [ERROR]   location: class com.github.f4b6a3.ulid.Ulid
2025-10-16T04:54:14.6495446Z [ERROR] -> [Help 1]
2025-10-16T04:54:14.6495782Z [ERROR] 
2025-10-16T04:54:14.6496295Z [ERROR] To see the full stack trace of the errors, re-run Maven with the -e switch.
2025-10-16T04:54:14.6497093Z [ERROR] Re-run Maven using the -X switch to enable full debug logging.
2025-10-16T04:54:14.6497707Z [ERROR] 
2025-10-16T04:54:14.6498456Z [ERROR] For more information about the errors and possible solutions, please read the following articles:
2025-10-16T04:54:14.6499523Z [ERROR] [Help 1] http://cwiki.apache.org/confluence/display/MAVEN/MojoFailureException
2025-10-16T04:54:14.6838248Z ##[error]Process completed with exit code 1.
2025-10-16T04:54:14.6938549Z Post job cleanup.
2025-10-16T04:54:14.8642923Z Post job cleanup.
2025-10-16T04:54:14.9580004Z [command]/usr/bin/git version
2025-10-16T04:54:14.9620664Z git version 2.51.0
2025-10-16T04:54:14.9665088Z Temporarily overriding HOME='/home/runner/work/_temp/979a2ba9-3cfa-4746-8044-334b5a7b2072' before making global git config changes
2025-10-16T04:54:14.9666310Z Adding repository directory to the temporary git global config as a safe directory
2025-10-16T04:54:14.9671288Z [command]/usr/bin/git config --global --add safe.directory /home/runner/work/b2b-marketplace/b2b-marketplace
2025-10-16T04:54:14.9706069Z [command]/usr/bin/git config --local --name-only --get-regexp core\.sshCommand
2025-10-16T04:54:14.9737992Z [command]/usr/bin/git submodule foreach --recursive sh -c "git config --local --name-only --get-regexp 'core\.sshCommand' && git config --local --unset-all 'core.sshCommand' || :"
2025-10-16T04:54:14.9961643Z [command]/usr/bin/git config --local --name-only --get-regexp http\.https\:\/\/github\.com\/\.extraheader
2025-10-16T04:54:14.9982001Z http.https://github.com/.extraheader
2025-10-16T04:54:14.9994818Z [command]/usr/bin/git config --local --unset-all http.https://github.com/.extraheader
2025-10-16T04:54:15.0025025Z [command]/usr/bin/git submodule foreach --recursive sh -c "git config --local --name-only --get-regexp 'http\.https\:\/\/github\.com\/\.extraheader' && git config --local --unset-all 'http.https://github.com/.extraheader' || :"
2025-10-16T04:54:15.0339032Z Cleaning up orphan processes