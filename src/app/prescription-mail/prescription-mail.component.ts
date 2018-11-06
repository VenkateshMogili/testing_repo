import {Component, OnInit} from '@angular/core';
import {UserServiceService} from '../user-service.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-prescription-mail',
  templateUrl: './prescription-mail.component.html',
  styleUrls: ['./prescription-mail.component.css']
})
export class PrescriptionMailComponent implements OnInit {
  prescription: any;
  key: any;

  constructor(private userService: UserServiceService, private router: ActivatedRoute, private myroute: Router) {
  }

  ngOnInit() {
    this.router.params.subscribe(params => {
      this.key = params['key'];
      this.send_prescription_mail(params['key']);
    });
  }


  send_prescription_mail(id) {
    this.userService.prescription_mail(id).subscribe(
      data => {
        this.prescription = data['data'];
        console.log(data['success']);
        console.log('I CANT SEE DATA of hospital_list : ', this.prescription);
      }
    );
  }
}
