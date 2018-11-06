import {Component, OnInit} from '@angular/core';
import {UserServiceService} from '../user-service.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-consultation-history',
  templateUrl: './consultation-history.component.html',
  styleUrls: ['./consultation-history.component.css']
})
export class ConsultationHistoryComponent implements OnInit {

  consultation_history: any;
  type: string;
  id: string;
  p: number = 1;
  //i: number = 0;
  constructor(private userService: UserServiceService, private router: ActivatedRoute) {
  }

  ngOnInit() {
    this.router.params.subscribe(params => {
      this.type = params['type'];
      this.id = params['id'];
      console.log(this.type);
      this.get_consultation_history(this.type, this.id);
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
    for (let i = 0; i <= number - 1; i++) {
      items.push(i);
    }
    return items;
  }

  get_consultation_history(type, id) {
    this.userService.consultationHistory(type, id).subscribe(
      data => {
        this.consultation_history = data['data'];
        console.log('I CANT SEE DATA of consultation_history : ', this.consultation_history);
      }
    );
  }
}
