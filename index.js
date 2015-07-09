var fs = require('fs')
var streamEnd = require('end-of-stream')
var generateTempFilePath = require('tempfile2')

module.exports = function createTempFile(params) {
	var streamHasEnded = false
	var path = generateTempFilePath(params)
	var writeStream = fs.createWriteStream(path)

	function emitError(err) {
		writeStream.emit('error', err)
	}

	writeStream.path = path

	writeStream.cleanup = function cln(cb) {
		writeStream.end()
		fs.unlink(path, cb || function() {})
	}

	writeStream.cleanupSync = function clnSnc() {
		writeStream.end()
		try {
			fs.unlinkSync(path)
		} catch (err) {
			emitError(err)
		}
	}

	return writeStream
}