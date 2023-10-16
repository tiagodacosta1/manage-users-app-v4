import { Component, Inject, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  empForm: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private usersService: UsersService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.empForm = this._fb.group({
      firstName: '',
      lastName: '',
      email: '',
      dob: '',
      role: '',
      balance: '',
    });
  }
  ngOnInit(): void {
    this.empForm.patchValue(this.data);
  }
  onFormSubmit() {
    this.usersService.addUser(this.empForm.value); // Send form data to the service
    this.empForm.reset(); // Reset the form
  }
}
