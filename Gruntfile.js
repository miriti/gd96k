module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            dist: {
                src: ['src/*.js'],
                dest: 'bin/concated.js'
            }
        },
        uglify: {
            options: {
                maxLineLen: 7000,
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
        }
    });

    grunt.registerTask('pack', 'Packing the final executable', function () {
        grunt.task.requires('uglify');

        grunt.file.defaultEncoding = 'utf8';
        
        var code = "<!doctype html><html><body><script>" + grunt.file.read('bin/tmp.js') + "</script></body></html>";

        grunt.file.write('bin/game.html', code);
    });

    grunt.registerTask('cleanup', 'Clean up', function () {
        grunt.file.delete('bin/concated.js');
        grunt.file.delete('bin/tmp.js');
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-compress');

    grunt.registerTask('default', ['concat', 'uglify', 'pack', 'cleanup']);
};
