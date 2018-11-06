import {Component, OnInit} from '@angular/core';
import {UserServiceService} from '../user-service.service';
// import {Http} from '@angular/http';
// import {NgProgress} from 'ngx-progressbar';
import {Http } from '@angular/http';
import { NgProgress } from 'ngx-progressbar';
@Component({
  selector: 'app-prescription-list',
  templateUrl: './prescription-list.component.html',
  styleUrls: ['./prescription-list.component.css']
})
export class PrescriptionListComponent implements OnInit {
  prescription_list: any;
  loading: any;
  posts: any;
  constructor(private userService: UserServiceService, public progressService: NgProgress,
              private http: Http) {
  }

  ngOnInit() {
    this.get_all_prescription_list();
  }


  createRange(number) {
    const items: number[] = [];
    for (let i = 0; i <= number - 1; i++) {
      items.push(i);
    }
    return items;
  }

  Range(number) {
    const items: number[] = [];
    for (let i = 0; i <= number - 1; i++) {
      items.push(i);
    }
    return items;
  }

  get_all_prescription_list() {
    const sampleUrl: any = this.userService.prescription_list(JSON.parse(localStorage.getItem('currentUser'))['userinfo'][0]['doctor_id_c']).subscribe(
      data => {
        this.prescription_list = data['data'];
        // for (let i = 0; i < data['data'].length; i++) {
        //   console.log(i + ' ');
        //   this.loading = true;
        // }
        // this.loading = false;
        console.log('I CAN\'T SEE DATA of prescription_list : ', this.prescription_list);
      }
    );

//    const sampleUrl = 'http://localhost:4200/home';
//        this.progressService.start();
//        setTimeout(() => {
//          this.progressService.set(0.1);
//        }, 1000);
//        setTimeout(() => {
//          this.progressService.inc(0.2);
//        }, 2000);
//        this.http.get(sampleUrl)
//          .subscribe((response) => {
//            this.progressService.done();
//            this.posts = response.json();
//          });
  }
}
