2025-10-30T07:29:47.1368906Z Current runner version: '2.328.0'
2025-10-30T07:29:47.1393605Z ##[group]Runner Image Provisioner
2025-10-30T07:29:47.1394659Z Hosted Compute Agent
2025-10-30T07:29:47.1395302Z Version: 20250912.392
2025-10-30T07:29:47.1395933Z Commit: d921fda672a98b64f4f82364647e2f10b2267d0b
2025-10-30T07:29:47.1396599Z Build Date: 2025-09-12T15:23:14Z
2025-10-30T07:29:47.1397241Z ##[endgroup]
2025-10-30T07:29:47.1397789Z ##[group]Operating System
2025-10-30T07:29:47.1398349Z Ubuntu
2025-10-30T07:29:47.1398781Z 24.04.3
2025-10-30T07:29:47.1399315Z LTS
2025-10-30T07:29:47.1399737Z ##[endgroup]
2025-10-30T07:29:47.1400216Z ##[group]Runner Image
2025-10-30T07:29:47.1401173Z Image: ubuntu-24.04
2025-10-30T07:29:47.1401698Z Version: 20250929.60.1
2025-10-30T07:29:47.1402696Z Included Software: https://github.com/actions/runner-images/blob/ubuntu24/20250929.60/images/ubuntu/Ubuntu2404-Readme.md
2025-10-30T07:29:47.1404291Z Image Release: https://github.com/actions/runner-images/releases/tag/ubuntu24%2F20250929.60
2025-10-30T07:29:47.1405235Z ##[endgroup]
2025-10-30T07:29:47.1406322Z ##[group]GITHUB_TOKEN Permissions
2025-10-30T07:29:47.1408113Z Contents: read
2025-10-30T07:29:47.1408777Z Metadata: read
2025-10-30T07:29:47.1409255Z ##[endgroup]
2025-10-30T07:29:47.1411866Z Secret source: Actions
2025-10-30T07:29:47.1412612Z Prepare workflow directory
2025-10-30T07:29:47.1734726Z Prepare all required actions
2025-10-30T07:29:47.1774724Z Getting action download info
2025-10-30T07:29:47.6695463Z Download action repository 'actions/checkout@v4' (SHA:08eba0b27e820071cde6df949e0beb9ba4906955)
2025-10-30T07:29:47.8437539Z Download action repository 'actions/setup-java@v4' (SHA:c5195efecf7bdfc987ee8bae7a71cb8b11521c00)
2025-10-30T07:29:48.4384203Z Download action repository 'actions/upload-artifact@v4' (SHA:ea165f8d65b6e75b540449e92b4886f43607fa02)
2025-10-30T07:29:48.6415408Z Complete job name: build
2025-10-30T07:29:48.7094330Z ##[group]Run actions/checkout@v4
2025-10-30T07:29:48.7095226Z with:
2025-10-30T07:29:48.7095688Z   repository: ahmedmmkms/b2b-marketplace
2025-10-30T07:29:48.7096468Z   token: ***
2025-10-30T07:29:48.7096890Z   ssh-strict: true
2025-10-30T07:29:48.7097333Z   ssh-user: git
2025-10-30T07:29:48.7097768Z   persist-credentials: true
2025-10-30T07:29:48.7098258Z   clean: true
2025-10-30T07:29:48.7098703Z   sparse-checkout-cone-mode: true
2025-10-30T07:29:48.7099226Z   fetch-depth: 1
2025-10-30T07:29:48.7099644Z   fetch-tags: false
2025-10-30T07:29:48.7100086Z   show-progress: true
2025-10-30T07:29:48.7100528Z   lfs: false
2025-10-30T07:29:48.7101174Z   submodules: false
2025-10-30T07:29:48.7101616Z   set-safe-directory: true
2025-10-30T07:29:48.7102341Z ##[endgroup]
2025-10-30T07:29:48.8182721Z Syncing repository: ahmedmmkms/b2b-marketplace
2025-10-30T07:29:48.8184680Z ##[group]Getting Git version info
2025-10-30T07:29:48.8185668Z Working directory is '/home/runner/work/b2b-marketplace/b2b-marketplace'
2025-10-30T07:29:48.8186834Z [command]/usr/bin/git version
2025-10-30T07:29:48.8260602Z git version 2.51.0
2025-10-30T07:29:48.8286950Z ##[endgroup]
2025-10-30T07:29:48.8301063Z Temporarily overriding HOME='/home/runner/work/_temp/9c977302-f06b-44a3-b660-1b43c2886370' before making global git config changes
2025-10-30T07:29:48.8303192Z Adding repository directory to the temporary git global config as a safe directory
2025-10-30T07:29:48.8313734Z [command]/usr/bin/git config --global --add safe.directory /home/runner/work/b2b-marketplace/b2b-marketplace
2025-10-30T07:29:48.8348835Z Deleting the contents of '/home/runner/work/b2b-marketplace/b2b-marketplace'
2025-10-30T07:29:48.8352454Z ##[group]Initializing the repository
2025-10-30T07:29:48.8356802Z [command]/usr/bin/git init /home/runner/work/b2b-marketplace/b2b-marketplace
2025-10-30T07:29:48.8457488Z hint: Using 'master' as the name for the initial branch. This default branch name
2025-10-30T07:29:48.8459153Z hint: is subject to change. To configure the initial branch name to use in all
2025-10-30T07:29:48.8460490Z hint: of your new repositories, which will suppress this warning, call:
2025-10-30T07:29:48.8461870Z hint:
2025-10-30T07:29:48.8462512Z hint: 	git config --global init.defaultBranch <name>
2025-10-30T07:29:48.8463222Z hint:
2025-10-30T07:29:48.8463935Z hint: Names commonly chosen instead of 'master' are 'main', 'trunk' and
2025-10-30T07:29:48.8465541Z hint: 'development'. The just-created branch can be renamed via this command:
2025-10-30T07:29:48.8466790Z hint:
2025-10-30T07:29:48.8467486Z hint: 	git branch -m <name>
2025-10-30T07:29:48.8468163Z hint:
2025-10-30T07:29:48.8468869Z hint: Disable this message with "git config set advice.defaultBranchName false"
2025-10-30T07:29:48.8470377Z Initialized empty Git repository in /home/runner/work/b2b-marketplace/b2b-marketplace/.git/
2025-10-30T07:29:48.8476605Z [command]/usr/bin/git remote add origin https://github.com/ahmedmmkms/b2b-marketplace
2025-10-30T07:29:48.8512436Z ##[endgroup]
2025-10-30T07:29:48.8513279Z ##[group]Disabling automatic garbage collection
2025-10-30T07:29:48.8516317Z [command]/usr/bin/git config --local gc.auto 0
2025-10-30T07:29:48.8544221Z ##[endgroup]
2025-10-30T07:29:48.8544984Z ##[group]Setting up auth
2025-10-30T07:29:48.8551179Z [command]/usr/bin/git config --local --name-only --get-regexp core\.sshCommand
2025-10-30T07:29:48.8581054Z [command]/usr/bin/git submodule foreach --recursive sh -c "git config --local --name-only --get-regexp 'core\.sshCommand' && git config --local --unset-all 'core.sshCommand' || :"
2025-10-30T07:29:48.8945244Z [command]/usr/bin/git config --local --name-only --get-regexp http\.https\:\/\/github\.com\/\.extraheader
2025-10-30T07:29:48.8975710Z [command]/usr/bin/git submodule foreach --recursive sh -c "git config --local --name-only --get-regexp 'http\.https\:\/\/github\.com\/\.extraheader' && git config --local --unset-all 'http.https://github.com/.extraheader' || :"
2025-10-30T07:29:48.9196893Z [command]/usr/bin/git config --local http.https://github.com/.extraheader AUTHORIZATION: basic ***
2025-10-30T07:29:48.9229871Z ##[endgroup]
2025-10-30T07:29:48.9231004Z ##[group]Fetching the repository
2025-10-30T07:29:48.9248277Z [command]/usr/bin/git -c protocol.version=2 fetch --no-tags --prune --no-recurse-submodules --depth=1 origin +b8be78e721542443586627c2366f475004f59e95:refs/remotes/origin/master
2025-10-30T07:29:52.9162534Z From https://github.com/ahmedmmkms/b2b-marketplace
2025-10-30T07:29:52.9165068Z  * [new ref]         b8be78e721542443586627c2366f475004f59e95 -> origin/master
2025-10-30T07:29:52.9194381Z ##[endgroup]
2025-10-30T07:29:52.9195888Z ##[group]Determining the checkout info
2025-10-30T07:29:52.9197601Z ##[endgroup]
2025-10-30T07:29:52.9200572Z [command]/usr/bin/git sparse-checkout disable
2025-10-30T07:29:52.9238707Z [command]/usr/bin/git config --local --unset-all extensions.worktreeConfig
2025-10-30T07:29:52.9266485Z ##[group]Checking out the ref
2025-10-30T07:29:52.9270334Z [command]/usr/bin/git checkout --progress --force -B master refs/remotes/origin/master
2025-10-30T07:29:53.1820133Z Reset branch 'master'
2025-10-30T07:29:53.1821022Z branch 'master' set up to track 'origin/master'.
2025-10-30T07:29:53.1844783Z ##[endgroup]
2025-10-30T07:29:53.1889971Z [command]/usr/bin/git log -1 --format=%H
2025-10-30T07:29:53.1913898Z b8be78e721542443586627c2366f475004f59e95
2025-10-30T07:29:53.2168285Z ##[group]Run actions/setup-java@v4
2025-10-30T07:29:53.2168575Z with:
2025-10-30T07:29:53.2168752Z   java-version: 21
2025-10-30T07:29:53.2168941Z   distribution: temurin
2025-10-30T07:29:53.2169142Z   java-package: jdk
2025-10-30T07:29:53.2169332Z   check-latest: false
2025-10-30T07:29:53.2169523Z   server-id: github
2025-10-30T07:29:53.2169712Z   server-username: GITHUB_ACTOR
2025-10-30T07:29:53.2169937Z   server-password: GITHUB_TOKEN
2025-10-30T07:29:53.2170164Z   overwrite-settings: true
2025-10-30T07:29:53.2170365Z   job-status: success
2025-10-30T07:29:53.2170837Z   token: ***
2025-10-30T07:29:53.2171027Z ##[endgroup]
2025-10-30T07:29:53.4095398Z ##[group]Installed distributions
2025-10-30T07:29:53.4159142Z Resolved Java 21.0.8+9 from tool-cache
2025-10-30T07:29:53.4160358Z Setting Java 21.0.8+9 as the default
2025-10-30T07:29:53.4173425Z Creating toolchains.xml for JDK version 21 from temurin
2025-10-30T07:29:53.4250506Z Writing to /home/runner/.m2/toolchains.xml
2025-10-30T07:29:53.4251846Z 
2025-10-30T07:29:53.4252215Z Java configuration:
2025-10-30T07:29:53.4253564Z   Distribution: temurin
2025-10-30T07:29:53.4253973Z   Version: 21.0.8+9
2025-10-30T07:29:53.4254668Z   Path: /opt/hostedtoolcache/Java_Temurin-Hotspot_jdk/21.0.8-9/x64
2025-10-30T07:29:53.4255545Z 
2025-10-30T07:29:53.4256292Z ##[endgroup]
2025-10-30T07:29:53.4276721Z Creating settings.xml with server-id: github
2025-10-30T07:29:53.4280486Z Writing to /home/runner/.m2/settings.xml
2025-10-30T07:29:53.4387810Z ##[group]Run cd backend
2025-10-30T07:29:53.4388095Z [36;1mcd backend[0m
2025-10-30T07:29:53.4388307Z [36;1mchmod +x ./mvnw[0m
2025-10-30T07:29:53.4388560Z [36;1m./mvnw clean install -DskipTests[0m
2025-10-30T07:29:53.4428256Z shell: /usr/bin/bash -e {0}
2025-10-30T07:29:53.4428503Z env:
2025-10-30T07:29:53.4428812Z   JAVA_HOME: /opt/hostedtoolcache/Java_Temurin-Hotspot_jdk/21.0.8-9/x64
2025-10-30T07:29:53.4429286Z   JAVA_HOME_21_X64: /opt/hostedtoolcache/Java_Temurin-Hotspot_jdk/21.0.8-9/x64
2025-10-30T07:29:53.4429636Z ##[endgroup]
2025-10-30T07:29:53.4514764Z chmod: cannot access './mvnw': No such file or directory
2025-10-30T07:29:53.4528914Z ##[error]Process completed with exit code 1.
2025-10-30T07:29:53.4682444Z Post job cleanup.
2025-10-30T07:29:53.6435211Z Post job cleanup.
2025-10-30T07:29:53.7367210Z [command]/usr/bin/git version
2025-10-30T07:29:53.7403934Z git version 2.51.0
2025-10-30T07:29:53.7448281Z Temporarily overriding HOME='/home/runner/work/_temp/8c7eaf98-ab39-4147-b73d-804c4d54a136' before making global git config changes
2025-10-30T07:29:53.7449610Z Adding repository directory to the temporary git global config as a safe directory
2025-10-30T07:29:53.7454967Z [command]/usr/bin/git config --global --add safe.directory /home/runner/work/b2b-marketplace/b2b-marketplace
2025-10-30T07:29:53.7490454Z [command]/usr/bin/git config --local --name-only --get-regexp core\.sshCommand
2025-10-30T07:29:53.7523259Z [command]/usr/bin/git submodule foreach --recursive sh -c "git config --local --name-only --get-regexp 'core\.sshCommand' && git config --local --unset-all 'core.sshCommand' || :"
2025-10-30T07:29:53.7748281Z [command]/usr/bin/git config --local --name-only --get-regexp http\.https\:\/\/github\.com\/\.extraheader
2025-10-30T07:29:53.7772330Z http.https://github.com/.extraheader
2025-10-30T07:29:53.7784600Z [command]/usr/bin/git config --local --unset-all http.https://github.com/.extraheader
2025-10-30T07:29:53.7814961Z [command]/usr/bin/git submodule foreach --recursive sh -c "git config --local --name-only --get-regexp 'http\.https\:\/\/github\.com\/\.extraheader' && git config --local --unset-all 'http.https://github.com/.extraheader' || :"
2025-10-30T07:29:53.8135133Z Cleaning up orphan processes