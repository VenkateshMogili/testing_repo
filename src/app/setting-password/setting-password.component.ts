import {Component, OnInit} from '@angular/core';
import {UserServiceService} from '../user-service.service';

@Component({
  selector: 'app-setting-password',
  templateUrl: './setting-password.component.html',
  styleUrls: ['./setting-password.component.css']
})
export class SettingPasswordComponent implements OnInit {

  model: any = {};
  headeuser: any;
  showmsg = false;

  constructor(private service: UserServiceService) {

  }

  ngOnInit() {
    console.log('in nginit general');
    this.headeuser = JSON.parse(localStorage.getItem('currentUser'));
    console.log(this.headeuser);
    this.model['password'] = this.headeuser['userinfo'][0]['password'];

  }

  onsubbmit() {
    console.log('in on subbmit button');
    console.log(this.model);
    if (this.showmsg) {
      this.showmsg = true;
      return;
    } else {
      this.model['password'] = this.model['newpassword'];
      if (this.model['newpassword'] === this.model['repassword']) {
      delete this.model['newpassword'];
      delete this.model['repassword'];
      console.log('after removing newpassword');
      console.log(this.model);
      this.service.updatePasswords(JSON.stringify(this.model), this.headeuser['userinfo'][0]['doctor_id_c']).subscribe(
        data => {
          console.log(data);
          if (data['success']) {
            console.log(data);
            alert('Password Updated Successfully');
          }
        },
        error => {
          console.log(error);
        });
      } else {
        alert('New Password and Re-Enter password must be same');
      }
    }
  }

}
