import { Component, OnInit } from '@angular/core';
import {UserServiceService} from '../user-service.service';
import {ActivatedRoute, Router} from '@angular/router';
import {async} from 'rxjs/scheduler/async';

@Component({
  selector: 'app-prescription-adherence',
  templateUrl: './prescription-adherence.component.html',
  styleUrls: ['./prescription-adherence.component.css']
})
export class PrescriptionAdherenceComponent implements OnInit {

  v: any;
  prescription: any;
  hospital_list: any;
  doc_details: any;
  degree_list: any;
  list: any[] = [];
  key: any;
  have_taken: any;
  not_taken: any;
  no_response: any;
  i: number;
  ht: any[] = [];
  nt: any[] = [];
  nr: any[] = [];
  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels: string[] = [];
  public barChartType: string = 'bar';
  public barChartLegend: boolean = true;

  public barChartData: any[] = [];
  constructor(private userService: UserServiceService, private router: ActivatedRoute, private myroute: Router) {
    /*this.router.params.subscribe(params => {
      this.key = params['key'];
      this.get_single_prescription_adherence(params['key']);
    });*/
  }

  ngOnInit() {
    this.i = 0;
    this.v = false;
    this.doc_details = JSON.parse(localStorage.getItem('currentUser'))['userinfo'];
    this.router.params.subscribe(params => {
      this.key = params['key'];
      this.get_single_prescription_adherence(params['key']);
    });
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

  get_single_prescription_adherence(key) {
    this.userService.single_prescription_adherence(key).subscribe(
      data => {
        this.prescription = data['data'];
        console.log('I CANT SEE DATA of prescription_list : ', this.prescription);
        for (var i = 0; i < this.prescription.length; i++) {
          this.list.push(this.prescription[i]);
        }
        for (var j = 0; j < this.list.length; j++) {
          for (var k = 0; k < this.list[j].length; k++) {
            console.log(this.list[j][k]['key']);
            if (this.list[j][k]['key'] === 'no responce') {
              this.no_response = (this.list[j][k]['values'].length);
              this.nr.push(this.no_response);
            } /*else {this.no_response = 0; this.nr.push(this.no_response); }*/
            if (this.list[j][k]['key'] === 'have taken') {
              this.have_taken = (this.list[j][k]['values'].length);
              this.ht.push(this.have_taken);
            } /*else {this.have_taken = 0; this.ht.push(this.have_taken); }*/

            if (this.list[j][k]['key'] === 'not taken') {
              this.not_taken = (this.list[j][k]['values'].length);
              this.nt.push(this.not_taken);
            } /*else {
              this.not_taken = 0;
              this.ht.push(this.have_taken);
            }*/
          }
          // if (this.list[j].length >= 2) {
          /*console.log('yes');
        if (this.list[j][0]['values']) {
          this.have_taken = (this.list[j][0]['values'].length);
          this.ht.push(this.have_taken);
        } else {this.have_taken = 0; this.ht.push(this.have_taken); }*/
          /*} else {
            console.log('NO');
          }
          if (this.list[j].length >= 2) {*/
          /*if (this.list[j][1]['values']) {
            this.not_taken = (this.list[j][1]['values'].length);
            this.nt.push(this.not_taken);
          } else {
            this.not_taken = 0;
            this.ht.push(this.have_taken);
          }*/
          /*} else {
            console.log('NO');
          }*/
          this.barChartLabels.push(this.list[j][0]['values'][0]['name']);

          /*this.barChartData.push(
            {data: [this.have_taken], label: 'Have Taken'},
            {data: [this.not_taken], label: 'Not Taken'}
          );*/
        }
        console.log(this.barChartLabels);
        this.barChartData.push(
          {data: this.ht, label: 'Have Taken'},
          {data: this.nt, label: 'Not Taken'},
          {data: this.nr, label: 'No Response'},
        );
        /* this.barChartData.push(
           {data: this.nt, label: 'Not Taken'}
         );*/

        console.log(this.barChartData);
        this.v = true;
      }
    );
  }

// events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e:any):void {
    console.log(e);
  }

  /* public randomize():void {
    // Only Change 3 values
    let data = [
      Math.round(Math.random() * 100),
      59,
      80,
      (Math.random() * 100),
      56,
      (Math.random() * 100),
      40];
    let clone = JSON.parse(JSON.stringify(this.barChartData));
    clone[0].data = data;
    this.barChartData = clone;

  }
*/
}
