var fs = require('fs')
var generateTempFilePath = require('tempfile2')

function emitError(err) {
	writeStream.emit('error', err)
}

module.exports = function createTempFile(params) {
	var path = generateTempFilePath(params)
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

	writeStream.flush = function fls() {
		fileStream.end();
		return writeStream.cleanup();
	}

	writeStream.flushSync = function flsSnc() {
		fileStream.end();
		return writeStream.cleanupSync();
	}

	return writeStream
}
