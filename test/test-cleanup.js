var test = require('tape')
var ctf = require('./helper/ctf.js')
var fs = require('fs')

test('cleanupSync() works', function (t) {
	t.plan(3)

	var ws = ctf()
	ws.end('lolz')

	setTimeout(function () { //timeout makes this test much more robust
		t.ok(fs.existsSync(ws.path), 'created file')
		t.doesNotThrow(ws.cleanupSync)
		t.notOk(fs.existsSync(ws.path), 'cleanupSync() deleted the file')
		t.end()
	}, 0)
})

test('cleanup() works', function (t) {
	t.plan(3)

	var ws = ctf()
	ws.end('lolz')

	setTimeout(function () { //timeout makes this test much more robust
		t.ok(fs.existsSync(ws.path), 'created file')
		ws.cleanup(function (err) {
			t.notOk(err, err ? err.message : 'no error during cleanup()')
			t.notOk(fs.existsSync(ws.path), 'cleanup() deleted the file')
			t.end()
		})
	}, 0)
})