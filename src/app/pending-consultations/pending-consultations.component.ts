import {Component, OnInit} from '@angular/core';
import {UserServiceService} from '../user-service.service';
import {ActivatedRoute, Router} from '@angular/router';
import {CapitalizePipe} from '../capitalize.pipe';
import {NewNotification} from "../models/notification";
import {RemoveNotification} from "../actions/notification";
import {Store} from '@ngrx/store';
import * as fromRoot from '../reducers';

@Component({
  selector: 'app-pending-consultations',
  templateUrl: './pending-consultations.component.html',
  styleUrls: ['./pending-consultations.component.css']
})
export class PendingConsultationsComponent implements OnInit {
  pending_consultations: any;
  type: any;
  id: any;
  model: any = {};

  constructor(private userService: UserServiceService, private router: ActivatedRoute, private route: Router, public store: Store<fromRoot.State>) {
  }

  ngOnInit() {
    this.router.params.subscribe(params => {
      this.type = params['type'];
      this.id = params['id'];
      this.get_pending_consultation(this.type, this.id);
    });
  }

  createRange(number) {
    const items: number[] = [];
    for (let i = 0; i <= number - 1; i++) {
      items.push(i);
    }
    return items;
  }

  Range(number) {
    const items: number[] = [];
    for (let i = 0; i <= number - 1; i++) {
      items.push(i);
    }
    return items;
  }

  get_pending_consultation(type, id) {
    console.log('in getting doctor pending consultation');
    this.userService.PendingConsultation(type, id).subscribe(
      data => {
        this.pending_consultations = data['data'];
        console.log('I CANT SEE DATA of consultation_history : ', this.pending_consultations);
        console.log('length' + this.pending_consultations.length);
      }
    );
  }

  Confirm(confirm, booking_id, patient_id_c, booking_type) {
    console.log('in confirm request');
    console.log(confirm + '-' + booking_id + '-' + patient_id_c + '-' + booking_type);
    this.model.booking_flag = confirm;
    this.model.patient_id_c = patient_id_c;
    this.model.doctor_id_c = JSON.parse(localStorage.getItem('currentUser'))['userinfo'][0]['doctor_id_c'];
    this.model.booking_id = booking_id;
    this.model.booking_type = booking_type;
    this.userService.UpdateConsultation(this.model, booking_id).subscribe(
      data => {
        console.log(data['data']);
        if (data['success']) {
          console.log('booking id' + this.model.booking_id);
          this.store.dispatch(new RemoveNotification([new NewNotification('xxx', 'xxx', this.model.booking_id, 'xxx')]));
         // alert('Consultation Confirmed successfully');
          console.log('success');
          this.route.navigate(['/dashboard']);
        }
      }
    );
  }

  Reject(confirm, booking_id, patient_id_c, booking_type) {
    console.log('in reject request');
    console.log(confirm + '-' + booking_id + '-' + patient_id_c + '-' + booking_type);
    this.model.booking_flag = confirm;
    this.model.patient_id_c = patient_id_c;
    this.model.doctor_id_c = JSON.parse(localStorage.getItem('currentUser'))['userinfo'][0]['doctor_id_c'];
    this.model.booking_id = booking_id;
    this.model.booking_type = booking_type;
    this.userService.UpdateConsultation(this.model, booking_id).subscribe(
      data => {
        // console.log(data['data']);
        if (data['success']) {
          this.store.dispatch(new RemoveNotification([new NewNotification('xxx', 'xxx', this.model.booking_id, 'xxx')]));
          alert('Consultation Rejected successfully');
          console.log('success');
          this.route.navigate(['/dashboard']);
        }
        //  this.pending_consultations = data['data'];
        //  console.log('I CANT SEE DATA of consultation_history : ', this.pending_consultations);
      }
    );
  }

}
