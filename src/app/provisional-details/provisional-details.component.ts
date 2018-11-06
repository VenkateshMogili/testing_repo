import {Component, OnInit} from '@angular/core';
import {UserServiceService} from '../user-service.service';
import {Router} from '@angular/router';
import {HttpErrorResponse} from '@angular/common/http';
import {AuthenticationserviceService} from '../authenticationservice.service';
import {ErrorStateMatcher} from '@angular/material/core';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}


@Component({
  selector: 'app-provisional-details',
  templateUrl: './provisional-details.component.html',
  styleUrls: ['./provisional-details.component.css']
})
export class ProvisionalDetailsComponent implements OnInit {
  provisional_model: any = {};
  model: any = {};
  user: any = {};

  constructor(private userservice: UserServiceService, private router: Router,
              private authenticationserviceService: AuthenticationserviceService) {
  }

  emailFormControl = new FormControl('', [
    Validators.required
  ]);
  password = new FormControl('', [
    Validators.required
  ]);
  matcher = new MyErrorStateMatcher();

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    this.provisional_model.ref_speciality1 = 0;
    this.provisional_model.ref_phone1_country_code = 0;
    this.provisional_model.ref_speciality2 = 0;
    this.provisional_model.ref_phone2_country_code = 0;
    this.provisional_model.ref_speciality3 = 0;
    this.provisional_model.ref_phone3_country_code = 0;
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
            let user = data;
            // store user details and jwt token in local storage to keep user logged in between page refreshes
           // localStorage.setItem('currentUser', JSON.stringify(user));

            if (data['userinfo'][0]['provisional_setup_page'] === 'true') {

              this.router.navigate(['dashboard']);
              /*if (data['userinfo'][0]['licence_varification'] === 'true') {
                {
                  this.router.navigate(['dashboard']);
                }
              }*/
            } else {
              this.router.navigate(['provisional-details']);
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
  }



  onSubmit() {
    this.provisional_model.provisional_setup_page = 'true';
    console.log(this.provisional_model);
    this.userservice.personal_details(this.provisional_model, JSON.parse(localStorage.getItem('currentUser'))['userinfo'][0]['doctor_id_c'])
      .subscribe(
        data => {
          console.log('fcghfgh');
         // this.user['userinfo'][0]['provisional_setup_page'] = 'true';

          // localStorage.setItem('currentUser', this.user);
          this.sendone();
          this.router.navigate(['dashboard']);
        },
        error => {
          console.log(error);
        });
    //
  }

  login(email, pwd) {
    console.log('fgdfgh');
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
     this.router.navigate(['home']);
  }

  sendone() {
    console.log('bhjkhj');
    this.userservice.sendone_ref(JSON.parse(localStorage.getItem('currentUser'))['userinfo'][0]['doctor_id_c'])
      .subscribe(
        data => {
          this.sendtwo();
        },
        error => {
          console.log(error);
        });
  }

  sendtwo() {
    this.userservice.sendtwo_ref(JSON.parse(localStorage.getItem('currentUser'))['userinfo'][0]['doctor_id_c'])
      .subscribe(
        data => {
          this.sendthree();
        },
        error => {
          console.log(error);
        });
  }

  sendthree() {
    this.userservice.sendthree_ref(JSON.parse(localStorage.getItem('currentUser'))['userinfo'][0]['doctor_id_c'])
      .subscribe(
        data => {
          console.log('success');
          this.login(this.user['userinfo'][0]['email'], this.user['userinfo'][0]['password']);
          this.router.navigate(['/dashboard']);
        },
        error => {
          console.log(error);
        });
  }

}
