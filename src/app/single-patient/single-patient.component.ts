import {Component, OnInit} from '@angular/core';
import {UserServiceService} from '../user-service.service';
import {ActivatedRoute} from '@angular/router';
import {PatientprofileService} from '../patientprofile.service';

@Component({
  selector: 'app-single-patient',
  templateUrl: './single-patient.component.html',
  styleUrls: ['./single-patient.component.css']
})
export class SinglePatientComponent implements OnInit {
  patients: any;
  user: any;
  list: any;
  id: any;
  prescription_list: any;
  p_list: any;
  v: any;
  t: any;
  p: any;
  a: any;
  constructor(private userService: UserServiceService, private router: ActivatedRoute, private patient_profile: PatientprofileService) {
  }

  ngOnInit() {
    this.v = 0;
    this.t = 0;
    this.a = 0;
    this.p = 0;
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    this.router.params.subscribe(params => {
      this.id = params['id'];
    });
    this.get_list();
    this.get_patient();
    this.get_patient_prescriptions();
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

  get_patient() {
    this.userService.get_patient(this.id)
      .subscribe(
        data => {
          this.patient_profile.addNode(data);
          this.patients = data['data'];
          console.log(this.patients[0]['age']);
          this.list = data;
          console.log('I CANT SEE DATA of Patient Details : ', this.patients);
        }
      );
  }

  get_list() {
    this.userService.get_list(this.id, JSON.parse(localStorage.getItem('currentUser'))['userinfo'][0]['doctor_id_c'])
      .subscribe(
        data => {
          for (var k=0; k< data['data'].length; k++) {
            if (data['data'][k]['booking_type'] === 'video') {
              this.v++;
            }
            if (data['data'][k]['booking_type'] === 'tele') {
              this.t++;
            }
            if (data['data'][k]['booking_type'] === 'priority') {
              this.p++;
            }
            if (data['data'][k]['booking_type'] === 'appoinment') {
              this.a++;
            }
          }
          this.patient_profile.PaymentNode(data);
          // this.prescription_list = data['data'];
          // console.log('I CANT SEE DATA of Appoinrment List : ', this.prescription_list);
        }
      );
  }

  get_patient_prescriptions() {
    this.userService.patient_prescriptions(this.id)
      .subscribe(
        data => {

          this.patient_profile.addPres(data);
          // console.log('I CANT SEE DATA of Prescription list : ', this.p_list);
        }
      );
  }

}
