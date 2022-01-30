# Course Setup Guide
Setup locally for COMP6080 is remarkably simple. You simply require the installation of a **web browser**, along with **any text editor**, and the **NodeJS interpreter**. Please complete Steps (1) before term, and Steps (2) before week 3.

# Step 1: Web Browser and Editor

If you don't already have these installed, we recommend you download:

- Google Chrome (browser)
- VSCode (or any alternative on older or slower machines)

# Step 2: Install NVM and Node 24

We use NVM (Node Version Manager) to install and manage Node.js versions. NVM allows you to easily switch between different Node versions, which is helpful when working on multiple projects.

> **Note for CSE vLab users:**  
> You can skip the installation steps and jump directly to **vLab** at the end of Step 2.

## Step 2.1:  Install NVM

### How to Install NVM on Windows

The official nvm tool primarily supports Linux and macOS. But there's a similar tool created by coreybutler to provide an nvm experience in Windows called [nvm-windows](https://github.com/coreybutler/nvm-windows).

`nvm-windows` provides a management utility for managing Node.js versions in Windows. Here's how to install it:

#### 1. Click on "Download Now"

In the [nvm-windows repository Readme](https://github.com/coreybutler/nvm-windows#readme), click on "Download Now!":

![download](download.png)

This will open a page showing different NVM releases.



#### 2. Install the .exe file of the latest release

In the latest release, you'll find different assets. Click on the **nvm-setup.exe** asset which is the installation file for the tool:

![exe](exe.png)



#### 3. Complete the Installation Wizard

Open the file that you have downloaded, and complete the installation wizard.

When done, you can confirm that nvm has been installed by running:

```bash
nvm --version
```

If nvm was installed correctly, this command will show you the nvm version installed.



###  How to Install NVM on Linux and Mac

Since Linux and Mac have some similarities (they are both UNIX-based OSes), you can install nvm on them in similar ways.

#### 1. Run the nvm installer

Open a terminal and run the following command to install NVM:

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash

# or

wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash
```

#### 2: Reload Your Shell Configuration

After installation, run one of the following commands (depending on your shell):

**For Bash users:**

```bash
source ~/.bashrc
```

**For Zsh users (macOS default):**

```bash
source ~/.zshrc
```

Alternatively, you can simply close your terminal window and open a new one.

#### 3: Verify Installation

Run the following command to check if NVM was installed successfully:

```bash
nvm --version
```

If you see a version number (e.g., `0.40.3`), the installation was successful!



## Step 2.2:  Installing Node 24

Once NVM is installed, you can easily install Node.js.

#### 1. Install Node.js 24

In your terminal (or Command Prompt/PowerShell), run:

```bash
nvm install 24
```

This will automatically download and install the latest Node.js 24.x version.

#### 2. Set as Default Version

After installation, set Node.js 24 as your active version:

```bash
nvm use 24
```

To make this version the permanent default (used every time you open a terminal):

##### **Windows:** The Windows version automatically remembers the last version you used.

##### **  macOS / Linux:**

```bash
nvm alias default 24
```

#### 3. Verify Node.js Installation

To confirm everything is set up correctly, run:

```bash
node --version
```

You should see output like `v24.x.x`.

## Step 2.3: Running Node in the Terminal

You can run the Node.js interpreter in REPL (Read-Eval-Print Loop) mode. This is a good way to verify that Node.js is installed correctly and to experiment with JavaScript. It works similarly to running `python3` in REPL mode.

Simply open a terminal and type `node` then press Enter. You should see a prompt that looks like `>`. You can now enter any JavaScript statement and see the output.

Examples of things you could try:

- `console.log('Hello COMP6080')` – prints **Hello COMP6080**, returns undefined
- `3 + 4` – returns 7
- `const a = 5` – assigns 5 to a variable, returns undefined
- `a * 2` – returns 10

Press **Ctrl+D** (or **Ctrl+C** twice) to exit REPL mode.

![local-mac](local-mac.png)

# vLab

If you have a CSE account, you can set up Node 24 on vLab by simply running:

```bash
~cs6080/nodesetup
```

This will configure Node 24 for the current term. **No further installation required** — you can skip directly to using Node.

![vlab](cselab.png)
