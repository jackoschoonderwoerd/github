import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import {
    addDoc,
    arrayRemove,
    arrayUnion,
    collection,
    collectionData,
    collectionGroup,
    deleteDoc,
    doc,
    docData,
    DocumentData,
    DocumentReference,
    Firestore,
    orderBy,
    query,
    setDoc,
    updateDoc,
    where,
} from '@angular/fire/firestore';

@Injectable({
    providedIn: 'root'
})
export class FirestoreService {

    constructor(
        private firestore: Firestore
    ) { }

    addDoc(path: string, document: object) {

        console.log(path, document)
        const collectionRef = collection(this.firestore, path)
        return addDoc(collectionRef, document)
    }
    getDoc(path) {
        const docRef = doc(this.firestore, path)
        return docData(docRef, { idField: 'id' })
    }
    setDoc(path, document) {
        const docRef = doc(this.firestore, path)
        return setDoc(docRef, document)
    }
    updateDocument(path: string, newValueObject: object) {
        const docRef = doc(this.firestore, path)
        return updateDoc(docRef, newValueObject)
    }
    deleteDoc(path) {
        const docRef = doc(this.firestore, path)
        return deleteDoc(docRef);
    }
    collection(path) {
        const collectionRef = collection(this.firestore, path)
        return collectionData(collectionRef, { idField: 'id' })
    }
    addElementToArray(path, imageUrl) {
        const arrayRef = doc(this.firestore, path)
        return updateDoc(arrayRef, {
            imageUrls: arrayUnion(imageUrl)
        })
    }
    deleteStringFromArray(path: string, imageUrl: string) {
        console.log(path, imageUrl)
        const arrayRef = doc(this.firestore, path)
        return updateDoc(arrayRef, {
            imageUrls: arrayRemove(imageUrl)
        })
    }
}
