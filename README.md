# Get File plugin for FilePond

[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/nielsboogaard/filepond-plugin-get-file/blob/master/LICENSE)
[![npm version](https://badge.fury.io/js/filepond-plugin-get-file.svg)](https://badge.fury.io/js/filepond-plugin-get-file)

The Get File plugin will add a tiny 'download' icon in front of the filename to allow downloading the uploaded file.

<img src="https://github.com/nielsboogaard/filepond-plugin-get-file/blob/master/demo.gif?raw=true" width="100%" alt=""/>


## Quick Start

Install using npm:

```bash
npm install filepond-plugin-get-file
```

Then import in your project:

```js
import * as FilePond from 'filepond';
import FilePondPluginGetFile from 'filepond-plugin-get-file';
```
Also, don't forget to import the belonging styles:
```css
@import '~filepond-plugin-get-file/dist/filepond-plugin-get-file.min.css';
```

Register the plugin:
```js
FilePond.registerPlugin(FilePondPluginGetFile);
```
Create a new FilePond instance as normal.
```js
const pond = FilePond.create({
    name: 'filepond'
});

// Add it to the DOM
document.body.appendChild(pond.element);
```
 The functionality will become active after uploading a file.

## Configuration

The label of the download icon can be adjusted as follows:
```js
const pond = FilePond.create({
    name: 'filepond',
    labelButtonDownloadItem: 'custom label', // by default 'Download file'
    allowDownloadByUrl: false, // by default downloading by URL disabled
});
```

## Demo
[View the demo](https://nielsboogaard.github.io/filepond-plugin-get-file/)
