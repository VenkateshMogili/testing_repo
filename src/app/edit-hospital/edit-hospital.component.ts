import {Component, OnInit} from '@angular/core';
import {UserServiceService} from '../user-service.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-edit-hospital',
  templateUrl: './edit-hospital.component.html',
  styleUrls: ['./edit-hospital.component.css']
})
export class EditHospitalComponent implements OnInit {

  model: any = {};
  doctor_hospital_list_id: any;

  constructor(private router: Router, private userService: UserServiceService, public route: ActivatedRoute) {
  }

  hospital() {
    this.userService.hospital_single_Details(this.doctor_hospital_list_id).subscribe(
      data => {
        console.log(data);
        // this.model = data['data'][0];
        this.model.clinic_name = data['data'][0]['cn'];
        this.model.hospital_city = data['data'][0]['hc'];
        this.model.address2 = data['data'][0]['address'];
        this.model.clinic_city = data['data'][0]['cc'];
        this.model.clinic_state = data['data'][0]['cs'];
        this.model.pin = data['data'][0]['cpn'];
        this.model.clinic_ph = data['data'][0]['cp'];
        this.model.hospital_city_c = data['data'][0]['hcc'];
        console.log('I CAN SEE DATA of hospital_list : ', this.model);
      });
  }

  update() {
    console.log('in on subbmit button');
    console.log(this.model);

    const finalJson = JSON.stringify(this.model);
    this.userService.update_hospital(finalJson, this.doctor_hospital_list_id).subscribe(
      data => {
        console.log(data);
        if (data['success']) {
          console.log(data);
          alert('Hospital Details Updated Successfully');
        }
      },
      error => {
        console.log(error);
      });

  }


  ngOnInit() {
    this.doctor_hospital_list_id = this.route.snapshot.params['id'];
    console.log(this.doctor_hospital_list_id);
    this.hospital();
  }
}
