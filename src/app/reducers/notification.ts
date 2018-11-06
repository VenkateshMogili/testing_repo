import * as notification from '../actions/notification';

export function reducer(state = [], action: notification.AddNotification) {
  switch (action.type) {
    case notification.NOTIFICATIONADD:
      return state.concat(action.payload).filter((obj, pos, arr) => {
        return arr.map(mapObj => mapObj['booking_id']).indexOf(obj['booking_id']) === pos;
      });
    case notification.NOTIFICATIONREMOVE:
      return state.filter(function (el) {
        return el.booking_id != action.payload[0].booking_id;
      });
    default:
      return state;
  }
}


export function questionreducer(state = [], action: notification.QuestionNotificationAdd) {
  switch (action.type) {
    case notification.QUESTIONADD:
      return state.concat(action.payload).filter((obj, pos, arr) => {
        return arr.map(mapObj => mapObj['q_id']).indexOf(obj['q_id']) === pos;
      });

    case notification.QUESTIONREMOVE:
      console.log('in remove question notification');
      console.log(action.payload[0].q_id);
      return state.filter(function (el) {
        return el.q_id != action.payload[0].q_id;
      });

    default:
      return state;
  }
}

export function consultationreducer(state = [], action: notification.ConsultationRemainderAdd) {
  switch (action.type) {
    case notification.REMINDERNADD:
      return state.concat(action.payload).filter((obj, pos, arr) => {
        return arr.map(mapObj => mapObj['booking_id']).indexOf(obj['booking_id']) === pos;
      });
    case notification.REMINDERREMOVE:
      return state.filter(function (el) {
        return el.booking_id != action.payload[0].booking_id;
      });
    default:
      return state;
  }
}
