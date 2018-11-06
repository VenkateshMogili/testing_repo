import {Component, OnInit} from '@angular/core';
import {UserServiceService} from '../user-service.service';

@Component({
  selector: 'app-archiving-list',
  templateUrl: './archiving-list.component.html',
  styleUrls: ['./archiving-list.component.css']
})
export class ArchivingListComponent implements OnInit {

  list: any;

  constructor(private userService: UserServiceService) {
  }

  ngOnInit() {
    this.get_archiving_list();
  }

  createRange(number) {
    var items: number[] = [];
    for (var i = 0; i <= number - 1; i++) {
      items.push(i);
    }
    return items;
  }

  Range(number) {
    var items: number[] = [];
    for (var i = 0; i <= number - 1; i++) {
      items.push(i);
    }
    return items;
  }

  get_archiving_list() {
    this.userService.doctor_archiving(JSON.parse(localStorage.getItem('currentUser'))['userinfo'][0]['doctor_id_c'])
      .subscribe(
        data => {
          this.list = data['data'];
          console.log('I CANT SEE DATA of Archiving Details : ', this.list);
        }
      );
  }

}
