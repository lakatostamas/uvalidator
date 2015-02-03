/*jslint node: true*/

module.exports = function (grunt) {
    "use strict";

    grunt.registerTask('md-to-html', 'Build HTML documentation', function () {
        var marked = require("color-marked"),
            fs = require('fs'),
            done = this.async(),
            files;

        files = grunt.config('md-to-html.files');

        marked.setOptions({
            gfm: true,
            tables: true,
            breaks: false,
            pedantic: false,
            sanitize: true,
            smartLists: true
        });

        files.forEach(function (file) {
            fs.readFile(file.src, function (err, data) {
                if (err) {
                    throw err;
                }
                var html = '<!DOCTYPE html><html><head><title>TITLE</title>' +
                    '<meta charset="utf-8"></head><body>' +
                    marked(data.toString('utf8')) +
                    '</body></html>';

                fs.writeFile(file.dest, html, function () {
                    done();
                });
            });
        });
    });

    grunt.loadNpmTasks('grunt-jslint');
    grunt.loadNpmTasks('grunt-release');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.initConfig({
        'md-to-html': {
            files: [
                {
                    src: 'README.md',
                    dest: 'README.html'
                }
            ]
        },
        jslint: {
            files: [
                'jquery.uvalidator.js'
            ]
        },
		uglify: {
			uvalidator: {
				files: {
					'dist/jquery.uvalidator.min.js': ['jquery.uvalidator.js']
				}
			},
			uvalidatorWSkinUstreamMessages: {
				files: {
					'dist/jquery.uvalidator.skin.ustream.messages.min.js': [
						'jquery.uvalidator.js',
						'jquery.uvalidator.rules.js',
						'jquery.uvalidator.skin.js',
						'jquery.uvalidator.skin.ustream.js',
						'jquery.uvalidator.messages.js'
					]
				}
			},
			uvalidatorWSkinUstream: {
				files: {
					'dist/jquery.uvalidator.skin.ustream.min.js': [
						'jquery.uvalidator.js',
						'jquery.uvalidator.rules.js',
						'jquery.uvalidator.skin.js',
						'jquery.uvalidator.skin.ustream.js'
					]
				}
			}
		}
    });

    grunt.registerTask('default', ['md-to-html', 'jslint', 'uglify']);
};
