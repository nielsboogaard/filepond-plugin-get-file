import { registerDownloadComponent } from './components/download';

/**
 * Download Plugin
 */
const plugin = fpAPI => {

    const { addFilter, utils } = fpAPI;
    const { Type, createRoute } = utils;

    // called for each view that is created right after the 'create' method
    addFilter('CREATE_VIEW', viewAPI => {
        
        // get reference to created view
        const { is, view, query } = viewAPI;

        // only hook up to item view
        if (!is('file')) {
            return;
        }

        // create the get file plugin
        const didLoadItem = ({ root, props }) => {
            const { id } = props;
            const item = query('GET_ITEM', id);

            if (!item || item.archived) {
                return;
            }

            const labelButtonDownload = root.query('GET_LABEL_BUTTON_DOWNLOAD_ITEM');

            const allowDownloadByUrl = root.query('GET_ALLOW_DOWNLOAD_BY_URL');

            registerDownloadComponent(item, root.element, labelButtonDownload, allowDownloadByUrl);
        };

        // start writing
        view.registerWriter(
            createRoute({
                DID_LOAD_ITEM: didLoadItem
            }, ({ root, props }) => {
                const { id } = props;
                const item = query('GET_ITEM', id);

                // don't do anything while hidden
                if (root.rect.element.hidden) return;
            })
        );
    });

    // expose plugin
    return {
        options: {
            labelButtonDownloadItem: ['Download file', Type.STRING],
            allowDownloadByUrl: [false, Type.BOOLEAN],
        }
    };
};

// fire pluginloaded event if running in browser, this allows registering the plugin when using async script tags
const isBrowser = typeof window !== 'undefined' && typeof window.document !== 'undefined';
if (isBrowser) {
    document.dispatchEvent(new CustomEvent('FilePond:pluginloaded', { detail: plugin }));
}

export default plugin;