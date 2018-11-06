import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable()
export class CurrentPatientService {

  private messageSource = new BehaviorSubject<any>({});
  currentPatient = this.messageSource.asObservable();
  private tokSource = new BehaviorSubject<any>({});
  tokcurrent = this.tokSource.asObservable();

  constructor() {
  }

  changePatient(tpatient: {}) {
    this.messageSource.next(tpatient);
  }

  changetok(tok: {}) {
    this.tokSource.next(tok);
  }
}
