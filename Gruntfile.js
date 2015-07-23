'use strict';

module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // Task configuration will be written here
    bower: {
        install: {
            options: {
                install: true,
                copy: false,
                targetDir: './libs',
                cleanTargetDir: true
            }
        }
    },
    html2js: {
      dist: {
        src: [ 'client/**/*.tpl.html' ],
        dest: 'tmp/templates.js'
      }
    },
    concat: {
      options: {
        separator: ';'
      },
      main: {
        src: [ 'client/app.js', 'client/**/*.js', 'tmp/*.js' ],
        dest: 'dist/app.js'
      },
      libs: {
        src: [
            'vendor/jquery/dist/jquery.js',
            'vendor/angular/angular.js',
            'vendor/angular-animate/angular-animate.js',
            'vendor/angular-aria/angular-aria.js',
            'vendor/angular-google-maps/angular-google-maps.js',
            'vendor/angular-material/angular-material.js',
            'vendor/angular-skycons/angular-skycons.min.js',
            'vendor/lodash/lodash.js',
            'vendor/restangular/dist/restangular.js'
        ],
        dest: 'dist/libs.js'
      }
    },
    concat_css: {
      dist: {
          src: [ 'client/**/*.css' ],
          dest: 'dist/app.css'
      },
      libs: {
        src: [ 'vendor/**/*.css' ],
        dest: 'dist/libs.css'
      }
    },
    clean: {
      temp: {
        src: [ 'tmp' ]
      }
    }
  });

  // Loading of tasks and registering tasks will be written here
  grunt.loadNpmTasks('grunt-bower-task');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-concat-css');
  grunt.loadNpmTasks('grunt-html2js');

  grunt.registerTask('build', ['bower', 'html2js', 'concat', 'concat_css', 'clean']);
};
