const inquirer = require('inquirer');
const fs = require('fs');
const generateMarkDown = require('./utils/generateMarkdown');

// array of questions for user
const questions = [
    'Enter your GitHub username. (Required)', 'Enter your email address. (Required)',
    'Enter your project title. (Required)', 'Enter your project description. (Required)',
    'Enter instructions to install your project. (Required)', 'Please provide the relative path for a demo. (Required)',
    'What is the license for the project?', 'Would you like to include a contribution section?',
    'What are the contribution guidelines?', 'Would you like to include test instructions?', 'What are the tests instructions?', 'Any additional informtion to list under questions?'
];

// function to ensure required fields are populated
const validateInput = promptField => {
    if (promptField) {
        return true;
    } else {
        console.log(`Please provide your response.`);
        return false;
    }
}

// present user with a list of prompts to capture info for readme file
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
                    console.log('Please make a selection.');
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

// function to write README file
function writeToFile(fileName, data) {
    return new Promise((resolve, reject) => {
        fs.writeFile(fileName, data, err => {
            if (err) {
                reject(err);
                return;
            }
            resolve({
                ok: true,
                message: 'File created!'
            })
        })
    });
};

// function to initialize program
function init() {
    promptUser().then(answers => generateMarkDown(answers)).then(result => writeToFile("./README.md", result));
}

// function call to initialize program
init();