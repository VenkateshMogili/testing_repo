import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticationserviceService} from '../authenticationservice.service';

@Component({
  selector: 'app-homecontent',
  templateUrl: './homecontent.component.html',
  styleUrls: ['./homecontent.component.css']
})
export class HomecontentComponent implements OnInit {
  model: any = {};

  constructor(private route: ActivatedRoute, private router: Router, private authenticationService: AuthenticationserviceService) {
  }

  ngOnInit() {

  }


}
