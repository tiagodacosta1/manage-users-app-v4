import {
  Firestore,
  addDoc,
  collection,
  collectionData,
  doc,
} from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(public readonly firestore: Firestore) {}

  async addUser(user: { name: string; role: string; email: string }) {
    try {
      const usersCollection = collection(this.firestore, 'users'); // 'users' is the name of the Firestore collection
      // Add a new document to the 'users' collection
      const newUserRef = await addDoc(usersCollection, user);

      console.log('User added with ID: ', newUserRef.id);
    } catch (error) {
      console.error('Error adding user: ', error);
    }
  }
}
