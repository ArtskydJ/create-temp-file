var fs = require('fs')
var generateTempFilePath = require('tempfile2')

module.exports = function createTempFile(params) {
	var path = generateTempFilePath(params)
	var writeStream = fs.createWriteStream(path)

	function emitError(err) {
		writeStream.emit('error', err)
	}

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

	writeStream.flush = function fls() {
		writeStream.end();
		return writeStream.cleanup();
	}

	writeStream.flushSync = function flsSnc() {
		writeStream.end();
		return writeStream.cleanupSync();
	}

	return writeStream
}
