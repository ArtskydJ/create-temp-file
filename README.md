create-temp-file
================

Creates a temporary file, returns a write stream, a path, and cleanup functions

#example

```js
var createTempFile = require('create-temp-file')

var tempFile = createTempFile()
process.stdin
	.pipe(tempFile.writeStream)
	.on('finish', function () {
		tempFile.cleanup()
	})
```

#api

```js
var createTempFile = require('create-temp-file')
```

###`createTempFile()`

Returns a write stream to the new temporary file with the following properties:
- `path` is the path to the temporary file
- `cleanup(cb)` is a function that will delete the temporary file. `cb` is the optional callback, and defaults to a no-op.
- `cleanupSync()` is a function that deletes the temporary file synchronously.

#install

With [npm][https://npmjs.com] do:
#license

[VOL](http://veryopenlicense.com/)
