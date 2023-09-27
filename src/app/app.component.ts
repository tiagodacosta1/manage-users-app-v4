import { Component, OnInit, inject } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public items$: Observable<any[]>;

  constructor(private readonly firestore: Firestore) {}

  public ngOnInit(): void {
    const itemsCollection = collection(this.firestore, 'items');
    this.items$ = collectionData(itemsCollection);
  }
}
