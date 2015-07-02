var fs = require('fs')
var generateTempFilePath = require('tempfile')

module.exports = function createTempFile(ext) {
	var path = generateTempFilePath(ext)
	var writeStream = fs.createWriteStream(path)
	writeStream.path = path
	writeStream.cleanup = function cln(cb) {
		fs.unlink(path, cb || function () {})
	}
	writeStream.cleanupSync = function clnSnc() {
		fs.unlinkSync(path)
	}
	return writeStream
}
