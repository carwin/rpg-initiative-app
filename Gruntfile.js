module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    sass: {
      dist: {
        options: {
          outputStyle: 'expanded',
          imagePath: 'images',
          sourceComments: 'none',
          precision: 8,
          unixNewlines: true
        },
        files: {
          'css/style.css': 'scss/style.scss'
        }
      }
    },
    watch: {
      options: {
        livereload: true
      },
      css: {
        files: ['scss/**/*.scss'],
        tasks: ['sass'],
        options: {
          spawn: false
        }
      }
    },
  });


  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['build']);
  grunt.registerTask('build', ['sass']);

};
