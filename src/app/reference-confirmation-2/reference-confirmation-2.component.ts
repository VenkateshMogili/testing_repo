import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UserServiceService} from '../user-service.service';

@Component({
  selector: 'app-reference-confirmation-2',
  templateUrl: './reference-confirmation-2.component.html',
  styleUrls: ['./reference-confirmation-2.component.css']
})
export class ReferenceConfirmation2Component implements OnInit {

  model: any = {};
  id: any;
  list: any;
  list_2: any;

  constructor(private router: Router, private route: ActivatedRoute, private userService: UserServiceService) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
    this.reference_confirm(this.id);
  }

  reference_confirm(id) {
    this.model.cnfm_ref2 = 'true';
    this.userService.reference_confirm_update(this.model, id)
      .subscribe(
        data => {
          if (data['message'] === 'Updated Doctor') {
            this.userService.reference2_confirm_get(id)
              .subscribe(
                data1 => {
                  //   if (data1['message'] === 'Updated Doctor') {
                  this.userService.reference2_confirm_congrates(id)
                    .subscribe(
                      data2 => {
                        if (data2['success'] && data1['success']) {
                          this.list = data1['data'];
                        }
                      }
                    );
                  // }
                }
              );
          }

        }
      );
  }

}
