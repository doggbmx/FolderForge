const fs = require("fs");
const readline = require("readline");
const { exec } = require("child_process");

//SETUP
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const pJson = {
  name: "GODnpm",
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
  },
  dependencies: {
    express: "^4.18.2",
  },
};

function createFolderStructure() {
  fs.mkdirSync("src/core/services", { recursive: true });
  fs.mkdirSync("src/core/routing", { recursive: true });
  fs.mkdirSync("src/core/config", { recursive: true });
  fs.mkdirSync("src/core/middlewares", { recursive: true });
}

async function setup() {
  await fs.writeFileSync("package.json", JSON.stringify(pJson), (error) => {
    if (error) {
      console.error(error);
    }
  });

  await exec("npm install", (error, stdout, stderr) => {
    if (error) {
      console.error(`Error al ejecutar 'npm install': ${error}`);
      return;
    }
    console.log("Salida:", stdout);

    exec("npx tsc --init", (error, stdout, stderr) => {
      if (error) {
        console.error(`Error al ejecutar 'npx tsc --init': ${error}`);
        return;
      }
      console.log("Salida:", stdout);
    });
  });
}

function index() {
  const folderName = process.argv[1].split("/index.js")[0];

  rl.question("What is your new module?:", (answer) => {
    if (!answer) {
      console.error("Please specify a folder name");
      process.exit(1);
    }
    const moduleNameLowerCase = answer.toLowerCase();
    const firstLetter = answer.charAt(0).toUpperCase();
    const moduleNameFirstLetterUpper =
      firstLetter + moduleNameLowerCase.slice(1);
    const files = [
      {
        name: `src/modules/${moduleNameLowerCase}/data/data_source/pg_data_source.ts`,
        content: "// IMPLEMENT PG DATA SOURCE",
      },
      {
        name: `src/modules/${moduleNameLowerCase}/data/interfaces/${moduleNameLowerCase}_data_source.ts`,
        content: "// IMPLEMENT DATA SOURCE INTERFACE",
      },
      {
        name: `src/modules/${moduleNameLowerCase}/domain/models/${moduleNameLowerCase}_model.ts`,
        content: `export interface ${moduleNameFirstLetterUpper} {}`,
      },
      {
        name: `src/modules/${moduleNameLowerCase}/domain/repositories/${moduleNameLowerCase}_repositories.ts`,
        content: `export interface ${moduleNameFirstLetterUpper}Repositories {}`,
      },
      {
        name: `src/modules/${moduleNameLowerCase}/domain/repositories/${moduleNameLowerCase}_repository_implementation.ts`,
        content: `export class ${moduleNameFirstLetterUpper}RepositoryImplementation extends ${moduleNameFirstLetterUpper}Repositories{}`,
      },
      {
        name: `src/modules/${moduleNameLowerCase}/presentation/${moduleNameLowerCase}_router.ts`,
        content: "// IMPLEMENT ROUTER",
      },
      {
        name: `src/modules/${moduleNameLowerCase}/presentation/index.ts`,
        content: "// IMPLEMENT DEPENDENCY INJECTION",
      },
      {
        name: `src/modules/${moduleNameLowerCase}/presentation/${moduleNameLowerCase}_middlewares.ts`,
        content: "// IMPLEMENT MIDDLEWARES",
      },
    ];
    createFolderStructure();
    fs.mkdirSync(`src/modules/${moduleNameLowerCase}/domain`, {
      recursive: true,
    });
    fs.mkdirSync(`src/modules/${moduleNameLowerCase}/presentation`, {
      recursive: true,
    });
    files.forEach((file) => {
      const filePath = file.name;
      const fileContent = file.content;
      if (filePath.includes("data")) {
        fs.mkdirSync(`src/modules/${moduleNameLowerCase}/data/data_source`, {
          recursive: true,
        });
        fs.mkdirSync(`src/modules/${moduleNameLowerCase}/data/interfaces`, {
          recursive: true,
        });
        fs.mkdirSync(`src/modules/${moduleNameLowerCase}/data/utils`, {
          recursive: true,
        });
        fs.writeFileSync(filePath, fileContent, (err) => {
          if (err) {
            console.log("no pude crear la carpeta porque no se");
            console.log(err);
          } else {
            return;
          }
        });
      } else if (filePath.includes("domain")) {
        fs.mkdirSync(`src/modules/${moduleNameLowerCase}/domain/models`, {
          recursive: true,
        });
        fs.mkdirSync(`src/modules/${moduleNameLowerCase}/domain/repositories`, {
          recursive: true,
        });
        // if (fileContent.includes("cosito")) {
        //   const firstLetter = answer.charAt(0).toUpperCase();
        //   const className = firstLetter + moduleName.slice(1);
        //   console.log(`class name => ${className}`);
        //   newFileContent = fileContent.replace("cosito", className);
        //   newFilePath = filePath.replace("cosito", moduleName);
        // }
        fs.writeFile(
          // `modules/${moduleName}/domain/models/${moduleName}_model.ts`,
          filePath,
          fileContent,
          (err) => {
            if (err) {
              console.log("no pude crear la carpeta porque no se");
              console.log(err);
            } else {
              return;
            }
          }
        );
      } else if (filePath.includes("presentation")) {
        fs.writeFile(filePath, fileContent, (err) => {
          if (err) {
            console.log(err);
          } else {
            return;
          }
        });
      }
    });

    console.log(`Folder structure created at ${folderName}`);

    rl.close();
  });
}

setup();
index();
