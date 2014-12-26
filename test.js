var test = require('tap').test
var fs = require('fs')
var concat = require('concat-stream')
var ctf = require('./')

test('write stream works', function (t) {
	t.plan(1)
	var tmpFile = ctf()
	fs.createReadStream('./.gitignore')
			.pipe(tmpFile)
			.on('finish', function () {
		fs.createReadStream(tmpFile.path)
				.pipe(concat(function (buf) {
			var string = buf.toString().replace(/\r/g, '')
			t.equal(string, 'node_modules/*\n', 'strings match')
			tmpFile.cleanupSync()
			t.end()
		}))
	})
})

test('cleanupSync() works', function (t) {
	var tmpFile = ctf()
	tmpFile.write('lolz')
	t.ok(fs.existsSync(tmpFile.path), 'created file')
	tmpFile.cleanupSync()
	t.notOk(fs.existsSync(tmpFile.path), 'cleanupSync() deleted the file')
	t.end()
})

test('cleanup() works', function (t) {
	var tmpFile = ctf()
	tmpFile.write('ello wurld')
	setTimeout(function () { //timeout makes this test much more robust
		t.ok(fs.existsSync(tmpFile.path), 'created file')
		tmpFile.cleanup(function (err) {
			t.notOk(fs.existsSync(tmpFile.path), 'cleanup() deleted the file')
			t.notOk(err, err ? err.message : 'no error during cleanup()')
			t.end()
		})
	}, 1)
})
