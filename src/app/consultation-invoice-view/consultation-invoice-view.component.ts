import {Component, OnInit} from '@angular/core';
import {UserServiceService} from '../user-service.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-consultation-invoice-view',
  templateUrl: './consultation-invoice-view.component.html',
  styleUrls: ['./consultation-invoice-view.component.css']
})
export class ConsultationInvoiceViewComponent implements OnInit {

  invoice_list: any;
  user: any;
  id: any;
  b_id: any;
  b_date: any;

  date = new Date();

  constructor(private userService: UserServiceService, private router: ActivatedRoute) {
  }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    this.router.params.subscribe(params => {
      this.id = params['id'];
      this.b_date = params['b_date'];
      this.b_id = params['b_id'];

      this.get_invoice_list(this.id);
    });

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

  get_invoice_list(id) {
    this.userService.Consultation_Invoice_view(id)
      .subscribe(
        data => {
          this.invoice_list = data['data'];
          console.log('I CANT SEE DATA of Invoice : ', this.invoice_list);
        }
      );
  }

}
