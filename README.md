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

#usage

###`createTempFile()`

Returns a write stream to the new temp file with the following properties:
- `path` is the path the the file on the hard drive
- `cleanup(cb)` is a function that will delete the temp file. `cb` is the optional callback, and defaults to a no-op.
- `cleanupSync()` is a function that deletes the temp file synchronously.

#license

[VOL](http://veryopenlicense.com/)
