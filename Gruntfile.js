module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            dist: {
                src: [
                    'src/common.js',
                    'src/data.js',
                    'src/Input.js',
                    'src/Math.js',
                    'src/DisplayObjectContainer.js',
                    'src/Quad.js',
                    'src/Character.js',
                    'src/Enemy.js',
                    'src/Player.js',
                    'src/GameScene.js',
                    'src/Game.js',
                    'src/main.js'
                ],
                dest: 'bin/concated.js'
            }
        },
        jshint: {
            dist: ['src/*.js']
        },
        'closure-compiler': {
            dist: {
                closurePath: '/usr/local/opt/closure-compiler/libexec',
                js: 'bin/concated.js',
                jsOutputFile: 'bin/tmp.js',
                maxBuffer: 96,
                options: {
                    compilation_level: 'ADVANCED_OPTIMIZATIONS',
                    language_in: 'ECMASCRIPT5_STRICT'
                }
            }
        },
        base64: {
            prepare: {
                files: {
                    'src/data.b64': ['src/imagedata.gif']
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-base64');
    grunt.loadNpmTasks('grunt-closure-compiler');

    grunt.registerTask('writeData', function () {
        grunt.task.requires('base64');

        var base64 = grunt.file.read('src/data.b64');

        grunt.file.write('src/data.js', "var imageData = 'data:image/gif;base64," + base64 + "';\n");
    });

    grunt.registerTask('pack', 'Packing the final executable', function () {
        grunt.task.requires('closure-compiler');

        grunt.file.defaultEncoding = 'utf8';

        var html_begin = grunt.file.read('src/html_begin.html');
        var html_end = grunt.file.read('src/html_end.html');

        var code = html_begin + grunt.file.read('bin/tmp.js') + html_end;

        grunt.file.write('bin/game.html', code);
    });

    grunt.registerTask('cleanup', 'Clean up', function () {
        grunt.file.delete('bin/concated.js');
        grunt.file.delete('bin/tmp.js');
    });

    grunt.registerTask('prepare', ['base64', 'writeData']);
    grunt.registerTask('default', ['jshint', 'prepare', 'concat', 'closure-compiler', 'pack', 'cleanup']);
};
