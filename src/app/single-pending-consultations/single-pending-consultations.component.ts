import {Component, OnInit} from '@angular/core';
import {UserServiceService} from '../user-service.service';
import {ActivatedRoute, Router} from '@angular/router';
import {RemoveNotification} from '../actions/notification';
import {NewNotification} from '../models/notification';
import {Store} from '@ngrx/store';
import * as fromRoot from '../reducers';


@Component({
  selector: 'app-single-pending-consultations',
  templateUrl: './single-pending-consultations.component.html',
  styleUrls: ['./single-pending-consultations.component.css']
})
export class SinglePendingConsultationsComponent implements OnInit {
  pending_consultations: any;
  type: any;
  id: any;
  model: any = {};
  doc_id: any;

  constructor(private userService: UserServiceService, private router: ActivatedRoute, private route: Router, public store: Store<fromRoot.State>) {
  }

  ngOnInit() {
    this.router.params.subscribe(params => {
      this.type = params['type'];
      this.id = params['id'];
      this.get_pending_consultation(this.type, this.id);
    });

    this.doc_id = JSON.parse(localStorage.getItem('currentUser'))['userinfo'][0]['doctor_id_c'];
  }

  createRange(number) {
    var items: number[] = [];
    for (var i = 0; i <= number - 1; i++) {
      items.push(i);
    }
    return items;
  }

  Range(number) {
    var items: number[] = [];
    for (var i = 0; i <= number - 1; i++) {
      items.push(i);
    }
    return items;
  }

  get_pending_consultation(type, id) {
    this.userService.SingleConsultation(type, id).subscribe(
      data => {
        this.pending_consultations = data['data'];
        console.log('I CANT SEE DATA of consultation_history : ', this.pending_consultations);
      }
    );
  }

  Confirm(confirm, booking_id, patient_id_c, booking_type) {
    console.log('in single consultation confirm');
    console.log(confirm + '-' + booking_id + '-' + patient_id_c + '-' + booking_type);
    this.model.booking_flag = confirm;
    this.model.patient_id_c = patient_id_c;
    this.model.doctor_id_c = JSON.parse(localStorage.getItem('currentUser'))['userinfo'][0]['doctor_id_c'];
    this.model.booking_id = booking_id;
    this.model.booking_type = booking_type;
    this.userService.UpdateConsultation(this.model, booking_id).subscribe(
      data => {
        if (data['success']) {
          this.store.dispatch(new RemoveNotification([new NewNotification('xxx', 'xxx', this.model.booking_id, 'xxx')]));
          alert('Consultation Confirmed successfully');
          console.log('after resopnce came from server ');
          this.route.navigate(['/dashboard/pending/requests/' + this.type + '/' + this.model.doctor_id_c]);
        }
      }
    );
  }

  Reject(confirm, booking_id, patient_id_c, booking_type) {
    console.log('in single consultation reject');
    console.log(confirm + '-' + booking_id + '-' + patient_id_c + '-' + booking_type);
    this.model.booking_flag = confirm;
    this.model.patient_id_c = patient_id_c;
    this.model.doctor_id_c = JSON.parse(localStorage.getItem('currentUser'))['userinfo'][0]['doctor_id_c'];
    this.model.booking_id = booking_id;
    this.model.booking_type = booking_type;
    this.userService.UpdateConsultation(this.model, booking_id).subscribe(
      data => {
        if (data['success']) {
          this.store.dispatch(new RemoveNotification([new NewNotification('xxx', 'xxx', this.model.booking_id, 'xxx')]));
          alert('Consultation Rejected successfully');
          console.log('after resopnce came from server');
          this.route.navigate(['/dashboard/pending/requests/' + this.type + '/' + this.model.doctor_id_c]);
        }
      }
    );
  }

  removeNotification() {
    console.log('in remove notification');
    this.store.dispatch(new RemoveNotification([new NewNotification('xxx', 'xxx', 123, 'xxx')]));
  }
}
