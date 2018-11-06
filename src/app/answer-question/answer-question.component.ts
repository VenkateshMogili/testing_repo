import {Component, OnInit} from '@angular/core';
import {UserServiceService} from '../user-service.service';
import {ActivatedRoute, Router} from '@angular/router';
import {QuestionNotificationRemove} from '../actions/notification';
import {NewQuestionNotification} from '../models/notification';
import {Store} from '@ngrx/store';
import * as fromRoot from '../reducers';

@Component({
  selector: 'app-answer-question',
  templateUrl: './answer-question.component.html',
  styleUrls: ['./answer-question.component.css']
})
export class AnswerQuestionComponent implements OnInit {
  ques: any;
  q_id: any;
  p_id: any;
  amodel: any = {};
  headeuser: any;

  constructor(private userService: UserServiceService, private route: ActivatedRoute, private router: Router, public store: Store<fromRoot.State>) {
  }

  ngOnInit() {
    this.headeuser = JSON.parse(localStorage.getItem('currentUser'));
    this.route.params.subscribe(params => {
      this.q_id = params['q_id'];
      this.question_details(this.q_id);
    });
  }

  createRange(number) {
    var items: number[] = [];
    for (var i = 0; i <= number - 1; i++) {
      items.push(i);
    }
    return items;
  }

  Range(number) {
    var items: number[] = [];
    for (var i = 0; i <= number - 1; i++) {
      items.push(i);
    }
    return items;
  }

  question_details(id) {
    this.userService.GetQuestionDetails(id)
      .subscribe(
        data => {
          this.ques = data['data'];
          this.p_id = data['data'][0]['patient_id_c'];
          console.log(this.p_id);
          console.log('I CANT SEE DATA of Archiving Details : ', this.ques);
        }
      );
  }

  post_answer() {
    if (this.amodel.answer == null) {
      alert('Please fill all fields');
    } else {
      this.amodel.doc_name = this.headeuser['userinfo'][0]['name'];
      this.amodel.doc_image = this.headeuser['userinfo'][0]['image'];
      this.amodel.q_id = this.q_id;
      this.amodel.patient_id_c = this.p_id;
      console.log(this.amodel);
      this.userService.Answerpost(this.amodel, this.headeuser['userinfo'][0]['doctor_id_c'])
        .subscribe(
          data1 => {
            if (data1['success']) {

              console.log('in resoponce from server success');
              this.store.dispatch(new QuestionNotificationRemove([new NewQuestionNotification('xxx', 'xxx', 'xxx', 'xxx', this.q_id)]));
              alert('Answer posted successfully');
            }
          }
        );
    }
  }
}
