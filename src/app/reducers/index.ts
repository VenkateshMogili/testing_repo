import * as fromNotification from './notification';
import {ConsultationRemainder, Notification, QuestionNotification} from '../models/notification';

export interface State {
  notifications: Notification;
  questionnotifications: QuestionNotification;
  consultationreminder: ConsultationRemainder;
}

export const reducers = {
  notifications: fromNotification.reducer,
  questionnotifications: fromNotification.questionreducer,
  consultationreminder: fromNotification.consultationreducer,
};


export const getNotifications = (state: State) => state.notifications;
export const getQuestionNotifications = (state: State) => state.questionnotifications;
export const getConsultationReminder = (state: State) => state.consultationreminder;


