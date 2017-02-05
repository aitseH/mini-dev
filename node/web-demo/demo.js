#!/usr/bin/env node
const fs = require('fs')
const {execSync} = require('child_process')

function getFileList(path){
  checkDir(path)
  return fs.readdirSync(path)
}

function checkDir(path){
  if(!fs.existsSync(path)){
    fs.mkdirSync(path)
  }
}

function main() {
  const src = `${__dirname}/assets`
  const demos = `${__dirname}/demos`
  const argv = process.argv[2]

  const list = getFileList(demos)
  const dist = argv ? `${demos}/${argv}` : `${demos}/demo-${list.length}`

  checkDir(src)
  
  execSync(`mkdir -p ${dist}`)
  execSync(`cp -r ${src}/* ${dist}`)
}

main()