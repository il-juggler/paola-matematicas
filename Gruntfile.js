module.exports = function(grunt) {
	grunt.initConfig({

		connect: {
			server: {
				options: {
					port: 9001,
					base: 'public',
					keepalive : true
				}
			}
		},


	    jade: {
		    html: {
		        files: [{
		        	expand :true,
		        	cwd  : 'src',
		        	dest : 'public',
		        	src  : '*.jade',
		        	dest : 'public',
		        	ext  : '.html'
		        }],
		        options: {
			      data: {
			        debug: false
			      }
			    }
		    }
		},



		markdown: {
			all: {
			  files: [
			    {
			      expand: true,
			      cwd : 'src',
			      dest : 'public',
			      src: '**/*.md',
			      dest: 'public',
			      ext: '.html'
			    }
			  ],
			  options: {
			  	template: 'src/template.html',
			    markdownOptions: {
			      gfm: true,
			      highlight: 'manual',
			      codeLines: {
			        before: '<span>',
			        after: '</span>'
			      }
			    }
			  }
			}
		},

		coffee : {
			compile: {
			    files: [{
			    	expand : true,
			    	cwd : 'src/coffee',
			    	src : ['*.coffee','**/*.coffee'],
			    	dest: 'public/js',
			    	ext : '.js'
			    }]
			},
		}

	});

	grunt.loadNpmTasks('grunt-markdown');
	grunt.loadNpmTasks('grunt-contrib-coffee');
	grunt.loadNpmTasks('grunt-contrib-jade');
	grunt.loadNpmTasks('grunt-contrib-connect');

	grunt.registerTask('server', ['connect']);
	grunt.registerTask('auto', ['markdown:all', 'jade:html','coffee:compile', 'connect']);
}