import {Injectable} from '@angular/core';
import {Subject, BehaviorSubject} from 'rxjs';

@Injectable()
export class PatientprofileService {

  private hdata: Subject<{}> = new BehaviorSubject<{}>({});
  profile_Data = this.hdata.asObservable();
  private pdata: Subject<{}> = new BehaviorSubject<{}>({});
  prescription_Data = this.pdata.asObservable();
  private paymentdata: Subject<{}> = new BehaviorSubject<{}>({});
  payment_Data = this.paymentdata.asObservable();

  constructor() {
  }

  PaymentNode(data: any) {
    this.paymentdata.next(data);
  }

  addNode(data: any) {
    this.hdata.next(data);
  }

  addPres(data1: any) {
    this.pdata.next(data1);
  }
}
