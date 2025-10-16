2025-10-16T11:24:42.4349611Z                    
2025-10-16T11:24:42.4350700Z Downloaded from central: https://repo.maven.apache.org/maven2/org/codehaus/plexus/plexus-compiler-javac/2.15.0/plexus-compiler-javac-2.15.0.jar (26 kB at 396 kB/s)
2025-10-16T11:24:42.5652071Z [INFO] Recompiling the module because of changed source code.
2025-10-16T11:24:42.5818589Z [INFO] Compiling 30 source files with javac [debug parameters release 21] to target/classes
2025-10-16T11:24:44.3301698Z [INFO] Annotation processing is enabled because one or more processors were found
2025-10-16T11:24:44.3310683Z   on the class path. A future release of javac may disable annotation processing
2025-10-16T11:24:44.3323213Z   unless at least one processor is specified by name (-processor), or a search
2025-10-16T11:24:44.3324417Z   path is specified (--processor-path, --processor-module-path), or annotation
2025-10-16T11:24:44.3325215Z   processing is enabled explicitly (-proc:only, -proc:full).
2025-10-16T11:24:44.3325832Z   Use -Xlint:-options to suppress this message.
2025-10-16T11:24:44.3326353Z   Use -proc:none to disable annotation processing.
2025-10-16T11:24:44.3327157Z [INFO] -------------------------------------------------------------
2025-10-16T11:24:44.3327667Z [ERROR] COMPILATION ERROR : 
2025-10-16T11:24:44.3328131Z [INFO] -------------------------------------------------------------
2025-10-16T11:24:44.3329635Z [ERROR] /home/runner/work/b2b-marketplace/b2b-marketplace/backend/src/main/java/com/p4/backend/pagination/Page.java:[18,8] class PageImpl is public, should be declared in a file named PageImpl.java
2025-10-16T11:24:44.3331832Z [ERROR] /home/runner/work/b2b-marketplace/b2b-marketplace/backend/src/main/java/com/p4/backend/exception/GlobalExceptionHandler.java:[40,23] cannot find symbol
2025-10-16T11:24:44.3333136Z   symbol:   method setInstance(java.lang.String)
2025-10-16T11:24:44.3333905Z   location: variable problemDetails of type com.p4.backend.shared.response.ProblemDetails
2025-10-16T11:24:44.3335445Z [ERROR] /home/runner/work/b2b-marketplace/b2b-marketplace/backend/src/main/java/com/p4/backend/exception/GlobalExceptionHandler.java:[62,23] cannot find symbol
2025-10-16T11:24:44.3336927Z   symbol:   method setStatus(int)
2025-10-16T11:24:44.3337618Z   location: variable problemDetails of type com.p4.backend.shared.response.ProblemDetails
2025-10-16T11:24:44.3339149Z [ERROR] /home/runner/work/b2b-marketplace/b2b-marketplace/backend/src/main/java/com/p4/backend/exception/GlobalExceptionHandler.java:[63,23] cannot find symbol
2025-10-16T11:24:44.3340436Z   symbol:   method setInstance(java.lang.String)
2025-10-16T11:24:44.3341199Z   location: variable problemDetails of type com.p4.backend.shared.response.ProblemDetails
2025-10-16T11:24:44.3342721Z [ERROR] /home/runner/work/b2b-marketplace/b2b-marketplace/backend/src/main/java/com/p4/backend/exception/GlobalExceptionHandler.java:[81,23] cannot find symbol
2025-10-16T11:24:44.3343970Z   symbol:   method setInstance(java.lang.String)
2025-10-16T11:24:44.3344722Z   location: variable problemDetails of type com.p4.backend.shared.response.ProblemDetails
2025-10-16T11:24:44.3346215Z [ERROR] /home/runner/work/b2b-marketplace/b2b-marketplace/backend/src/main/java/com/p4/backend/exception/GlobalExceptionHandler.java:[82,23] cannot find symbol
2025-10-16T11:24:44.3347610Z   symbol:   method setDetail(java.lang.String)
2025-10-16T11:24:44.3348339Z   location: variable problemDetails of type com.p4.backend.shared.response.ProblemDetails
2025-10-16T11:24:44.3349785Z [ERROR] /home/runner/work/b2b-marketplace/b2b-marketplace/backend/src/main/java/com/p4/backend/shared/response/ApiResponse.java:[56,27] cannot find symbol
2025-10-16T11:24:44.3350932Z   symbol:   method <T>builder()
2025-10-16T11:24:44.3351440Z   location: class com.p4.backend.shared.response.ApiResponse
2025-10-16T11:24:44.3352694Z [ERROR] /home/runner/work/b2b-marketplace/b2b-marketplace/backend/src/main/java/com/p4/backend/shared/response/ApiResponse.java:[72,27] cannot find symbol
2025-10-16T11:24:44.3353842Z   symbol:   method <T>builder()
2025-10-16T11:24:44.3354320Z   location: class com.p4.backend.shared.response.ApiResponse
2025-10-16T11:24:44.3355811Z [ERROR] /home/runner/work/b2b-marketplace/b2b-marketplace/backend/src/main/java/com/p4/backend/shared/response/ApiResponse.java:[88,27] cannot find symbol
2025-10-16T11:24:44.3357102Z   symbol:   method <T>builder()
2025-10-16T11:24:44.3357582Z   location: class com.p4.backend.shared.response.ApiResponse
2025-10-16T11:24:44.3358853Z [ERROR] /home/runner/work/b2b-marketplace/b2b-marketplace/backend/src/main/java/com/p4/backend/shared/response/ApiResponse.java:[107,27] cannot find symbol
2025-10-16T11:24:44.3360001Z   symbol:   method <T>builder()
2025-10-16T11:24:44.3360487Z   location: class com.p4.backend.shared.response.ApiResponse
2025-10-16T11:24:44.3361963Z [ERROR] /home/runner/work/b2b-marketplace/b2b-marketplace/backend/src/main/java/com/p4/backend/shared/response/ProblemDetails.java:[80,30] cannot find symbol
2025-10-16T11:24:44.3363129Z   symbol:   method builder()
2025-10-16T11:24:44.3363620Z   location: class com.p4.backend.shared.response.ProblemDetails
2025-10-16T11:24:44.3364816Z [ERROR] /home/runner/work/b2b-marketplace/b2b-marketplace/backend/src/main/java/com/p4/backend/pagination/Page.java:[112,28] cannot find symbol
2025-10-16T11:24:44.3365891Z   symbol:   method getDirection()
2025-10-16T11:24:44.3366484Z   location: variable pageRequest of type com.p4.backend.pagination.PageRequest
2025-10-16T11:24:44.3399989Z [ERROR] /home/runner/work/b2b-marketplace/b2b-marketplace/backend/src/main/java/com/p4/backend/pagination/PageRequest.java:[55,16] constructor PageRequest in class com.p4.backend.pagination.PageRequest cannot be applied to given types;
2025-10-16T11:24:44.3401663Z   required: no arguments
2025-10-16T11:24:44.3402471Z   found:    int,int,org.springframework.data.domain.Sort,<nulltype>,com.p4.backend.pagination.PageRequest.Direction
2025-10-16T11:24:44.3403421Z   reason: actual and formal argument lists differ in length
2025-10-16T11:24:44.3405163Z [ERROR] /home/runner/work/b2b-marketplace/b2b-marketplace/backend/src/main/java/com/p4/backend/pagination/PageRequest.java:[67,16] constructor PageRequest in class com.p4.backend.pagination.PageRequest cannot be applied to given types;
2025-10-16T11:24:44.3434558Z   required: no arguments
2025-10-16T11:24:44.3435583Z   found:    int,int,org.springframework.data.domain.Sort,java.lang.String,com.p4.backend.pagination.PageRequest.Direction
2025-10-16T11:24:44.3437177Z   reason: actual and formal argument lists differ in length
2025-10-16T11:24:44.3440262Z [ERROR] /home/runner/work/b2b-marketplace/b2b-marketplace/backend/src/main/java/com/p4/backend/pagination/PageRequest.java:[92,16] constructor PageRequest in class com.p4.backend.pagination.PageRequest cannot be applied to given types;
2025-10-16T11:24:44.3441921Z   required: no arguments
2025-10-16T11:24:44.3442806Z   found:    int,int,org.springframework.data.domain.Sort,java.lang.String,com.p4.backend.pagination.PageRequest.Direction
2025-10-16T11:24:44.3443866Z   reason: actual and formal argument lists differ in length
2025-10-16T11:24:44.3445586Z [ERROR] /home/runner/work/b2b-marketplace/b2b-marketplace/backend/src/main/java/com/p4/backend/pagination/PageRequest.java:[98,16] constructor PageRequest in class com.p4.backend.pagination.PageRequest cannot be applied to given types;
2025-10-16T11:24:44.3447388Z   required: no arguments
2025-10-16T11:24:44.3448272Z   found:    int,int,org.springframework.data.domain.Sort,java.lang.String,com.p4.backend.pagination.PageRequest.Direction
2025-10-16T11:24:44.3449324Z   reason: actual and formal argument lists differ in length
2025-10-16T11:24:44.3451190Z [ERROR] /home/runner/work/b2b-marketplace/b2b-marketplace/backend/src/main/java/com/p4/backend/pagination/PageRequest.java:[103,16] constructor PageRequest in class com.p4.backend.pagination.PageRequest cannot be applied to given types;
2025-10-16T11:24:44.3452823Z   required: no arguments
2025-10-16T11:24:44.3453583Z   found:    int,int,org.springframework.data.domain.Sort,<nulltype>,com.p4.backend.pagination.PageRequest.Direction
2025-10-16T11:24:44.3454503Z   reason: actual and formal argument lists differ in length
2025-10-16T11:24:44.3456448Z [ERROR] /home/runner/work/b2b-marketplace/b2b-marketplace/backend/src/main/java/com/p4/backend/pagination/PageRequest.java:[108,16] constructor PageRequest in class com.p4.backend.pagination.PageRequest cannot be applied to given types;
2025-10-16T11:24:44.3458225Z   required: no arguments
2025-10-16T11:24:44.3458970Z   found:    int,int,org.springframework.data.domain.Sort,<nulltype>,com.p4.backend.pagination.PageRequest.Direction
2025-10-16T11:24:44.3459886Z   reason: actual and formal argument lists differ in length
2025-10-16T11:24:44.3461205Z [ERROR] /home/runner/work/b2b-marketplace/b2b-marketplace/backend/src/main/java/com/p4/backend/shared/kernel/TaxLine.java:[67,41] cannot find symbol
2025-10-16T11:24:44.3462283Z   symbol:   method getAmount()
2025-10-16T11:24:44.3462833Z   location: variable baseAmount of type com.p4.backend.shared.kernel.Money
2025-10-16T11:24:44.3464080Z [ERROR] /home/runner/work/b2b-marketplace/b2b-marketplace/backend/src/main/java/com/p4/backend/shared/kernel/TaxLine.java:[68,56] cannot find symbol
2025-10-16T11:24:44.3465170Z   symbol:   method getCurrency()
2025-10-16T11:24:44.3465729Z   location: variable baseAmount of type com.p4.backend.shared.kernel.Money
2025-10-16T11:24:44.3467189Z [ERROR] /home/runner/work/b2b-marketplace/b2b-marketplace/backend/src/main/java/com/p4/backend/test/Rfc7807TestController.java:[47,23] cannot find symbol
2025-10-16T11:24:44.3468363Z   symbol:   method setInstance(java.lang.String)
2025-10-16T11:24:44.3469092Z   location: variable problemDetails of type com.p4.backend.shared.response.ProblemDetails
2025-10-16T11:24:44.3470570Z [ERROR] /home/runner/work/b2b-marketplace/b2b-marketplace/backend/src/main/java/com/p4/backend/test/Rfc7807TestController.java:[48,23] cannot find symbol
2025-10-16T11:24:44.3471799Z   symbol:   method setErrorCode(java.lang.String)
2025-10-16T11:24:44.3472549Z   location: variable problemDetails of type com.p4.backend.shared.response.ProblemDetails
2025-10-16T11:24:44.3473976Z [ERROR] /home/runner/work/b2b-marketplace/b2b-marketplace/backend/src/main/java/com/p4/backend/test/Rfc7807TestController.java:[70,20] cannot find symbol
2025-10-16T11:24:44.3475139Z   symbol:   method setInstance(java.lang.String)
2025-10-16T11:24:44.3475828Z   location: variable problem of type com.p4.backend.shared.response.ProblemDetails
2025-10-16T11:24:44.3476897Z [ERROR] /home/runner/work/b2b-marketplace/b2b-marketplace/backend/src/main/java/com/p4/backend/test/Rfc7807TestController.java:[78,20] cannot find symbol
2025-10-16T11:24:44.3477604Z   symbol:   method setInstance(java.lang.String)
2025-10-16T11:24:44.3478019Z   location: variable problem of type com.p4.backend.shared.response.ProblemDetails
2025-10-16T11:24:44.3478814Z [ERROR] /home/runner/work/b2b-marketplace/b2b-marketplace/backend/src/main/java/com/p4/backend/test/TaxLineTestController.java:[32,45] cannot find symbol
2025-10-16T11:24:44.3479482Z   symbol:   method getJurisdiction()
2025-10-16T11:24:44.3479840Z   location: variable taxLine of type com.p4.backend.shared.kernel.TaxLine
2025-10-16T11:24:44.3480597Z [ERROR] /home/runner/work/b2b-marketplace/b2b-marketplace/backend/src/main/java/com/p4/backend/test/TaxLineTestController.java:[33,37] cannot find symbol
2025-10-16T11:24:44.3481247Z   symbol:   method getRate()
2025-10-16T11:24:44.3481559Z   location: variable taxLine of type com.p4.backend.shared.kernel.TaxLine
2025-10-16T11:24:44.3482311Z [ERROR] /home/runner/work/b2b-marketplace/b2b-marketplace/backend/src/main/java/com/p4/backend/test/TaxLineTestController.java:[34,43] cannot find symbol
2025-10-16T11:24:44.3482955Z   symbol:   method getBaseAmount()
2025-10-16T11:24:44.3483289Z   location: variable taxLine of type com.p4.backend.shared.kernel.TaxLine
2025-10-16T11:24:44.3484029Z [ERROR] /home/runner/work/b2b-marketplace/b2b-marketplace/backend/src/main/java/com/p4/backend/test/TaxLineTestController.java:[35,42] cannot find symbol
2025-10-16T11:24:44.3484671Z   symbol:   method getTaxAmount()
2025-10-16T11:24:44.3484996Z   location: variable taxLine of type com.p4.backend.shared.kernel.TaxLine
2025-10-16T11:24:44.3485470Z [INFO] 28 errors 
2025-10-16T11:24:44.3485704Z [INFO] -------------------------------------------------------------
2025-10-16T11:24:44.3486053Z [INFO] ------------------------------------------------------------------------
2025-10-16T11:24:44.3486341Z [INFO] BUILD FAILURE
2025-10-16T11:24:44.3486766Z [INFO] ------------------------------------------------------------------------
2025-10-16T11:24:44.3487138Z [INFO] Total time:  25.753 s
2025-10-16T11:24:44.3487369Z [INFO] Finished at: 2025-10-16T11:24:44Z
2025-10-16T11:24:44.3487787Z [INFO] ------------------------------------------------------------------------
2025-10-16T11:24:44.3488508Z [ERROR] Failed to execute goal org.apache.maven.plugins:maven-compiler-plugin:3.13.0:compile (default-compile) on project p4-backend: Compilation failure: Compilation failure: 
2025-10-16T11:24:44.3489728Z [ERROR] /home/runner/work/b2b-marketplace/b2b-marketplace/backend/src/main/java/com/p4/backend/pagination/Page.java:[18,8] class PageImpl is public, should be declared in a file named PageImpl.java
2025-10-16T11:24:44.3490969Z [ERROR] /home/runner/work/b2b-marketplace/b2b-marketplace/backend/src/main/java/com/p4/backend/exception/GlobalExceptionHandler.java:[40,23] cannot find symbol
2025-10-16T11:24:44.3491692Z [ERROR]   symbol:   method setInstance(java.lang.String)
2025-10-16T11:24:44.3492160Z [ERROR]   location: variable problemDetails of type com.p4.backend.shared.response.ProblemDetails
2025-10-16T11:24:44.3493019Z [ERROR] /home/runner/work/b2b-marketplace/b2b-marketplace/backend/src/main/java/com/p4/backend/exception/GlobalExceptionHandler.java:[62,23] cannot find symbol
2025-10-16T11:24:44.3493720Z [ERROR]   symbol:   method setStatus(int)
2025-10-16T11:24:44.3494138Z [ERROR]   location: variable problemDetails of type com.p4.backend.shared.response.ProblemDetails
2025-10-16T11:24:44.3494980Z [ERROR] /home/runner/work/b2b-marketplace/b2b-marketplace/backend/src/main/java/com/p4/backend/exception/GlobalExceptionHandler.java:[63,23] cannot find symbol
2025-10-16T11:24:44.3495699Z [ERROR]   symbol:   method setInstance(java.lang.String)
2025-10-16T11:24:44.3496143Z [ERROR]   location: variable problemDetails of type com.p4.backend.shared.response.ProblemDetails
2025-10-16T11:24:44.3497185Z [ERROR] /home/runner/work/b2b-marketplace/b2b-marketplace/backend/src/main/java/com/p4/backend/exception/GlobalExceptionHandler.java:[81,23] cannot find symbol
2025-10-16T11:24:44.3497899Z [ERROR]   symbol:   method setInstance(java.lang.String)
2025-10-16T11:24:44.3498346Z [ERROR]   location: variable problemDetails of type com.p4.backend.shared.response.ProblemDetails
2025-10-16T11:24:44.3499193Z [ERROR] /home/runner/work/b2b-marketplace/b2b-marketplace/backend/src/main/java/com/p4/backend/exception/GlobalExceptionHandler.java:[82,23] cannot find symbol
2025-10-16T11:24:44.3499905Z [ERROR]   symbol:   method setDetail(java.lang.String)
2025-10-16T11:24:44.3500354Z [ERROR]   location: variable problemDetails of type com.p4.backend.shared.response.ProblemDetails
2025-10-16T11:24:44.3501188Z [ERROR] /home/runner/work/b2b-marketplace/b2b-marketplace/backend/src/main/java/com/p4/backend/shared/response/ApiResponse.java:[56,27] cannot find symbol
2025-10-16T11:24:44.3501841Z [ERROR]   symbol:   method <T>builder()
2025-10-16T11:24:44.3502173Z [ERROR]   location: class com.p4.backend.shared.response.ApiResponse
2025-10-16T11:24:44.3502904Z [ERROR] /home/runner/work/b2b-marketplace/b2b-marketplace/backend/src/main/java/com/p4/backend/shared/response/ApiResponse.java:[72,27] cannot find symbol
2025-10-16T11:24:44.3503553Z [ERROR]   symbol:   method <T>builder()
2025-10-16T11:24:44.3503883Z [ERROR]   location: class com.p4.backend.shared.response.ApiResponse
2025-10-16T11:24:44.3504608Z [ERROR] /home/runner/work/b2b-marketplace/b2b-marketplace/backend/src/main/java/com/p4/backend/shared/response/ApiResponse.java:[88,27] cannot find symbol
2025-10-16T11:24:44.3505259Z [ERROR]   symbol:   method <T>builder()
2025-10-16T11:24:44.3505693Z [ERROR]   location: class com.p4.backend.shared.response.ApiResponse
2025-10-16T11:24:44.3506426Z [ERROR] /home/runner/work/b2b-marketplace/b2b-marketplace/backend/src/main/java/com/p4/backend/shared/response/ApiResponse.java:[107,27] cannot find symbol
2025-10-16T11:24:44.3507181Z [ERROR]   symbol:   method <T>builder()
2025-10-16T11:24:44.3507487Z [ERROR]   location: class com.p4.backend.shared.response.ApiResponse
2025-10-16T11:24:44.3508230Z [ERROR] /home/runner/work/b2b-marketplace/b2b-marketplace/backend/src/main/java/com/p4/backend/shared/response/ProblemDetails.java:[80,30] cannot find symbol
2025-10-16T11:24:44.3509001Z [ERROR]   symbol:   method builder()
2025-10-16T11:24:44.3509327Z [ERROR]   location: class com.p4.backend.shared.response.ProblemDetails
2025-10-16T11:24:44.3510023Z [ERROR] /home/runner/work/b2b-marketplace/b2b-marketplace/backend/src/main/java/com/p4/backend/pagination/Page.java:[112,28] cannot find symbol
2025-10-16T11:24:44.3510635Z [ERROR]   symbol:   method getDirection()
2025-10-16T11:24:44.3511023Z [ERROR]   location: variable pageRequest of type com.p4.backend.pagination.PageRequest
2025-10-16T11:24:44.3512120Z [ERROR] /home/runner/work/b2b-marketplace/b2b-marketplace/backend/src/main/java/com/p4/backend/pagination/PageRequest.java:[55,16] constructor PageRequest in class com.p4.backend.pagination.PageRequest cannot be applied to given types;
2025-10-16T11:24:44.3513054Z [ERROR]   required: no arguments
2025-10-16T11:24:44.3513533Z [ERROR]   found:    int,int,org.springframework.data.domain.Sort,<nulltype>,com.p4.backend.pagination.PageRequest.Direction
2025-10-16T11:24:44.3514107Z [ERROR]   reason: actual and formal argument lists differ in length
2025-10-16T11:24:44.3515098Z [ERROR] /home/runner/work/b2b-marketplace/b2b-marketplace/backend/src/main/java/com/p4/backend/pagination/PageRequest.java:[67,16] constructor PageRequest in class com.p4.backend.pagination.PageRequest cannot be applied to given types;
2025-10-16T11:24:44.3516013Z [ERROR]   required: no arguments
2025-10-16T11:24:44.3516734Z [ERROR]   found:    int,int,org.springframework.data.domain.Sort,java.lang.String,com.p4.backend.pagination.PageRequest.Direction
2025-10-16T11:24:44.3517370Z [ERROR]   reason: actual and formal argument lists differ in length
2025-10-16T11:24:44.3518352Z [ERROR] /home/runner/work/b2b-marketplace/b2b-marketplace/backend/src/main/java/com/p4/backend/pagination/PageRequest.java:[92,16] constructor PageRequest in class com.p4.backend.pagination.PageRequest cannot be applied to given types;
2025-10-16T11:24:44.3519275Z [ERROR]   required: no arguments
2025-10-16T11:24:44.3519814Z [ERROR]   found:    int,int,org.springframework.data.domain.Sort,java.lang.String,com.p4.backend.pagination.PageRequest.Direction
2025-10-16T11:24:44.3520445Z [ERROR]   reason: actual and formal argument lists differ in length
2025-10-16T11:24:44.3521432Z [ERROR] /home/runner/work/b2b-marketplace/b2b-marketplace/backend/src/main/java/com/p4/backend/pagination/PageRequest.java:[98,16] constructor PageRequest in class com.p4.backend.pagination.PageRequest cannot be applied to given types;
2025-10-16T11:24:44.3522347Z [ERROR]   required: no arguments
2025-10-16T11:24:44.3522882Z [ERROR]   found:    int,int,org.springframework.data.domain.Sort,java.lang.String,com.p4.backend.pagination.PageRequest.Direction
2025-10-16T11:24:44.3523497Z [ERROR]   reason: actual and formal argument lists differ in length
2025-10-16T11:24:44.3524492Z [ERROR] /home/runner/work/b2b-marketplace/b2b-marketplace/backend/src/main/java/com/p4/backend/pagination/PageRequest.java:[103,16] constructor PageRequest in class com.p4.backend.pagination.PageRequest cannot be applied to given types;
2025-10-16T11:24:44.3525419Z [ERROR]   required: no arguments
2025-10-16T11:24:44.3525886Z [ERROR]   found:    int,int,org.springframework.data.domain.Sort,<nulltype>,com.p4.backend.pagination.PageRequest.Direction
2025-10-16T11:24:44.3526444Z [ERROR]   reason: actual and formal argument lists differ in length
2025-10-16T11:24:44.3527781Z [ERROR] /home/runner/work/b2b-marketplace/b2b-marketplace/backend/src/main/java/com/p4/backend/pagination/PageRequest.java:[108,16] constructor PageRequest in class com.p4.backend.pagination.PageRequest cannot be applied to given types;
2025-10-16T11:24:44.3528711Z [ERROR]   required: no arguments
2025-10-16T11:24:44.3529181Z [ERROR]   found:    int,int,org.springframework.data.domain.Sort,<nulltype>,com.p4.backend.pagination.PageRequest.Direction
2025-10-16T11:24:44.3529738Z [ERROR]   reason: actual and formal argument lists differ in length
2025-10-16T11:24:44.3530543Z [ERROR] /home/runner/work/b2b-marketplace/b2b-marketplace/backend/src/main/java/com/p4/backend/shared/kernel/TaxLine.java:[67,41] cannot find symbol
2025-10-16T11:24:44.3531187Z [ERROR]   symbol:   method getAmount()
2025-10-16T11:24:44.3531558Z [ERROR]   location: variable baseAmount of type com.p4.backend.shared.kernel.Money
2025-10-16T11:24:44.3532310Z [ERROR] /home/runner/work/b2b-marketplace/b2b-marketplace/backend/src/main/java/com/p4/backend/shared/kernel/TaxLine.java:[68,56] cannot find symbol
2025-10-16T11:24:44.3532945Z [ERROR]   symbol:   method getCurrency()
2025-10-16T11:24:44.3533314Z [ERROR]   location: variable baseAmount of type com.p4.backend.shared.kernel.Money
2025-10-16T11:24:44.3534076Z [ERROR] /home/runner/work/b2b-marketplace/b2b-marketplace/backend/src/main/java/com/p4/backend/test/Rfc7807TestController.java:[47,23] cannot find symbol
2025-10-16T11:24:44.3534766Z [ERROR]   symbol:   method setInstance(java.lang.String)
2025-10-16T11:24:44.3535230Z [ERROR]   location: variable problemDetails of type com.p4.backend.shared.response.ProblemDetails
2025-10-16T11:24:44.3536052Z [ERROR] /home/runner/work/b2b-marketplace/b2b-marketplace/backend/src/main/java/com/p4/backend/test/Rfc7807TestController.java:[48,23] cannot find symbol
2025-10-16T11:24:44.3536925Z [ERROR]   symbol:   method setErrorCode(java.lang.String)
2025-10-16T11:24:44.3537380Z [ERROR]   location: variable problemDetails of type com.p4.backend.shared.response.ProblemDetails
2025-10-16T11:24:44.3538200Z [ERROR] /home/runner/work/b2b-marketplace/b2b-marketplace/backend/src/main/java/com/p4/backend/test/Rfc7807TestController.java:[70,20] cannot find symbol
2025-10-16T11:24:44.3538880Z [ERROR]   symbol:   method setInstance(java.lang.String)
2025-10-16T11:24:44.3539300Z [ERROR]   location: variable problem of type com.p4.backend.shared.response.ProblemDetails
2025-10-16T11:24:44.3540106Z [ERROR] /home/runner/work/b2b-marketplace/b2b-marketplace/backend/src/main/java/com/p4/backend/test/Rfc7807TestController.java:[78,20] cannot find symbol
2025-10-16T11:24:44.3540777Z [ERROR]   symbol:   method setInstance(java.lang.String)
2025-10-16T11:24:44.3541200Z [ERROR]   location: variable problem of type com.p4.backend.shared.response.ProblemDetails
2025-10-16T11:24:44.3541995Z [ERROR] /home/runner/work/b2b-marketplace/b2b-marketplace/backend/src/main/java/com/p4/backend/test/TaxLineTestController.java:[32,45] cannot find symbol
2025-10-16T11:24:44.3542650Z [ERROR]   symbol:   method getJurisdiction()
2025-10-16T11:24:44.3543031Z [ERROR]   location: variable taxLine of type com.p4.backend.shared.kernel.TaxLine
2025-10-16T11:24:44.3543789Z [ERROR] /home/runner/work/b2b-marketplace/b2b-marketplace/backend/src/main/java/com/p4/backend/test/TaxLineTestController.java:[33,37] cannot find symbol
2025-10-16T11:24:44.3544437Z [ERROR]   symbol:   method getRate()
2025-10-16T11:24:44.3544784Z [ERROR]   location: variable taxLine of type com.p4.backend.shared.kernel.TaxLine
2025-10-16T11:24:44.3545539Z [ERROR] /home/runner/work/b2b-marketplace/b2b-marketplace/backend/src/main/java/com/p4/backend/test/TaxLineTestController.java:[34,43] cannot find symbol
2025-10-16T11:24:44.3546205Z [ERROR]   symbol:   method getBaseAmount()
2025-10-16T11:24:44.3546651Z [ERROR]   location: variable taxLine of type com.p4.backend.shared.kernel.TaxLine
2025-10-16T11:24:44.3547413Z [ERROR] /home/runner/work/b2b-marketplace/b2b-marketplace/backend/src/main/java/com/p4/backend/test/TaxLineTestController.java:[35,42] cannot find symbol
2025-10-16T11:24:44.3548190Z [ERROR]   symbol:   method getTaxAmount()
2025-10-16T11:24:44.3548542Z [ERROR]   location: variable taxLine of type com.p4.backend.shared.kernel.TaxLine
2025-10-16T11:24:44.3548890Z [ERROR] -> [Help 1]
2025-10-16T11:24:44.3549060Z [ERROR] 
2025-10-16T11:24:44.3549340Z [ERROR] To see the full stack trace of the errors, re-run Maven with the -e switch.
2025-10-16T11:24:44.3549766Z [ERROR] Re-run Maven using the -X switch to enable full debug logging.
2025-10-16T11:24:44.3550074Z [ERROR] 
2025-10-16T11:24:44.3550430Z [ERROR] For more information about the errors and possible solutions, please read the following articles:
2025-10-16T11:24:44.3551153Z [ERROR] [Help 1] http://cwiki.apache.org/confluence/display/MAVEN/MojoFailureException
2025-10-16T11:24:44.3770367Z ##[error]Process completed with exit code 1.
2025-10-16T11:24:44.3870392Z Post job cleanup.
2025-10-16T11:24:44.5586166Z Post job cleanup.
2025-10-16T11:24:44.6526462Z [command]/usr/bin/git version
2025-10-16T11:24:44.6566395Z git version 2.51.0
2025-10-16T11:24:44.6611158Z Temporarily overriding HOME='/home/runner/work/_temp/e71aec5d-304a-47cb-a3ec-4f15e78c41a2' before making global git config changes
2025-10-16T11:24:44.6612462Z Adding repository directory to the temporary git global config as a safe directory
2025-10-16T11:24:44.6617725Z [command]/usr/bin/git config --global --add safe.directory /home/runner/work/b2b-marketplace/b2b-marketplace
2025-10-16T11:24:44.6655761Z [command]/usr/bin/git config --local --name-only --get-regexp core\.sshCommand
2025-10-16T11:24:44.6689725Z [command]/usr/bin/git submodule foreach --recursive sh -c "git config --local --name-only --get-regexp 'core\.sshCommand' && git config --local --unset-all 'core.sshCommand' || :"
2025-10-16T11:24:44.6932922Z [command]/usr/bin/git config --local --name-only --get-regexp http\.https\:\/\/github\.com\/\.extraheader
2025-10-16T11:24:44.6955075Z http.https://github.com/.extraheader
2025-10-16T11:24:44.6968147Z [command]/usr/bin/git config --local --unset-all http.https://github.com/.extraheader
2025-10-16T11:24:44.7000338Z [command]/usr/bin/git submodule foreach --recursive sh -c "git config --local --name-only --get-regexp 'http\.https\:\/\/github\.com\/\.extraheader' && git config --local --unset-all 'http.https://github.com/.extraheader' || :"
2025-10-16T11:24:44.7338342Z Cleaning up orphan processes