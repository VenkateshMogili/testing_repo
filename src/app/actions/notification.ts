import {NewConsultationRemainder, NewQuestionNotification, Notification} from '../models/notification';
import {Action} from '@ngrx/store';

export const NOTIFICATIONADD = '[Notification] add';
export const NOTIFICATIONREMOVE = '[Notification] remove';
export const QUESTIONADD = '[Question] add';
export const QUESTIONREMOVE = '[Question] remove';
export const REMINDERNADD = '[Reminder] add';
export const REMINDERREMOVE = '[Reminder] remove';

export class AddNotification implements Action {
  type = NOTIFICATIONADD;

  constructor(public payload: Notification[]) {
  }
}


export class RemoveNotification extends AddNotification {
  type = NOTIFICATIONREMOVE;
  //constructor(public payload: number) {
  //}
  //constructor(public payload: Notification[])
  //{
  //  console.log('removing data...' + JSON.stringify(payload));
  //  super(payload);
  //}
}


export class QuestionNotificationAdd implements Action {
  type = QUESTIONADD;

  constructor(public payload: NewQuestionNotification[]) {
  }
}


export class QuestionNotificationRemove extends QuestionNotificationAdd {
  type = QUESTIONREMOVE;
  /* constructor(public payload: NewQuestionNotification[]) {}*/
}


export class ConsultationRemainderAdd implements Action {
  type = REMINDERNADD;

  constructor(public payload: NewConsultationRemainder[]) {
  }
}

export class ConsultationRemainderRemove extends ConsultationRemainderAdd {
  type = REMINDERREMOVE;
  /*constructor(public payload: NewConsultationRemainder[]) {}*/
}
