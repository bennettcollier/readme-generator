const inquirer = require('inquirer');
const generateMarkdown = require('./utils/generateMarkdown');
const fs = require('fs');
const generateReadme = require('./utils/generateMarkdown');
const licenses = require('./utils/licenseList');


// array of questions for user
const questions = [
    {
        type: 'input',
        name: 'title',
        message: 'What is the name of your project?',
        validate: nameInput => {
          if(nameInput){
            return true;
          } else {
            console.log("Please enter your project title.");
            return false;
          }
        }
    }, 
    {
        type: 'input',
        name: 'description',
        message: 'In a few words, please describe your project.',
        validate: nameInput => {
          if(nameInput){
            return true;
          } else {
            console.log("Please enter a valid project description.");
            return false;
          }
        }
    },
    {
        type: 'input',
        name: 'installation',
        message: 'Please describe how to install your project.',
        validate: nameInput => {
          if(nameInput){
            return true;
          } else {
            console.log("Please enter how to install your project.");
            return false;
          }
        }
    },
    {
        type: 'input',
        name: 'useage',
        message: 'Please describe how to use the application.',
        validate: nameInput => {
          if(nameInput){
            return true;
          } else {
            console.log("Please write a valid useage description.");
            return false;
          }
        }
    },
    {
        type: 'input',
        name: 'contributing',
        message: 'Please write how others can contribute to your project.',
        validate: nameInput => {
          if(nameInput){
            return true;
          } else {
            console.log("please enter a project description");
            return false;
          }
        }
    },
    {
        type: 'input',
        name: 'testinstructions',
        message: 'Please write test instructions.',
        validate: nameInput => {
          if(nameInput){
            return true;
          } else {
            console.log("Please enter valid test instructions.");
            return false;
          }
        }
    },
    {
        type: 'list',
        name: 'license',
        message: 'Please select what license this project is under.',
        choices: Object.keys(licenses),    
    },
    {
        type: 'input',
        name: 'githubrepolink',
        message: 'Plesae enter the GitHub link to your project.', 
        validate: nameInput => {
            testgithub = /.+(github.com)\/(.+)\/(.*)/.test(nameInput); //regex test if c-p url 
            if(testgithub){
                return true;
            } else {
                console.log("Please enter a valid GitHub repository link.");
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'email',
        message: 'Please enter the best email to contact regarding the project. (Required)',
        validate: nameInput => {
            validemail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(nameInput);  
            if(validemail){
                return true;
          } else {
            console.log("Please enter a valid email address.");
            return false;
          }
        }
    },
];


// inquirer function
const promptUser = () => {  
    return inquirer.prompt(questions);
};

// function to write README file
function writeToFile(fileName, data) {
    return new Promise((resolve,reject)=>{
        fs.writeFile(fileName , data, err => {
            if(err){
                reject(err);
                return;
            }
            resolve({
                ok:true,
                message: fileName + "File Created!"
            });
        });
    });
};

// function to initialize program
function init() {
    promptUser().then(data =>{
        let mdStr = generateMarkdown(data);
        writeToFile("Readme.md", mdStr);
    });
}

// function call to initialize program
init();