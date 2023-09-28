import { Component, OnInit, inject } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { UserProfileComponent } from './user-profile/user-profile.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title(title: any) {
    throw new Error('Method not implemented.');
  }
  public items$: Observable<any[]>;

  constructor(private readonly firestore: Firestore) {}

  public ngOnInit(): void {
    const itemsCollection = collection(this.firestore, 'items');
    this.items$ = collectionData(itemsCollection);
  }
}
