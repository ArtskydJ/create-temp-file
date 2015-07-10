create-temp-file
================

[![Build Status](https://travis-ci.org/ArtskydJ/create-temp-file.svg)](https://travis-ci.org/ArtskydJ/create-temp-file)
[![Dependency Status](https://david-dm.org/artskydj/create-temp-file.svg)](https://david-dm.org/artskydj/create-temp-file)
[![devDependency Status](https://david-dm.org/artskydj/create-temp-file/dev-status.svg)](https://david-dm.org/artskydj/create-temp-file#info=devDependencies)

Creates a temporary file, returns a write stream, a path, and cleanup functions

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

## `var ws = createTempFile([options])`

#### `options`

A string or object of options for [tempfile2](https://github.com/kikobeats/tempfile2).

- If it is a string, it is the extension of the temporary file. E.g. `'.png'`.
- If it is an object, it can have the following properties:
	- `ext` is the extension of the temporary file. E.g. `'.png'`.
	- `path` is the your own path instead of your system's temporary directory. E.g. `'C:\Users\Joseph`.

#### `ws`

A [write stream](https://nodejs.org/api/fs.html#fs_class_fs_writestream) to the new temporary file with the following properties:

- `ws.path` is the absolute path to the temporary file. E.g. `'/tmp/b285e724-226c-11e5-9981-82bd40254040.png'`
- `ws.cleanup([cb])` is a function that will delete the temporary file. Like [`fs.unlink`](https://nodejs.org/api/fs.html#fs_fs_unlink_path_callback).
- `ws.cleanupSync()` is a function that deletes the temporary file synchronously. Like [`fs.unlinkSync(path)`](https://nodejs.org/api/fs.html#fs_fs_unlinksync_path).

If an error occurs in `ws.cleanup()` or `ws.cleanupSync()`, the error will be emitted.

# install

With [npm](https://npmjs.com/) do:

```
npm install create-temp-file
```

# license

[VOL](http://veryopenlicense.com/)
