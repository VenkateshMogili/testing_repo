import {Component, OnInit} from '@angular/core';
import {UserServiceService} from '../user-service.service';

@Component({
  selector: 'app-setting-sms',
  templateUrl: './setting-sms.component.html',
  styleUrls: ['./setting-sms.component.css']
})
export class SettingSmsComponent implements OnInit {
  model: any = {};
  headeuser: any;

  constructor(private service: UserServiceService) {
  }

  ngOnInit() {
    console.log('in nginit general');
    this.headeuser = JSON.parse(localStorage.getItem('currentUser'));
    console.log(this.headeuser);
    this.model.sms_notification = this.headeuser['userinfo'][0]['sms_notification'];
  }

  onsubbmit() {
    console.log('in on sms subbmit button');
    console.log(this.model);
    const data = JSON.stringify(this.model);
    this.service.UpdateDoctorDetails(data, this.headeuser['userinfo'][0]['doctor_id_c']).subscribe(
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
