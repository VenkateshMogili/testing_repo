import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpErrorResponse} from '@angular/common/http';
import {AuthenticationserviceService} from '../authenticationservice.service';
import {UserServiceService} from '../user-service.service';
import {MessagingService} from '../messaging.service';
import {ErrorStateMatcher} from '@angular/material/core';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  title = 'Log in as Doctor';
  model: any = {};
  loading: boolean;
  returnUrl: string;
  message: any;
  hos_list: [{}];
  degree_list: any;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private authenticationserviceService: AuthenticationserviceService, private userService: UserServiceService,
              private msgService: MessagingService) {
    /*this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '';*/
  }

  emailFormControl = new FormControl('', [
    Validators.required
  ]);
  password = new FormControl('', [
    Validators.required
  ]);
  matcher = new MyErrorStateMatcher();

  ngOnInit() {}

  // login() {
  //   console.log(this.model);
  //   this.loading = true;
  //   this.authenticationserviceService.login(this.model.email, this.model.password).subscribe(
  //     data => {
  //       console.log(data);
  //       /*let user = response.json();*/
  //       if (data['success'] /*&& user.token*/) {
  //         this.msgService.getPermission();
  //         this.message = this.msgService.currentMessage;
  //         console.log('in true only');
  //         let user = data;
  //         // store user details and jwt token in local storage to keep user logged in between page refreshes
  //         localStorage.setItem('currentUser', JSON.stringify(user));
  //         this.gethospital();
  //         /*this.getdegree();*/
  //         if (data['userinfo'][0]['account_setup_page'] === 'true') {
  //           if (data['userinfo'][0]['licence_setup_page'] === 'true') {
  //             if (data['userinfo'][0]['proffesional_setup_page'] === 'true') {
  //               if (data['userinfo'][0]['provisional_setup_page'] === 'true') {
  //                 if (data['userinfo'][0]['licence_varification'] === 'true') {
  //                   {
  //                     this.router.navigate(['dashboard']);
  //                   }
  //                 } else {
  //                   this.router.navigate(['/review']);
  //                 }
  //               } else {
  //                 this.router.navigate(['provisional-details']);
  //               }
  //             } else {
  //               this.router.navigate(['professional-details']);
  //             }
  //           } else {
  //             this.router.navigate(['educational-details']);
  //           }
  //         } else {
  //           this.router.navigate(['personal-details']);
  //         }
  //
  //       } else {
  //         this.message = 'authentication failed ! email id and password did not match';
  //         console.log('user does not exists');
  //       }
  //     },
  //     (err: HttpErrorResponse) => {
  //       if (err.error instanceof Error) {
  //         // A client-side or network error occurred. Handle it accordingly.
  //         console.log('An error occurred:', err.error.message);
  //       } else {
  //         // The backend returned an unsuccessful response code.
  //         // The response body may contain clues as to what went wrong,
  //         console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
  //       }
  //     }
  //   );
  // }


  login() {
    console.log(this.model);
    this.loading = true;
    this.authenticationserviceService.login(this.model.email, this.model.password).subscribe(
      data => {
        console.log(data);
        /*let user = response.json();*/
        if (data['success'] /*&& user.token*/) {
          this.msgService.getPermission();
          this.message = this.msgService.currentMessage;
          console.log('in true only');
          let user = data;
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.gethospital();
          this.loading = false;
          /*this.getdegree();*/
          if (data['userinfo'][0]['account_setup_page'] === 'true') {
            if (data['userinfo'][0]['licence_setup_page'] === 'true') {
              if (data['userinfo'][0]['proffesional_setup_page'] === 'true') {
                if (data['userinfo'][0]['bank_setup_page'] === 'true') {
                  if (data['userinfo'][0]['provisional_setup_page'] === 'true') {
                    if (data['userinfo'][0]['licence_varification'] === 'true') {
                      {
                        this.router.navigate(['dashboard/overview']);
                      }
                    } else {
                      this.router.navigate(['/review']);
                    }
                  } else {
                    this.router.navigate(['provisional-details']);
                  }
                } else {
                  this.router.navigate(['bank-details']);
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
          this.message = 'Authentication failed !!! email id and password did not match';
          console.log('user does not exists');
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


  gethospital() {
    console.log('in set hospital list');
    this.userService.hospital_Details(JSON.parse(localStorage.getItem('currentUser'))['userinfo'][0]['doctor_id_c'])
      .subscribe(
        data => {
          this.hos_list = data['data'];
          console.log('I CANT SEE DATA of hospital  Details : ', this.hos_list);
          const currentUser = JSON.parse(localStorage.getItem('currentUser'));
          currentUser['hosp_list'] = this.hos_list;
          localStorage.setItem('currentUser', JSON.stringify(currentUser));
          console.log('after adding');
          // console.log(JSON.parse(localStorage.getItem('currentUser')));
        }
      );
  }

  getdegree() {
    this.userService.Degree_Details(JSON.parse(localStorage.getItem('currentUser'))['userinfo'][0]['doctor_id_c'])
      .subscribe(
        data => {
          this.degree_list = data['data'];
          console.log('I CANT SEE DATA of degree Details : ', this.degree_list);
          var currentUser = JSON.parse(localStorage.getItem('currentUser'));
          currentUser['degree_list'] = this.degree_list;
          localStorage.setItem('currentUser', JSON.stringify(currentUser));
          console.log('after adding');
          console.log(JSON.parse(localStorage.getItem('currentUser')));
        }
      );
  }
}

