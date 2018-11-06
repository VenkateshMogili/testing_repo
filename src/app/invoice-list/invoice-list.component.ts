import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {UserServiceService} from '../user-service.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.css']
})
export class InvoiceListComponent implements OnInit {
//  @ViewChild('openModal') openModal: ElementRef;
  invoice_list: any;
  user: any;
  name: any;

  constructor(public dialog: MatDialog, private userService: UserServiceService, private router: Router) {
  }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    this.get_invoice_list();
  }

  createRange(number) {
    const items: number[] = [];
    for (var i = 0; i <= number - 1; i++) {
      items.push(i);
    }
    return items;
  }

  Range(number) {
    const items: number[] = [];
    for (var i = 0; i <= number - 1; i++) {
      items.push(i);
    }
    return items;
  }

  upgrade(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog2, {
      height:'auto',
      data: { name:'venkatesh' }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.name = result;
    });
  }
  get_invoice_list() {
    this.userService.Invoice_list(JSON.parse(localStorage.getItem('currentUser'))['userinfo'][0]['doctor_id_c'])
      .subscribe(
        data => {
          this.invoice_list = data['data'];
          console.log('I CANT SEE DATA of Invoice : ', this.invoice_list);
        }
      );
  }

  open_pay_monthly() {
    this.router.navigate(['/dashboard/pricing']);
  }

  open_pay_anually() {
    this.router.navigate(['/dashboard/automatic-pricing/'], {queryParams: {page: 'renewal'}});
  }
}

@Component({
  selector: 'dialog-overview-example-dialog2',
  templateUrl: 'dialog-overview-example-dialog2.html',
})
export class DialogOverviewExampleDialog2{
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef <DialogOverviewExampleDialog2>) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
