//Imported modules
const { app, BrowserWindow, ipcMain } = require("electron");
const path = require('path');
const axios = require('axios');


//Main window
const isDev = true;

const createWindow = () => {
  const win = new BrowserWindow({
    width: isDev ? 1200 : 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  if(isDev){
    win.webContents.openDevTools();
  }

  win.loadFile(path.join(__dirname, "./renderer/index.html"));
};

app.whenReady().then(() => {
  //Initialize Functions  
  ipcMain.handle('axios.openAI', openAI)
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});


//Main Function
async function openAI(event, Input) {
  let res = null;

  await axios({
      method: 'post',
      url: 'https://api.openai.com/v1/completions',
      data: {
        model: "text-davinci-003",
        prompt: "What are 5 key points I should know when studying " + Input + " and make it short, maximum of 150 token",
        temperature: 0.3,
        max_tokens: 150,
        top_p: 1.0,
        frequency_penalty: 0.0,
        presence_penalty: 0.0
      },
      headers: {
        'Content-Type': 'application/json',
        'Authorization' : 'Bearer'
      }

    }).then(function (response) {
      res = response.data;
    })
    .catch(function (error) {
      res = error;
    });

  return res;
}
