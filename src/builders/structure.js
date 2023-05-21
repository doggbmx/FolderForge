#!/usr/bin/env node

const fs = require('fs')

function createFolderStructure() {
  fs.mkdirSync('src/core/services', { recursive: true })
  fs.mkdirSync('src/core/routing', { recursive: true })
  fs.mkdirSync('src/core/config', { recursive: true })
  fs.mkdirSync('src/core/middlewares', { recursive: true })
  fs.mkdirSync('src/core/modules', { recursive: true })
  fs.writeFileSync(
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
  )
  fs.writeFileSync(
    'src/core/routing/index.ts',
    `import express, { Application } from 'express';
        // ADD MISSING IMPORTS

        export const configureRouting = (app: Application) => {
          const router = express.Router();
          app.use('/api', router);
          // IMPLEMENT MODULE ROUTER
        }`
  )
}

module.exports = createFolderStructure
