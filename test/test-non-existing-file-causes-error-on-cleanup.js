var test = require('tape')
var createTempFile = require('../')
var fs = require('fs')

nonexistentFileCausesAnErrorWhenMethodIsCalled('cleanupSync')
nonexistentFileCausesAnErrorWhenMethodIsCalled('cleanup')

function nonexistentFileCausesAnErrorWhenMethodIsCalled(method) {
	test('Non-existent file causes an error when '+method+' is called', function (t) {
		t.plan(5)
		var fileWasDeleted = false
		var ws = createTempFile('.txt')

		ws.on('error', function (err) {
			t.ok(fileWasDeleted, 'File was deleted')
			var errCodeIsEnoentOrEperm = (err.code === 'ENOENT' || err.code === 'EPERM')
			t.ok(errCodeIsEnoentOrEperm, 'Got an ENOENT or EPERM error')
		})

		setTimeout(function () {
			fs.unlinkSync(ws.path)
			t.pass('unlinkSync was successful')
			fileWasDeleted = true
		}, 100)
		setTimeout(function () {
			t.pass('about to run '+method);
			ws[method]()
			t.pass(method+' was successful');
		}, 200)
		setTimeout(function () {
			t.end()
		}, 300)
	})
}
