module.exports = function(grunt) {

    grunt.initConfig({
        bower: {
            install: {
                //just run 'grunt bower:install' and you'll see files from your Bower packages in lib directory
            }
        },
        requirejs: {
            compile: {
                options: {
                    baseUrl: 'public/scripts/lib',
                    mainConfigFile: 'public/scripts/main.js',
                    preserveLicenseComments: false, //comment in production
                    out: 'public/scripts/webapp.min.js',
                    optimize: 'uglify2',
                    include: ['../main']
                }
            }
        },
        watch: {
            stylesheets: {
                files: ['public/stylesheets/less/**/*.less'],
                tasks: ['less'],
                options: {
                    livereload: true
                }
            },
            frontEnd: {
                files: ['public/scripts/**/*'],
                options: {
                    livereload: true
                }
            },
            backEnd: {
                files: ['dataStore/**/*', 'app/**/*', 'models/**/*', 'views/**/*'],
                tasks: []
            }
        },
        less: {
            options: {
                paths: 'public/stylesheets/'
            },
            src: {
                expand: true,
                cwd: 'public/stylesheets/',
                src: [
                    'less/**/*.less'
                ],
                ext: '.css',
                dest: 'public/stylesheets/css/',
                rename: function(dest, src) {
                    console.log(src);
                    console.log(dest);
                    var array = src.split("/"), filename = array[array.length - 1];
                    return dest + filename.split(".")[0] + ".css";
                }
            }
        },
        nodemon: {
            dev: {
                script: 'server.js',
                options: {
                    ignore: ['node_modules/**', 'public/**']
                }
            }
        }

    });

    grunt.loadNpmTasks('grunt-npm-install');
    grunt.loadNpmTasks('grunt-bower-installer');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-nodemon');

    grunt.registerTask('init', ['npm-install', 'bower:install']);
    grunt.registerTask('compile', ['requirejs:compile']);

    grunt.registerTask('start', ['nodemon']);
};
