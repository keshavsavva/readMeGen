const fs = require("fs");
const axios = require("axios");
const inquirer = require("inquirer");

inquirer
  .prompt([
    {
        message: "Enter your GitHub username:",
        name: "username"
    },
    {
        message: "What is the title of your project?",
        name: "title"
    },
    {
        message: "Write a brief description of your project:",
        name: "description"
    },
    {
        message: "What are the steps required to install your project? ",
        name: "installation"
    },
    {
        message: "Provide instructions and examples for use:",
        name: "usage"
    },
    {
        message: "List your collaborators, if any, with links to their GitHub profiles:",
        name: "credits"
    },
    {
        message: "Add your professional liscense:",
        name: "license"
    },
    {
        message: "Add guidelines for how to contribute",
        default: "NONE",
        name: "contributing"
    },
    {
        message: "Provide examples for how to run the application.",
        default: "NONE",
        name: "tests"
    },
])
  .then(answers => {
    const queryUrl = `https://api.github.com/users/${answers.username}`;
    axios.get(queryUrl).then((res, err) => {
        const email = res.data.email;
        const name = res.data.name;
        const imageAdd = res.data.avatar_url;
            if(err){
                throw(err)
            };
    
        console.log(email, imageAdd);
        const readMeStr = `# ${answers.title}\n\n# Owner\n\n ${name}\n\nemail: ${email}\n\n![IMAGE](${imageAdd})\n\n## Description\n\n${answers.description}\n\n\n## Table of Contents\n\n* [Installation](#installation)\n* [Usage](#usage)\n* [Credits](#credits)\n* [License](#license)\n* [Badges](#badges)\n* [Contributing](#contributing)\n* [Tests](#tests)\n\n\n## Installation\n\n${answers.installation}\n\n\n## Usage\n\n${answers.usage}\n\n\n## Credits\n\n${answers.credits}\n\n\n## License\n\n${answers.license}\n\n\n## Badges\n\n![badmath](https://img.shields.io/github/languages/top/nielsenjared/badmath)\n\n\n## Contributing\n\n${answers.contributing}\n\n\n## Tests\n\n${answers.tests}\n\n\n`;
        fs.writeFile("README.md", readMeStr, function(err) {
            if (err) {
            throw err;
            }
            console.log(`Saved README`);
        });
    });
  });