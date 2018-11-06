import {Component, OnInit} from '@angular/core';
import {UserServiceService} from '../user-service.service';

@Component({
  selector: 'app-setting-account',
  templateUrl: './setting-account.component.html',
  styleUrls: ['./setting-account.component.css']
})
export class SettingAccountComponent implements OnInit {
  headeuser: any;

  constructor(private service: UserServiceService) {
  }

  ngOnInit() {
    this.headeuser = JSON.parse(localStorage.getItem('currentUser'));
  }

  onsubbmit() {
    console.log('in on acoout subbmit button');
    const data = JSON.stringify({account_status: 'deactivate'});
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
