import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mobile-single-petient-myhealth',
  templateUrl: './mobile-single-petient-myhealth.component.html',
  styleUrls: ['./mobile-single-petient-myhealth.component.css']
})
export class MobileSinglePetientMyhealthComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  createRange(number) {
    var items: number[] = [];
    for (var i = 0; i <= number - 1; i++) {
      items.push(i);
    }
    return items;
  }
}
