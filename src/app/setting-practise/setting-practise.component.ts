import {Component, OnInit} from '@angular/core';
import {UserServiceService} from '../user-service.service';

@Component({
  selector: 'app-setting-practise',
  templateUrl: './setting-practise.component.html',
  styleUrls: ['./setting-practise.component.css']
})
export class SettingPractiseComponent implements OnInit {

  user_p: any;
  user: any;
  value: any;
  hospital_list: any = {};

  constructor(private service: UserServiceService) {
  }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    this.function();
    this.value = 3;
  }

  Range(number) {
    const items: number[] = [];
    for (let i = 0; i <= number - 1; i++) {
      items.push(i);
    }
    return items;
  }

  function () {
    console.log('I am in funbct');

    this.service.hospital_Details(this.user['userinfo'][0]['doctor_id_c']).subscribe(
      data1 => {
        console.log('responce in quesans  --------------');
        // console.log(JSON.stringify(data));
        console.log(data1);
        this.hospital_list = data1['data'];
        console.log(this.user_p);


      });
  }
}
