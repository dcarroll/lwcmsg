import { flags, SfdxCommand } from '@salesforce/command';
import { Messages, SfdxError, SfdxProject } from '@salesforce/core';
import { AnyJson } from '@salesforce/ts-types';
import * as fs from 'fs';
import * as mkdirp from 'mkdirp';
import { join } from 'path';

// Initialize Messages with the current plugin directory
Messages.importMessagesDirectory(__dirname);

// Load the specific messages for this file. Messages from @salesforce/command, @salesforce/core,
// or any library that is using the messages framework can also be loaded this way.
const messages = Messages.loadMessages('lwcmsg', 'create');

export default class Org extends SfdxCommand {

  public static description = messages.getMessage('commandDescription');

  public static examples = [
  `$ sfdx force:lightning:messagechannel:create -n myChannel -l MyChannel
  `,
  `$ sfdx force:lightning:messagechannel:create -n myChannel -l MyChannel -d messageChannels
  `
  ];

  public static args = [{name: 'file'}];

  protected static flagsConfig = {
    // flag with a value (-n, --name=VALUE)
    name: flags.string({char: 'n', required: true, description: messages.getMessage('nameFlagDescription')}),
    exposed: flags.boolean({char: 'e', default: false, description: messages.getMessage('exposedFlagDescription')}),
    label: flags.string({char: 'l', description: messages.getMessage('labelFlagDescription')}),
    outputdir: flags.string({char: 'd', description: messages.getMessage('outputDirFlagDescription')})
  };

  // Comment this out if your command does not require an org username
  protected static requiresUsername = false;

  // Comment this out if your command does not support a hub org username
  protected static supportsDevhubUsername = false;

  // Set this to true if your command requires a project workspace; 'requiresProject' is false by default
  protected static requiresProject = true;

  public async run(): Promise<AnyJson> {
    this.flags.name = (this.flags.name as string).replace(' ', '_');
    if (!this.flags.label) {
      this.flags.label = this.flags.name;
    }
    const projRoot = await SfdxProject.resolveProjectPath(process.cwd());

    this.log('output dir: ' + this.flags.outputdir);

    if (!this.flags.outputdir) {
      const packageDirectories = await this.getDefaultSourceFolder();
      this.flags.outputdir = join(projRoot, packageDirectories, 'main', 'default', 'messageChannels');
      this.log(this.flags.outputdir);
    } else {
      this.flags.outputdir = join(projRoot, this.flags.outputdir);
    }
    mkdirp.sync(this.flags.outputdir);

    const metaXml = `<?xml version="1.0" encoding="UTF-8"?>
<LightningMessageChannel xmlns="http://soap.sforce.com/2006/04/metadata">
    <masterLabel>${this.flags.label}</masterLabel>
    <isExposed>${this.flags.exposed || false}</isExposed>
</LightningMessageChannel`;

    this.log(metaXml);
    fs.writeFileSync(join(this.flags.outputdir, this.flags.name + '.messageChannel'), metaXml);
    return { };
  }

  private async getDefaultSourceFolder(): Promise<string> {
    const project = await SfdxProject.resolve();
    const projectJson = await project.resolveProjectConfig();
    const dirs = projectJson.packageDirectories.valueOf();
    for (const adir in dirs) {
      if (dirs.hasOwnProperty(adir)) {
        return dirs[adir].path;
      }
    }
    throw SfdxError.create('lwcmsg', 'create', 'missingDefaultDirError');
  }
}
