import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { User } from '../../models/user.model';
import { Observable } from 'rxjs';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit {
  users$!: Observable<User[]>;
  filteredUsers: User[] = [];
  searchTerm = '';
  statusFilter = '';
  showEditModal = false;
  editingUser: any = {};

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.users$ = this.userService.getUsers();
    this.users$.subscribe(users => {
      this.filteredUsers = users;
    });
  }

  filterUsers(): void {
    this.users$.subscribe(users => {
      let filtered = users;

      if (this.searchTerm) {
        filtered = filtered.filter(user =>
          user.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          user.email.toLowerCase().includes(this.searchTerm.toLowerCase())
        );
      }

      this.filteredUsers = filtered;
    });
  }

  editUser(user: User): void {
    this.editingUser = { ...user };
    this.showEditModal = true;
  }

   deleteUser(user: User): void {
    this.userService.deleteUser(user.id).subscribe(() => {
      this.filterUsers();
    });
  }

  closeEditModal(): void {
    this.showEditModal = false;
    this.editingUser = {};
  }

  saveUser(): void {
    this.userService.updateUser(this.editingUser).subscribe(() => {
      this.closeEditModal();
      this.filterUsers();
    });
  }
}