Setup locally for COMP6080 is remarkably simple. You simply require the installation of a **web browser**, along with **any text editor**, and the **NodeJS interpreter**. Please complete Steps (1) before term, and Steps (2) before week 3.

---

##### Step 1.1: Web Browser and Editor

If you don't already have these installed, we recommend you download:

- [Google Chrome](https://www.google.com/intl/en_au/chrome/) (browser)
- [VSCode](https://code.visualstudio.com/download) (or any alternative on older or slower machines)

---

##### Step 2.1: Install Node (includes NPM) version v18.19.0 (though any version of Node 18.X is fine)

NodeJS can be installed on **Windows**, **MacOS**, and **Linux** by downloading it via the [NodeJS website](https://nodejs.org/en/download/). NPM is automatically installed alongside NodeJS.

![NodeJS download page](help-nodejs-site.png)

However, because you're a computer scientist, we'd recommend you install it via command line to get comfortable with the process. The results are virtually the same:

###### **Windows** command-line install

Whilst you can install NodeJS onto Windows natively, we recommend installing it via the Windows Subsystem for Linux. Simply open up a WSL terminal and run the following commands:

```
sudo apt update
sudo apt install nodejs
```

If you haven't installed WSL or haven't heard of it before: WSL is a way to install a linux command prompt on windows, open that command prompt like a program, and interact with it the exact same way you would if you were on a linux machine. It's a very helpful tool for windows-based unix developers.

[This guide by Microsoft](https://docs.microsoft.com/en-us/windows/wsl/install-win10) shows you how to install WSL, and we would recommend choosing Ubuntu 20.04 as the version of linux you install with. Once it's installed you can interact with it in a very similar way to what you would with a command line on vlab.

###### **MacOS** command-line install

If you haven't already, install [homebrew](https://brew.sh). Then open a terminal and run:

```
brew install node
```

###### **Linux** command-line install

Open a terminal, and run:

```
sudo apt update
sudo apt install nodejs
```

---

##### Step 2.2: Install Yarn

In the world of Javascript development, an alternative to NPM called **yarn** is sometimes used.

To install **yarn** on Windows (WSL) or Linux, open a terminal and run:

```
sudo npm i -g yarn
```

To install **yarn** on MacOS, open a terminal and run:

```
brew install yarn
```

---

##### Step 2.3: Test out the interpreter

You can run the NodeJS interpreter in repl mode. This is a good way to try out if you install NodeJS correctly. It's very similar to running **python3** in repl mode.

Simply open a terminal and enter `node` into the terminal and press enter. After this, you should be able to enter any nodejs compatible statement and retrieve the output. Examples of things you could enter are:

- `console.log('hello world')` - prints hello world, returns nothing
- `3 + 4` - returns 7
- `const a = 5` - assigns 5 to a variable, returns nothing

You can press CTRL+D to exit repl mode.

![Node REPL](help-repl.png)
