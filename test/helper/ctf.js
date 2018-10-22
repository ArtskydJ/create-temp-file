var createTempFile = require('../../')

function ctf(ext) {
	var ws = createTempFile(ext)
	ws.on('error', function (err) {
		throw err
	})
	return ws
}

module.exports = ctf
