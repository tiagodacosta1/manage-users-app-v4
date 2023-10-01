import { Component } from '@angular/core';

import { UsersService } from '../users.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent {
  user = { name: '', role: '', email: '' };
  constructor(private usersService: UsersService) {}
  onSubmit() {
    this.usersService.addUser(this.user); // Call the service's function
    this.user = { name: '', role: '', email: '' };
  }
}
