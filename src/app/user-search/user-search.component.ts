import { Component } from '@angular/core';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-user-search',
  templateUrl: './user-search.component.html',
  styleUrls: ['./user-search.component.scss'],
})
export class UserSearchComponent {
  searchQuery = '';
  searchResults: any[] = [];

  constructor(private userService: UsersService) {}

  searchUsers() {
    if (this.searchQuery.trim() === '') {
      this.searchResults = [];
      return;
    }

    this.userService
      .searchUsers(this.searchQuery)
      .subscribe((results: any[]) => {
        this.searchResults = results;
      });
  }
}
