licenses = require('./licenses');  

function generateMarkdown(data) {
  licenseObj = licenses[data.license]; 

  return `
  # Title: ${data.title} 
  ### [![License](${licenseObj.iconLink})](${licenseObj.link})
  
  ## Table of contents:
  1. [Title](#Project-Title)
  1. [License](#License)
  1. [Description](#Project-Description)
  1. [Installation](#Installation-Instructions)
  1. [How to Use](#How-To-Use)
  1. [Future Contributions](#How-to-Contribute)
  1. [Test Instructions](#Test-Instructions)
  1. [Additional Questions](#Questions)
 
  ## Description:
  ${data.description}
  ## Installation:
  ${data.installation}
  ## How To Use
  ${data.useage}
  ## Future Contributions:
  * ${data.contributing}
  ## Test Instructions
  ### ${data.testinstructions}
  ## Additional Questions
  ### Github:
  [GitHub](${data.githubrepolink})
  ### Email Address:
  [${data.email}](mailto:${data.email}) 
`;
}


module.exports = generateMarkdown;