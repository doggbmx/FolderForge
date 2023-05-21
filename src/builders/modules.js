#!/usr/bin/env node

const fs = require('fs')

const createModule = (moduleName, callback) => {
  const moduleNameLowerCase = moduleName.toLowerCase()
  const firstLetter = moduleName.charAt(0).toUpperCase()
  const moduleNameFirstLetterUpper = firstLetter + moduleNameLowerCase.slice(1)
  const files = [
    {
      name: `
            src/modules/${moduleNameLowerCase}/data/data_source/pg_data_source.ts`,
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
      content: `
            export interface ${moduleNameFirstLetterUpper}DataSource {
              // IMPLEMENT METHODS
            }`,
    },
    {
      name: `src/modules/${moduleNameLowerCase}/domain/models/${moduleNameLowerCase}_model.ts`,
      content: `
            export interface ${moduleNameFirstLetterUpper} {};
            export interface Create${moduleNameFirstLetterUpper} extends Omit<${moduleNameFirstLetterUpper}, ""> {};
            export interface Update${moduleNameFirstLetterUpper} extends Partial<${moduleNameFirstLetterUpper}> {}`,
    },
    {
      name: `src/modules/${moduleNameLowerCase}/domain/repositories/${moduleNameLowerCase}_repository.ts`,
      content: `export interface ${moduleNameFirstLetterUpper}Repository {}`,
    },
    {
      name: `src/modules/${moduleNameLowerCase}/domain/repositories/${moduleNameLowerCase}_repository_implementation.ts`,
      content: `
            import { ${moduleNameFirstLetterUpper}Repository } from "./${moduleNameLowerCase}_repository";
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
      content: '// IMPLEMENT ROUTER',
    },
    {
      name: `src/modules/${moduleNameLowerCase}/presentation/index.ts`,
      content: '// IMPLEMENT DEPENDENCY INJECTION',
    },
    {
      name: `src/modules/${moduleNameLowerCase}/presentation/${moduleNameLowerCase}_middlewares.ts`,
      content: '// IMPLEMENT MIDDLEWARES',
    },
  ]
  fs.mkdirSync(`src/modules/${moduleNameLowerCase}/domain`, {
    recursive: true,
  })
  fs.mkdirSync(`src/modules/${moduleNameLowerCase}/presentation`, {
    recursive: true,
  })
  files.forEach((file, index) => {
    const filePath = file.name
    const fileContent = file.content
    if (filePath.includes('data')) {
      fs.mkdirSync(`src/modules/${moduleNameLowerCase}/data/data_source`, {
        recursive: true,
      })
      fs.mkdirSync(`src/modules/${moduleNameLowerCase}/data/interfaces`, {
        recursive: true,
      })
      fs.mkdirSync(`src/modules/${moduleNameLowerCase}/data/utils`, {
        recursive: true,
      })
      fs.writeFileSync(filePath, fileContent, (err) => {
        if (err) {
          console.log('no pude crear la carpeta porque no se')
          console.log(err)
        } else {
          return
        }
      })
    } else if (filePath.includes('domain')) {
      fs.mkdirSync(`src/modules/${moduleNameLowerCase}/domain/models`, {
        recursive: true,
      })
      fs.mkdirSync(`src/modules/${moduleNameLowerCase}/domain/repositories`, {
        recursive: true,
      })
      fs.writeFile(filePath, fileContent, (err) => {
        if (err) {
          console.log('no pude crear la carpeta porque no se')
          console.log(err)
        } else {
          return
        }
      })
    } else if (filePath.includes('presentation')) {
      fs.writeFile(filePath, fileContent, (err) => {
        if (err) {
          console.log(err)
        } else {
          return
        }
      })
    }

    if (index === files.length - 1) {
      callback()
    }
  })
}

module.exports = createModule
