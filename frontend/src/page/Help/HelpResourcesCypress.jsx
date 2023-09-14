import React from 'react';

import makePage from '../../component/makePage';

import { Body, H3, H5, HR, Code, Example } from '../../component/StyleComponents';

const ResourcesCypress = ({}) => {
  return (
    <>

      <H3>Running Cypress in Windows Subsystem for Linux (WSL2)</H3>

      <Body>The new WSL should support a GUI natively according to <a target="_blank" href="https://learn.microsoft.com/en-us/windows/wsl/tutorials/gui-apps">Gui-apps Guide</a> by Microsoft. However, if you still cannot open Cypress or you received the following:</Body>

      <Code lang="shell">The test runner unexpectedly exited via a close event with signal SIGABRT</Code>

      <Body>as a line of Cypress output. The following setup could be helpful for resolving your issue.</Body>

      <Body>Note: Before executing any command, please be sure to read and understand it. You should review any shell script provided by anyone before blindly running it.</Body>

      <H5>Dependencies</H5>

      <Body>First we need to open a WSL2 (default as Ubuntu) terminal, and type in</Body>

      <Code lang="shell">
{`sudo apt install libgtk2.0-0 libgtk-3-0 libgbm-dev libnotify-dev \
     libgconf-2-4 libnss3 libxss1 libasound2 libxtst6 xauth xvfb \
     x11-apps build-essential ca-certificates libcurl3-gnutls    \
     libcurl4 libcurl4-openssl-dev`}
{`mkdir ~/bin`}
{`echo "export PATH=~/bin:\$PATH" >> ~/.bashrc`}
      </Code>

      <Body>into your shell. These are the packages we need.</Body>

      <H5>Download and Install X-server</H5>

      <Body>We need to have an <a target="_blank" href="https://en.wikipedia.org/wiki/X.Org_Server">X-server</a> to display GUI from the Linux subsystem.</Body>

      <Body>There are a variety of X-servers available, here we are going to use <a target="_blank" href="https://sourceforge.net/projects/vcxsrv/files/">VcXsrv</a>. You can use any other similar tool.</Body>

      <H5>Setup <code>$DISPLAY</code> Environment Variable and d-bus</H5>

      <Body>Open your <code>.bashrc</code> (or equivalent such as <code>.zshrc</code> if you are using <code>zsh</code>) by using</Body>

      <Code lang="shell">nano .bashrc</Code>

      <Body>in your shell, set the <code>$DISPLAY</code> environment variable by adding the following command:</Body>

      <Code lang="shell">
{`# set DISPLAY variable to the IP automatically assigned to WSL2
export DISPLAY=$(cat /etc/resolv.conf | grep nameserver | awk '{print $2; exit;}'):0.0`}
      </Code>

      <Body>And also add the below line of code as well to allow internal communicate for VcXsrv GUI.</Body>

      <Code lang="shell">/etc/init.d/dbus start &> /dev/null</Code>

      <Body>You could easily verify <code>$DISPLAY</code> by <code>echo</code>.</Body>

      <Code lang="shell">
{`echo $DISPLAY
# Output should look like: 172.26.64.1:0.0`}
      </Code>

      <Body>Now linux user needs to be granted access to d-bus without a password. To do so, we need to use <code>visido</code>.</Body>

      <Code lang="shell">
{`sudo visudo -f /etc/sudoers.d/dbus`}
      </Code>

      <Body>This command above will open a new editor, add the following line with your username and save file.</Body>

      <Code lang="shell">
      {`<your_username> ALL = (root) NOPASSWD: /etc/init.d/dbus`}
      </Code>

      <Body>You could obtain your username by running</Body>

      <Code lang="shell">
      {`whoami`}
      </Code>

      <H5>Start X-server</H5>

      <Body>Open your start menu, type in <code>Xlaunch</code> and open it.</Body>

      <Body>Config:
        <ul>
          <li>Select display settings: <code>Multiple Windows</code>(default), Click Next Step</li>
          <li>Select how to start clients: <code>Start no client</code>(default), Click Next Step</li>
          <li>Extra settings: Check <code>Disable access control</code>, Uncheck <code>Native opengl</code>, Click Next Step</li>
          <li>Save configuration on startup folder, location: <code>%AppData%\Microsoft\Windows\Start Menu\Programs\Startup</code></li>
        </ul>
      </Body>

      <Body>
        <b>IMPORTANT</b>: You need to keep your <code>X-server</code> running while you are using any GUI-app like cypress!
      </Body>

      <H5>Add permission in Windows Defender Firewall</H5>

      <Body>Go to Control Panel {`>`} System and Security > Windows Defender Firewall > Inbound Rules > New Rule. Or you could open start menu, open `run`, then type in `%windir%\system32\WF.msc` in `run`'s interface.</Body>

      <Body>Right-Click Inbound Rules -{`>`} New Rule...
        <ul>
          <li>Rule Type: Program</li>
          <li>Program -{`>`} This Program Path: browse and select path to `vcxsrv.exe`.</li>
          <li>Action: Allow the Connection</li>
          <li>Profile: Check all</li>
          <li>Name: VcXsrv</li>
        </ul>
      </Body>

      <H5>Running the tests</H5>

      <Body>Now you should be able to use cypress by <Code>npx cypress open</Code> for <code>npm</code>, or <Code>yarn run cypress open</Code> for <code>yarn</code>.</Body>

      <Body>You may want to consider adding</Body>

      <Code lang="json">
{`{
  "scripts": {
    "cypress:open": "cypress open"
  }
}`}
      </Code>

      <Body>into your <b><code>package.json</code></b> file.</Body>

    </>
  );
};

export default makePage(ResourcesCypress, {
  loginRequired: true,
  title: 'Cypress Resources',
});
