25-10-16T14:36:31.2394963Z Progress (1): 192 kB    
2025-10-16T14:36:31.2395518Z                     
2025-10-16T14:36:31.2396617Z Downloaded from central: https://repo.maven.apache.org/maven2/org/codehaus/plexus/plexus-utils/4.0.0/plexus-utils-4.0.0.jar (192 kB at 2.2 MB/s)
2025-10-16T14:36:31.3808282Z [INFO] Recompiling the module because of changed source code.
2025-10-16T14:36:31.3873521Z [INFO] Compiling 30 source files with javac [debug parameters release 21] to target/classes
2025-10-16T14:36:33.1974928Z [INFO] Annotation processing is enabled because one or more processors were found
2025-10-16T14:36:33.1982569Z   on the class path. A future release of javac may disable annotation processing
2025-10-16T14:36:33.1984595Z   unless at least one processor is specified by name (-processor), or a search
2025-10-16T14:36:33.1990634Z   path is specified (--processor-path, --processor-module-path), or annotation
2025-10-16T14:36:33.1991415Z   processing is enabled explicitly (-proc:only, -proc:full).
2025-10-16T14:36:33.1992021Z   Use -Xlint:-options to suppress this message.
2025-10-16T14:36:33.1993634Z   Use -proc:none to disable annotation processing.
2025-10-16T14:36:33.1997877Z [INFO] -------------------------------------------------------------
2025-10-16T14:36:33.1999743Z [ERROR] COMPILATION ERROR : 
2025-10-16T14:36:33.2001523Z [INFO] -------------------------------------------------------------
2025-10-16T14:36:33.2006438Z [ERROR] /home/runner/work/b2b-marketplace/b2b-marketplace/backend/src/main/java/com/p4/backend/pagination/PageRequest.java:[127,17] method getSort() is already defined in class com.p4.backend.pagination.PageRequest
2025-10-16T14:36:33.2008834Z [ERROR] /home/runner/work/b2b-marketplace/b2b-marketplace/backend/src/main/java/com/p4/backend/exception/GlobalExceptionHandler.java:[40,23] cannot find symbol
2025-10-16T14:36:33.2010098Z   symbol:   method setInstance(java.lang.String)
2025-10-16T14:36:33.2010861Z   location: variable problemDetails of type com.p4.backend.shared.response.ProblemDetails
2025-10-16T14:36:33.2012414Z [ERROR] /home/runner/work/b2b-marketplace/b2b-marketplace/backend/src/main/java/com/p4/backend/exception/GlobalExceptionHandler.java:[62,23] cannot find symbol
2025-10-16T14:36:33.2013671Z   symbol:   method setStatus(int)
2025-10-16T14:36:33.2014372Z   location: variable problemDetails of type com.p4.backend.shared.response.ProblemDetails
2025-10-16T14:36:33.2016033Z [ERROR] /home/runner/work/b2b-marketplace/b2b-marketplace/backend/src/main/java/com/p4/backend/exception/GlobalExceptionHandler.java:[63,23] cannot find symbol
2025-10-16T14:36:33.2017312Z   symbol:   method setInstance(java.lang.String)
2025-10-16T14:36:33.2018069Z   location: variable problemDetails of type com.p4.backend.shared.response.ProblemDetails
2025-10-16T14:36:33.2019590Z [ERROR] /home/runner/work/b2b-marketplace/b2b-marketplace/backend/src/main/java/com/p4/backend/exception/GlobalExceptionHandler.java:[81,23] cannot find symbol
2025-10-16T14:36:33.2020862Z   symbol:   method setInstance(java.lang.String)
2025-10-16T14:36:33.2021620Z   location: variable problemDetails of type com.p4.backend.shared.response.ProblemDetails
2025-10-16T14:36:33.2023119Z [ERROR] /home/runner/work/b2b-marketplace/b2b-marketplace/backend/src/main/java/com/p4/backend/exception/GlobalExceptionHandler.java:[82,23] cannot find symbol
2025-10-16T14:36:33.2024312Z   symbol:   method setDetail(java.lang.String)
2025-10-16T14:36:33.2025055Z   location: variable problemDetails of type com.p4.backend.shared.response.ProblemDetails
2025-10-16T14:36:33.2026739Z [ERROR] /home/runner/work/b2b-marketplace/b2b-marketplace/backend/src/main/java/com/p4/backend/shared/response/ApiResponse.java:[56,27] cannot find symbol
2025-10-16T14:36:33.2027870Z   symbol:   method <T>builder()
2025-10-16T14:36:33.2028376Z   location: class com.p4.backend.shared.response.ApiResponse
2025-10-16T14:36:33.2029708Z [ERROR] /home/runner/work/b2b-marketplace/b2b-marketplace/backend/src/main/java/com/p4/backend/shared/response/ApiResponse.java:[72,27] cannot find symbol
2025-10-16T14:36:33.2031213Z   symbol:   method <T>builder()
2025-10-16T14:36:33.2031752Z   location: class com.p4.backend.shared.response.ApiResponse
2025-10-16T14:36:33.2033077Z [ERROR] /home/runner/work/b2b-marketplace/b2b-marketplace/backend/src/main/java/com/p4/backend/shared/response/ApiResponse.java:[88,27] cannot find symbol
2025-10-16T14:36:33.2034260Z   symbol:   method <T>builder()
2025-10-16T14:36:33.2034774Z   location: class com.p4.backend.shared.response.ApiResponse
2025-10-16T14:36:33.2036336Z [ERROR] /home/runner/work/b2b-marketplace/b2b-marketplace/backend/src/main/java/com/p4/backend/shared/response/ApiResponse.java:[107,27] cannot find symbol
2025-10-16T14:36:33.2037696Z   symbol:   method <T>builder()
2025-10-16T14:36:33.2038213Z   location: class com.p4.backend.shared.response.ApiResponse
2025-10-16T14:36:33.2039547Z [ERROR] /home/runner/work/b2b-marketplace/b2b-marketplace/backend/src/main/java/com/p4/backend/shared/response/ProblemDetails.java:[80,30] cannot find symbol
2025-10-16T14:36:33.2040844Z   symbol:   method builder()
2025-10-16T14:36:33.2041452Z   location: class com.p4.backend.shared.response.ProblemDetails
2025-10-16T14:36:33.2043311Z [ERROR] /home/runner/work/b2b-marketplace/b2b-marketplace/backend/src/main/java/com/p4/backend/pagination/PageImpl.java:[14,8] com.p4.backend.pagination.PageImpl is not abstract and does not override abstract method iterator() in java.lang.Iterable
2025-10-16T14:36:33.2045942Z [ERROR] /home/runner/work/b2b-marketplace/b2b-marketplace/backend/src/main/java/com/p4/backend/pagination/PageImpl.java:[247,13] cannot find symbol
2025-10-16T14:36:33.2047075Z   symbol:   method getPageRequest()
2025-10-16T14:36:33.2047581Z   location: class com.p4.backend.pagination.PageImpl<T>
2025-10-16T14:36:33.2048780Z [ERROR] /home/runner/work/b2b-marketplace/b2b-marketplace/backend/src/main/java/com/p4/backend/pagination/PageImpl.java:[249,13] cannot find symbol
2025-10-16T14:36:33.2049916Z   symbol:   method isHasNext()
2025-10-16T14:36:33.2050410Z   location: class com.p4.backend.pagination.PageImpl<T>
2025-10-16T14:36:33.2051466Z [ERROR] /home/runner/work/b2b-marketplace/b2b-marketplace/backend/src/main/java/com/p4/backend/pagination/PageImpl.java:[250,13] cannot find symbol
2025-10-16T14:36:33.2052511Z   symbol:   method isHasPrevious()
2025-10-16T14:36:33.2052977Z   location: class com.p4.backend.pagination.PageImpl<T>
2025-10-16T14:36:33.2054022Z [ERROR] /home/runner/work/b2b-marketplace/b2b-marketplace/backend/src/main/java/com/p4/backend/shared/kernel/TaxLine.java:[67,41] cannot find symbol
2025-10-16T14:36:33.2055068Z   symbol:   method getAmount()
2025-10-16T14:36:33.2055793Z   location: variable baseAmount of type com.p4.backend.shared.kernel.Money
2025-10-16T14:36:33.2057089Z [ERROR] /home/runner/work/b2b-marketplace/b2b-marketplace/backend/src/main/java/com/p4/backend/shared/kernel/TaxLine.java:[68,56] cannot find symbol
2025-10-16T14:36:33.2058160Z   symbol:   method getCurrency()
2025-10-16T14:36:33.2058666Z   location: variable baseAmount of type com.p4.backend.shared.kernel.Money
2025-10-16T14:36:33.2059914Z [ERROR] /home/runner/work/b2b-marketplace/b2b-marketplace/backend/src/main/java/com/p4/backend/test/Rfc7807TestController.java:[47,23] cannot find symbol
2025-10-16T14:36:33.2061077Z   symbol:   method setInstance(java.lang.String)
2025-10-16T14:36:33.2061801Z   location: variable problemDetails of type com.p4.backend.shared.response.ProblemDetails
2025-10-16T14:36:33.2063224Z [ERROR] /home/runner/work/b2b-marketplace/b2b-marketplace/backend/src/main/java/com/p4/backend/test/Rfc7807TestController.java:[48,23] cannot find symbol
2025-10-16T14:36:33.2064405Z   symbol:   method setErrorCode(java.lang.String)
2025-10-16T14:36:33.2065149Z   location: variable problemDetails of type com.p4.backend.shared.response.ProblemDetails
2025-10-16T14:36:33.2066714Z [ERROR] /home/runner/work/b2b-marketplace/b2b-marketplace/backend/src/main/java/com/p4/backend/test/Rfc7807TestController.java:[70,20] cannot find symbol
2025-10-16T14:36:33.2067902Z   symbol:   method setInstance(java.lang.String)
2025-10-16T14:36:33.2068806Z   location: variable problem of type com.p4.backend.shared.response.ProblemDetails
2025-10-16T14:36:33.2070115Z [ERROR] /home/runner/work/b2b-marketplace/b2b-marketplace/backend/src/main/java/com/p4/backend/test/Rfc7807TestController.java:[78,20] cannot find symbol
2025-10-16T14:36:33.2071326Z   symbol:   method setInstance(java.lang.String)
2025-10-16T14:36:33.2072040Z   location: variable problem of type com.p4.backend.shared.response.ProblemDetails
2025-10-16T14:36:33.2073609Z [ERROR] /home/runner/work/b2b-marketplace/b2b-marketplace/backend/src/main/java/com/p4/backend/test/TaxLineTestController.java:[32,45] cannot find symbol
2025-10-16T14:36:33.2074782Z   symbol:   method getJurisdiction()
2025-10-16T14:36:33.2075523Z   location: variable taxLine of type com.p4.backend.shared.kernel.TaxLine
2025-10-16T14:36:33.2076875Z [ERROR] /home/runner/work/b2b-marketplace/b2b-marketplace/backend/src/main/java/com/p4/backend/test/TaxLineTestController.java:[33,37] cannot find symbol
2025-10-16T14:36:33.2078051Z   symbol:   method getRate()
2025-10-16T14:36:33.2078606Z   location: variable taxLine of type com.p4.backend.shared.kernel.TaxLine
2025-10-16T14:36:33.2079968Z [ERROR] /home/runner/work/b2b-marketplace/b2b-marketplace/backend/src/main/java/com/p4/backend/test/TaxLineTestController.java:[34,43] cannot find symbol
2025-10-16T14:36:33.2081133Z   symbol:   method getBaseAmount()
2025-10-16T14:36:33.2081709Z   location: variable taxLine of type com.p4.backend.shared.kernel.TaxLine
2025-10-16T14:36:33.2083043Z [ERROR] /home/runner/work/b2b-marketplace/b2b-marketplace/backend/src/main/java/com/p4/backend/test/TaxLineTestController.java:[35,42] cannot find symbol
2025-10-16T14:36:33.2084200Z   symbol:   method getTaxAmount()
2025-10-16T14:36:33.2084774Z   location: variable taxLine of type com.p4.backend.shared.kernel.TaxLine
2025-10-16T14:36:33.2085502Z [INFO] 25 errors 
2025-10-16T14:36:33.2085894Z [INFO] -------------------------------------------------------------
2025-10-16T14:36:33.2086482Z [INFO] ------------------------------------------------------------------------
2025-10-16T14:36:33.2086996Z [INFO] BUILD FAILURE
2025-10-16T14:36:33.2087420Z [INFO] ------------------------------------------------------------------------
2025-10-16T14:36:33.2087937Z [INFO] Total time:  30.034 s
2025-10-16T14:36:33.2088308Z [INFO] Finished at: 2025-10-16T14:36:33Z
2025-10-16T14:36:33.2088785Z [INFO] ------------------------------------------------------------------------
2025-10-16T14:36:33.2090035Z [ERROR] Failed to execute goal org.apache.maven.plugins:maven-compiler-plugin:3.13.0:compile (default-compile) on project p4-backend: Compilation failure: Compilation failure: 
2025-10-16T14:36:33.2092290Z [ERROR] /home/runner/work/b2b-marketplace/b2b-marketplace/backend/src/main/java/com/p4/backend/pagination/PageRequest.java:[127,17] method getSort() is already defined in class com.p4.backend.pagination.PageRequest
2025-10-16T14:36:33.2094632Z [ERROR] /home/runner/work/b2b-marketplace/b2b-marketplace/backend/src/main/java/com/p4/backend/exception/GlobalExceptionHandler.java:[40,23] cannot find symbol
2025-10-16T14:36:33.2096151Z [ERROR]   symbol:   method setInstance(java.lang.String)
2025-10-16T14:36:33.2097002Z [ERROR]   location: variable problemDetails of type com.p4.backend.shared.response.ProblemDetails
2025-10-16T14:36:33.2098558Z [ERROR] /home/runner/work/b2b-marketplace/b2b-marketplace/backend/src/main/java/com/p4/backend/exception/GlobalExceptionHandler.java:[62,23] cannot find symbol
2025-10-16T14:36:33.2099751Z [ERROR]   symbol:   method setStatus(int)
2025-10-16T14:36:33.2100480Z [ERROR]   location: variable problemDetails of type com.p4.backend.shared.response.ProblemDetails
2025-10-16T14:36:33.2101951Z [ERROR] /home/runner/work/b2b-marketplace/b2b-marketplace/backend/src/main/java/com/p4/backend/exception/GlobalExceptionHandler.java:[63,23] cannot find symbol
2025-10-16T14:36:33.2103183Z [ERROR]   symbol:   method setInstance(java.lang.String)
2025-10-16T14:36:33.2104152Z [ERROR]   location: variable problemDetails of type com.p4.backend.shared.response.ProblemDetails
2025-10-16T14:36:33.2105786Z [ERROR] /home/runner/work/b2b-marketplace/b2b-marketplace/backend/src/main/java/com/p4/backend/exception/GlobalExceptionHandler.java:[81,23] cannot find symbol
2025-10-16T14:36:33.2107017Z [ERROR]   symbol:   method setInstance(java.lang.String)
2025-10-16T14:36:33.2107789Z [ERROR]   location: variable problemDetails of type com.p4.backend.shared.response.ProblemDetails
2025-10-16T14:36:33.2109449Z [ERROR] /home/runner/work/b2b-marketplace/b2b-marketplace/backend/src/main/java/com/p4/backend/exception/GlobalExceptionHandler.java:[82,23] cannot find symbol
2025-10-16T14:36:33.2110669Z [ERROR]   symbol:   method setDetail(java.lang.String)
2025-10-16T14:36:33.2111434Z [ERROR]   location: variable problemDetails of type com.p4.backend.shared.response.ProblemDetails
2025-10-16T14:36:33.2112859Z [ERROR] /home/runner/work/b2b-marketplace/b2b-marketplace/backend/src/main/java/com/p4/backend/shared/response/ApiResponse.java:[56,27] cannot find symbol
2025-10-16T14:36:33.2113982Z [ERROR]   symbol:   method <T>builder()
2025-10-16T14:36:33.2114524Z [ERROR]   location: class com.p4.backend.shared.response.ApiResponse
2025-10-16T14:36:33.2115915Z [ERROR] /home/runner/work/b2b-marketplace/b2b-marketplace/backend/src/main/java/com/p4/backend/shared/response/ApiResponse.java:[72,27] cannot find symbol
2025-10-16T14:36:33.2117024Z [ERROR]   symbol:   method <T>builder()
2025-10-16T14:36:33.2117554Z [ERROR]   location: class com.p4.backend.shared.response.ApiResponse
2025-10-16T14:36:33.2118919Z [ERROR] /home/runner/work/b2b-marketplace/b2b-marketplace/backend/src/main/java/com/p4/backend/shared/response/ApiResponse.java:[88,27] cannot find symbol
2025-10-16T14:36:33.2120125Z [ERROR]   symbol:   method <T>builder()
2025-10-16T14:36:33.2120701Z [ERROR]   location: class com.p4.backend.shared.response.ApiResponse
2025-10-16T14:36:33.2122041Z [ERROR] /home/runner/work/b2b-marketplace/b2b-marketplace/backend/src/main/java/com/p4/backend/shared/response/ApiResponse.java:[107,27] cannot find symbol
2025-10-16T14:36:33.2123248Z [ERROR]   symbol:   method <T>builder()
2025-10-16T14:36:33.2123825Z [ERROR]   location: class com.p4.backend.shared.response.ApiResponse
2025-10-16T14:36:33.2125498Z [ERROR] /home/runner/work/b2b-marketplace/b2b-marketplace/backend/src/main/java/com/p4/backend/shared/response/ProblemDetails.java:[80,30] cannot find symbol
2025-10-16T14:36:33.2126709Z [ERROR]   symbol:   method builder()
2025-10-16T14:36:33.2127301Z [ERROR]   location: class com.p4.backend.shared.response.ProblemDetails
2025-10-16T14:36:33.2129901Z [ERROR] /home/runner/work/b2b-marketplace/b2b-marketplace/backend/src/main/java/com/p4/backend/pagination/PageImpl.java:[14,8] com.p4.backend.pagination.PageImpl is not abstract and does not override abstract method iterator() in java.lang.Iterable
2025-10-16T14:36:33.2132349Z [ERROR] /home/runner/work/b2b-marketplace/b2b-marketplace/backend/src/main/java/com/p4/backend/pagination/PageImpl.java:[247,13] cannot find symbol
2025-10-16T14:36:33.2133520Z [ERROR]   symbol:   method getPageRequest()
2025-10-16T14:36:33.2134077Z [ERROR]   location: class com.p4.backend.pagination.PageImpl<T>
2025-10-16T14:36:33.2135513Z [ERROR] /home/runner/work/b2b-marketplace/b2b-marketplace/backend/src/main/java/com/p4/backend/pagination/PageImpl.java:[249,13] cannot find symbol
2025-10-16T14:36:33.2136632Z [ERROR]   symbol:   method isHasNext()
2025-10-16T14:36:33.2137165Z [ERROR]   location: class com.p4.backend.pagination.PageImpl<T>
2025-10-16T14:36:33.2138364Z [ERROR] /home/runner/work/b2b-marketplace/b2b-marketplace/backend/src/main/java/com/p4/backend/pagination/PageImpl.java:[250,13] cannot find symbol
2025-10-16T14:36:33.2139362Z [ERROR]   symbol:   method isHasPrevious()
2025-10-16T14:36:33.2139889Z [ERROR]   location: class com.p4.backend.pagination.PageImpl<T>
2025-10-16T14:36:33.2141011Z [ERROR] /home/runner/work/b2b-marketplace/b2b-marketplace/backend/src/main/java/com/p4/backend/shared/kernel/TaxLine.java:[67,41] cannot find symbol
2025-10-16T14:36:33.2142238Z [ERROR]   symbol:   method getAmount()
2025-10-16T14:36:33.2142858Z [ERROR]   location: variable baseAmount of type com.p4.backend.shared.kernel.Money
2025-10-16T14:36:33.2144198Z [ERROR] /home/runner/work/b2b-marketplace/b2b-marketplace/backend/src/main/java/com/p4/backend/shared/kernel/TaxLine.java:[68,56] cannot find symbol
2025-10-16T14:36:33.2145468Z [ERROR]   symbol:   method getCurrency()
2025-10-16T14:36:33.2146073Z [ERROR]   location: variable baseAmount of type com.p4.backend.shared.kernel.Money
2025-10-16T14:36:33.2147471Z [ERROR] /home/runner/work/b2b-marketplace/b2b-marketplace/backend/src/main/java/com/p4/backend/test/Rfc7807TestController.java:[47,23] cannot find symbol
2025-10-16T14:36:33.2148660Z [ERROR]   symbol:   method setInstance(java.lang.String)
2025-10-16T14:36:33.2149452Z [ERROR]   location: variable problemDetails of type com.p4.backend.shared.response.ProblemDetails
2025-10-16T14:36:33.2150954Z [ERROR] /home/runner/work/b2b-marketplace/b2b-marketplace/backend/src/main/java/com/p4/backend/test/Rfc7807TestController.java:[48,23] cannot find symbol
2025-10-16T14:36:33.2152156Z [ERROR]   symbol:   method setErrorCode(java.lang.String)
2025-10-16T14:36:33.2152967Z [ERROR]   location: variable problemDetails of type com.p4.backend.shared.response.ProblemDetails
2025-10-16T14:36:33.2154396Z [ERROR] /home/runner/work/b2b-marketplace/b2b-marketplace/backend/src/main/java/com/p4/backend/test/Rfc7807TestController.java:[70,20] cannot find symbol
2025-10-16T14:36:33.2155761Z [ERROR]   symbol:   method setInstance(java.lang.String)
2025-10-16T14:36:33.2156549Z [ERROR]   location: variable problem of type com.p4.backend.shared.response.ProblemDetails
2025-10-16T14:36:33.2157891Z [ERROR] /home/runner/work/b2b-marketplace/b2b-marketplace/backend/src/main/java/com/p4/backend/test/Rfc7807TestController.java:[78,20] cannot find symbol
2025-10-16T14:36:33.2159129Z [ERROR]   symbol:   method setInstance(java.lang.String)
2025-10-16T14:36:33.2159894Z [ERROR]   location: variable problem of type com.p4.backend.shared.response.ProblemDetails
2025-10-16T14:36:33.2161372Z [ERROR] /home/runner/work/b2b-marketplace/b2b-marketplace/backend/src/main/java/com/p4/backend/test/TaxLineTestController.java:[32,45] cannot find symbol
2025-10-16T14:36:33.2162560Z [ERROR]   symbol:   method getJurisdiction()
2025-10-16T14:36:33.2163210Z [ERROR]   location: variable taxLine of type com.p4.backend.shared.kernel.TaxLine
2025-10-16T14:36:33.2164582Z [ERROR] /home/runner/work/b2b-marketplace/b2b-marketplace/backend/src/main/java/com/p4/backend/test/TaxLineTestController.java:[33,37] cannot find symbol
2025-10-16T14:36:33.2165971Z [ERROR]   symbol:   method getRate()
2025-10-16T14:36:33.2166562Z [ERROR]   location: variable taxLine of type com.p4.backend.shared.kernel.TaxLine
2025-10-16T14:36:33.2167374Z [ERROR] /home/runner/work/b2b-marketplace/b2b-marketplace/backend/src/main/java/com/p4/backend/test/TaxLineTestController.java:[34,43] cannot find symbol
2025-10-16T14:36:33.2168053Z [ERROR]   symbol:   method getBaseAmount()
2025-10-16T14:36:33.2168428Z [ERROR]   location: variable taxLine of type com.p4.backend.shared.kernel.TaxLine
2025-10-16T14:36:33.2169208Z [ERROR] /home/runner/work/b2b-marketplace/b2b-marketplace/backend/src/main/java/com/p4/backend/test/TaxLineTestController.java:[35,42] cannot find symbol
2025-10-16T14:36:33.2169871Z [ERROR]   symbol:   method getTaxAmount()
2025-10-16T14:36:33.2170237Z [ERROR]   location: variable taxLine of type com.p4.backend.shared.kernel.TaxLine
2025-10-16T14:36:33.2170590Z [ERROR] -> [Help 1]
2025-10-16T14:36:33.2170772Z [ERROR] 
2025-10-16T14:36:33.2171047Z [ERROR] To see the full stack trace of the errors, re-run Maven with the -e switch.
2025-10-16T14:36:33.2171481Z [ERROR] Re-run Maven using the -X switch to enable full debug logging.
2025-10-16T14:36:33.2171787Z [ERROR] 
2025-10-16T14:36:33.2172145Z [ERROR] For more information about the errors and possible solutions, please read the following articles:
2025-10-16T14:36:33.2172906Z [ERROR] [Help 1] http://cwiki.apache.org/confluence/display/MAVEN/MojoFailureException
2025-10-16T14:36:33.2421795Z ##[error]Process completed with exit code 1.
2025-10-16T14:36:33.2529459Z Post job cleanup.
2025-10-16T14:36:33.4264718Z Post job cleanup.
2025-10-16T14:36:33.5194561Z [command]/usr/bin/git version
2025-10-16T14:36:33.5231129Z git version 2.51.0
2025-10-16T14:36:33.5274940Z Temporarily overriding HOME='/home/runner/work/_temp/8b1f434c-dc47-48bf-b046-02694d5ba1de' before making global git config changes
2025-10-16T14:36:33.5276431Z Adding repository directory to the temporary git global config as a safe directory
2025-10-16T14:36:33.5281583Z [command]/usr/bin/git config --global --add safe.directory /home/runner/work/b2b-marketplace/b2b-marketplace
2025-10-16T14:36:33.5317207Z [command]/usr/bin/git config --local --name-only --get-regexp core\.sshCommand
2025-10-16T14:36:33.5349470Z [command]/usr/bin/git submodule foreach --recursive sh -c "git config --local --name-only --get-regexp 'core\.sshCommand' && git config --local --unset-all 'core.sshCommand' || :"
2025-10-16T14:36:33.5578484Z [command]/usr/bin/git config --local --name-only --get-regexp http\.https\:\/\/github\.com\/\.extraheader
2025-10-16T14:36:33.5600308Z http.https://github.com/.extraheader
2025-10-16T14:36:33.5612298Z [command]/usr/bin/git config --local --unset-all http.https://github.com/.extraheader
2025-10-16T14:36:33.5641861Z [command]/usr/bin/git submodule foreach --recursive sh -c "git config --local --name-only --get-regexp 'http\.https\:\/\/github\.com\/\.extraheader' && git config --local --unset-all 'http.https://github.com/.extraheader' || :"
2025-10-16T14:36:33.5968816Z Cleaning up orphan processes