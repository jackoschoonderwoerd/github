import { Injectable } from '@angular/core';
import {
    Storage,
    ref,
    deleteObject,
    listAll,
    uploadBytes,
    uploadString,
    uploadBytesResumable,
    percentage,
    getDownloadURL,
    getMetadata,
    provideStorage,
    getStorage,
    getBytes,
    ListResult,
} from '@angular/fire/storage';

@Injectable({
    providedIn: 'root'
})
export class StorageService {

    constructor(
        private storage: Storage
    ) { }

    storeObject(path: string, file: File) {
        if (path && file) {
            // console.log(path, file)
            const storageRef = ref(this.storage, path);
            return uploadBytesResumable(storageRef, file)
                .then((data: any) => {
                    // console.log(data)
                    return getDownloadURL(storageRef)
                })
                .then((url: string) => {
                    // console.log(url)
                    return url
                })
        } else {
            console.log('can\'t store object due to insufficient data');
        }
    }

    storeBlob(path: string, blob: Blob) {
        if (path && blob) {
            // console.log(path, file)
            const storageRef = ref(this.storage, path);
            return uploadBytesResumable(storageRef, blob)
                .then((data: any) => {
                    // console.log(data)
                    return getDownloadURL(storageRef)
                })
            // .then((url: string) => {
            //     // console.log(url)
            //     return url
            // })
        } else {
            console.log('can\'t store object due to insufficient data');
        }
    }



    deleteObject(path) {
        if (path) {
            const storageRef = ref(this.storage, path)
            return deleteObject(storageRef)
        }
    }
    listAll(path: string) {
        const storageRef = ref(this.storage, path)
        return listAll(storageRef)
    }
}
