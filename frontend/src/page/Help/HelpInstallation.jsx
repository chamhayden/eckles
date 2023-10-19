import React from "react";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

import HelpNodeSite from "../../asset/help-nodejs-site.png";
import HelpRepl from "../../asset/help-repl.png";

import makePage from "../../component/makePage";

const HelpInstallation = ({}) => {
	return (
		<>
			<Typography variant="body" component="div" gutterBottom>
				Setup locally for COMP6080 is remarkably simple. You simply require the
				installation of a <b>web browser</b>, along with <b>any text editor</b>,
				and the <b>NodeJS interpreter</b>. Please complete Steps (1) before
				term, and Steps (2) before week 3.
			</Typography>

			<Divider sx={{ mb: 3, mt: 3 }} />

			<Typography variant="h5" component="div" gutterBottom>
				Step 1.1: Web Browser and Editor
			</Typography>

			<Typography variant="body" component="div" gutterBottom>
				If you don't already have these installed, we recommend you download:
				<ul>
					<li>
						<a target="_blank" href="https://www.google.com/intl/en_au/chrome/">
							Google Chrome
						</a>{" "}
						(browser)
					</li>
					<li>
						<a target="_blank" href="https://code.visualstudio.com/download">
							VSCode
						</a>{" "}
						(or any{" "}
						<a target="_blank" href="https://www.sublimetext.com/3">
							alternative
						</a>{" "}
						on older or slower machines)
					</li>
				</ul>
			</Typography>

			<Divider sx={{ mb: 3, mt: 3 }} />

			<Typography variant="h5" component="div" gutterBottom>
				Step 2.1: Install Node (includes NPM) version 16.14.2 (though any
				version of Node 16.X is fine)
			</Typography>

			<Typography variant="body" component="div" gutterBottom>
				NodeJS can be installed on <b>Windows</b>, <b>MacOS</b>, and{" "}
				<b>Linux</b> by downloading it via the{" "}
				<a target="_blank" href="https://nodejs.org/en/download/">
					NodeJS website
				</a>
				. NPM is automatically installed alongside NodeJS.
			</Typography>

			<img
				src={HelpNodeSite}
				style={{ width: "80%", maxWidth: "600px", marginTop: "10px" }}
			/>

			<Typography variant="body" component="div" gutterBottom sx={{ mt: 1 }}>
				However, because you're a computer scientist, we'd recommend you install
				it via command line to get comfortable with the process. The results are
				virtually the same:
			</Typography>

			<Typography variant="h6" component="div" gutterBottom sx={{ mt: 3 }}>
				<b>Windows</b> command-line install
			</Typography>

			<Typography variant="body" component="div" gutterBottom sx={{ mt: 1 }}>
				Whilst you can install NodeJS onto Windows natively, we recommend
				installing it via the Windows Subsystem for Linux. Simply open up a WSL
				terminal and run the following commands:
				<pre>
					<code>sudo apt update</code>
				</pre>
				<pre>
					<code>sudo apt install nodejs</code>
				</pre>
			</Typography>

			<Typography variant="body" component="div" gutterBottom sx={{ mt: 1 }}>
				If you haven't installed WSL or haven't heard of it before: WSL is a way
				to install a linux command prompt on windows, open that command prompt
				like a program, and interact with it the exact same way you would if you
				were on a linux machine. It's a very helpful tool for windows-based unix
				developers.
			</Typography>
			<Typography variant="body" component="div" gutterBottom sx={{ mt: 1 }}>
				<a
					target="_blank"
					href="https://docs.microsoft.com/en-us/windows/wsl/install-win10"
				>
					This guide by Microsoft
				</a>{" "}
				shows you how to install WSL, and we would recommend choosing Ubuntu
				20.04 as the version of linux you install with. Once it's installed you
				can interact with it in a very similar way to what you would with a
				command line on vlab.
			</Typography>

			<Typography variant="h6" component="div" gutterBottom sx={{ mt: 3 }}>
				<b>MacOS</b> command-line install
			</Typography>

			<Typography variant="body" component="div" gutterBottom sx={{ mt: 1 }}>
				<ol>
					<li>
						If you haven't already, install{" "}
						<a target="_blank" href="https://brew.sh">
							homebrew
						</a>
						.
					</li>
					<li>
						Open a terminal, and run{" "}
						<pre>
							<code>brew install node</code>
						</pre>
					</li>
				</ol>
			</Typography>

			<Typography variant="h6" component="div" gutterBottom sx={{ mt: 3 }}>
				<b>Linux</b> command-line install
			</Typography>

			<Typography variant="body" component="div" gutterBottom sx={{ mt: 1 }}>
				<ol>
					<li>
						Open a terminal, and run
						<pre>
							<code>sudo apt update</code>
						</pre>
						<pre>
							<code>sudo apt install nodejs</code>
						</pre>
					</li>
				</ol>
			</Typography>

			<Divider sx={{ mb: 3, mt: 3 }} />

			<Typography variant="h5" component="div" gutterBottom>
				Step 2.2: Install Yarn
			</Typography>

			<Typography variant="body" component="div" gutterBottom sx={{ mt: 1 }}>
				In the world of Javascript development, an alternative to NPM called{" "}
				<b>yarn</b> is sometimes used.
			</Typography>

			<Typography variant="body" component="div" gutterBottom sx={{ mt: 1 }}>
				To install <b>yarn</b> on Windows (WSL) or Linux, open a terminal and
				run:
				<pre>
					<code>sudo npm i -g yarn</code>
				</pre>
			</Typography>

			<Typography variant="body" component="div" gutterBottom sx={{ mt: 1 }}>
				To install <b>yarn</b> on MacOS, open a terminal and run:
				<pre>
					<code>brew install yarn</code>
				</pre>
			</Typography>

			<Divider sx={{ mb: 3, mt: 3 }} />

			<Typography variant="h5" component="div" gutterBottom>
				Step 2.3: Test out the interpreter
			</Typography>

			<Typography variant="body" component="div" gutterBottom sx={{ mt: 1 }}>
				You can run the NodeJS interpreter in repl mode. This is a good way to
				try out if you install NodeJS correctly. It's very similar to running{" "}
				<b>python3</b> in repl mode.
			</Typography>

			<Typography variant="body" component="div" gutterBottom sx={{ mt: 1 }}>
				Simply open a terminal and enter <code>node</code> into the terminal and
				press enter. After this, you should be able to enter any nodejs
				compatible statement and retrieve the output. Examples of things you
				could enter are:
				<ul>
					<li>
						<code>console.log('hello world')</code> - prints hello world,
						returns nothing
					</li>
					<li>
						<code>3 + 4</code> - returns 7
					</li>
					<li>
						<code>const a = 5</code> - assigns 5 to a variable, returns nothing
					</li>
				</ul>
				You can press CTRL+D to exit repl mode.
			</Typography>

			<img
				src={HelpRepl}
				style={{ width: "80%", maxWidth: "400px", marginTop: "10px" }}
			/>
		</>
	);
};

export default makePage(HelpInstallation, {
	loginRequired: false,
	title: "Installation Help",
});
