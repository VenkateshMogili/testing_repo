import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {UserServiceService} from '../user-service.service';


/*
@Pipe({
  name: 'Truncate', pure: false
})
export class Truncate implements PipeTransform {
  transform(value: string, args: string[]): string {
    let limit = args.length > 0 ? parseInt(args[0], 10) : 50;
    let trail = args.length > 1 ? args[1] : '...';
    return value.length > limit ? value.substring(0, limit) + trail : value;
  }
}

@Pipe({name: 'round'})
export class RoundPipe implements PipeTransform {
  transform (input: number) {
    return Math.floor(input);
  }
}*/

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.css']
})
export class PatientListComponent implements OnInit {

  patient: {} = {patient_name: 'devidas'};
  @Output() messageEvent = new EventEmitter<{}>();
  @Input() Button_config: {};
  patient_list: Array<any>;

  constructor(private userService: UserServiceService) {
  }

  ngOnInit() {
    this.userService.getAllpatient_list(JSON.parse(localStorage.getItem('currentUser'))['userinfo'][0]['doctor_id_c']).subscribe(
      data => {
        this.patient_list = data['data'];
        console.log('I CANT SEE DATA HERE in single componenet : ', this.patient_list);
        /*localStorage.setItem('patient_list', this.patient_list);*/
      }
    );

    /*console.log(JSON.parse(localStorage.getItem('currentUser'))['userinfo'][0]['doctor_id_c']);*/
    /*this.get_patient_list();*/
  }


  createRange(number) {
    const items: number[] = [];
    for (let i = 0; i <= number - 1; i++) {
      items.push(i);
    }
    return items;
  }

  Range(number) {
    const items: number[] = [];
    for (let i = 0; i <= number - 1; i++) {
      items.push(i);
    }
    return items;
  }

  get_patient_list() {
    console.log(JSON.parse(localStorage.getItem('currentUser'))['userinfo'][0]['doctor_id_c']);
    console.log('get catagory calling');
    this.userService.getAllpatient_list(JSON.parse(localStorage.getItem('currentUser'))['userinfo'][0]['doctor_id_c']).subscribe(
      data => {
        this.patient_list = data['data'];
        console.log('I CANT SEE DATA HERE in single componenet : ', this.patient_list);
        /*localStorage.setItem('patient_list', this.patient_list);*/
      }
    );
  }

  sendMessage(index: number) {
    this.patient = this.patient_list[index];
    this.messageEvent.emit(this.patient);
  }
}
