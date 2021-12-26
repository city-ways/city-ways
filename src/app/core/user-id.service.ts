import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
/*
Para no agregar una libreria para implementar el patron Redux (NgRx) usamos BehaviorSubject de rxjs
 */
export class UserIdService {
  private idSource: BehaviorSubject<string> = new BehaviorSubject<string>('');
  // eslint-disable-next-line @typescript-eslint/member-ordering
  id = this.idSource.asObservable();
  constructor() {}
  //todo: cambiar cuando este el sistema de usuarios
  updateId(id: string) {
    this.idSource.next(id);
  }
}
