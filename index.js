const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

function createWindow() {
  const win = new BrowserWindow({
    width: 640,
    height: 480
  });
  win.webContents.openDevTools();
  win.loadURL(`http://localhost:8080`);
}

app.on("ready", () => {
  createWindow();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

