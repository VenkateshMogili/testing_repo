import {Component, OnInit} from '@angular/core';
import {UserServiceService} from '../user-service.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-reference-reject-3',
  templateUrl: './reference-reject-3.component.html',
  styleUrls: ['./reference-reject-3.component.css']
})
export class ReferenceReject3Component implements OnInit {

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
    this.reference_unconfirm(this.id);
  }

  reference_unconfirm(id) {
    this.model.uncnfm_ref3 = 'true';
    this.userService.reference_confirm_update(this.model, id)
      .subscribe(
        data => {
          if (data['message'] === 'Updated Doctor') {
            this.userService.reference3_unconfirm_get(id)
              .subscribe(
                data1 => {
                  //   if (data1['message'] === 'Updated Doctor') {
                  this.userService.reference3_unconfirm_congrates(id)
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
