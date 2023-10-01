import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  addDoc,
  collectionData,
  DocumentData,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private userCollection = collection(this.firestore, 'users');
  users$: Observable<any[]>; // Define the users$ observable

  constructor(public readonly firestore: Firestore) {
    // Initialize the users$ observable in the constructor
    this.users$ = collectionData(this.userCollection) as Observable<any[]>;
  }

  async addUser(user: { name: string; role: string; email: string }) {
    try {
      // Add a new document to the 'users' collection
      const newUserRef = await addDoc(this.userCollection, user);
      console.log('User added with ID: ', newUserRef.id);
    } catch (error) {
      console.error('Error adding user: ', error);
    }
  }

  getUsers(): Observable<any[]> {
    return this.users$; // Return the users$ observable
  }
}
