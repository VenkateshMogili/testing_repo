import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UserServiceService} from '../user-service.service';
import {AlertServiceService} from '../alert-service.service';
import {Fileup} from '../fileup';
import {DataService} from '../data.service';
import * as firebase from 'firebase';
import {ToastyConfig, ToastyService} from 'ng2-toasty';
import {AccountKit, AuthResponse} from 'ng2-account-kit';
import {ErrorStateMatcher} from '@angular/material/core';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  model: any = {};
  loading = false;
  countrycode: any;
  selected: any;
  uploadedfile = 'https://storage.googleapis.com/web-assets/images/doctor_icon.png';
  uploadedfile1: any;
  submitted = false;
  selectedFiles: FileList;
  currentFileUpload: Fileup;
  temp: any;
  progress: { percentage: string } = {percentage: 'fg'};

  constructor(private router: Router,
              private userService: UserServiceService,
              private alertService: AlertServiceService, private dataService: DataService, private toastyService: ToastyService,
              private toastyConfig: ToastyConfig) {
    this.toastyConfig.theme = 'bootstrap';
    this.toastyConfig.position = 'top-right';
  }

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  selecte = new FormControl('', [
    Validators.required,
    Validators.pattern(''),
  ]);

  matcher = new MyErrorStateMatcher();

  ngOnInit() {
    AccountKit.init({
      appId: '1066226316760891',
      state: 'awse#456tfg',
      version: 'v1.1'
    });

  }


  function (value) {
    console.log('function');
    console.log(value);
    this.countrycode = value;
    this.temp = value;
    console.log('I am in function');
    console.log(this.countrycode);
  }

  phone_btn_onclick(): void {
    console.log('phone');
    console.log(this.countrycode);
    console.log(this.model.mobile);
    AccountKit.login('PHONE', {countryCode: this.countrycode, phoneNumber: this.model.mobile}).then(
      (response: AuthResponse) => console.log(response),
      (error: any) => console.error(error)
    );
  }

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

  selectFileM(event) {
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
        this.uploadedfile1 = snap.downloadURL;

      });
  }

  register() {
    this.model.image = this.uploadedfile;
    this.model.medical_certificate = this.uploadedfile1;
    console.log(this.model);
    this.userService.Registration(this.model)
      .subscribe(
        data => {
          console.log(data);
          if (data['success']) {

            alert('Registered Successfully');
            /*var toastOptions: ToastOptions = {
              title: '',
              msg: 'Registered Successfully',
              showClose: true,
              timeout: 10000,
              theme: 'assets/dashboard_assets/dashboard/style-bootstrap.css',
              onAdd: (toast: ToastData ) => {
                console.log('Toast ' + toast.id + ' has been added!');
              },
              onRemove: function(toast: ToastData ) {
                console.log('Toast ' + toast.id + ' has been removed!');
              }
            };
            this.toastyService.success(toastOptions);*/
            this.router.navigate(['/home/doctor-log-in']);
          } else {
            alert('Email is already registered');
          }
        },
        error => {
          console.log(error);
        });
  }


}

