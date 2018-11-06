import {Component, OnInit} from '@angular/core';
import {AuthenticationserviceService} from '../authenticationservice.service';
import {UserServiceService} from '../user-service.service';
import {BsDatepickerConfig} from 'ngx-bootstrap/datepicker';
import {Router} from '@angular/router';
import {ErrorStateMatcher} from '@angular/material/core';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-personal-details',
  templateUrl: './personal-details.component.html',
  styleUrls: ['./personal-details.component.css']
})
export class PersonalDetailsComponent implements OnInit {
  personal_model: any = {};
  all_countries: any;
  selectedCountry: any;
  selectedstate: any;
  all_states: any;
  all_cities: any;
  selectedcity: any;
  user: any;
  bsConfig: Partial<BsDatepickerConfig>;
  minDate = new Date();

  constructor(private auth: AuthenticationserviceService, private userservice: UserServiceService, private router: Router) {
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
    console.log(this.user);
    this.get_countries();
  }

  public logout() {
    console.log('logout');
    this.userservice.logout();
    // this.router.navigate(['home']);
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
    this.personal_model.city = this.selectedcity;
    this.personal_model.country = this.selectedCountry;
    this.personal_model.state = this.selectedstate;
    this.personal_model.account_setup_page = 'true';
    console.log(this.personal_model.dob);
    // this.personal_model.dob =  (this.personal_model.dob | amDateFormat: 'YYYY-MM-DD')
    console.log(this.personal_model);
    this.userservice.personal_details(this.personal_model, JSON.parse(localStorage.getItem('currentUser'))['userinfo'][0]['doctor_id_c'])
      .subscribe(
        data => {
          console.log(data);
          if (data['success']) {
            let x = JSON.parse(localStorage.getItem('currentUser'))['userinfo'][0]['account_setup_page'];
            console.log(x);
            // localStorage.setItem('currentUser', JSON.stringify(user));
            this.user['userinfo'][0]['account_setup_page'] = 'true';
            // localStorage.setItem('currentUser', this.user);
            // let y = JSON.parse(localStorage.getItem('currentUser'))['userinfo'][0]['account_setup_page'];
            // console.log(y);
            alert('Personal Details Added Successfully');
            this.router.navigate(['/educational-details']);
          }
        },
        error => {
          console.log(error);
        });
  }

}
