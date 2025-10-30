           
2025-10-30T08:50:07.6791635Z Downloaded from central: https://repo.maven.apache.org/maven2/org/codehaus/plexus/plexus-utils/3.5.0/plexus-utils-3.5.0.jar (267 kB at 3.1 MB/s)
2025-10-30T08:50:07.7847860Z [INFO] Changes detected - recompiling the module! :source
2025-10-30T08:50:07.7867637Z [INFO] Compiling 5 source files with javac [debug release 21] to target/classes
2025-10-30T08:50:08.8621510Z [INFO] -------------------------------------------------------------
2025-10-30T08:50:08.8624913Z [ERROR] COMPILATION ERROR : 
2025-10-30T08:50:08.8628843Z [INFO] -------------------------------------------------------------
2025-10-30T08:50:08.8631446Z [ERROR] /home/runner/work/b2b-marketplace/b2b-marketplace/backend/src/main/java/com/p4/backend/common/feature/FeatureFlag.java:[7,38] package jakarta.validation.constraints does not exist
2025-10-30T08:50:08.8637016Z [ERROR] /home/runner/work/b2b-marketplace/b2b-marketplace/backend/src/main/java/com/p4/backend/common/feature/FeatureFlag.java:[18,6] cannot find symbol
2025-10-30T08:50:08.8638080Z   symbol:   class NotNull
2025-10-30T08:50:08.8638531Z   location: class com.p4.backend.common.feature.FeatureFlag
2025-10-30T08:50:08.8639001Z [INFO] 2 errors 
2025-10-30T08:50:08.8639335Z [INFO] -------------------------------------------------------------
2025-10-30T08:50:08.8639825Z [INFO] ------------------------------------------------------------------------
2025-10-30T08:50:08.8640307Z [INFO] BUILD FAILURE
2025-10-30T08:50:08.8640704Z [INFO] ------------------------------------------------------------------------
2025-10-30T08:50:08.8647096Z [INFO] Total time:  16.024 s
2025-10-30T08:50:08.8649582Z [INFO] Finished at: 2025-10-30T08:50:08Z
2025-10-30T08:50:08.8650986Z [INFO] ------------------------------------------------------------------------
2025-10-30T08:50:08.8657916Z [ERROR] Failed to execute goal org.apache.maven.plugins:maven-compiler-plugin:3.11.0:compile (default-compile) on project b2b-marketplace-backend: Compilation failure: Compilation failure: 
2025-10-30T08:50:08.8661448Z [ERROR] /home/runner/work/b2b-marketplace/b2b-marketplace/backend/src/main/java/com/p4/backend/common/feature/FeatureFlag.java:[7,38] package jakarta.validation.constraints does not exist
2025-10-30T08:50:08.8663315Z [ERROR] /home/runner/work/b2b-marketplace/b2b-marketplace/backend/src/main/java/com/p4/backend/common/feature/FeatureFlag.java:[18,6] cannot find symbol
2025-10-30T08:50:08.8664449Z [ERROR]   symbol:   class NotNull
2025-10-30T08:50:08.8664986Z [ERROR]   location: class com.p4.backend.common.feature.FeatureFlag
2025-10-30T08:50:08.8665501Z [ERROR] -> [Help 1]
2025-10-30T08:50:08.8665780Z [ERROR] 
2025-10-30T08:50:08.8666234Z [ERROR] To see the full stack trace of the errors, re-run Maven with the -e switch.
2025-10-30T08:50:08.8666900Z [ERROR] Re-run Maven using the -X switch to enable full debug logging.
2025-10-30T08:50:08.8667409Z [ERROR] 
2025-10-30T08:50:08.8667971Z [ERROR] For more information about the errors and possible solutions, please read the following articles:
2025-10-30T08:50:08.8668802Z [ERROR] [Help 1] http://cwiki.apache.org/confluence/display/MAVEN/MojoFailureException
2025-10-30T08:50:08.8840670Z ##[error]Process completed with exit code 1.
2025-10-30T08:50:08.8936732Z Post job cleanup.
2025-10-30T08:50:09.0616778Z Post job cleanup.
2025-10-30T08:50:09.1536116Z [command]/usr/bin/git version
2025-10-30T08:50:09.1586214Z git version 2.51.0
2025-10-30T08:50:09.1643862Z Temporarily overriding HOME='/home/runner/work/_temp/ab133322-5311-4dc8-8633-ec84e51ca237' before making global git config changes
2025-10-30T08:50:09.1645016Z Adding repository directory to the temporary git global config as a safe directory
2025-10-30T08:50:09.1651961Z [command]/usr/bin/git config --global --add safe.directory /home/runner/work/b2b-marketplace/b2b-marketplace
2025-10-30T08:50:09.1703080Z [command]/usr/bin/git config --local --name-only --get-regexp core\.sshCommand
2025-10-30T08:50:09.1738423Z [command]/usr/bin/git submodule foreach --recursive sh -c "git config --local --name-only --get-regexp 'core\.sshCommand' && git config --local --unset-all 'core.sshCommand' || :"
2025-10-30T08:50:09.1944947Z [command]/usr/bin/git config --local --name-only --get-regexp http\.https\:\/\/github\.com\/\.extraheader
2025-10-30T08:50:09.1965294Z http.https://github.com/.extraheader
2025-10-30T08:50:09.1976497Z [command]/usr/bin/git config --local --unset-all http.https://github.com/.extraheader
2025-10-30T08:50:09.2007070Z [command]/usr/bin/git submodule foreach --recursive sh -c "git config --local --name-only --get-regexp 'http\.https\:\/\/github\.com\/\.extraheader' && git config --local --unset-all 'http.https://github.com/.extraheader' || :"
2025-10-30T08:50:09.2307894Z Cleaning up orphan processes