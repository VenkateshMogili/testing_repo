import {Component, OnInit} from '@angular/core';
import {AuthenticationserviceService} from '../authenticationservice.service';
import {HttpErrorResponse} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {UserServiceService} from '../user-service.service';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-professional-details',
  templateUrl: './professional-details.component.html',
  styleUrls: ['./professional-details.component.css']
})
export class ProfessionalDetailsComponent implements OnInit {

  model: any = {};
  user: any = {};

  prescriptionForm: FormGroup;
  constructor(private route: ActivatedRoute, private _fb: FormBuilder, private router: Router, private userservice: UserServiceService,
              private authenticationserviceService: AuthenticationserviceService, private userService: UserServiceService) {
  }

  emailFormControl = new FormControl('', [
    Validators.required
  ]);
  password = new FormControl('', [
    Validators.required
  ]);
  matcher = new MyErrorStateMatcher();
  get hospital_list(): FormArray {
    return this.prescriptionForm.get('hospital_list') as FormArray;
  }
  ngOnInit() {
    if (JSON.parse(localStorage.getItem('currentUser'))) {
      this.model = JSON.parse(localStorage.getItem('currentUser'))['userinfo'][0];
      /* localStorage.removeItem('currentUser');*/
      console.log('in home componenet true login');
      this.authenticationserviceService.login(this.model['email'], this.model['password']).subscribe(
        data => {
          console.log(data);
          /*let user = response.json();*/
          if (data['success'] /*&& user.token*/) {
            console.log('in true only');
            const user = data;
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentUser', JSON.stringify(user));
            if (data['userinfo'][0]['account_setup_page'] === 'true') {
              if (data['userinfo'][0]['licence_setup_page'] === 'true') {
                if (data['userinfo'][0]['proffesional_setup_page'] === 'true') {
                  if (data['userinfo'][0]['provisional_setup_page'] === 'true') {
                    this.router.navigate(['dashboard']);
                  } else {
                    this.router.navigate(['provisional-details']);
                  }
                } else {
                  this.router.navigate(['professional-details']);
                }
              } else {
                this.router.navigate(['educational-details']);
              }
            } else {
              this.router.navigate(['personal-details']);
            }

          } else {
            // this.message = 'authentication failed ! email id and password did not match';
            console.log('user does not exists');
            this.router.navigate(['/home/doctor-log-in']);
          }
        },
        (err: HttpErrorResponse) => {
          if (err.error instanceof Error) {
            // A client-side or network error occurred. Handle it accordingly.
            console.log('An error occurred:', err.error.message);
          } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
          }
        }
      );
       // this.router.navigate(['/dashboard']);
    }
    this.prescriptionForm = this._fb.group({
      practise_year_start: '',
      hospital_list: this._fb.array([]),
    });

    this.addnew();

  }


  onSubmit(form) {

    const x = JSON.parse(localStorage.getItem('currentUser'))['userinfo'][0]['proffesional_setup_page'];
    console.log(x);
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    // localStorage.setItem('currentUser', JSON.stringify(user));
    form.proffesional_setup_page = 'true';
    console.log(form);
    this.userservice.professional_details(form, JSON.parse(localStorage.getItem('currentUser'))['userinfo'][0]['doctor_id_c'])
      .subscribe(
        data => {
          console.log(data);
          if (data['success']) {
            let x = JSON.parse(localStorage.getItem('currentUser'))['userinfo'][0]['proffesional_setup_page'];
            console.log(x);
            // localStorage.setItem('currentUser', JSON.stringify(user));
            // this.user['userinfo'][0]['account_setup_page'] = 'true';

            // let y = JSON.parse(localStorage.getItem('currentUser'))['userinfo'][0]['account_setup_page'];
            // console.log(y);
            // alert('Personal Details Added Successfully');
            // this.router.navigate(['/educational-details']);

            this.user['userinfo'][0]['proffesional_setup_page'] = 'true';
           // localStorage.setItem('currentUser', this.user);
            this.login(this.user['userinfo'][0]['email'], this.user['userinfo'][0]['password']);
            alert('Professional Details Added Successfully');
            this.router.navigate(['bank-details']);

          }
        },
        error => {
          console.log(error);
        });

  }

  login(email, pwd) {
    this.authenticationserviceService.login(email, pwd).subscribe(
      data => {
        console.log(data);
        /*let user = response.json();*/
        if (data['success'] /*&& user.token*/) {

          let user = data;
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
        }
      },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          // A client-side or network error occurred. Handle it accordingly.
          console.log('An error occurred:', err.error.message);
        } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong,
          console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
        }
      }
    );
  }

  public logout() {
    console.log('logout');
    this.userservice.logout();
    // this.router.navigate(['home']);
  }
  addnew() {
    const control = <FormArray>this.prescriptionForm.controls['hospital_list'];
    const neweducation = this.initContractQM();
    control.push(neweducation);
  }
  initContractQM() {
    return this._fb.group({
      clinic_ph : '',
      clinic_name : '',
      hospital_city : '',
      clinic_city : '',
      clinic_state : '',
      hospital_city_c : '',
      pin : '',
    });
  }
  delete(index: number) {
    const control = <FormArray>this.prescriptionForm.controls['hospital_list'];
    control.removeAt(index);
  }
}
