import { Injectable } from '@angular/core';
import { BehaviorSubject, filter, map, Observable } from 'rxjs';
import { User } from '../models/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userSubject = new BehaviorSubject<User[]>([]);
  private users$ = this.userSubject.asObservable();

  constructor() {
    this.userSubject.next([
      {
        id: 1,
        name: 'Alpha Briones',
        username: 'abriones',
        email: 'alphabriones@gmail.com',
      },
      {
        id: 2,
        name: 'Beta Briones',
        username: 'bbriones',
        email: 'betabriones@gmail.com',
      },
      {
        id: 3,
        name: 'Charlie Briones',
        username: 'cbriones',
        email: 'charliebriones@gmail.com',
      },
    ]);
  }

  getUsers() {
    return this.users$;
  }

  getUserById(id: number): Observable<User | undefined> {
    return this.users$.pipe(map((users) => users.find((user) => user.id === id)));
  }

  createUser(user: User) {
    this.userSubject.next([...this.userSubject.value, user]);
  }

  updateUser(user: User) {
    const users = this.userSubject.value;
    const updatedUsers = users.map((u) => {
      return u.id === user.id ? { ...u, ...user } : u;
    });
    this.userSubject.next(updatedUsers);
  }

  deleteUser(id: number) {
    const users = this.userSubject.value;
    const updatedUsers = users.filter((user) => user.id !== id);
    this.userSubject.next(updatedUsers);
  }
}
