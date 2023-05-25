const fs = require('fs')

const createDirectory = (name) => {
  return new Promise((resolve, reject) => {
    fs.mkdir(name, { recursive: true }, (err) => {
      if (err) {
        reject(`Error creating directory ${name}: ${err}`)
        reject(err)
      }
      resolve()
    })
  })
}

module.exports = createDirectory
