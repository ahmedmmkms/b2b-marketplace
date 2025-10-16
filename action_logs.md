2025-10-16T11:17:41.6548296Z                     
2025-10-16T11:17:41.6549787Z Downloaded from central: https://repo.maven.apache.org/maven2/org/codehaus/plexus/plexus-utils/4.0.0/plexus-utils-4.0.0.jar (192 kB at 2.3 MB/s)
2025-10-16T11:17:41.7961971Z [INFO] Recompiling the module because of changed source code.
2025-10-16T11:17:41.8378232Z [INFO] Compiling 30 source files with javac [debug parameters release 21] to target/classes
2025-10-16T11:17:45.0488850Z [INFO] Annotation processing is enabled because one or more processors were found
2025-10-16T11:17:45.0493372Z   on the class path. A future release of javac may disable annotation processing
2025-10-16T11:17:45.0495343Z   unless at least one processor is specified by name (-processor), or a search
2025-10-16T11:17:45.0496765Z   path is specified (--processor-path, --processor-module-path), or annotation
2025-10-16T11:17:45.0498168Z   processing is enabled explicitly (-proc:only, -proc:full).
2025-10-16T11:17:45.0499184Z   Use -Xlint:-options to suppress this message.
2025-10-16T11:17:45.0500006Z   Use -proc:none to disable annotation processing.
2025-10-16T11:17:45.0500863Z [INFO] -------------------------------------------------------------
2025-10-16T11:17:45.0503225Z [ERROR] COMPILATION ERROR : 
2025-10-16T11:17:45.0503722Z [INFO] -------------------------------------------------------------
2025-10-16T11:17:45.0505877Z [ERROR] /home/runner/work/b2b-marketplace/b2b-marketplace/backend/src/main/java/com/p4/backend/pagination/PageRequest.java:[17,8] com.p4.backend.pagination.PageRequest is not abstract and does not override abstract method withPage(int) in org.springframework.data.domain.Pageable
2025-10-16T11:17:45.0513282Z [INFO] 1 error
2025-10-16T11:17:45.0513724Z [INFO] -------------------------------------------------------------
2025-10-16T11:17:45.0514410Z [INFO] ------------------------------------------------------------------------
2025-10-16T11:17:45.0514977Z [INFO] BUILD FAILURE
2025-10-16T11:17:45.0515454Z [INFO] ------------------------------------------------------------------------
2025-10-16T11:17:45.0516020Z [INFO] Total time:  29.169 s
2025-10-16T11:17:45.0516441Z [INFO] Finished at: 2025-10-16T11:17:45Z
2025-10-16T11:17:45.0516985Z [INFO] ------------------------------------------------------------------------
2025-10-16T11:17:45.0545137Z [ERROR] Failed to execute goal org.apache.maven.plugins:maven-compiler-plugin:3.13.0:compile (default-compile) on project p4-backend: Compilation failure
2025-10-16T11:17:45.0569312Z [ERROR] /home/runner/work/b2b-marketplace/b2b-marketplace/backend/src/main/java/com/p4/backend/pagination/PageRequest.java:[17,8] com.p4.backend.pagination.PageRequest is not abstract and does not override abstract method withPage(int) in org.springframework.data.domain.Pageable
2025-10-16T11:17:45.0572226Z [ERROR] 
2025-10-16T11:17:45.0572480Z [ERROR] -> [Help 1]
2025-10-16T11:17:45.0572671Z [ERROR] 
2025-10-16T11:17:45.0572986Z [ERROR] To see the full stack trace of the errors, re-run Maven with the -e switch.
2025-10-16T11:17:45.0573469Z [ERROR] Re-run Maven using the -X switch to enable full debug logging.
2025-10-16T11:17:45.0573784Z [ERROR] 
2025-10-16T11:17:45.0574158Z [ERROR] For more information about the errors and possible solutions, please read the following articles:
2025-10-16T11:17:45.0574760Z [ERROR] [Help 1] http://cwiki.apache.org/confluence/display/MAVEN/MojoFailureException
2025-10-16T11:17:45.0938141Z ##[error]Process completed with exit code 1.
2025-10-16T11:17:45.1037990Z Post job cleanup.
2025-10-16T11:17:45.2745657Z Post job cleanup.
2025-10-16T11:17:45.3726114Z [command]/usr/bin/git version
2025-10-16T11:17:45.3766119Z git version 2.51.0
2025-10-16T11:17:45.3810045Z Temporarily overriding HOME='/home/runner/work/_temp/63483a80-a4ee-40cc-8898-3b54839c8a3c' before making global git config changes
2025-10-16T11:17:45.3811927Z Adding repository directory to the temporary git global config as a safe directory
2025-10-16T11:17:45.3815136Z [command]/usr/bin/git config --global --add safe.directory /home/runner/work/b2b-marketplace/b2b-marketplace
2025-10-16T11:17:45.3858693Z [command]/usr/bin/git config --local --name-only --get-regexp core\.sshCommand
2025-10-16T11:17:45.3892437Z [command]/usr/bin/git submodule foreach --recursive sh -c "git config --local --name-only --get-regexp 'core\.sshCommand' && git config --local --unset-all 'core.sshCommand' || :"
2025-10-16T11:17:45.4138724Z [command]/usr/bin/git config --local --name-only --get-regexp http\.https\:\/\/github\.com\/\.extraheader
2025-10-16T11:17:45.4158823Z http.https://github.com/.extraheader
2025-10-16T11:17:45.4172008Z [command]/usr/bin/git config --local --unset-all http.https://github.com/.extraheader
2025-10-16T11:17:45.4201932Z [command]/usr/bin/git submodule foreach --recursive sh -c "git config --local --name-only --get-regexp 'http\.https\:\/\/github\.com\/\.extraheader' && git config --local --unset-all 'http.https://github.com/.extraheader' || :"
2025-10-16T11:17:45.4518689Z Cleaning up orphan processes