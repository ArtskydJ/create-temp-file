var test = require('tape')
var createTempFile = require('../')
var fs = require('fs')

function errorHandling(method) {
	var codes = [ 'EPERM', 'ENOENT' ]
	return function errhandle(t) {
		var ws = createTempFile()()
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
	}
}
test('error handling sync', errorHandling('cleanupSync'))
test('error handling async', errorHandling('cleanup'))
