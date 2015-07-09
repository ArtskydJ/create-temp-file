var fs = require('fs')
var generateTempFilePath = require('tempfile2')
var streamEnd = require('end-of-stream')

module.exports = function createTempFile(params) {
	var streamHasEnded = false
	var path = generateTempFilePath(params)
	var writeStream = fs.createWriteStream(path)

	function emitError(err) {
		if (err) writeStream.emit('error', err)
	}

	writeStream.path = path

	streamEnd(writeStream, function (err) {
		streamHasEnded = true
	})

	writeStream.cleanup = function cln(cb) {
		if (!streamHasEnded) writeStream.end()
		fs.unlink(path, cb || emitError)
	}

	writeStream.cleanupSync = function clnSnc() {
		if (!streamHasEnded) writeStream.end()
		try {
			fs.unlinkSync(path)
		} catch (err) {
			emitError(err)
		}
	}

	return writeStream
}
