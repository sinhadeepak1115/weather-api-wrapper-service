#!/usr/bin/env node

/**
* anpm.js
*/

var program = require('commander');
var path = require('path');
var fs = require('fs');

program
  .version('0.0.1')
  .parse(process.argv);

var result1 = require('child_process').spawnSync('apm', program.args);

if (result1.stdout.toString().trim()) {
  console.log(result1.stdout.toString());
}

if (result1.stderr.toString().trim()) {
  console.log(result1.stderr.toString());
}

// console.log(`------\napm exited with code ${result1.status}\n------\n`);

const myPackagesFilePath = path.join(process.env['HOME'], '.atom', 'my-packages.txt');
console.log(`anpm: Writing packages list to ${myPackagesFilePath} ...`);
var result2 = require('child_process').spawnSync('apm', ['list', '--installed', '--bare']);

if (result2.stdout.toString().trim()) {
  // console.log(result2.stdout.toString());
  fs.writeFile(myPackagesFilePath, result2.stdout.toString());
}

if (result2.stderr.toString().trim()) {
  // console.log(result1.stderr.toString());
}

// console.log(`------\napm exited with code ${result1.status}\n------\n`);
