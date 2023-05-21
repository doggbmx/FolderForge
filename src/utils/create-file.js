const fs = require('fs')
const createDirectory = require('./create-directory')

const createFile = (name, content) => {
  return new Promise(async (resolve, reject) => {
    try {
      const fileName = name.split('/').pop()
      const path = name.replace(fileName, '')
      if (path) await createDirectory(path)
      fs.writeFile(name, content, (err) => {
        if (err) {
          reject(`Error creating file ${name}: ${err}`)
        }
        resolve()
      })
    } catch (error) {
      reject(`Error createing the file ${name}: ${error}`)
    }
  })
}

module.exports = createFile
