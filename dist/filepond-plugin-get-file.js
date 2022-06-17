/*!
 * FilePondPluginGetFile 1.1.0
 * Licensed under MIT, https://opensource.org/licenses/MIT/
 * Please visit undefined for details.
 */

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined'
    ? (module.exports = factory())
    : typeof define === 'function' && define.amd
    ? define(factory)
    : ((global =
        typeof globalThis !== 'undefined' ? globalThis : global || self),
      (global.FilePondPluginGetFile = factory()));
})(this, function () {
  'use strict';

  /**
   * Register the download component by inserting the download icon
   */
  const registerDownloadComponent = (
    item,
    el,
    labelButtonDownload,
    allowDownloadByUrl
  ) => {
    const info = el.querySelector('.filepond--file-info-main'),
      downloadIcon = getDownloadIcon(labelButtonDownload, item);
    info.prepend(downloadIcon);

    if (!allowDownloadByUrl) {
      downloadIcon.addEventListener('click', (e) => downloadFile(item, e));
    }
  };
  /**
   * Generates the download icon
   */

  const getDownloadIcon = (labelButtonDownload, item) => {
    let icon = document.createElement('a');
    icon.href = item.getMetadata('url') || item.source;
    icon.target = '_blank';
    icon.rel = 'noopener';
    icon.className = 'filepond--download-icon';
    icon.title = labelButtonDownload;
    return icon;
  };
  /**
   * Triggers the actual download of the uploaded file
   */

  const downloadFile = (item, e) => {
    // create a temporary hyperlink to force the browser to download the file
    const a = e.target;
    const url = window.URL.createObjectURL(item.file);
    a.href = url;
    a.download = item.file.name;
    setTimeout(() => {
      window.URL.revokeObjectURL(url);
      a.href = item.getMetadata('url') || item.source;
    }, 10);
  };

  /**
   * Download Plugin
   */

  const plugin = (fpAPI) => {
    const { addFilter, utils } = fpAPI;
    const { Type, createRoute } = utils; // called for each view that is created right after the 'create' method

    addFilter('CREATE_VIEW', (viewAPI) => {
      // get reference to created view
      const { is, view, query } = viewAPI; // only hook up to item view

      if (!is('file')) {
        return;
      } // create the get file plugin

      const didLoadItem = ({ root, props }) => {
        const { id } = props;
        const item = query('GET_ITEM', id);

        if (!item || item.archived) {
          return;
        }

        const labelButtonDownload = root.query(
          'GET_LABEL_BUTTON_DOWNLOAD_ITEM'
        );
        const allowDownloadByUrl = root.query('GET_ALLOW_DOWNLOAD_BY_URL');
        registerDownloadComponent(
          item,
          root.element,
          labelButtonDownload,
          allowDownloadByUrl
        );
      }; // start writing

      view.registerWriter(
        createRoute({
          DID_LOAD_ITEM: didLoadItem,
        })
      );
    }); // expose plugin

    return {
      options: {
        labelButtonDownloadItem: ['Download file', Type.STRING],
        allowDownloadByUrl: [false, Type.BOOLEAN],
      },
    };
  }; // fire pluginloaded event if running in browser, this allows registering the plugin when using async script tags

  const isBrowser =
    typeof window !== 'undefined' && typeof window.document !== 'undefined';

  if (isBrowser) {
    document.dispatchEvent(
      new CustomEvent('FilePond:pluginloaded', {
        detail: plugin,
      })
    );
  }

  return plugin;
});
