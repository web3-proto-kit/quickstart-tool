#!/usr/bin/env node --harmony
const chalk = require('chalk');
const figlet = require('figlet');
const CLI = require('clui');
const program = require('commander');
let projectToStart = "";
let userInputRecorded = "";
const appRoot = require('app-root-path');
const exec = require('child_process').exec;
const util = require('util');
let childProcess;

yaml = require('js-yaml');
fs = require('fs');
let projects = {};

// Get document, or throw exception on error
try {
   projects = yaml.safeLoad(fs.readFileSync(appRoot + '/projects.yml', 'utf8'));
   console.log(projects["RABBITMQ"]);
} catch (e) {
   console.log(e);
}

//intro text to console
console.log(
   chalk.yellow(
      figlet.textSync('JIVE', { horizontalLayout: 'full' })
   )
);

//parse arguments and assign project to start
program
   .arguments('<project>')
   .action(function (project) {
      projectToStart = project.toUpperCase();
      userInputRecorded = project;
      console.log(chalk.green.bold("Setting up  " + project + " for you!!"));
      console.log(chalk.green("This may take a second! We need to download the repos and set everything up =)"));
   })
   .parse(process.argv);

if (projects[projectToStart] === null)
   console.log(chalk.green.red("No project found for " + userInputRecorded));
else {
   let gitURL = projects[projectToStart];
   let projectName = projectToStart.toLowerCase();
   childProcess = exec("git clone " + gitURL + " ./" + projectName + " && cd " + projectName + "&& rm -rf .git", function (error, stdout, stderr) {
      if (error) {
         console.log('exec error: ' + error);
      }
      else {
         console.log(chalk.green.bold("Project setup complete!! Goodbye Human :)"));
      }
   });
}

