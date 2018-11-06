import {Component, OnInit} from '@angular/core';
import {UserServiceService} from '../user-service.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-doctor-pricing-automatic',
  templateUrl: './doctor-pricing-automatic.component.html',
  styleUrls: ['./doctor-pricing-automatic.component.css']
})
export class DoctorPricingAutomaticComponent implements OnInit {
  renewal: any;
  amount: any;

  constructor(private userService: UserServiceService, private router: ActivatedRoute, private route: Router) {
  }

  ngOnInit() {
    this.router.queryParams.subscribe(params => {
      this.renewal = params['page'];
    });
  }

  openWin(plan) {
    if (plan === 'basic') {
      /*var ba = 1000 + (0.18 * 100);*/
      const ba = 1;
      this.amount = ba;
    } else {
      if (plan === 'medium') {
        const md = 1200 + (0.18 * 110);
        this.amount = md;
      } else {
        const adv = 1500 + (0.18 * 120);
        this.amount = adv;
      }

    }
    console.log('open paymenet window');
    const user_id = JSON.parse(localStorage.getItem('currentUser'))['userinfo'][0]['doctor_id_c'];
    if (this.renewal === 'renewal') {
      const pay_url = 'https://therightdoctors.com/api/beta/opm/doctor/payment/recurring/subscription/upgrade?key=7xOyNH554tY83cBN7Ktpw3s1y68ql6Eg&token=trd_token&doctor_id_c=' + user_id + '&plan=' + plan + '&amount=' + this.amount;
      console.log('pay url' + pay_url);
      const cur_win = window.open(pay_url, '_blank', 'location=yes,height=570,width=520,scrollbars=yes,status=yes');

      setInterval(() => {
        console.log('in set interval every second');
        if (!cur_win.isSecureContext) {
          console.log('in closed window');
          console.log(JSON.parse(localStorage.getItem('currentUser'))['subscription'][0]['ACCOUNT_STATUS']);
          JSON.parse(localStorage.getItem('currentUser'))['subscription'][0]['ACCOUNT_STATUS'] = 'active';
          this.route.navigate(['dashboard']);
          window.location.reload();
        } else {
          console.log('in not closed window');
        }
      }, 1000);

    } else {
      const pay_url = 'https://therightdoctors.com/api/beta/opm/doctor/payment/recurring/subscription?key=7xOyNH554tY83cBN7Ktpw3s1y68ql6Eg&token=trd_token&doctor_id_c=' + user_id + '&plan=' + plan + '&amount=' + this.amount;
      console.log('pay url' + pay_url);
      let cur_win = window.open(pay_url, '_blank', 'location=yes,height=570,width=520,scrollbars=yes,status=yes');

      setInterval(() => {
        console.log('in set interval every second');
        if (!cur_win.isSecureContext) {
          console.log('in closed window');
          console.log(JSON.parse(localStorage.getItem('currentUser'))['subscription'][0]['ACCOUNT_STATUS']);
          JSON.parse(localStorage.getItem('currentUser'))['subscription'][0]['ACCOUNT_STATUS'] = 'active';
          this.route.navigate(['dashboard']);
          window.location.reload();
        } else {
          console.log('in not closed window');
        }
      }, 1000);
    }

  }

}
