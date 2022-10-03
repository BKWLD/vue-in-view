import { join } from 'path'
export default function() {

	// Allow components to be auto-imported by Nuxt
	this.nuxt.hook('components:dirs', dirs => {
		dirs.push({
			path: join(__dirname, './components'),
			prefix: 'in-view',
		})
	})

}

// Required for published modules
module.exports.meta = require('./package.json')
