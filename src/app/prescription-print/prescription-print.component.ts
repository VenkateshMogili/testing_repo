import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UserServiceService} from '../user-service.service';

@Component({
  selector: 'app-prescription-print',
  templateUrl: './prescription-print.component.html',
  styleUrls: ['./prescription-print.component.css']
})
export class PrescriptionPrintComponent implements OnInit {
  prescription: any;
  hospital_list: any;
  doc_details: any;
  degree_list: any;
  key: any;

  constructor(private userService: UserServiceService, private router: ActivatedRoute, private myroute: Router) {
  }

  ngOnInit() {
    this.doc_details = JSON.parse(localStorage.getItem('currentUser'))['userinfo'];
    this.get_degree(JSON.parse(localStorage.getItem('currentUser'))['userinfo'][0]['doctor_id_c']);
    this.router.params.subscribe(params => {
      this.key = params['key'];
      this.get_single_prescription(params['key']);
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

  get_degree(id) {
    this.userService.Degree_Details(id).subscribe(
      data => {
        this.degree_list = data['data'];
        console.log('I CANT SEE DATA of hospital_list : ', this.degree_list);
      }
    );
  }

  get_single_prescription(key) {
    this.userService.single_prescription(key).subscribe(
      data => {
        this.prescription = data['data'];
        console.log('I CANT SEE DATA of prescription_list : ', this.prescription);
        if (data['data'][0]['doc_hos_id']) {

          this.userService.hospital_single_Details(data['data'][0]['doc_hos_id']).subscribe(
            data1 => {
              this.hospital_list = data1['data'];
              console.log('I CANT SEE DATA of hospital_list : ', this.hospital_list);
            }
          );

        } else {
          this.userService.hospital_Details(JSON.parse(localStorage.getItem('currentUser'))['userinfo'][0]['doctor_id_c']).subscribe(
            data2 => {
              this.hospital_list = data2['data'];
              console.log('I CANT SEE DATA of hospital_list : ', this.hospital_list);
            }
          );
        }
      }
    );
  }

}
