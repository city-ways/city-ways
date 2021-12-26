import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserIdService {
  execChange: Subject<number> = new Subject<number>();
  constructor() {}

  idUserChange(id: number) {
    this.execChange.next(id);
  }
}
