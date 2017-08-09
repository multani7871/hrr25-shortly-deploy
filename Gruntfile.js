module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      dist: {
        src: [
        'public/lib/jquery.js',
        'public/lib/underscore.js',
        'public/lib/backbone.js',
        'public/lib/handlebars.js',
        ],
        dest: 'public/dist/built.js'
      },
      extra: {
        src: [
          'public/client/app.js',
          'public/client/link.js',
          'public/client/links.js',
          'public/client/linkView.js',
          'public/client/linksView.js', 'public/client/createLinkView.js',
          'public/client/router.js'
        ],
        dest: 'public/dist/client.js'
      }
    },

    mochaTest: {
      test: {
        options: {
          reporter: 'spec'
        },
        src: ['test/**/*.js']
      }
    },

    nodemon: {
      dev: {
        script: 'server.js'
      }
    },

    uglify: {
      dist: {
        files: {
          'public/dist/built.min.js': ['public/dist/built.js'],
          'public/dist/client.min.js': ['public/dist/client.js']
        }
      }
    },

    eslint: {
      target: [
        // Add list of files to lint here
        'server.js',
        'server-config.js',
        'public/client/**/*.js',
        'lib/*.js',
        'app/*.js',
        'app/collections/*.js',
        'app/models/*.js'

      ]
    },

    cssmin: {
      dist: {
        files: {
          'public/dist/style.min.css': ['public/style.css']
        }
      }
    },

    watch: {
      scripts: {
        files: [
          'public/client/**/*.js',
          'public/lib/**/*.js',
        ],
        tasks: [
          'concat',
          'uglify'
        ]
      },
      css: {
        files: 'public/*.css',
        tasks: ['cssmin']
      }
    },

    shell: {
      prodServer: {
        command: 'git push live master'
      }
    },
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-eslint');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-git');

  grunt.registerTask('server-dev', function(target) {
    grunt.task.run(['nodemon', 'watch']);
  });

  ////////////////////////////////////////////////////
  // Main grunt tasks
  ////////////////////////////////////////////////////

  // grunt.registerTask('test', [
  //   'mochaTest'
  // ]);

  grunt.registerTask('default', [
    'nodemon'
  ]);

  grunt.registerTask('build', [
    'eslint', 'test', 'concat', 'uglify', 'cssmin'
  ]);

  grunt.registerTask('upload', function(n) {
    if (grunt.option('prod')) {
      // add your production server task here
    } else {
      grunt.task.run(['server-dev']);
    }
  });

  grunt.registerTask('deploy', function(n) {
    if (grunt.option('prod')) {
      grunt.task.run(['build', 'shell']);
    } else if (grunt.option('dev')) {
      grunt.task.run(['build']);
    }
  });

};
