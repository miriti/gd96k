module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            dist: {
                src: [
                    'src/data.js',
                    'src/common.js',
                    'src/DisplayObjectContainer.js',
                    'src/main.js'
                ],
                dest: 'bin/concated.js'
            }
        },
        jshint: {
            dist: ['src/*.js']
        },
        uglify: {
            options: {
                maxLineLen: 2000,
                mangle: {
                    sort: true,
                    toplevel: true
                },
                compress: {
                    sequences: true,
                    properties: true,
                    conditionals: true,
                    booleans: true,
                    unused: true,
                    if_return: true,
                    join_vars: true,
                    screw_ie8: true,
                    dead_code: true,
                    comparisons: true,
                    evaluate: true,
                    loops: true,
                    warnings: true,
                    drop_console: true
                },
                squeeze: {
                    dead_code: true
                },
                report: ['gzip'],
                preserveComments: 'all'
            },
            dist: {
                files: {
                    'bin/tmp.js': ['bin/concated.js']
                }
            }
        },
        base64: {
            prepare: {
                files: {
                    'src/data.b64': ['src/imagedata.gif']
                }
            }
        },
    });

    grunt.registerTask('writeData', function () {
        grunt.task.requires('base64');

        var base64 = grunt.file.read('src/data.b64');

        grunt.file.write('src/data.js', "var imageData = 'data:image/gif;base64," + base64 + "';\n");
    });

    grunt.registerTask('pack', 'Packing the final executable', function () {
        grunt.task.requires('uglify');

        grunt.file.defaultEncoding = 'utf8';

        var html_begin = grunt.file.read('src/html_begin.html');
        var html_end = grunt.file.read('src/html_end.html');

        var code = html_begin + "\n" + grunt.file.read('bin/tmp.js') + "\n" + html_end;

        grunt.file.write('bin/game.html', code);
    });

    grunt.registerTask('cleanup', 'Clean up', function () {
        grunt.file.delete('bin/concated.js');
        grunt.file.delete('bin/tmp.js');
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-base64');
    grunt.loadNpmTasks('grunt-contrib-compress');

    grunt.registerTask('prepare', ['base64', 'writeData']);
    grunt.registerTask('default', ['jshint', 'prepare', 'concat', 'uglify', 'pack', 'cleanup']);
};
