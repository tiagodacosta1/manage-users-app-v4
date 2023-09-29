import { Component } from '@angular/core';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent {
  user = { name: '', role: '', email: '' };

  constructor(private readonly firestore: Firestore) {}

  async addUser(user: { name: string; role: string; email: string }) {
    try {
      const usersCollection = collection(this.firestore, 'users'); // 'users' is the name of the Firestore collection

      // Use addDoc to add a new document to the 'users' collection
      const newUserRef = await addDoc(usersCollection, user);

      console.log('User added with ID: ', newUserRef.id);
    } catch (error) {
      console.error('Error adding user: ', error);
    }
  }

  onSubmit() {
    // Call the addUser method with the user object from the form
    this.addUser(this.user);

    // Optionally, you can reset the form after submission
    this.user = { name: '', role: '', email: '' };
  }
}
