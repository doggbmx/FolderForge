const fs = require('fs')

const createFile = (name, content) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(name, content, (err) => {
      if (err) {
        reject(`Error creating file ${name}: ${err}`)
      }
      resolve()
    })
  })
}

module.exports = createFile
