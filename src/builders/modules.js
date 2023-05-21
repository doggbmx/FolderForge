#!/usr/bin/env node

const fs = require("fs");

const createModule = (moduleName, callback) => {
  const moduleNameLowerCase = moduleName.toLowerCase();
  const firstLetter = moduleName.charAt(0).toUpperCase();
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
  fs.mkdirSync(`src/modules/${moduleNameLowerCase}/domain`, {
    recursive: true,
  });
  fs.mkdirSync(`src/modules/${moduleNameLowerCase}/presentation`, {
    recursive: true,
  });
  files.forEach((file, index) => {
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
          return
        }
      });
    } else if (filePath.includes("domain")) {
      fs.mkdirSync(`src/modules/${moduleNameLowerCase}/domain/models`, {
        recursive: true,
      });
      fs.mkdirSync(`src/modules/${moduleNameLowerCase}/domain/repositories`, {
        recursive: true,
      });
      fs.writeFile(filePath, fileContent, (err) => {
        if (err) {
          console.log("no pude crear la carpeta porque no se");
          console.log(err);
        } else {
          return;
        }
      });
    } else if (filePath.includes("presentation")) {
      fs.writeFile(filePath, fileContent, (err) => {
        if (err) {
          console.log(err);
        } else {
          return;
        }
      });
    }

    if (index === files.length - 1) {
      callback();
    }
  });
}

module.exports = createModule;