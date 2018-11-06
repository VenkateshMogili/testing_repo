import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {UserServiceService} from '../user-service.service';
import {PatientprofileService} from '../patientprofile.service';

@Component({
  selector: 'app-single-patient-prescriptions',
  templateUrl: './single-patient-prescriptions.component.html',
  styleUrls: ['./single-patient-prescriptions.component.css']
})
export class SinglePatientPrescriptionsComponent implements OnInit {

  patients: any;
  user: any;
  list: any;
  id: any;
  prescription_list: any;
  p_list: any = [];

  constructor(private userService: UserServiceService, private router: ActivatedRoute, private ps: PatientprofileService) {
  }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    this.router.params.subscribe(params => {
      this.id = params['id'];
    });

    this.get_prescription();
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

  get_prescription() {
    this.ps.prescription_Data
      .subscribe(
        data => {
          console.log(data);
          this.p_list = data['data'];
          console.log(this.p_list[1]['values'][0]['name']);
          console.log('I CANT SEE DATA of Prescription list : ', this.p_list);
        }
      );
  }
}
