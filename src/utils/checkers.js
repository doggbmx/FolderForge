#!/usr/bin/env node

const fs = require('fs')
const path = require('path')

const checkIfFolderAlreadyExists = (folderName) => {
  const folderPath = path.join(process.cwd(), folderName)

  return fs.existsSync(folderPath)
}

const checkIfProjectAlreadyStarted = () => {
  const folderName = 'src'

  return checkIfFolderAlreadyExists(folderName)
}

const checkIfModuleAlreadyCreated = (moduleName) => {
  const folderName = `src/modules/${moduleName}`

  return checkIfFolderAlreadyExists(folderName)
}

module.exports = {
  checkIfProjectAlreadyStarted,
  checkIfModuleAlreadyCreated,
}
