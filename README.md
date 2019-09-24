lwcmsg
======



[![Version](https://img.shields.io/npm/v/lwcmsg.svg)](https://npmjs.org/package/lwcmsg)
[![CircleCI](https://circleci.com/gh/dcarroll/lwcmsg/tree/master.svg?style=shield)](https://circleci.com/gh/dcarroll/lwcmsg/tree/master)
[![Appveyor CI](https://ci.appveyor.com/api/projects/status/github/dcarroll/lwcmsg?branch=master&svg=true)](https://ci.appveyor.com/project/heroku/lwcmsg/branch/master)
[![Codecov](https://codecov.io/gh/dcarroll/lwcmsg/branch/master/graph/badge.svg)](https://codecov.io/gh/dcarroll/lwcmsg)
[![Greenkeeper](https://badges.greenkeeper.io/dcarroll/lwcmsg.svg)](https://greenkeeper.io/)
[![Known Vulnerabilities](https://snyk.io/test/github/dcarroll/lwcmsg/badge.svg)](https://snyk.io/test/github/dcarroll/lwcmsg)
[![Downloads/week](https://img.shields.io/npm/dw/lwcmsg.svg)](https://npmjs.org/package/lwcmsg)
[![License](https://img.shields.io/npm/l/lwcmsg.svg)](https://github.com/dcarroll/lwcmsg/blob/master/package.json)

<!-- toc -->
* [Debugging your plugin](#debugging-your-plugin)
<!-- tocstop -->
<!-- install -->
<!-- usage -->
```sh-session
$ npm install -g lwcmsg
$ sfdx COMMAND
running command...
$ sfdx (-v|--version|version)
lwcmsg/0.0.0 darwin-x64 node-v10.15.1
$ sfdx --help [COMMAND]
USAGE
  $ sfdx COMMAND
...
```
<!-- usagestop -->
<!-- commands -->
* [`sfdx lightning:create -n <string> [-e] [-l] [-d] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-lightningcreate--n-string--e--l--d---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)

## `sfdx lightning:create -n <string> [-e] [-l] [-d] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

create a message channel to enable communication between Visualforce, Aura, and LWC

```
USAGE
  $ sfdx lightning:create -n <string> [-e] [-l] [-d] [--json] [--loglevel 
  trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

OPTIONS
  -d, --outputdir                                                                   folder to put generated message
                                                                                    channel in

  -e, --exposed                                                                     expose the channel globally

  -l, --label                                                                       channel display label

  -n, --name=name                                                                   (required) channel name

  --json                                                                            format output as json

  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for
                                                                                    this command invocation

EXAMPLES
  $ sfdx force:lightning:messagechannel:create -n myChannel -l MyChannel
  
  $ sfdx force:lightning:messagechannel:create -n myChannel -l MyChannel -d messageChannels
```

_See code: [lib/commands/lightning/create.js](https://github.com/dcarroll/lwcmsg/blob/v0.0.0/lib/commands/lightning/create.js)_
<!-- commandsstop -->
<!-- debugging-your-plugin -->
# Debugging your plugin
We recommend using the Visual Studio Code (VS Code) IDE for your plugin development. Included in the `.vscode` directory of this plugin is a `launch.json` config file, which allows you to attach a debugger to the node process when running your commands.

To debug the `hello:org` command: 
1. Start the inspector
  
If you linked your plugin to the sfdx cli, call your command with the `dev-suspend` switch: 
```sh-session
$ sfdx hello:org -u myOrg@example.com --dev-suspend
```
  
Alternatively, to call your command using the `bin/run` script, set the `NODE_OPTIONS` environment variable to `--inspect-brk` when starting the debugger:
```sh-session
$ NODE_OPTIONS=--inspect-brk bin/run hello:org -u myOrg@example.com
```

2. Set some breakpoints in your command code
3. Click on the Debug icon in the Activity Bar on the side of VS Code to open up the Debug view.
4. In the upper left hand corner of VS Code, verify that the "Attach to Remote" launch configuration has been chosen.
5. Hit the green play button to the left of the "Attach to Remote" launch configuration window. The debugger should now be suspended on the first line of the program. 
6. Hit the green play button at the top middle of VS Code (this play button will be to the right of the play button that you clicked in step #5).
<br><img src=".images/vscodeScreenshot.png" width="480" height="278"><br>
Congrats, you are debugging!
