/**
 * Register the download component by inserting the download icon
 */
export const registerDownloadComponent = (item, el, labelButtonDownload, allowDownloadByUrl, downloadFunction) => {
    const info = el.querySelector('.filepond--file-info'),
        mainInfo = el.querySelector('.filepond--file-info-main'),
        downloadIcon = getDownloadIcon(labelButtonDownload);

    let container = el.querySelector('.filepond--file-info-main-container')
    if (!container) {
      container = document.createElement('div');
      container.className = 'filepond--file-info-main-container'
      container.append(mainInfo);
      info.prepend(container);
    }

    container.prepend(downloadIcon);
    downloadIcon.addEventListener("click", () => downloadFile(item, allowDownloadByUrl, downloadFunction));
}

/**
 * Generates the download icon
 */
export const getDownloadIcon = (labelButtonDownload) => {
    let icon = document.createElement('span');
    icon.className = 'filepond--download-icon';
    icon.title = labelButtonDownload;
    return icon;
}

/**
 * Triggers the actual download of the uploaded file
 */
export const downloadFile = (item, allowDownloadByUrl, downloadFunction) => {
    if (downloadFunction && typeof downloadFunction === 'function') {
      downloadFunction(item);
      return;
    }
    // if client want to download file from remote server
    if(allowDownloadByUrl && item.getMetadata('url')) {
        location.href = item.getMetadata('url'); // full path to remote server is stored in metadata with key 'url'
      } else {
        // create a temporary hyperlink to force the browser to download the file
        const a = document.createElement("a");
        const url = window.URL.createObjectURL(item.file);
        document.body.appendChild(a);
        a.style.display = 'none';
        a.href = url;
        a.download = item.file.name;
        a.click();

        window.URL.revokeObjectURL(url);
        a.remove();
    }
}
