import { Component, Inject, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';

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
    private _dialogRef: MatDialogRef<UserProfileComponent>,
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
    if (this.data) {
      const userId = this.data.id;
      const updatedUserData = this.empForm.value;

      this.usersService
        .updateUser(userId, updatedUserData)
        .then(() => {
          console.log('User updated successfully');
          // Perform any additional actions after the update if needed
        })
        .catch((error) => {
          console.error('Error updating user: ', error);
          // Handle the error if necessary
        });
    } else {
      this.usersService.addUser(this.empForm.value);
      this.empForm.reset();
    }
  }
}
