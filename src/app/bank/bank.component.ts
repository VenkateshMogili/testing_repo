import { Component, OnInit } from '@angular/core';
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
  selector: 'app-bank',
  templateUrl: './bank.component.html',
  styleUrls: ['./bank.component.css']
})
export class BankComponent implements OnInit {
  bank_details: any = {};
  all_countries: any;
  selectedCountry: any;
  selectedstate: any;
  all_states: any;
  all_cities: any;
  selectedcity: any;
  user: any;
  constructor(private userservice: UserServiceService, private router: Router,
              private authenticationserviceService: AuthenticationserviceService) { }
  emailFormControl = new FormControl('', [
    Validators.required
  ]);
  password = new FormControl('', [
    Validators.required
  ]);
  matcher = new MyErrorStateMatcher();
  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    console.log(this.user);
    this.get_countries();
  }
  public logout() {
    console.log('logout');
    this.userservice.logout();
    this.router.navigate(['home']);
  }

  get_countries() {
    console.log('get countries');
    this.userservice.getAllCountries().subscribe(
      data => {
        this.all_countries = data['countries'];
        console.log('I CANT SEE DATA HERE getAllCountries : ', this.all_countries);
      }
    );
  }

  onSelect(countryId: number) {
    // this.selectedCountry = null;
    for (var i = 0; i < this.all_countries.length; i++) {
      if (this.all_countries[i].country_id == countryId) {
        this.selectedCountry = this.all_countries[i].country_name;
      }
    }
    this.get_states(countryId);
  }

  get_states(countryId) {
    console.log('get states');
    this.userservice.getAllStates(countryId).subscribe(
      data => {
        this.all_states = data['states'];
        console.log('I CANT SEE DATA HERE getAllStates : ', this.all_states);
      }
    );
  }

  onSelectstate(stateId: number) {
    // this.selectedstate = null;
    for (var i = 0; i < this.all_states.length; i++) {
      if (this.all_states[i].state_id == stateId) {
        this.selectedstate = this.all_states[i].state_name;
      }
    }
    this.get_cities(stateId);
  }

  get_cities(stateId) {
    console.log(stateId);
    console.log('get cities');
    this.userservice.getAllCities(stateId).subscribe(
      data => {
        this.all_cities = data['cities'];
        console.log('I CANT SEE DATA HERE getAllStates : ', this.all_cities);
      }
    );
  }

  onSelectcity(cityId: number) {
    // this.selectedcity = null;
    for (var i = 0; i < this.all_cities.length; i++) {
      if (this.all_cities[i].city_id == cityId) {
        this.selectedcity = this.all_cities[i].city_name;
      }
    }
  }

  onSubmit() {
    console.log('in create course');
    console.log(JSON.parse(localStorage.getItem('currentUser')));
    console.log(JSON.parse(localStorage.getItem('currentUser'))['userinfo'][0]['doctor_id_c']);
    this.bank_details.b_city = this.selectedcity;
    this.bank_details.b_state = this.selectedCountry;
    this.bank_details.b_country = this.selectedstate;
    this.bank_details.bank_setup_page = 'true';
    console.log(this.bank_details);
    this.userservice.bank_details(this.bank_details, JSON.parse(localStorage.getItem('currentUser'))['userinfo'][0]['doctor_id_c'])
      .subscribe(
        data => {
          console.log(data);
          if (data['success']) {
            let x = JSON.parse(localStorage.getItem('currentUser'))['userinfo'][0]['bank_setup_page'];
            console.log(x);
            this.user['userinfo'][0]['bank_setup_page'] = 'true';
            this.login(this.user['userinfo'][0]['email'], this.user['userinfo'][0]['password']);
            alert('Bank Details Added Successfully');
            this.router.navigate(['/educational-details']);
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

}
