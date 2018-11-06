import {Component, OnInit} from '@angular/core';
import {UserServiceService} from '../user-service.service';
import {BsDatepickerConfig} from 'ngx-bootstrap';
import * as moment from 'moment';

@Component({
  selector: 'app-setting-general',
  templateUrl: './setting-general.component.html',
  styleUrls: ['./setting-general.component.css']
})
export class SettingGeneralComponent implements OnInit {

  model: any = {};
  headeuser: any;
  head: any;
  bsConfig: Partial<BsDatepickerConfig>;
  /*this.bsConfig = Object.assign({}, { containerClass: this.colorTheme });*/
  minDate = /*new Date(2017, 5, 10);*/ new Date();
  constructor(private service: UserServiceService) {

  }

  ngOnInit() {
    console.log('in nginit general');
    this.head = JSON.parse(localStorage.getItem('currentUser'));

    this.service.doctor_general_details(this.head['userinfo'][0]['doctor_id_c']).subscribe(
      data1 => {
        console.log('responce in quesans  --------------');
        // console.log(JSON.stringify(data));
        console.log(data1);
        this.headeuser = data1;
        console.log(this.headeuser);
        this.model['name'] = this.headeuser['data'][0]['name'];
        this.model['lname'] = this.headeuser['data'][0]['lname'];
        this.model['mobile'] = this.headeuser['data'][0]['mobile'];
        this.model['email'] = this.headeuser['data'][0]['email'];
        this.model['dob'] = this.headeuser['data'][0]['dob'];
        this.model['country'] = this.headeuser['data'][0]['country'];
        this.model['state'] = this.headeuser['data'][0]['state'];
        this.model['city'] = this.headeuser['data'][0]['city'];
      });

  }

  onsubbmit() {
    console.log('in on subbmit button');
    console.log(this.model);
    this.model.dob = moment(this.model.dob).format('YYYY-MM-DD');
    const data = JSON.stringify(this.model, this.headeuser);
    this.service.UpdateDoctorDetails(data, this.headeuser['data'][0]['doctor_id_c']).subscribe(
      data1 => {
        if (data1['success']) {
          console.log(data1);
          alert('Details Updates Successfully');
        }
      },
      error => {
        console.log(error);
      });
  }
}
