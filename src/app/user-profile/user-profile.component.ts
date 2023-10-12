import { Component } from '@angular/core';
import { UsersService } from '../users.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent {
  empForm: FormGroup;

  constructor(private _fb: FormBuilder, private usersService: UsersService) {
    this.empForm = this._fb.group({
      firstName: '',
      lastName: '',
      email: '',
      dob: '',
      role: '',
      balance: '',
    });
  }

  onFormSubmit() {
    this.usersService.addUser(this.empForm.value); // Send form data to the service
    this.empForm.reset(); // Reset the form
  }
}
