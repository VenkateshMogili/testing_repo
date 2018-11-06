import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import {Subject} from 'rxjs/index';

@Injectable()
export class DataService2 {

  public messageSource = new BehaviorSubject<string>('');

  public messageSource2: Subject<{}>  = new BehaviorSubject<{}>({});

  currentMessage = this.messageSource.asObservable();

  currentMessage1 = this.messageSource2.asObservable();

  constructor() { }

  public changeMessage(message: any) {
    this.messageSource.next(message);
  }
  public change2Message(message2: any){
    this.messageSource2.next(message2);
  }

}
