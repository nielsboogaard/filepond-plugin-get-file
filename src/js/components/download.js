/**
 * Register the download component by inserting the download icon
 */
export const registerDownloadComponent = (item, el, labelButtonDownload, allowDownloadByUrl) => {
    const info = el.querySelector('.filepond--file-info-main'),
          downloadIcon = getDownloadIcon(labelButtonDownload, item);

    info.prepend(downloadIcon);
    if (!allowDownloadByUrl) {
        downloadIcon.addEventListener("click", (e) => downloadFile(item, e));
    }
}

/**
 * Generates the download icon
 */
export const getDownloadIcon = (labelButtonDownload, item) => {
    let icon = document.createElement('a');
    icon.href = item.getMetadata('url') || item.source;
    icon.target = '_blank';
    icon.rel = 'noopener';
    icon.className = 'filepond--download-icon';
    icon.title = labelButtonDownload;
    return icon;
}

/**
 * Triggers the actual download of the uploaded file
 */
export const downloadFile = (item, e) => {
    // create a temporary hyperlink to force the browser to download the file
    const a = e.target;
    const url = window.URL.createObjectURL(item.file);
    a.href = url;
    a.download = item.file.name;

    setTimeout(() => {
        window.URL.revokeObjectURL(url);
        a.href = item.getMetadata('url') || item.source;
    }, 10);
}
