import {Component, Input, ViewChild} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {BsDatepickerConfig} from 'ngx-bootstrap/datepicker';
import {moment} from 'ngx-bootstrap/chronos/test/chain';

@Component({
  selector: 'medicine-edit',
  templateUrl: './medicine-edit.component.html',
})
export class MedicineEditComponent {
  @Input('group') medForm: FormGroup;
  bsConfig: Partial<BsDatepickerConfig>;
  /*this.bsConfig = Object.assign({}, { containerClass: this.colorTheme });*/
  minDate = /*new Date(2017, 5, 10);*/ new Date();
  //  maximum date allowed maxDate = new Date(2018, 9, 15);

  //  to give inisial value  bsValue: Date = new Date();
  // bsRangeValue: any = [new Date(2017, 7, 4), new Date(2017, 7, 20)];*/
  @ViewChild('f3') openModal1;
  str: any;
  duration: any;
  private end_date_unixtime: number;
  private start_date_unixtime: number;
  constructor() {
  }

  dur() {
    this.str = this.openModal1.nativeElement.val();
    console.log(this.str);
  }

  /*  ngAfterViewInit(){
      console.log(this.button);
      console.log(this.button.nativeElement); //undefined
      //console.log(this.button.nativeElement.value); // obviously error here
    }*/
  date(start, end) {
    this.duration = 0;
    const start_date = moment(start);
    const end_date = moment(end);
    const days = end_date.diff(start_date, 'days');
    this.duration = days;
  }
}
