import {Component, OnInit, ViewChild} from '@angular/core';
import {UserServiceService} from '../user-service.service';
import {HttpErrorResponse} from '@angular/common/http';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {Router} from '@angular/router';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}


@Component({
  selector: 'app-set-availability',
  templateUrl: './set-availability.component.html',
  styleUrls: ['./set-availability.component.css']
})
export class SetAvailabilityComponent implements OnInit {
  @ViewChild(NgForm) f: NgForm;

  errorChecking = new FormControl ('' , [
    Validators.required,
  ]);
  model: any = {Day: '', Time: '', ConsultationType: '', ConsultationFee: '', Venue: '',  Address: ''};
  modelbatch: {} = {
    list: [],
    start_day: '',
    cunsulation_fee: '',
    cunsultation_type: '',
    venue: '',
    adress: '',
    doctor_id_c: ''
  };
  data: string;
  disableSelect: Boolean = false;
  hos_list: [{}] = [{}];
  days: Array<string> = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  times: string[] = ['07:00-08:00', '08:00-09:00', '09:00-10:00', '10:00-11:00', '11:00-12:00', '12:00-13:00', '13:00-14:00', '14:00-15:00',
    '15:00-16:00', '16:00-17:00', '17:00-18:00', '18:00-19:00', '19:00-20:00', '20:00-21:00', '21:00-22:00', '22:00-23:00', '23:00-24:00', '01:00-02:00',
    '02:00-03:00', '03:00-04:00', '04:00-05:00', '05:00-06:00', '06:00-07:00'];
  timesbooked: string[] = ['07:00-08:00', '08:00-09:00', '09:00-10:00', '10:00-11:00', '11:00-12:00', '12:00-13:00', '13:00-14:00', '14:00-15:00',
    '15:00-16:00', '16:00-17:00', '17:00-18:00', '18:00-19:00', '19:00-20:00', '20:00-21:00', '21:00-22:00', '22:00-23:00', '23:00-24:00', '01:00-02:00',
    '02:00-03:00', '03:00-04:00', '04:00-05:00', '05:00-06:00', '06:00-07:00'];
  groupname: string;
  consultations: Array<string> = ['Video Consult', 'Tele Consult', 'Priority Consult', 'Appointment', 'Ask a question'];
  constructor(private userservice: UserServiceService) {
  }

  ngOnInit() {
    this.hos_list = JSON.parse(localStorage.getItem('currentUser'))['hosp_list'];
  }

  setAvailability() {
    for (let obj in this.model) {
      if (this.model[obj] === '' && obj !== 'Address' && obj !==  'Venue') {
        window.alert(obj + ' Required');
        return;
      }
    }
    this.modelbatch['list'] = this.model['Time'];
    this.modelbatch['start_day'] = this.model['Day'];
    this.modelbatch['cunsulation_fee'] = this.model['ConsultationFee'];
    this.modelbatch['cunsultation_type'] = this.model['ConsultationType'];
    this.modelbatch['venue'] = this.model['Venue'];
    this.modelbatch['adress'] = this.model['Address'];
    console.log(this.modelbatch);
    this.modelbatch['doctor_id_c'] = JSON.parse(localStorage.getItem('currentUser'))['userinfo'][0]['doctor_id_c'];
    this.data = JSON.stringify(this.modelbatch);
    this.userservice.setAvailability(this.data).subscribe(
      data => {
        console.log(data);
        if (data['success']) {
          console.log('in true only');
          alert('Availability Details Added Successfully');
          // this.router.navigate(['/dashboard/set-availability']);
          // this.model.resetForm();
          this.reset();
          //  this.model = {Day: '', Time: '', ConsultationType: '', ConsultationFee: '', Venue: '',  Address: ''};
        } else {
          console.log('user does not exists');
        }
      },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log('An error occurred:', err.error.message);
        } else {
          console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
        }
      }
    );
  }
  onDaychange(day) {
    console.log('change day');
    // this.disableSelect = true;
    console.log(JSON.parse(localStorage.getItem('currentUser'))['userinfo'][0]['doctor_id_c']);
    this.userservice.get_charges_availabilty(JSON.parse(localStorage.getItem('currentUser'))['userinfo'][0]['doctor_id_c'], day).subscribe(data => {
        console.log(data['data']);
        const arr: Array<string> = [];
        Array.from(data['data'], x => arr.push(x['slots']));
        console.log('database slots array');
        console.log(arr);
        // not booked slots
        this.times = this.times.filter(value => !arr.includes(value));
        // already booked slots
        this.timesbooked = this.timesbooked.filter(value => arr.includes(value));
        // this.disableSelect = false;
        console.log('booked slots ' + this.timesbooked);
        console.log('not booked slots ' + this.times);
        this.groupname = 'Already Booked Slots';
      }, error2 => console.log(error2)
    );
  }

  public reset() {
    this.f.onReset();
  }
}
