var fs = require('fs')
var os = require('os')
var path = require('path')

module.exports = function createTempFile() {
	var path = generateTempFilePath()
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

function generateTempFilePath() {
	return path.join(os.tmpdir(), Math.random().toString().slice(2))
}
