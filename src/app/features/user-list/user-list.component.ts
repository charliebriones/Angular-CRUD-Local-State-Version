import { Component, inject } from '@angular/core';
import { UserService } from '../../core/services/user.service';
import { baseImports } from '../../shared/base-imports';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../shared/modal/confirm-dialog/confirm-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'user-list',
  standalone: true,
  imports: [...baseImports],
  styleUrls: ['user-list.component.scss'],
  templateUrl: 'user-list.component.html',
})
export class UserList {
  displayedColumns: string[] = ['id', 'name', 'email', 'username', 'actions'];
  userService = inject(UserService);
  dialog = inject(MatDialog);
  router = inject(Router);

  goToDetail(user: any) {
    this.router.navigate(['detail', user.id]);
  }

  deleteUser(user: any) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: user,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.userService.deleteUser(user.id);
      }
    });
  }
}
