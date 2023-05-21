const fs = require('fs')
const { exec } = require('child_process')

const pJson = {
  name: '',
  version: '1.0.0',
  description: '',
  main: 'index.js',
  scripts: {
    test: 'echo "Error: no test specified" && exit 1',
  },
  keywords: [],
  author: '',
  license: 'ISC',
  devDependencies: {
    typescript: '^5.0.4',
    '@types/express': '^4.17.15',
    'ts-node-dev': '^2.0.0',
    '@types/node': '^18.11.18',
    nodemon: '^2.0.20',
    'ts-node-dev': '^2.0.0',
    '@types/pg': '^8.6.6',
  },
  dependencies: {
    express: '^4.18.2',
    'express-validator': '^6.14.3',
    pg: '^8.8.0',
    folderforge: '^1.0.3',
  },
}

const installDependencies = () => {
  return new Promise((resolve, reject) => {
    exec('npm install', (error, stdout, stderr) => {
      if (error) {
        console.error(`Error al ejecutar 'npm install': ${error}`)
        reject(error)
      }

      console.log(stdout)
      console.error(stderr)
      resolve()
    })
  })
}

const installTypescript = () => {
  return new Promise((resolve, reject) => {
    exec('npm install typescript', (error, stdout, stderr) => {
      if (error) {
        console.error(`Error al ejecutar 'npm install typescript': ${error}`)
        reject(error)
      }

      console.log(stdout)
      console.error(stderr)
      resolve()
    })
  })
}

const setup = async (projectName) => {
  console.log('Setting up the project...')
  await createFile(
    'package.json',
    JSON.stringify({ ...pJson, name: projectName })
  )
  await installDependencies()
  await installTypescript()
  console.log('Project ready.')
}

module.exports = setup
