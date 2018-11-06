import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpErrorResponse} from '@angular/common/http';
import {AuthenticationserviceService} from '../authenticationservice.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  model: any = {};

  constructor(private route: ActivatedRoute, private router: Router, private authenticationserviceService: AuthenticationserviceService) {

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
            localStorage.setItem('currentUser', JSON.stringify(user));
            if (data['userinfo'][0]['account_setup_page'] === 'true') {
              if (data['userinfo'][0]['licence_setup_page'] === 'true') {
                if (data['userinfo'][0]['proffesional_setup_page'] === 'true') {
                  if (data['userinfo'][0]['provisional_setup_page'] === 'true') {
                    if (data['userinfo'][0]['licence_varification'] === 'true') {
                      {
                        console.log('checking licence verification');
                        this.router.navigate(['dashboard']);
                      }
                    } else {
                      this.router.navigate(['/review']);
                    }
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
            this.authenticationserviceService.logout();
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
            this.authenticationserviceService.logout();
            this.router.navigate(['/home/doctor-log-in']);
          }
        }
      );
      // this.router.navigate(['/dashboard']);
    } else {

      // this.message = 'authentication failed ! email id and password did not match';
      console.log('user does not exists');
     this.router.navigate(['']).then(function (res) {
        console.log(res);
      }, function (err) {
        console.log('in errrrr');
        console.log(err);
        });
      }
  }

  ngOnInit() {
    console.log('in ng on init');
  }

}
