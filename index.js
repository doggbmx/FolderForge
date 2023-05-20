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
    "@types/express": "^4.17.15",
    "ts-node-dev": "^2.0.0",
    "@types/node": "^18.11.18",
    nodemon: "^2.0.20",
    "ts-node-dev": "^2.0.0",
    "@types/pg": "^8.6.6",
  },
  dependencies: {
    express: "^4.18.2",
    "express-validator": "^6.14.3",
    pg: "^8.8.0",
    folderforge: "^1.0.3",
  },
};

function createFolderStructure() {
  fs.mkdirSync("src/core/services", { recursive: true });
  fs.mkdirSync("src/core/routing", { recursive: true });
  // fs.mkdirSync("src/core/routing", { recursive: true });
  fs.mkdirSync("src/core/config", { recursive: true });
  fs.mkdirSync("src/core/middlewares", { recursive: true });
}

function createFileStructure() {
  fs.writeFileSync(
    "src/index.ts",
    `import express from 'express';
import { configureRouting } from './core/routing';

const app = express();

app.use(express.json());
// config del router
configureRouting(app);

app.listen(8420, () => {
  console.log('Server running on => 8420');
});
`
  );
  fs.writeFileSync(
    "src/core/routing/index.ts",
    `import express, { Application } from 'express';
// ADD MISSING IMPORTS

export const configureRouting = (app: Application) => {
  const router = express.Router();
  app.use('/api', router);
  // IMPLEMENT MODULE ROUTER
}`
  );
}

async function setup() {
  Promise.all([
    fs.writeFileSync("package.json", JSON.stringify(pJson), (error) => {
      if (error) {
        console.error(error);
      }
    }),
    exec("npm install", (error, stdout, stderr) => {
      if (error) {
        console.error(`Error al ejecutar 'npm install': ${error}`);
        return;
      }
      console.log("Output:", stdout);

      exec("npx tsc --init", (error, stdout, stderr) => {
        if (error) {
          console.error(`Error al ejecutar 'npx tsc --init': ${error}`);
          return;
        }
        console.log("Output:", stdout);
      });
    }),
  ]);
  // await fs.writeFileSync("package.json", JSON.stringify(pJson), (error) => {
  //   if (error) {
  //     console.error(error);
  //   }
  // });

  // await exec("npm install", (error, stdout, stderr) => {
  //   if (error) {
  //     console.error(`Error al ejecutar 'npm install': ${error}`);
  //     return;
  //   }
  //   console.log("Output:", stdout);

  //   exec("npx tsc --init", (error, stdout, stderr) => {
  //     if (error) {
  //       console.error(`Error al ejecutar 'npx tsc --init': ${error}`);
  //       return;
  //     }
  //     console.log("Output:", stdout);
  //   });
  // });
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
        content: `import { Pool, PoolClient, QueryResult } from "pg";
import {${moduleNameFirstLetterUpper}DataSource} from "../interfaces/${moduleNameLowerCase}_data_source";

export class PG${moduleNameFirstLetterUpper}sDataSource implements ${moduleNameFirstLetterUpper}DataSource {
  private db: Pool;
  private constructor(db: Pool) {
    this.db = db;
  }
  static instance: PG${moduleNameFirstLetterUpper}sDataSource | null = null;

  static create(dataSource: Pool) {
    if (PG${moduleNameFirstLetterUpper}sDataSource.instance == null) {
      PG${moduleNameFirstLetterUpper}sDataSource.instance = new PG${moduleNameFirstLetterUpper}sDataSource(dataSource);
    }
    return PG${moduleNameFirstLetterUpper}sDataSource.instance;
  }

  // GENERIC FUNCTION
  private async callDataBase<T>(
    query: string,
    values: any[],
    callback: (result: QueryResult<any>) => T
  ): Promise<T> {
    let client: PoolClient;
    client = await this.db.connect();
    try {
      const response = await client.query(query, values);
      return callback(response);
    } catch (err) {
      if (err instanceof CustomError) {
        throw err;
      }
      throw new DataBaseError(err as Error);
    } finally {
      if (client) {
        client.release();
      }
    }
  }
}`,
      },
      {
        name: `src/modules/${moduleNameLowerCase}/data/interfaces/${moduleNameLowerCase}_data_source.ts`,
        content: `export interface ${moduleNameFirstLetterUpper}DataSource {
  // IMPLEMENT METHODS
}`,
      },
      {
        name: `src/modules/${moduleNameLowerCase}/domain/models/${moduleNameLowerCase}_model.ts`,
        content: `export interface ${moduleNameFirstLetterUpper} {};
export interface Create${moduleNameFirstLetterUpper} extends Omit<${moduleNameFirstLetterUpper}, ""> {};
export interface Update${moduleNameFirstLetterUpper} extends Partial<${moduleNameFirstLetterUpper}> {}`,
      },
      {
        name: `src/modules/${moduleNameLowerCase}/domain/repositories/${moduleNameLowerCase}_repository.ts`,
        content: `export interface ${moduleNameFirstLetterUpper}Repository {}`,
      },
      {
        name: `src/modules/${moduleNameLowerCase}/domain/repositories/${moduleNameLowerCase}_repository_implementation.ts`,
        content: `import { ${moduleNameFirstLetterUpper}Repository } from "./${moduleNameLowerCase}_repository";
import { ${moduleNameFirstLetterUpper}DataSource } from "../../data/interfaces/${moduleNameLowerCase}_data_source";

export class ${moduleNameFirstLetterUpper}RepositoryImplementation implements ${moduleNameFirstLetterUpper}Repository{
  private ${moduleNameLowerCase}sDataSource: ${moduleNameFirstLetterUpper}DataSource;
  private constructor(dataSource: ${moduleNameLowerCase}DataSource) {
    this.usersDataSource = dataSource;
  }

  static instance: ${moduleNameFirstLetterUpper}RepositoryImplementation | null = null;

  static create(dataSource: ${moduleNameFirstLetterUpper}DataSource) {
    if (${moduleNameFirstLetterUpper}RepositoryImplementation.instance == null) {
      ${moduleNameFirstLetterUpper}RepositoryImplementation.instance = new ${moduleNameFirstLetterUpper}RepositoryImplementation(dataSource);
    }
    return ${moduleNameFirstLetterUpper}RepositoryImplementation.instance;
  }

  private async callDataSource<T>(callback: Function): Promise<T> {
    try {
      return await callback();
    } catch (error) {
      console.log(error);
      if (error instanceof CustomError) {
        throw error;
      }
      throw new GenericError("Users Repositories error.");
    }
  }
  }`,
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
    });

    console.log(`Folder structure created at ${folderName}`);

    rl.close();
  });
}

async function main() {
  await Promise.all([
    setup(),
    createFolderStructure(),
    createFileStructure(),
  ]).then((values) => {
    // console.log("finish a process");
    index();
  });
}

class FolderForge {
  static async executeFolder() {
    await main();
  }
}

// FolderForge.executeFolder();

module.exports = FolderForge;
