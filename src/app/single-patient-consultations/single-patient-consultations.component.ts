import {Component, OnInit} from '@angular/core';
import {UserServiceService} from '../user-service.service';
import {ActivatedRoute} from '@angular/router';
import {PatientprofileService} from '../patientprofile.service';

@Component({
  selector: 'app-single-patient-consultations',
  templateUrl: './single-patient-consultations.component.html',
  styleUrls: ['./single-patient-consultations.component.css']
})
export class SinglePatientConsultationsComponent implements OnInit {


  patients: any;
  user: any;
  list: any;
  id: any;
  prescription_list: any;
  p_list: any;

  constructor(private userService: UserServiceService, private router: ActivatedRoute, private ps: PatientprofileService, private patient_profile: PatientprofileService) {
  }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    this.router.params.subscribe(params => {
      this.id = params['id'];
    });
    this.get_listall();
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

  get_listall() {
    this.ps.payment_Data
      .subscribe(
        data => {
          console.log(data);
          this.prescription_list = data['data'];
          console.log('I CANT SEE DATA of Consultations list : ', this.prescription_list);
        }
      );
  }
}
