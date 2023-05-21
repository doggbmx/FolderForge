#!/usr/bin/env node

const fs = require("fs");

function createFolderStructure() {
  fs.mkdirSync("src/core/services", { recursive: true });
  fs.mkdirSync("src/core/routing", { recursive: true });
  fs.mkdirSync("src/core/config", { recursive: true });
  fs.mkdirSync("src/core/middlewares", { recursive: true });
  fs.mkdirSync("src/core/modules", { recursive: true });
}

module.exports = createFolderStructure;