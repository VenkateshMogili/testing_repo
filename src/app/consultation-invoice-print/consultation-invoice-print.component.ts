import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {UserServiceService} from '../user-service.service';

@Component({
  selector: 'app-consultation-invoice-print',
  templateUrl: './consultation-invoice-print.component.html',
  styleUrls: ['./consultation-invoice-print.component.css']
})
export class ConsultationInvoicePrintComponent implements OnInit {

  invoice_list: any;
  user: any;
  id: any;
  b_id: any;
  b_date: any;
  date: any = new Date();
  constructor(private userService: UserServiceService, private router: ActivatedRoute) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    this.router.params.subscribe(params => {
      this.id = params['id'];
      this.b_date = params['b_date'];
      this.b_id = params['b_id'];
    });
    this.get_invoice_list();
  }
  createRange(number) {
    var items: number[] = [];
    for( var i = 0; i <= number-1; i++) {
      items.push(i);
    }
    return items;
  }

  Range(number) {
    let items: number[] = [];
    for( var i = 0; i <= number-1; i++) {
      items.push(i);
    }
    return items;
  }

  get_invoice_list() {
    this.userService.Consultation_Invoice_view(this.id)
      .subscribe(
        data => {
          this.invoice_list = data['data'];
          console.log('I CANT SEE DATA of Invoice : ', this.invoice_list);
        }
      );
  }

}
