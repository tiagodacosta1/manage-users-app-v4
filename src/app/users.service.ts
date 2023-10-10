import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  addDoc,
  collectionData,
  query,
  where,
  orderBy,
  doc,
  updateDoc, // Add this import
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
    this.users$ = collectionData(this.userCollection);
  }

  async addUser(user: { name: string; role: string; email: string }) {
    try {
      // Add a new document to the 'users' collection
      const newUserRef = addDoc(this.userCollection, user);
      console.log('User added with ID: ', (await newUserRef).id);
    } catch (error) {
      console.error('Error adding user: ', error);
    }
  }

  getUsers(): Observable<any[]> {
    return this.users$; // Return the users$ observable
  }

  searchUsers(queryText: string): Observable<any[]> {
    // Create a query to filter users by username or role
    const searchQuery = query(
      this.userCollection,
      where('name', '==', queryText),
      orderBy('name'),
      orderBy('role')
    );

    // Return the filtered users as an observable
    return collectionData(searchQuery);
  }

  async updateUser(userId: string, userData: any) {
    try {
      const userDocRef = doc(this.firestore, 'users', userId);
      await updateDoc(userDocRef, userData);
      console.log('User updated with ID: ', userId);
    } catch (error) {
      console.error('Error updating user: ', error);
    }
  }
}
