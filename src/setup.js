const fs = require("fs");
const { exec } = require("child_process");

const pJson = {
  name: "",
  version: "1.0.0",
  description: "",
  main: "index.js",
  scripts: {
    test: 'echo "Error: no test specified" && exit 1',
  },
  keywords: [],
  author: "",
  license: "ISC",
  devDependencies: {
    typescript: "^5.0.4",
    "@types/express": "^4.17.15",
    "ts-node-dev": "^2.0.0",
    "@types/node": "^18.11.18",
    nodemon: "^2.0.20",
    "ts-node-dev": "^2.0.0",
  },
  dependencies: {
    express: "^4.18.2",
    "express-validator": "^6.14.3",
    folderforge: "^1.0.3",
  },
};

function setup(projectName, callback) {
  fs.writeFile("package.json", JSON.stringify({...pJson, name: projectName}), (error) => {
    if (error) {
      console.error(error);
    }

    console.log("Installing dependencies...")
    exec("npm install", (error, stdout, stderr) => {
      if (error) {
        console.error(`Error al ejecutar 'npm install': ${error}`);
        return;
      }

      console.log(stdout);
      console.error(stderr);
      
      
      exec("npx tsc --init", (error, stdout, stderr) => {
        if (error) {
          console.error(`Error al ejecutar 'npx tsc --init': ${error}`);
          return;
        }
        console.log('Installing typescript...')
        
        console.log(stdout);
        console.error(stderr);

        callback();
      });
    });
    
  });
}

module.exports = setup;