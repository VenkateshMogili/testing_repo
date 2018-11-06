import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {CurrentPatientService} from '../current-patient.service';

@Component({
  selector: 'app-redirect',
  templateUrl: './redirect.component.html',
  styleUrls: ['./redirect.component.css']
})
export class RedirectComponent implements OnInit {
payload: any;
  constructor(private router: Router, private route: ActivatedRoute, private pushPatient: CurrentPatientService) {
    this.route.queryParams.subscribe(params => {
      this.payload = JSON.parse(params['payload']);
      this.pushPatient.changetok(this.payload);
  });
  }
  ngOnInit() {
/*    setTimeout(this.Redir(), 5000000000000);*/
    }
    Redir() {
    /*this.router.navigate(['recepient']);*/
    }

  clickRedir() {
    console.log('redirecting');
    this.router.navigate(['recepient']);
  }
}
