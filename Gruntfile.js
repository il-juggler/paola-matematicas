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
			      data: function(dest, src) {
				    return require('./jade-locals.json');
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
			    	src : ['*.coffee', '**/*.coffee'],
			    	dest: 'public/js',
			    	ext : '.js'
			    }]
			},
		},


		watch : {
			all : {
				files : ['src/coffee/**.coffee','src/**.jade'],
				tasks : ['coffee','jade'],
				options : {
					livereload : true
				}
			}
		}

	});

	grunt.loadNpmTasks('grunt-markdown');
	grunt.loadNpmTasks('grunt-contrib-coffee');
	grunt.loadNpmTasks('grunt-contrib-jade');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('auto', ['markdown:all', 'jade:html','coffee:compile', 'connect']);
}