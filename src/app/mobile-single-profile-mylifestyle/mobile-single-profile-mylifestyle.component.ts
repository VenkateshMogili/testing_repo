import { Component, OnInit } from '@angular/core';
import {UserServiceService} from '../user-service.service';
import {ActivatedRoute} from '@angular/router';
import {PatientprofileService} from '../patientprofile.service';

@Component({
  selector: 'app-mobile-single-profile-mylifestyle',
  templateUrl: './mobile-single-profile-mylifestyle.component.html',
  styleUrls: ['./mobile-single-profile-mylifestyle.component.css']
})
export class MobileSingleProfileMylifestyleComponent implements OnInit {
  patients: any;
  user: any;
  list: any;
  id: any;
  prescription_list: any;
  p_list: any;
  constructor(private userService: UserServiceService, private router: ActivatedRoute, private ps: PatientprofileService,
              private patient_profile: PatientprofileService) {
  }

  ngOnInit() {
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
          this.list = data;
          console.log('I CANT SEE DATA of Patient list : ', this.patients);
        }
      );
  }
}
