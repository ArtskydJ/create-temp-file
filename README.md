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

process.stdin.pipe(tempFile)

process.on('exit', tempFile.cleanupSync)
```

# api

```js
var createTempFile = require('create-temp-file')
```

### `var ws = createTempFile([ext])`

- `ext` is an optional extension for the temporary file. E.g. `'.txt'`
- Returns `ws`, a [write stream](https://nodejs.org/api/fs.html#fs_class_fs_writestream) to the new temporary file with the following properties:
	- `ws.path` is the absolute path to the temporary file.
	- `ws.cleanup([cb])` is a function that will delete the temporary file. Like [`fs.unlink`](https://nodejs.org/api/fs.html#fs_fs_unlink_path_callback). If `cb` is not provided, errors will be emitted. Do `ws.on('error', handler)` to handle errors.
	- `ws.cleanupSync()` is a function that deletes the temporary file synchronously. Like [`fs.unlinkSync(path)`](https://nodejs.org/api/fs.html#fs_fs_unlinksync_path). If an error occurs, it will be emitted. Do `ws.on('error', handler)` to handle errors.


# install

With [npm](https://npmjs.com/) do:

```
npm install create-temp-file
```

# license

[VOL](http://veryopenlicense.com/)
