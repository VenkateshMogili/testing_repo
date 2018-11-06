import {Component, ElementRef, OnDestroy, OnInit, ViewChild, ChangeDetectorRef} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CurrentPatientService} from '../current-patient.service';
import {UserServiceService} from '../user-service.service';
import {Store} from '@ngrx/store';
import * as fromRoot from '../reducers';
import {Observable} from 'rxjs/Observable';
import {ToastyConfig, ToastyService} from 'ng2-toasty';
import {ConsultationRemainder, NewNotification, Notification, QuestionNotification} from '../models/notification';
import {HttpErrorResponse} from '@angular/common/http';
import {AddNotification} from '../actions/notification';
import {MediaMatcher} from '@angular/cdk/layout';
declare var Pusher: any;


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',

  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  private loading: any = true;

  @ViewChild('openModal') openModal: ElementRef;
  @ViewChild('openModale') openModale: ElementRef;
  @ViewChild('openModalre') openModalre: ElementRef;
  headeuser: any;
  public notifications$: Observable<Notification>;
  id: any;
  cdate = new Date();
  public que_noti$: Observable<QuestionNotification>;
  public con_rem_noti$: Observable<ConsultationRemainder>;
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;
  constructor(private userservice: UserServiceService, changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private route: ActivatedRoute,
              private router: Router, private pushPatient: CurrentPatientService, private users: UserServiceService, public store: Store<fromRoot.State>,
              private toastyService: ToastyService, private toastyConfig: ToastyConfig) {
    this.toastyConfig.theme = 'bootstrap';
    this.toastyConfig.position = 'top-right';
    this.notifications$ = store.select(fromRoot.getNotifications);
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    this.que_noti$ = store.select(fromRoot.getQuestionNotifications);
    this.con_rem_noti$ = store.select(fromRoot.getConsultationReminder);
    this.headeuser = JSON.parse(localStorage.getItem('currentUser'));
  }
  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
  ngOnInit() {
    console.log('stara');
    this.id = this.headeuser['userinfo'][0]['doctor_id_c'];
    this.get_consult_noti(this.headeuser['userinfo'][0]['doctor_id_c']);
    // if (this.headeuser['subscription'][0]['ACCOUNT_STATUS'] === 'inactive') {
    //   // console.log('yes');
    //   //this.openModal.nativeElement.click();
    // }
    // if (this.headeuser['subscription'][0]['SUBS_EXPIRY_DATE']) {
    //   if (this.cdate > this.headeuser['subscription'][0]['SUBS_EXPIRY_DATE']) {
    //     // console.log('yes');
    //     //this.openModale.nativeElement.click();
    //   }
    // }
    // if (this.headeuser['userinfo'][0]['ref_email1'] === null ||
    //   this.headeuser['userinfo'][0]['ref_email2'] === null
    //   || this.headeuser['userinfo'][0]['ref_email3'] === null) {
    //   // console.log('yes');
    //   //this.openModalre.nativeElement.click();
    // }


    // this.cdate = new date();
  }

  get_consult_noti(id) {
    console.log('method');
    this.userservice.notifications_consult(id).subscribe(
      payload => {
        console.log('responce in quesans  --------------');
        console.log(payload);

        for(var i=0; i < payload['data'].length; i++) {
          console.log(i);
          this.store.dispatch(new AddNotification([new NewNotification(payload['data'][i]['doctor_id_c'], payload['data'][i]['booking_type'], payload['data'][i]['booking_id'], payload['data'][i]['pat_image'])]));
        }

      },
      (err: HttpErrorResponse) => {
        console.log('errore----------------');
        if (err.error instanceof Error) {
          console.log('An error occurred:', err.error.message);
        } else {
          console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
        }
      }
    );
  }

  open_pay_monthly() {
    this.router.navigate(['/dashboard/pricing']);
  }

  open_pay_anually() {
    this.router.navigate(['/dashboard/automatic-pricing/'], {queryParams: {page: 'renewal'}});
  }

  public logout() {
    this.users.logout();
  }


}
