import {Component, OnInit} from '@angular/core';
import {UserServiceService} from '../user-service.service';

@Component({
  selector: 'app-setting-email',
  templateUrl: './setting-email.component.html',
  styleUrls: ['./setting-email.component.css']
})
export class SettingEmailComponent implements OnInit {

  model: any = {};
  headeuser: any;

  constructor(private service: UserServiceService) {

  }

  ngOnInit() {
    console.log('in nginit general');
    this.headeuser = JSON.parse(localStorage.getItem('currentUser'));
    console.log(this.headeuser);
    this.model['email_notification'] = this.headeuser['userinfo'][0]['email_notification'];
  }

  onsubbmit() {
    console.log('in on email subbmit button');
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
