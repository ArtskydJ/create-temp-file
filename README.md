create-temp-file
================

[![Build Status](https://travis-ci.org/ArtskydJ/create-temp-file.svg)](https://travis-ci.org/ArtskydJ/create-temp-file)
[![Dependency Status](https://david-dm.org/artskydj/create-temp-file.svg)](https://david-dm.org/artskydj/create-temp-file)
[![devDependency Status](https://david-dm.org/artskydj/create-temp-file/dev-status.svg)](https://david-dm.org/artskydj/create-temp-file#info=devDependencies)

Creates a temporary file, returns a write stream, a path, and cleanup functions

# example

```js
var createTempFile = require('create-temp-file')

var tempFile = createTempFile()
process.stdin
	.pipe(tempFile)
	.on('finish', function () {
		tempFile.cleanup()
	})
```

# api

```js
var createTempFile = require('create-temp-file')
```

### `var ws = createTempFile()`

Returns a write stream to the new temporary file with the following properties:
- `path` is the path to the temporary file.
- `cleanup([cb])` is a function that will delete the temporary file. `cb` is the optional callback, and defaults to a no-op.
- `cleanupSync()` is a function that deletes the temporary file synchronously.

# install

With [npm](https://npmjs.com/) do:

```
npm install create-temp-file
```

# license

[VOL](http://veryopenlicense.com/)
