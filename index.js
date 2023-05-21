#!/usr/bin/env node

const { program } = require('commander')
const { checkIfProjectAlreadyStarted, checkIfModuleAlreadyCreated } = require('./src/utils')
const {createFolderStructure, createModule} = require('./src/builders')
const setup = require('./src/setup')


const run = () => {
  program
    .command('start-project')
    .description('Starts the project structure.')
    .action(() => {
      const projectAlreadyStarted = checkIfProjectAlreadyStarted()
      if (projectAlreadyStarted) {
        console.log('Project already started.')
        process.exit()
      } else {
        console.log('Starting project...')
        const projectName = process.cwd().split('/').pop()
        console.log('Creating project structure...')
        createFolderStructure()
        console.log('Setting up the project...')
        setup(projectName, () => {
          console.log('Project ready.')
          process.exit()
        })
      }
    })

  program
    .command('add-module')
    .description('Adds a new module to the project.')
    .requiredOption('-n, --name <module-name>', 'Module name')
    .action((args) => {
      const projectAlreadyStarted = checkIfProjectAlreadyStarted()
      const moduleName = args.name

      if (!projectAlreadyStarted) {
        console.log('Project not started.')
        process.exit()
      } else {
        const moduleAlreadyCreated = checkIfModuleAlreadyCreated(moduleName)
        if (moduleAlreadyCreated) {
          console.log('Module already created.')
          process.exit()
        } else {
          createModule(moduleName, () => {
            console.log(`Module ${moduleName} created.`);
            process.exit()
          })
        }
      }
    })

    program.parse(process.argv);
};

run();
