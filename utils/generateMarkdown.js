// retrieve license badges based on user selection
const generateBadges = licenseInput => {
    if (licenseInput === 'Apache License 2.0') {
      return '[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)';
    } else if (licenseInput === 'BSD') {
      return '[![License](https://img.shields.io/badge/License-BSD%203--Clause-blue.svg)](https://opensource.org/licenses/BSD-3-Clause)';
    } else if (licenseInput === 'ISC') {
      return '[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)';
    } else if (licenseInput === 'MIT') {
      return '[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)';
    }
  };
  
  // optional display of contribution and tests text if selected
  const generateContribution = contributionText => {
    if (!contributionText) {
      return ``;
    }
    return `
    ## Contribution
    ${contributionText}
    `
  };
  
  const generateTests = testsText => {
    if (!testsText) {
      return ``;
    }
    return `
    ## Tests
    ${testsText}
    `
  };
  
  // optional display of contribution and tests titles for table of content if selected
  const tableOfContentContribution = contributionTable => {
    if (!contributionTable) {
      return ``;
    }
    return `
    * [Contribution](#contribution)
    `
  };
  
  const tableOfContentTests = testsTable => {
    if (!testsTable) {
      return ``;
    }
    return `
    * [Tests](#tests)
    `
  };
  
  
  // generate markdown for README
  module.exports = templateMarkdown => {
    const {
      github,
      email,
      title,
      description,
      installation,
      usage,
      license,
      contribution,
      tests,
      questions
    } = templateMarkdown
  
    return `${generateBadges(...license)}
    # ${title}
    # Description
    ${description}
    ### Table of Contents
    * [Installation](#installation)
    * [Usage](#usage)
    ${tableOfContentContribution(contribution)}
    ${tableOfContentTests(tests)}
    * [Questions](#questions)
    ## Installation
    ${installation}
    
    ## Usage
    Stepts how to run the application are available in the following demo:<br>
    ![](${usage})
    ${generateTests(tests)}
    ${generateContribution(contribution)}
    
   ## Questions
    ${questions}
    * Got questions? [email me](mailto:${email})<br>
    * [My GitHub profile](https://github.com/${github})
        `;
  };