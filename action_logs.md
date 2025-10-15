2025-10-15T08:58:42.9810591Z                    
2025-10-15T08:58:42.9811434Z Downloaded from central: https://repo.maven.apache.org/maven2/org/testcontainers/testcontainers/1.20.4/testcontainers-1.20.4.jar (18 MB at 8.8 MB/s)
2025-10-15T08:58:43.0522580Z [INFO] ------------------------------------------------------------------------
2025-10-15T08:58:43.0522736Z [INFO] BUILD FAILURE
2025-10-15T08:58:43.0522976Z [INFO] ------------------------------------------------------------------------
2025-10-15T08:58:43.0538504Z [INFO] Total time:  20.130 s
2025-10-15T08:58:43.0539809Z [INFO] Finished at: 2025-10-15T08:58:43Z
2025-10-15T08:58:43.0540117Z [INFO] ------------------------------------------------------------------------
2025-10-15T08:58:43.0550066Z [ERROR] Failed to execute goal on project p4-backend: Could not resolve dependencies for project com.p4:p4-backend:jar:0.0.1-SNAPSHOT: The following artifacts could not be resolved: com.github.f4b6a3:ulid-creator:jar:6.0.0 (absent): Could not find artifact com.github.f4b6a3:ulid-creator:jar:6.0.0 in central (https://repo.maven.apache.org/maven2) -> [Help 1]
2025-10-15T08:58:43.0551205Z [ERROR] 
2025-10-15T08:58:43.0551558Z [ERROR] To see the full stack trace of the errors, re-run Maven with the -e switch.
2025-10-15T08:58:43.0551868Z [ERROR] Re-run Maven using the -X switch to enable full debug logging.
2025-10-15T08:58:43.0551979Z [ERROR] 
2025-10-15T08:58:43.0552463Z [ERROR] For more information about the errors and possible solutions, please read the following articles:
2025-10-15T08:58:43.0552949Z [ERROR] [Help 1] http://cwiki.apache.org/confluence/display/MAVEN/DependencyResolutionException
2025-10-15T08:58:43.0881545Z ##[error]Process completed with exit code 1.
2025-10-15T08:58:43.0992465Z Post job cleanup.
2025-10-15T08:58:43.2775197Z Post job cleanup.
2025-10-15T08:58:43.3742387Z [command]/usr/bin/git version
2025-10-15T08:58:43.3783604Z git version 2.51.0
2025-10-15T08:58:43.3829887Z Temporarily overriding HOME='/home/runner/work/_temp/3101eec9-0a93-4d26-b2e4-4a7ab8c4b370' before making global git config changes
2025-10-15T08:58:43.3831190Z Adding repository directory to the temporary git global config as a safe directory
2025-10-15T08:58:43.3836891Z [command]/usr/bin/git config --global --add safe.directory /home/runner/work/b2b-marketplace/b2b-marketplace
2025-10-15T08:58:43.3880259Z [command]/usr/bin/git config --local --name-only --get-regexp core\.sshCommand
2025-10-15T08:58:43.3916584Z [command]/usr/bin/git submodule foreach --recursive sh -c "git config --local --name-only --get-regexp 'core\.sshCommand' && git config --local --unset-all 'core.sshCommand' || :"
2025-10-15T08:58:43.4147050Z [command]/usr/bin/git config --local --name-only --get-regexp http\.https\:\/\/github\.com\/\.extraheader
2025-10-15T08:58:43.4169620Z http.https://github.com/.extraheader
2025-10-15T08:58:43.4183075Z [command]/usr/bin/git config --local --unset-all http.https://github.com/.extraheader
2025-10-15T08:58:43.4216212Z [command]/usr/bin/git submodule foreach --recursive sh -c "git config --local --name-only --get-regexp 'http\.https\:\/\/github\.com\/\.extraheader' && git config --local --unset-all 'http.https://github.com/.extraheader' || :"
2025-10-15T08:58:43.4539594Z Cleaning up orphan processes