// @ts-ignore
import { FilePondOptions } from "filepond";

declare module "filepond" {
    export interface FilePondOptions {
        labelButtonDownloadItem?: string,
        allowDownloadByUrl?: boolean,
    }
}