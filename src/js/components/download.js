/**
 * Register the download component by inserting the download icon
 */
export const registerDownloadComponent = (item, el, labelButtonDownload, allowDownloadByUrl) => {
    const info = el.querySelector('.filepond--file-info-main'),
          downloadIcon = getDownloadIcon(labelButtonDownload),
          filenameElement = getFilenameElement(item);

    info.replaceChildren(downloadIcon, filenameElement);
    downloadIcon.addEventListener("click", () => downloadFile(item, allowDownloadByUrl));
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
 * Generates the filename element
 */

const getFilenameElement = (item) => {
  const element = document.createElement('span');
  const filename = item.getMetadata('filename') ? item.getMetadata('filename') : item.filename
  element.className = 'filepond--file-name';

  element.title = filename;
  element.innerHTML = filename;
  return element;
};

/**
 * Triggers the actual download of the uploaded file
 */
export const downloadFile = (item, allowDownloadByUrl) => {
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