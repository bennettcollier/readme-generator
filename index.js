const inquirer = require('inquirer');
const fs = require('fs');
const generateMarkDown = require('./utils/generateMarkdown');
const licenses = require('./utils/licenses');

const questions = [
    {
        type: 'input',
        name: 'title',
        message: 'What is the name of your project?',
        validate: nameInput => {
          if(nameInput){
            return true;
          } else {
            console.log("Please enter a valid project name.");
            return false;
          }
        }
    },  
    {
        type: 'input',
        name: 'description',
        message: 'Please describe your project.',
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
        message: 'Please state how to install your project.',
        validate: nameInput => {
          if(nameInput){
            return true;
          } else {
            console.log("Please enter valid installation instructions.");
            return false;
          }
        }
    },
    {
        type: 'input',
        name: 'useage',
        message: 'Please describe how to use the project.',
        validate: nameInput => {
          if(nameInput){
            return true;
          } else {
            console.log("Please enter a valid description.");
            return false;
          }
        }
    },
    {
        type: 'input',
        name: 'contributing',
        message: 'Please provide ideas for future contributions.',
        validate: nameInput => {
          if(nameInput){
            return true;
          } else {
            console.log("Please enter valid contribution ideas.");
            return false;
          }
        }
    },
    {
        type: 'input',
        name: 'testinstructions',
        message: 'Please write the test instructions.',
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
        message: 'What license is this project using?',
        choices: Object.keys(licenses),
    },
    {
        type: 'input',
        name: 'githubrepolink',
        message: 'Please enter the link to your GitHub repository.', 
        validate: nameInput => {
            testgithub = /.+(github.com)\/(.+)\/(.*)/.test(nameInput);
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
        message: 'Please enter your email address. (Required)',
        validate: nameInput => {
            validemail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(nameInput); //regex test for valid email
            
            if(validemail){
                return true;
          } else {
            console.log("Please enter a valid email address.");
            return false;
          }
        }
    },
];

const promptUser = () => {  
    return inquirer.prompt(questions);
};

function writeToFile(fileName, data) {
    return new Promise((resolve,reject)=>{
        fs.writeFile(fileName , data, err => {
            if(err){
                reject(err);
                return;
            }
            resolve({
                ok:true,
                message: fileName + "was created!"
            });
        });
    });
};

function init() {
    promptUser().then(data =>{
        let mdStr = generateMarkdown(data);
        writeToFile("README.md", mdStr);
    });
}

const validateInput = promptField => {
    if (promptField) {
        return true;
    } else {
        console.log(`Please provide a valid response.`);
        return false;
    }
}

const promptUser = () => {
    return inquirer
        .prompt([{
            type: 'input',
            name: 'github',
            message: questions[0],
            validate: validateInput
        },
        {
            type: 'input',
            name: 'email',
            message: questions[1],
            validate: validateInput
        },
        {
            type: 'input',
            name: 'title',
            message: questions[2],
            validate: validateInput
        },
        {
            type: 'input',
            name: 'description',
            message: questions[3],
            validate: validateInput
        },
        {
            type: 'input',
            name: 'installation',
            message: questions[4],
            validate: validateInput
        },
        {
            type: 'input',
            name: 'usage',
            message: questions[5],
            validate: validateInput
        },
        {
            type: 'checkbox',
            name: 'license',
            message: questions[6],
            choices: ['Apache License 2.0', 'BSD', 'ISC', 'MIT'],
            validate: checkboxSelection => {
                if (checkboxSelection.length > 0) {
                    return true;
                } else {
                    console.log('Please make a valid selection.');
                }
            }
        },
        {
            type: 'confirm',
            name: 'confirmContribution',
            message: questions[7],
            default: false
        },
        {
            type: 'input',
            name: 'contribution',
            message: questions[8],
            when: (answers) => answers.confirmContribution === true
        },
        {
            type: 'confirm',
            name: 'confirmTests',
            message: questions[9],
            default: false
        },
        {
            type: 'input',
            name: 'tests',
            message: questions[10],
            when: answers => answers.confirmTests === true
        },
        {
            type: 'input',
            name: 'questions',
            message: questions[11]
        }
        ])
};

function writeToFile(fileName, data) {
    return new Promise((resolve, reject) => {
        fs.writeFile(fileName, data, err => {
            if (err) {
                reject(err);
                return;
            }
            resolve({
                ok: true,
                message: 'Your file was created!'
            })
        })
    });
};

function init() {
    promptUser().then(answers => generateMarkDown(answers)).then(result => writeToFile("./README.md", result));
}

init();