import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class DataService9 {
  public messageSource = new BehaviorSubject<{}>({});
  currentMessage = this.messageSource.asObservable();
  constructor( ) { }
  public changeMessage(message: {}) {
    this.messageSource.next(message);
    console.log('Sukumar');
  }
}
