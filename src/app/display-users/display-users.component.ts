import { OnInit, inject } from '@angular/core';
import { UsersService } from '../users.service';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { UserProfileComponent } from '../user-profile/user-profile.component';

@Component({
  selector: 'app-display-users',
  templateUrl: './display-users.component.html',
  styleUrls: ['./display-users.component.scss'],
})
export class DisplayUsersComponent implements OnInit {
  user: any;
  constructor(private usersService: UsersService) {
    usersService.getUsers().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  displayedColumns: string[] = [
    'id',
    'firstName',
    'lastName',
    'email',
    'dob',
    'role',
    'balance',
    'action',
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  async deleteUser(id: string) {
    try {
      await this.usersService.deleteUser(id);
      console.log('User deleted successfully');
    } catch (error) {
      console.error('Error deleting user: ', error);
    }
  }

  openEditForm(data: any) {
    this.usersService.openEditForm(data);
  }
}
