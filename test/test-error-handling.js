var test = require('tape')
var createTempFile = require('../')
var fs = require('fs')

var codes = [ 'EPERM', 'ENOENT' ]

function errorHandling(method) {
	test('error handling '+method, function errhandle(t) {
		var ws = createTempFile()
		ws.on('error', function (e) {
			t.notEqual(codes.indexOf(e.code), -1, 'Got ' + codes.join('/') + ' error')
			t.end()
		})
		setTimeout(function () {
			try {
				fs.unlinkSync(ws.path)
			} catch (e) {
				t.fail(String(e))
			}
			setTimeout(ws[method], 10)
		}, 10)
	})
}

errorHandling('cleanupSync')
errorHandling('cleanup')
