#!/usr/bin/env node

import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import sprout from './src/sprout.js';
import ipFake from './src/ip-fake.js';

const ACTION_LOGIN = 'Log In';
const ACTION_LOGOUT = 'Log Out';

const builder = (yargs) => {
  yargs.positional('username', {
    type: 'string',
    describe: 'Your username',
  });
  yargs.positional('password', {
    type: 'string',
    describe: 'You password',
  });
};

yargs(hideBin(process.argv))
  .usage('$0 <login|logout> [options]')
  .command(
    'login [username] [password]',
    'Login to Sprout',
    builder,
    async ({ username, browser, password, ipAddress, screenshot, timeout }) => {
      await sprout({
        action: ACTION_LOGIN,
        username,
        password,
        ipAddress,
        timeout,
        wantScreenshot: screenshot,
        showBrowser: browser,
      });
      console.log('Done Log In');
    }
  )
  .command(
    'logout [username] [password]',
    'Logout to Sprout',
    builder,
    async ({ username, browser, password, ipAddress, screenshot, timeout }) => {
      await sprout({
        action: ACTION_LOGOUT,
        username,
        password,
        ipAddress,
        timeout,
        wantScreenshot: screenshot,
        showBrowser: browser,
      });
      console.log('Done Log Out');
    }
  )
  .option('ip-address', {
    alias: 'i',
    describe:
      'Your personal IP Address, automatically it will generate random IP',
    type: 'string',
    default: ipFake(),
  })
  .option('timeout', {
    alias: 't',
    default: 5000,
    describe: 'Page timeout',
    type: 'number',
  })
  .option('screenshot', {
    alias: 's',
    default: true,
    describe: 'If you want to save screenshot',
    type: 'boolean',
  })
  .option('browser', {
    default: false,
    describe: 'Show a browser',
    type: 'boolean',
  })
  .demandCommand()
  .help()
  .parse();
