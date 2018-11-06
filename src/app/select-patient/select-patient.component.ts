import {Component, OnInit} from '@angular/core';
import {CurrentPatientService} from '../current-patient.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-select-patient',
  templateUrl: './select-patient.component.html',
  styleUrls: ['./select-patient.component.css']
})
export class SelectPatientComponent implements OnInit {

  patient: {} = {};
  Button_config = {select_patient: true, details: false};

  constructor(private pushPatient: CurrentPatientService, private route: ActivatedRoute, private router: Router) {
  }

  receiveMessage(tpatient: {}) {
    console.log('patient changed and selected');
    console.log(tpatient);
    this.patient = tpatient;
    this.newPatient();
    this.showcpatient();
  }

  ngOnInit() {
  }

  newPatient() {
    this.pushPatient.changePatient(this.patient);
  }

  showcpatient() {
    console.log('in show patient');
    this.pushPatient.currentPatient.subscribe(message => /*this.message = message*/ console.log(message));
    this.router.navigate(['dashboard']);

  }
}
