import {Component, OnInit} from '@angular/core';
import {UserServiceService} from '../user-service.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-confirmed-consultations',
  templateUrl: './confirmed-consultations.component.html',
  styleUrls: ['./confirmed-consultations.component.css']
})
export class ConfirmedConsultationsComponent implements OnInit {

  confirmed_consultations: any;
  type: any;
  id: any;
  p: number = 1;
  //i: number = 0;
  constructor(private userService: UserServiceService, private router: ActivatedRoute) {
  }

  ngOnInit() {
    this.router.params.subscribe(params => {
      this.type = params['type'];
      this.id = params['id'];
      this.get_confirmed_consultation(this.type, this.id);
    });

  }

  createRange(number) {
    let items: number[] = [];
    for (var i = 0; i <= number - 1; i++) {
      items.push(i);
    }
    return items;
  }

  Range(number) {
    let items: number[] = [];
    for (var i = 0; i <= number - 1; i++) {
      items.push(i);
    }
    return items;
  }

  get_confirmed_consultation(type, id) {
    this.userService.confirmedConsultation(type, id).subscribe(
      data => {
        console.log(data);
        this.confirmed_consultations = data['data'];
        console.log('I CANT SEE DATA of consultation_history : ', this.confirmed_consultations);
      }
    );
  }

}
