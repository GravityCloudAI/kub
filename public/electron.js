const { app, BrowserWindow, session } = require('electron');
const { exec, execSync } = require('child_process');
const child_process = require('child_process');
const path = require('path');
const http = require('http');
const fs = require('fs');
const util = require('util')
const url = require('url');
const os = require('os');
const https = require('https');

let updatedPath = ""
let userName = ""

try {
    if (os.platform() === "darwin") {
        userName = execSync('users', { shell: true }).toString().trim();
    } else if (os.platform() === "win32") {
        userName = execSync('echo %USERNAME%', { shell: true }).toString().trim();
    } else {
        userName = execSync('whoami', { shell: true }).toString().trim();
    }
} catch (error) {
    console.error('Error getting user name:', error);
}

// use rc files to get the paths needed for configs
let zshrcPath = `/Users/${userName}/.zshrc`;
let bashrcPath = `/Users/${userName}/.bashrc`;

if (os.platform() === "linux") {
    zshrcPath = `/home/${userName}/.zshrc`;
    bashrcPath = `/home/${userName}/.bashrc`;
} else if (os.platform() === "win32") {
    zshrcPath = `C:\\Users\\${userName}\\.zshrc`;
    bashrcPath = `C:\\Users\\${userName}\\.bashrc`;
}

const processRcFileSync = (filePath) => {
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        const pathMatches = data.match(/^export\s+PATH="([^"]+)"/gm);

        if (pathMatches) {
            const paths = pathMatches.map(match => match.replace(/^export\s+PATH="([^"]+)"/, '$1'));
            updatedPath = [...new Set(paths)].join(':');
        }
    } catch (err) {
        console.error(`Error reading ${path.basename(filePath)}: ${err.message}`);
    }
};

// Check and process .zshrc or .bashrc synchronously
if (fs.existsSync(zshrcPath)) {
    processRcFileSync(zshrcPath)
} else if (fs.existsSync(bashrcPath)) {
    processRcFileSync(bashrcPath)
} else {
    console.error(`Neither .zshrc nor .bashrc file found.`)
}

// this proxy server is used to query the terminal commands and get responses to the app
const server = http.createServer((req, res) => {
    if (process.env.NODE_ENV === "development") {
        res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    } else {
        res.setHeader('Access-Control-Allow-Origin', 'https://console.gravitycloud.ai');
    }
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', 'true');

    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;
    if (pathname === '/execute') {
        const command = parsedUrl?.query?.cmd;
        let shellEnv = parsedUrl?.query?.shellEnv || false

        if (os.platform() === "linux") {
            shellEnv = "true"
        }

        const mergedEnv = { ...process.env, PATH: updatedPath }
        const env = (process.env.NODE_ENV === "development") ? process.env : mergedEnv

        const options = shellEnv === "true" ? { shell: true } : { shell: true, env }

        const child = child_process.spawn(command, [], options);

        child.stdout.on('data', (data) => {
            res.write(data);
        });

        child.stderr.on('data', (data) => {
            res.write(data);
        });

        child.on('close', (code) => {
            res.end();
        });
    } else if (pathname === '/callback') {
        // get the auth param from the url
        const auth = parsedUrl?.query?.auth
        console.log("auth: " + auth)

        // send auth param to react app
        if (win) {
            win?.webContents?.send('protocol-data', { auth });
        }

        // return basic html page that says you can close this window with text in the center white in color, make the page body background color #05050a
        const htmlContent = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Authentication Successful</title>
                <style>
                    body {
                        background-color: #05050a;
                        color: white;
                        font-family: Arial, sans-serif;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        height: 100vh;
                        margin: 0;
                    }
                    .message {
                        text-align: center;
                    }
                </style>
            </head>
            <body>
                <div class="message">
                    <h1>Authentication Successful</h1>
                    <p>You can now close this window.</p>
                </div>
            </body>
            </html>
        `;

        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(htmlContent);

    }
    else {
        res.writeHead(404);
        res.end('Not found');
    }
});

server.listen(51742, "127.0.0.1", () => {
    console.log('Server listening on port 51742');
}).on('error', (error) => {
    console.error('Error starting server:', error);
    if (error.code === 'EADDRINUSE') {
        console.error('Port 51742 is already in use. Please close any other applications using this port and try again.');
    }
});

let win
function createWindow() {
    win = new BrowserWindow({
        show: false,
        width: 1200,
        height: 800,
        titleBarStyle: "hiddenInset",
        transparency: true,
        backgroundColor: "#00000000",
        vibrancy: 'fullscreen-ui',
        backgroundMaterial: 'acrylic',
        frame: false,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'), // Path to the preload script
            nodeIntegration: true,
            nodeIntegrationInSubFrames: true,
            enableRemoteModule: true,
        }
    });

    if (process.env.NODE_ENV === "development") {
        win?.loadURL("http://localhost:51742")
        win?.webContents.openDevTools();
    } else {
        win?.loadURL("http://localhost:51742")
    }
    app.setAsDefaultProtocolClient('gravitycloud')

    win.once('ready-to-show', () => {
        win.maximize()
    })

    win.on('enter-full-screen', () => {
        win.setVibrancy(null)
        win.setBackgroundColor('#05050a')
    })

    win.on('leave-full-screen', () => {
        win.setBackgroundColor('#00000000')
        win.setVibrancy('fullscreen-ui')

        const [width, height] = win.getSize();
        win.setSize(width - 1, height - 1);
        setTimeout(() => {
            win.setSize(width, height);
        }, 100);
    })
}

app.whenReady().then(() => {
    createWindow();
    persistCookies()
    app.on("activate", function () {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

app.on('open-url', (event, url) => {
    event.preventDefault();

    // Parse the URL and extract parameters
    const urlObj = new URL(url);
    const auth = urlObj.searchParams.get('auth');
    if (win) {
        win.webContents.send('protocol-data', { auth });
    }
});

function persistCookies() {
    var cookies = session.defaultSession.cookies;
    cookies.on('changed', function (event, cookie, cause, removed) {
        if (cookie.session && !removed) {
            var url = util.format('%s://%s%s', (!cookie.httpOnly && cookie.secure) ? 'https' : 'http', cookie.domain, cookie.path);
            cookies.set({
                url: url,
                name: cookie.name,
                value: cookie.value,
                domain: cookie.domain,
                path: cookie.path,
                secure: cookie.secure,
                httpOnly: cookie.httpOnly,
                expirationDate: Math.floor(new Date().getTime() / 1000) + 1209600
            }, function (err) {
                if (err) {
                    console.log('Error trying to persist cookie', err, cookie);
                }
            });
        }
    });
}