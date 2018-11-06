import {Component, OnInit} from '@angular/core';
import {UserServiceService} from '../user-service.service';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-question-nswers',
  templateUrl: './question-nswers.component.html',
  styleUrls: ['./question-nswers.component.css']
})
export class QuestionNswersComponent implements OnInit {
  quesans_arr: [{}] = [{}];
  ans_arr: [{}] = [{}];
  user: any;
  daa: boolean;
  patientid: any;
  p: number = 1;
  constructor(private service: UserServiceService) {
  }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    this.daa = false;
    this.quesans();
  }

  function (id) {
    console.log('I am in funbct');

    this.service.answer(id).subscribe(
      data => {
        console.log('responce in quesans  --------------');
        console.log(JSON.stringify(data));
        this.ans_arr = data['data'];
        console.log(this.ans_arr);
        this.daa = true;

      });
  }

  quesans() {
    console.log('I am in quesans function');
    this.service.patient_quesans(this.user['userinfo'][0]['doctor_id_c']).subscribe(
      data => {
        console.log('responce in quesans  --------------');
        console.log(data);
        console.log(JSON.stringify(data));
        this.quesans_arr = data['data'];
        // this.patientid = data['patient_id_c'];
        console.log(this.quesans_arr);

        /*let user = response.json();*/
        /*if (data['success'] /!*&& user.token*!/) {
          console.log('in true only');
          let user = data;
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
          }else {
          console.log('user does not exists');
        }*/
      },
      (err: HttpErrorResponse) => {
        console.log('errore----------------');
        if (err.error instanceof Error) {
          // A client-side or network error occurred. Handle it accordingly.
          console.log('An error occurred:', err.error.message);
        } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong,
          console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
        }
      }
    );

  }

}
