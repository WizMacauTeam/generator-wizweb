'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var path = require('path');

module.exports = yeoman.Base.extend({
  prompting: function() {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to using wizmacau frontend project web tools ' + chalk.red('generator-wizweb') + ' generator!'
    ));

    var prompts = [{
      type: 'checkbox',
      name: 'features',
      message: 'What type project would you like to develop it?',
      choices: [{
        name: 'symfony2',
        value: 'includeSass',
        checked: true
      }, {
        name: 'static web page',
        value: 'includeBootstrap',
        checked: false
      }, {
        name: 'react',
        value: 'includeModernizr',
        checked: false
      }]
    }, {
      name: 'name',
      message: 'project Name',
      default: path.basename(process.cwd()),
      filter: function(input) {
        var done = this.async();
      }
    }, {
      name: 'description',
      message: 'Description',
      default: 'The best module ever.'
    }, {
      name: 'homepage',
      message: 'Homepage'
    }, {
      name: 'license',
      message: 'License',
      default: 'MIT'
    }, {
      name: 'githubUsername',
      message: 'GitHub username'
    }, {
      name: 'authorName',
      message: 'Author\'s Name'
    }, {
      name: 'authorEmail',
      message: 'Author\'s Email'
    }, {
      name: 'authorUrl',
      message: 'Author\'s Homepage'
    }];

    return this.prompt(prompts).then(function(props) {
      // To access props later use this.props.someAnswer;
      this.props = props;
    }.bind(this));
  },

  writing: function() {
    this.fs.copy(
      this.templatePath('dummyfile.txt'),
      this.destinationPath('web/1/dummyfile.txt')
    );
  },

  install: function() {
    this.installDependencies();
  }
});
