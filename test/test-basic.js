var test = require('tape')
var fs = require('fs')
var ctf = require('./helper/ctf.js')
require('string.prototype.startswith')
require('string.prototype.endswith')

test('write stream works', function (t) {
	t.plan(2)
	var ws = ctf()
	fs.createReadStream(__dirname + '/do-not-change.txt')
		.pipe(ws)
		.on('finish', testWS)

	function testWS() {
		fs.readFile(ws.path, { encoding: 'utf8' }, function (err, string) {
			t.notOk(err, err ? err.message : 'no error')
			t.ok(string.startsWith('do not delete or change this file'), 'strings match')
			ws.cleanupSync()
			t.end()
		})
	}
})

test('extension', function (t) {
	t.plan(1)
	var ws = ctf('.txt')
	t.notEqual(ws.path.indexOf('.txt'), -1, 'file extension is ".txt"')
	ws.end('lolz')
	ws.cleanupSync()
	t.end()
})

