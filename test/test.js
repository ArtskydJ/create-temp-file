var test = require('tap').test
var fs = require('fs')
var ctf = require('../')

test('write stream works', function (t) {
	t.plan(2)
	var file = ctf()
	fs.createReadStream(__dirname + '/helper.txt')
		.pipe(file)
		.on('finish', testWS)

	function testWS() {
		fs.readFile(file.path, { encoding: 'utf8' }, function (err, string) {
			t.notOk(err, err ? err.message : 'no error')
			t.equal(string, 'do not delete or change this file\n', 'strings match')
			file.cleanupSync()
			t.end()
		})
	}
})

test('extension', function (t) {
	t.plan(1)
	var file = ctf('.txt')
	t.notEqual(file.path.indexOf('.txt'), -1, '".txt" exists in file path')
	file.cleanupSync()
	t.end()
})

test('cleanupSync() works', function (t) {
	t.plan(3)

	var file = ctf()
	file.end('lolz')

	setTimeout(function () { //timeout makes this test much more robust
		t.ok(fs.existsSync(file.path), 'created file')
		t.doesNotThrow(file.cleanupSync)
		t.notOk(fs.existsSync(file.path), 'cleanupSync() deleted the file')
		t.end()
	}, 0)
})

test('cleanup() works', function (t) {
	t.plan(3)

	var file = ctf()
	file.end('ello wurld')

	setTimeout(function () { //timeout makes this test much more robust
		t.ok(fs.existsSync(file.path), 'created file')
		file.cleanup(function (err) {
			t.notOk(err, err ? err.message : 'no error during cleanup()')
			t.notOk(fs.existsSync(file.path), 'cleanup() deleted the file')
			t.end()
		})
	}, 0)
})
