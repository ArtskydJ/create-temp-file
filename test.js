var test = require('tap').test
var fs = require('fs')
var concat = require('concat-stream')
var ctf = require('./')

test('write stream works', function (t) {
	t.plan(1)
	var tmpFile = ctf()
	var stream = fs.createReadStream( './README.md' ).pipe( tmpFile )
	stream.on('finish', function () {
		fs.createReadStream( tmpFile.path ).pipe(concat(function (buf) {
			var string = buf.toString().slice(0, 16)
			t.equal(string, 'create-temp-file', 'strings match')
			tmpFile.cleanupSync()
			t.end()
		}))
	})
})

test('cleanupSync() works', function (t) {
	setTimeout(function () {
		var tmpFile = ctf()
		tmpFile.write('lolz')
		t.ok(fs.existsSync(tmpFile.path), 'created file')
		tmpFile.cleanupSync()
		t.notOk(fs.existsSync(tmpFile.path), 'cleanupSync() deleted the file')
		t.end()
	}, 10)
})

test('cleanup() works', function (t) {
	var tmpFile = ctf()
	tmpFile.write('ello wurld')
	tmpFile.end()
	setTimeout(function () { //timeout makes this test much more robust
		t.ok(fs.existsSync(tmpFile.path), 'created file')
		tmpFile.cleanup(function (err) {
			t.notOk(fs.existsSync(tmpFile.path), 'cleanup() deleted the file')
			t.notOk(err, err ? err.message : 'no error during cleanup()')
			t.end()
		})
	}, 10)
})
