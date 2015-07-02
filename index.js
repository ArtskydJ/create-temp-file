var fs = require('fs')
var generateTempFilePath = require('tempfile')

module.exports = function createTempFile(ext) {
	var path = generateTempFilePath(ext)
	var writeStream = fs.createWriteStream(path)
	writeStream.path = path
	writeStream.cleanup = function cln(cb) {
		fs.unlink(path, cb || emitError)
	}
	writeStream.cleanupSync = function clnSnc() {
		try {
			fs.unlinkSync(path)
		} catch (err) {
			emitError(err)
		}
	}
	return writeStream

	function emitError(err) {
		writeStream.emit('error', err)
	}
}
