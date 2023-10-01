import { Component, OnInit, inject } from '@angular/core';
import { Firestore, collection } from 'firebase/firestore';
import { collectionData } from 'rxfire/firestore';
import { Observable } from 'rxjs';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-display-users',
  templateUrl: './display-users.component.html',
  styleUrls: ['./display-users.component.scss'],
})
export class DisplayUsersComponent {
  users$: any[] = [];

  constructor(private usersService: UsersService) {}

  ngOnInit() {
    // Subscribe to the getUsers observable
    this.usersService.getUsers().subscribe((users) => {
      this.users$ = users;
    });
  }
}
