module.exports = ->
	@loadNpmTasks 'grunt-contrib-compass'

	@config "compass",       
    dist:                   
      options:             
        sassDir: 'sass'
        cssDir: 'css'
        environment: 'production'
    
    dev:
      options: 
        sassDir: 'sass'
        cssDir: 'css'
