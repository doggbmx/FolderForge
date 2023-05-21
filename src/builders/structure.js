#!/usr/bin/env node

const { createDirectory, createFile } = require('../utils')

const createFolderStructure = async () => {
  console.log('Creating project structure...')
  const promises = [
    createDirectory('src/core/services'),
    createDirectory('src/core/routing'),
    createDirectory('src/core/config'),
    createDirectory('src/core/middlewares'),
    createDirectory('src/core/modules'),
    createFile(
      'src/index.ts',
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
    ),
    createFile(
      'src/core/config/index.ts',
      `import express, { Application } from 'express';
        // ADD MISSING IMPORTS

        export const configureRouting = (app: Application) => {
          const router = express.Router();
          app.use('/api', router);
          // IMPLEMENT MODULE ROUTER
        }`
    ),
  ]

  await Promise.all(promises)
  console.log('Project structure created.')
}

module.exports = createFolderStructure
