import {Component, OnInit} from '@angular/core';
import {UserServiceService} from '../user-service.service';
import {ActivatedRoute} from '@angular/router';
import {PatientprofileService} from '../patientprofile.service';

@Component({
  selector: 'app-patient-contact',
  templateUrl: './patient-contact.component.html',
  styleUrls: ['./patient-contact.component.css']
})
export class PatientContactComponent implements OnInit {


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
    this.get_list();
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

  get_list() {
    this.ps.profile_Data
      .subscribe(
        data => {
          console.log(data);
          this.patients = data['data'];
          console.log('I CANT SEE DATA of Patient list : ', this.patients);
        }
      );
  }

}
