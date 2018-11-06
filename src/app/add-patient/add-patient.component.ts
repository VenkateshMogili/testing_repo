import {Component, OnInit, Inject, ViewChild } from '@angular/core';
import {Router} from '@angular/router';
import {UserServiceService} from '../user-service.service';
import {AlertServiceService} from '../alert-service.service';
import {Fileup} from '../fileup';
import * as firebase from 'firebase';
import {DataService} from '../data.service';
import {Observable} from 'rxjs/Observable';
import {ToastyConfig, ToastyService} from 'ng2-toasty';
import {AccountKit, AuthResponse} from 'ng2-account-kit';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import * as moment from 'moment';
import {DataService2 as AddressService} from './DataService2';

/*import {BookingNotificationAppState} from '../BookingNotificationAppState';*/

/*import {select, Store} from '@ngrx/store';
import {DECREMENT, INCREMENT, RESET} from '../NotificationManager';*/


/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-add-patient',
  templateUrl: './add-patient.component.html',
  styleUrls: ['./add-patient.component.css']
})

export class AddPatientComponent implements OnInit {
  // firstName = new FormControl('', [
  //   Validators.required
  // ]);
  // lastName = new FormControl('', [
  //   Validators.required
  // ]);
  // emailFormControl = new FormControl('', [
  //   Validators.required,
  //   Validators.email
  // ]);
  // countryCode = new FormControl('', [
  //   Validators.required
  // ]);
  // mobileNumber = new FormControl('', [
  //   Validators.required
  // ]);
  // gender = new FormControl('', [
  //   Validators.required
  // ]);
  dateOfBirth = new FormControl('', [
    Validators.required
  ]);
  medicalHistory = new FormControl('', [
    Validators.required
  ]);
  @ViewChild(NgForm) f: NgForm;
  // paddress = new FormControl('', [
  //   Validators.required
  // ]);
  // paddress_1 = new FormControl('', [
  //   Validators.required
  // ]);
  // country = new FormControl('', [
  //   Validators.required
  // ]);
  // state = new FormControl('', [
  //   Validators.required
  // ]);
  // city = new FormControl('', [
  //   Validators.required
  // ]);
  // pincode = new FormControl('', [
  //   Validators.required
  // ]);
  // address = new FormControl('', [
  //   Validators.required
  // ]);
  // hospitalAddress = new FormControl('',  [
  //   Validators.required
  // ]);

  matcher = new MyErrorStateMatcher();

  count$: Observable<number>;
  // @ViewChild('openModal') openModal: ElementRef;
  //  @ViewChild('openModal1') openModal1: ElementRef;

  model: any = {};
  patient_model: any = {};
  uploadedfile = 'https://storage.googleapis.com/web-assets/images/doctor_icon.png';
  submitted = false;
  selectedFiles: FileList;
  currentFileUpload: Fileup;
  progress: { percentage: string } = {percentage: 'fg'};
  all_countries: any;
  selectedCountry: any;
  selectedstate: any;
  all_states: any;
  all_cities: any;
  selectedcity: any;
  hospital_list: any;
  countrycode: any;
  hos_id: any;
  post: any;
  doc_hospital_id: number;
  hospitalid: any;
  selected: any;
  mobile_number: number;
  DOBTotal: any;
  med_history: any;
  paddress: any;
  paddress1: any;
  had: any;
  country_id: number;
  country_name: string;
  state_id: number;
  state_name: string;
  city_id: number;
  city_name: string;
  today: any = new Date();
  presentdate: any;

  constructor(private ADService: AddressService, public dialog: MatDialog, private router: Router, private userService: UserServiceService, private alertService: AlertServiceService, private dataService: DataService/*, private store: Store<BookingNotificationAppState>*/, private toastyService: ToastyService, private toastyConfig: ToastyConfig) {
    this.toastyConfig.theme = 'bootstrap';
    this.toastyConfig.position = 'top-right';
    /* this.count$ = store.pipe(select('count'));*/
  }

  ngOnInit() {
    AccountKit.init({
     appId: '1066226316760891',
     state: 'awse#456tfg',
     version: 'v1.1'
     });
    const dialogRef = this.dialog.open(ChangeHospitalComponent, {
      width: '420px',
      height: '700px',
      data: {}
    });

    const user = JSON.parse(localStorage.getItem('currentUser')).success;
    console.log(user);
    this.post = true;
    // this.patient_model.state;
    // this.patient_model.city;
    // this.patient_model.country;
    this.ADService.currentMessage.subscribe(message => this.patient_model.doc_hospital_id = message);

    // this.add_patient();
    // this.openModal.nativeElement.click();
    this.get_countries();
    this.hospital_details_fun();

  }
  function (value) {
    console.log(value);
    this.countrycode = value;
    console.log('I am in function');
    console.log(this.countrycode);
  }

  phone_btn_onclick(){
    console.log('Phone');
    console.log(this.countrycode);
    console.log(this.patient_model.mobile_number);
    /*AccountKit.init({
      appId: '1066226316760891',
      state: 'awse#456tfg',
      version: 'v1.1'
    });*/
    AccountKit.login('PHONE', {countryCode: this.countrycode, phoneNumber: this.patient_model.mobile_number}).then(
      (response: AuthResponse) => console.log(response),
      (error: any) => console.error(error)
    );
  }

  hospital_details_fun() {
    this.userService.hospital_Details(JSON.parse(localStorage.getItem('currentUser'))['userinfo'][0]['doctor_id_c']).subscribe(
      data => {
        this.hospital_list = data['data'];
        console.log('I CANT SEE DATA of hospital_list : ', this.hospital_list);
      }
    );
  }

  // Range(number) {
  //   const items: number[] = [];
  //   for (let i = 0; i <= number - 1; i++) {
  //     items.push(i);
  //   }
  //   return items;
  // }

  // choose_hospital() {
  //   this.openModal1.nativeElement.click();
  // }

  selectFile(event) {
    let snap;
    this.selectedFiles = event.target.files;
    const file = this.selectedFiles.item(0);
    this.currentFileUpload = new Fileup(file);
    this.dataService.pushFileToStorage(this.currentFileUpload, this.progress).on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) => {
        // in progress
        snap = snapshot as firebase.storage.UploadTaskSnapshot;
      },
      (error) => {
        // fail
        console.log(error);
      },
      () => {
        // success
        console.log('in complete url' + snap.downloadURL);
        this.uploadedfile = snap.downloadURL;

      });
  }

  // add_hospital() {
  //   this.model.doctor_id_c = JSON.parse(localStorage.getItem('currentUser'))['userinfo'][0]['doctor_id_c'];
  //   this.userService.Add_hospital_details(this.model)
  //     .subscribe(
  //       data => {
  //         console.log('success');
  //         if (data['success']) {
  //           alert('Details are Saved');
  //           this.post = true;
  //           /* this.router.navigate(['/dashboard/patient-list']);*/
  //           this.router.navigate(['/dashboard/add-patient']);
  //         }
  //       },
  //       error => {
  //         console.log(error);
  //       });
  // }
//
//   hospital_id(id) {
//     console.log(id);
//     this.hos_id = id;
// this.patient_model.doc_hospital_id = cn + ' ' + hc + ' ' + cs + ' ' + hcc;
// console.log(this.patient_model.doc_hospital_id);
//   }

  // click_to_change() {
  //   this.openModal.nativeElement.click();
  // }

  openDialog(): void {
    const dialogRef = this.dialog.open(ChangeHospitalComponent, {
      width: '420px',
      height: '700px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  get_countries() {
    console.log('get countries');
    this.userService.getAllCountries().subscribe(
      data => {
        this.all_countries = data['countries'];
        console.log('I CANT SEE DATA HERE getAllCountries : ', this.all_countries);
      }
    );
  }

  onChange(countryId: number) {
    console.log(countryId);
    // this.selectedCountry = null;
    for (let i = 0; i < this.all_countries.length; i++) {
      if (this.all_countries[i].country_id == countryId) {
        this.selectedCountry = this.all_countries[i].country_name;
      }
    }
    this.get_states(countryId);
  }

  get_states(countryId) {
    console.log(countryId);
    console.log('get states');
    this.userService.getAllStates(countryId).subscribe(
      data => {
        this.all_states = data['states'];
        console.log('I CANT SEE DATA HERE getAllStates : ', this.all_states);
      }
    );
  }

  onSelectstate(stateId: number) {
    // this.selectedstate = null;
    for (let i = 0; i < this.all_states.length; i++) {
      if (this.all_states[i].state_id == stateId) {
        this.selectedstate = this.all_states[i].state_name;
      }
    }
    this.get_cities(stateId);
  }

  get_cities(stateId) {
    console.log(stateId);
    console.log('get cities');
    this.userService.getAllCities(stateId).subscribe(
      data => {
        this.all_cities = data['cities'];
        console.log('I CANT SEE DATA HERE getAllStates : ', this.all_cities);
      }
    );
  }

  onSelectcity(cityId: number) {
    // this.selectedcity = null;
    for (let i = 0; i < this.all_cities.length; i++) {
      if (this.all_cities[i].city_id == cityId) {
        this.selectedcity = this.all_cities[i].city_name;
      }
    }
  }
  reset(f) {
    f.form.reset();
  }

  onSubmit() {
    if (this.patient_model.invalid) {
      alert('Please fill all fields');
    } else {
      console.log('in add patient');
      // this.hospitalid = this.patient_model.doc_hospital_id;
      this.patient_model.image = 'https://storage.googleapis.com/web-assets/images/user_icon.jpg';
      this.patient_model.DOBTotal = moment(this.patient_model.DOBTotal).format('YYYY-MM-DD');
      this.patient_model.year = moment(this.patient_model.DOBTotal).format('YYYY');
      this.patient_model.presentdate = moment (this.today).format('YYYY');
      this.patient_model.dob = this.patient_model.DOBTotal;
      delete this.patient_model.DOBTotal;
      this.patient_model.city = this.selectedcity;
      this.patient_model.state = this.selectedstate;
      this.patient_model.country = this.selectedCountry;
      this.patient_model.age = this.patient_model.presentdate - this.patient_model.year;
      console.log(this.patient_model.age);
      delete this.patient_model.year;
      delete this.patient_model.presentdate;
      this.patient_model.doctor_id_c = JSON.parse(localStorage.getItem('currentUser'))['userinfo'][0]['doctor_id_c'];
      this.patient_model.doctor_lname = JSON.parse(localStorage.getItem('currentUser'))['userinfo'][0]['lname'];
      this.patient_model.doctor_fname = JSON.parse(localStorage.getItem('currentUser'))['userinfo'][0]['name'];
      this.ADService.currentMessage1.subscribe(data23 => {
        console.log(data23);
        this.hos_id = data23;
      });
      // delete this.patient_model.dob;
      // delete this.patient_model['DOBDay'];
      //  delete this.patient_model['DOBMonth'];
      // delete this.patient_model['DOBYear'];
      console.log('model after deleting 3 fields');
      this.patient_model.doc_hospital_id = this.hos_id;
      console.log(this.patient_model);

      this.userService.Add_Patient(this.patient_model, JSON.parse(localStorage.getItem('currentUser'))['userinfo'][0]['doctor_id_c'])
        .subscribe(
          data => {
            console.log('Reached near to goal');
            console.log(data);
            if (data['success']) {
              alert('Patient added to your patient list');
        //      this.patient_model.reset();
              // const toastOptions: ToastOptions = {
              //   title: '',
              //   msg: 'Patient added to your patient list',
              //   showClose: true,
              //   timeout: 10000,
              //   theme: 'assets/dashboard_assets/dashboard/style-bootstrap.css',
              //   onAdd: (toast: ToastData ) => {
              //     console.log('Toast ' + toast.id + ' has been added!');
              //   },
              //   onRemove: function(toast: ToastData ) {
              //     console.log('Toast ' + toast.id + ' has been removed!');
              //   }
              // };
              // this.toastyService.success(toastOptions);
            }
          },
          error => {
            console.log(error);
          });
    }
 //   this.patient_model.form.reset();

  }

  /*increment() {
    this.store.dispatch({ type: INCREMENT });
  }
  decrement() {
    this.store.dispatch({ type: DECREMENT });
  }
  reset() {
    this.store.dispatch({ type: RESET });
  }*/


}

@Component({
  selector: 'app-change-hospital-component',
  templateUrl: 'change-hospital.component.html',
  styleUrls: ['./add-patient.component.css']
})
export class ChangeHospitalComponent implements OnInit {

  name: string;
  hospital_list: any;
  hos_id: any;
  patient_model: any = {};

  constructor(private ADService: AddressService,  private userService: UserServiceService,
              public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef <ChangeHospitalComponent>) { }


  ngOnInit() {
    const user = JSON.parse(localStorage.getItem('currentUser')).success;
    console.log(user);
    this.hospital_details_fun();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  openDialog2(): void {
    const dialogRef = this.dialog.open(AddHospitalComponent, {
      width: '420px',
      height: '600px',
      data: { name : '' }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.name = result;
    });
  }

  hospital_details_fun() {
    this.userService.hospital_Details(JSON.parse(localStorage.getItem('currentUser'))['userinfo'][0]['doctor_id_c']).subscribe(
      data => {
        this.hospital_list = data['data'];
        console.log('I CANT SEE DATA of hospital_list : ', this.hospital_list);
      }
    );
  }

  createRange(number) {
    const items: number[] = [];
    for (let i = 0; i <= number - 1; i++) {
      items.push(i);
    }
    return items;
  }

  hospital_id(id, cn, hc, cc, cs, hcc) {
    console.log('in change hospital id');
    if (cn == null) {
      cn = '';
    }
    if (hc == null) {
      hc = '';
    }
    if (cs == null) {
      cs = '';
    }
    if (hcc == null) {
      hcc = '';
    }
    this.ADService.change2Message(id);
    this.ADService.changeMessage(cn + ' ' + hc + ' ' + cs + ' ' + hcc);
    this.dialogRef.close();

  }

}

@Component({
  selector: 'app-add-hospital-component',
  templateUrl: 'add-hospital.component.html',
  styleUrls: ['./add-patient.component.css']
})
export class AddHospitalComponent {
  model: any = {};
  post: any;
  clinic_name: string;
  hospital_city: string;
  address2: string;
  clinic_city: string;
  clinic_state: string;
  hospital_city_c: string;
  pin: number;
  clinic_ph: number;
  disabled: any = true;

  clinicName = new FormControl('', [
    Validators.required
  ]);
  hAd1 = new FormControl('', [
    Validators.required
  ]);
  hAd2 = new FormControl('', [
    Validators.required
  ]);
  hCity = new FormControl('', [
    Validators.required
  ]);
  hState = new FormControl('', [
    Validators.required
  ]);
  hCountry = new FormControl('', [
    Validators.required
  ]);
  pinCode = new FormControl('', [
    Validators.required
  ]);
  phoneNumber = new FormControl('', [
    Validators.required
  ]);


  constructor(private userService: UserServiceService,
              private router: Router, @Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef <AddHospitalComponent>) { }

  onNoClick(): void {
    this.dialogRef.close();
  }


  add_hospital() {
    if ( this.model.clinic_name == null && this.model.hospital_city == null &&
      this.model.address2 == null && this.model.clinic_city == null
      && this.model.clinic_state == null && this.model.hospital_city_c == null
      && this.model.pin == null && this.model.clinic_ph == null) {
      alert('Please fill all details');
    }
    if ( this.model.clinic_name != null && this.model.hospital_city != null &&
      this.model.address2 != null && this.model.clinic_city != null
      && this.model.clinic_state != null && this.model.hospital_city_c != null
      && this.model.pin != null && this.model.clinic_ph != null) {
      this.model.doctor_id_c = JSON.parse(localStorage.getItem('currentUser'))['userinfo'][0]['doctor_id_c'];
      this.userService.Add_hospital_details(this.model)
        .subscribe(
          data => {
            console.log('success');
            if (data['success']) {
              alert('Details are Saved');
              this.dialogRef.close();
              this.post = true;
              /* this.router.navigate(['/dashboard/patient-list']);*/
              this.router.navigate(['/dashboard/add-patient']);
            }
          },
          error => {
            console.log(error);
          });
    }
  }

}
