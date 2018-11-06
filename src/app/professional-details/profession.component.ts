import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators, FormGroupDirective, NgForm} from '@angular/forms';
import {UserServiceService} from '../user-service.service';
import {ErrorStateMatcher} from '@angular/material/core';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-profession',
  templateUrl: './profession.component.html',
  styleUrls: ['./profession.component.css']
})
export class ProfessionComponent implements OnInit {
  @Input('group') medForm: FormGroup;
  constructor(private userService: UserServiceService) { }

  emailFormControl = new FormControl('', [
    Validators.required
  ]);
  password = new FormControl('', [
    Validators.required
  ]);
  matcher = new MyErrorStateMatcher();
  all_countries: any;
  selectedCountry: any;
  selectedstate: any;
  all_states: any;
  all_cities: any;
  selectedcity: any;
  doc_model: any = {};
  ngOnInit() {
    this.get_countries();
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
      if (this.all_countries[i].country_id === countryId) {
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
}
