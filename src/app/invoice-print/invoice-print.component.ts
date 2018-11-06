import {Component, OnInit} from '@angular/core';
import {UserServiceService} from '../user-service.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-invoice-print',
  templateUrl: './invoice-print.component.html',
  styleUrls: ['./invoice-print.component.css']
})
export class InvoicePrintComponent implements OnInit {
  user: any;
  id: any;

  constructor(private userService: UserServiceService, private router: ActivatedRoute) {
  }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    this.router.params.subscribe(params => {
      this.id = params['id'];
    });
  }

}
