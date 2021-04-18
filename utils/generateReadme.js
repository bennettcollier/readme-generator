function generateReadme {
  licenseObj = licenses[data.license]; 

  return `
  # Project Title: ${data.title} 
  ### [![License](${licenseObj.iconLink})](${licenseObj.link})
  
  ## Table of contents:
  1. [Title](#Project-Title)
  1. [License](#License)
  1. [Description](#Description)
  1. [Installation](#Installation-Instructions)
  1. [Useage](#How-To-Use)
  1. [How to Contribute](#How-to-Contribute)
  1. [Questions](#Questions)

  ## License: 
  ### This project is licensed under ${licenseObj.name} (click on icon near the top):
  or here: [${licenseObj.name}](${licenseObj.link})
 
  ## Description:
  ${data.description}
  ## Installation Instructions:
  ${data.installation}
  ## How To Use
  ${data.useage}
  ## How to Contribute:
  * ${data.contributing}
  * Help with bugfixes and features by submitting your solutions in pull requrets
  ## Questions
  Feel free to reach out either in the projects GitHub page or send an email to the address below
  ### Github page:
  [GitHub](${data.githubrepolink})
  ### email:
  [${data.email}](mailto:${data.email}) 
`;
}


module.exports = generateReadme;
