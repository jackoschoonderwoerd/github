
import { Injectable } from '@angular/core';

import {
    Auth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    setPersistence,
    browserSessionPersistence,
    user,
    signOut,
    getAuth,
    onAuthStateChanged,
    User,
    UserCredential,
    GoogleAuthProvider,
    signInWithPopup,
    sendEmailVerification,
    sendPasswordResetEmail
} from '@angular/fire/auth';

import { Router } from '@angular/router';
import { DocumentReference } from '@angular/fire/firestore';
import { FirebaseError } from '@angular/fire/app';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(
        private afAuth: Auth,
        private router: Router
    ) { }

    logIn(email: string, password: string) {
        return signInWithEmailAndPassword(this.afAuth, email, password)
            .then((userCredential: UserCredential) => {
                console.log(userCredential)
                this.router.navigateByUrl('home');
            })
    }
    logOut() {
        signOut(this.afAuth);
    }
}
