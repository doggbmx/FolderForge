#!/usr/bin/env node

const { program } = require('commander')
const {
  checkIfProjectAlreadyStarted,
  checkIfModuleAlreadyCreated,
} = require('./src/utils')
const { createFolderStructure, createModule } = require('./src/builders')
const setup = require('./src/setup')

const run = () => {
  program
    .command('start-project')
    .description('Starts the project structure.')
    .action(async () => {
      try {
        const projectAlreadyStarted = checkIfProjectAlreadyStarted()
        if (projectAlreadyStarted) {
          console.log('Project already built.')
          process.exit()
        } else {
          console.log('Starting project builders...')
          await createFolderStructure()
          const projectName = process.cwd().split('/').pop()
          await setup(projectName)
          process.exit()
        }
      } catch (error) {
        console.log(error)
      } finally {
        process.exit()
      }
    })

  program
    .command('add-module')
    .description('Adds a new module to the project.')
    .requiredOption('-n, --name <module-name>', 'Module name')
    .action(async (args) => {
      try {
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
            await createModule(moduleName)
            console.log(`Module ${moduleName} created.`)
            process.exit()
          }
        }
      } catch (error) {
        console.log(error)
      } finally {
        process.exit()
      }
    })

  program.parse(process.argv)
}

run();
