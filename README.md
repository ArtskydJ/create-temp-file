create-temp-file
================

> A tiny node module that creates a temporary file, returns a write stream, a path, and cleanup functions

[![Build Status](https://travis-ci.org/ArtskydJ/create-temp-file.svg)](https://travis-ci.org/ArtskydJ/create-temp-file)

# example

```js
var createTempFile = require('create-temp-file')

var ws = createTempFile()
process.stdin.pipe(ws)

process.on('exit', ws.cleanupSync)
```

# api

```js
var createTempFile = require('create-temp-file')
```

## `var ws = createTempFile([extension])`

You can set the file `extension` for the temp file, or don't set an extension. E.g. `'.png'`.

`ws` is a [write stream](https://nodejs.org/api/fs.html#fs_class_fs_writestream) to the new temporary file with the following properties:

- `ws.path` is the absolute path to the temporary file. E.g. `'/tmp/b285e724-226c-11e5-9981-82bd40254040.png'`
- `ws.cleanup([cb])` deletes the temporary file. Like [`fs.unlink`](https://nodejs.org/api/fs.html#fs_fs_unlink_path_callback)
- `ws.cleanupSync` deletes the temporary file synchronously. Like [`fs.unlinkSync`](https://nodejs.org/api/fs.html#fs_fs_unlinksync_path)

If an error occurs in `ws.cleanup()` or `ws.cleanupSync()`, the error will be emitted. Catch any errors like this:

```js
ws.on('error', function (e) {
	throw e
})
```

# install

With [npm](https://nodejs.org/en/download/) do:

    npm install create-temp-file

# license

[VOL](http://veryopenlicense.com/)
