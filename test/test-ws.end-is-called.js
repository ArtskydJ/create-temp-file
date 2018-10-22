var test = require('tape')
var ctf = require('./helper/ctf.js')
var fs = require('fs')

function callsEnd(method) {
	return function(t) {
		t.plan(1)
		var ws = ctf()
		ws.on('finish', function () {
			t.pass('ws.end() was called')
			t.end()
		})
		ws.write('lolz')
		setTimeout(ws[method], 0)
	}
}

test('ws.end is called when cleanup is called and stream is still going', callsEnd('cleanup'))
test('ws.end is called when cleanupSync is called and stream is still going', callsEnd('cleanupSync'))
