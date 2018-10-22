var test = require('tape')
var createTempFile = require('../')

test('Path generator options', function (t) {
	t.plan(1)
	var ws = createTempFile(String)('./hello.txt')
	t.ok(ws.path.endsWith('hello.txt'), 'filename is "hello.txt"')
	ws.end('lolz')
	ws.cleanupSync()
	t.end()
})
