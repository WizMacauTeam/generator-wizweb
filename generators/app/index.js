'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var path = require('path');
var _s = require('underscore.string');

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
        value: 'includeSymfony2',
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
      default:  path.basename(this.destinationRoot())
    }, {
      name: 'description',
      message: 'Description',
      default: 'The project description.'
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

  writing: {
    packageJSON: function () {
      this.fs.copyTpl(
        this.templatePath('_package.json'),
        this.destinationPath('package.json'),
        {
          includeSass: this.includeSass,
          includeBabel: this.options['babel']
        }
      );
    },
    bower: function() {
      var bowerJson = {
        name: _s.slugify(this.appname),
        private: true,
        dependencies: {}
      };

      if (this.includeSymfony2) {
        if (this.includeSass) {
          bowerJson.dependencies['bootstrap-sass'] = '~3.3.5';
          bowerJson.overrides = {
            'bootstrap-sass': {
              'main': [
                'assets/stylesheets/_bootstrap.scss',
                'assets/fonts/bootstrap/*',
                'assets/javascripts/bootstrap.js'
              ]
            }
          };
        } else {
          bowerJson.dependencies['bootstrap'] = '~3.3.5';
          bowerJson.overrides = {
            'bootstrap': {
              'main': [
                'less/bootstrap.less',
                'dist/css/bootstrap.css',
                'dist/js/bootstrap.js',
                'dist/fonts/*'
              ]
            }
          };
        }
      } else if (this.includeJQuery) {
        bowerJson.dependencies['jquery'] = '~2.1.1';
      }

      if (this.includeModernizr) {
        bowerJson.dependencies['modernizr'] = '~2.8.1';
      }
      this.fs.writeJSON('bower.json', bowerJson);
      this.fs.copy(
        this.templatePath('bowerrc'),
        this.destinationPath('.bowerrc')
      );
    }
  },

  install: function() {
    this.installDependencies();
  }
});
