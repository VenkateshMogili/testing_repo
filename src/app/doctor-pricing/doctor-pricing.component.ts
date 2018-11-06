import {Component, OnInit} from '@angular/core';
import {UserServiceService} from '../user-service.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-doctor-pricing',
  templateUrl: './doctor-pricing.component.html',
  styleUrls: ['./doctor-pricing.component.css']
})
export class DoctorPricingComponent implements OnInit {
  amount: any;
  paymentstatus: boolean;

  constructor(private userService: UserServiceService , private users: UserServiceService, private router: ActivatedRoute, private route: Router) {
  }

  ngOnInit() {
  }

  openWin(plan) {
    if (plan === 'basic') {
      /*var ba = 1000 + (0.18 * 100);*/
      var ba = 1;
      this.amount = ba;
    } else {
      if (plan === 'medium') {
        var md = 1200 + (0.18 * 110);
        this.amount = md;
      } else {
        var adv = 1500 + (0.18 * 120);
        this.amount = adv;
      }

    }
    console.log('open paymenet window');
    const user_id = JSON.parse(localStorage.getItem('currentUser'))['userinfo'][0]['doctor_id_c'];
    const pay_url = 'https://therightdoctors.com/api/beta/opm/doctor/subscribe/instant?key=7xOyNH554tY83cBN7Ktpw3s1y68ql6Eg&token=trd_token&doctor_id_c=' + user_id + '&plan=' + plan + '&amount=' + this.amount;
    console.log('pay url ' + pay_url);
    let cur_win = window.open(pay_url, '_blank', 'location=yes,height=570,width=520,scrollbars=yes,status=yes');

    setInterval(() => {
      console.log('in set interval every second');
      if (!cur_win.isSecureContext) {
        console.log('in closed window');
        console.log(JSON.parse(localStorage.getItem('currentUser'))['subscription'][0]['ACCOUNT_STATUS']);
        JSON.parse(localStorage.getItem('currentUser'))['subscription'][0]['ACCOUNT_STATUS'] = 'active';
        this.paymentstatus = JSON.parse(localStorage.getItem('currentUser'))['userinfo'][0]['paid_registration_fee'];
        console.log('status checking true or false' + this.paymentstatus);
        if (this.paymentstatus == true) {
          console.log('true condition checking');
          this.users.logout();
          // window.alert('checking');
        } else {
          // window.alert('reload checking');
          this.route.navigate(['dashboard']);
        }
      } else {
        console.log('in not closed window');
      }
    }, 1000);

  }

}
