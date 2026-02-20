import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../core/services/user.service';
import { User } from '../../core/models/user.interface';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { baseImports } from '../../shared/base-imports';

@Component({
  selector: 'user-edit',
  imports: [CommonModule, ReactiveFormsModule, RouterLink, ...baseImports],
  styleUrls: ['user-edit.component.scss'],
  templateUrl: 'user-edit.component.html',
})
export class UserEdit {
  userService = inject(UserService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  id = this.route.snapshot.paramMap.get('id');

  userFormGroup = new FormGroup({
    id: new FormControl<number | null>(null),
    name: new FormControl<string>('', [Validators.required]),
    username: new FormControl<string>('', [Validators.required]),
    email: new FormControl<string>('', [Validators.required, Validators.email]),
  });

  get name() {
    return this.userFormGroup.get('name');
  }

  get username() {
    return this.userFormGroup.get('username');
  }

  get email() {
    return this.userFormGroup.get('email');
  }

  constructor() {
    const id = this.id;
    if (id) {
      this.userService.getUserById(+id).subscribe((user) => {
        if (!user) {
          console.log('User not found');
          return;
        }

        this.userFormGroup.patchValue(user);
      });
    }
  }

  createUser() {
    const newUser = this.userFormGroup.value;

    const user: User = {
      id: newUser.id ?? new Date().getTime(),
      name: newUser.name!,
      email: newUser.email!,
      username: newUser.username!,
    };

    if (this.userFormGroup.valid) {
      if (!this.id) {
        this.userService.createUser(user);
      } else {
        this.userService.updateUser(user);
      }
      this.router.navigate(['/users']);
    } else {
      this.userFormGroup.markAllAsTouched();
    }
  }
}
