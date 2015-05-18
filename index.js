var fs = require('fs')
var osTmpDir = require('os-tmpdir')
var pathJoin = require('path').join

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
	return pathJoin(os.tmpdir(), Math.random().toString().slice(2))
}
