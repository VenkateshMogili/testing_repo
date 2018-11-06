import {Component, OnInit} from '@angular/core';
import {UserServiceService} from '../user-service.service';

@Component({
  selector: 'app-setting-chart',
  templateUrl: './setting-chart.component.html',
  styleUrls: ['./setting-chart.component.css']
})
export class SettingChartComponent implements OnInit {

  model: any = {};
  headeuser: any;

  constructor(private service: UserServiceService) {
  }

  ngOnInit() {
    console.log('in nginit general');
    this.headeuser = JSON.parse(localStorage.getItem('currentUser'));
    console.log(this.headeuser);
    this.model['name'] = this.headeuser['userinfo'][0]['chart'];

  }


  onsubbmit() {
    console.log('in on subbmit adherence chart ');
    console.log(this.model);
    this.service.updateChart(this.model['name'], this.headeuser['userinfo'][0]['doctor_id_c']).subscribe(
      data1 => {
        if (data1['success']) {
          console.log(data1);
          alert('Details Updated Successfully');
        }
      },
      error => {
        console.log(error);
      });


  }

}
