const debug = require('debug')('create-umi:generator');
const BasicGenerator = require('../../BasicGenerator');
const fs = require('fs');

class Generator extends BasicGenerator {
  prompting() {
    return this.prompt([
      {
        type: 'list',
        name: 'bundlerType',
        message: 'Please select the build type',
        choices: ['webpack', 'vite'],
      },
    ]).then(props => {
      this.prompts = props;
    });
  }

  writing() {
    const src = this.templatePath(this.prompts.bundlerType);
    const dest = this.destinationPath();
    this.writeFiles(src, dest, {
      context: {
        ...this.prompts,
      },
    });
  }
}

module.exports = Generator;
