module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            dist: {
                src: [
                    'src/lib/common.js',
                    'src/lib/lib/Interpolation.js',
                    'src/data.js',
                    'src/core/Input.js',
                    'src/lib/Math.js',
                    'src/core/DisplayObjectContainer.js',
                    'src/core/Quad.js',
                    'src/core/dollAnimations/Animation.js',
                    'src/core/dollAnimations/Idle.js',
                    'src/core/dollAnimations/Running.js',
                    'src/core/dollAnimations/Hit.js',
                    'src/core/Doll.js',
                    'src/core/Character.js',
                    'src/characters/Enemy.js',
                    'src/characters/Player.js',
                    'src/core/GameScene.js',
                    'src/scenes/Cafe.js',
                    'src/core/Game.js',
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
                jsOutputFile: 'bin/compiled.js',
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

        var code = html_begin + grunt.file.read('bin/compiled.js') + html_end;

        grunt.file.write('bin/game.html', code);

        var full_code = html_begin + grunt.file.read('bin/concated.js') + html_end;
        grunt.file.write('bin/game_full.html', full_code);
    });

    grunt.registerTask('cleanup', 'Clean up', function () {
        grunt.file.delete('bin/concated.js');
        grunt.file.delete('bin/compiled.js');
    });

    grunt.registerTask('prepare', ['base64', 'writeData']);
    grunt.registerTask('default', ['jshint', 'prepare', 'concat', 'closure-compiler', 'pack', 'cleanup']);
};
