export interface Notification {
  doctor_id_c: string;
  booking_type: string;
  booking_id: number;
  pat_img: string;
}

export class NewNotification implements Notification {
  public doctor_id_c: string;
  public booking_type: string;
  public booking_id: number;
  public pat_img: string;

  constructor(doctor_id_c: string, booking_type: string, booking_id: number, pat_img: string) {
    this.doctor_id_c = doctor_id_c;
    this.booking_type = booking_type;
    this.booking_id = booking_id;
    this.pat_img = pat_img;
  }
}


export interface QuestionNotification {
  doctor_id_c: string;
  pat_image: string;
  pat_name: string;
  patient_id_c: string;
  q_id: number;

}

export class NewQuestionNotification implements QuestionNotification {
  doctor_id_c: string;
  pat_image: string;
  pat_name: string;
  patient_id_c: string;
  q_id: number;

  constructor(doctor_id_c: string, pat_image: string, pat_name: string, patient_id_c: string, q_id: number) {
    this.doctor_id_c = doctor_id_c;
    this.pat_image = pat_image;
    this.pat_name = pat_name;
    this.patient_id_c = patient_id_c;
    this.q_id = q_id;
  }
}


export interface ConsultationRemainder {
  doctor_id_c: string;
  booking_type: string;
  booking_id: string;
  pat_img: string;

}

export class NewConsultationRemainder implements ConsultationRemainder {
  doctor_id_c: string;
  booking_type: string;
  booking_id: string;
  pat_img: string;

  constructor(doctor_id_c: string, booking_type: string, booking_id: string, pat_img: string) {
    this.doctor_id_c = doctor_id_c;
    this.booking_type = booking_type;
    this.booking_id = booking_id;
    this.pat_img = pat_img;
  }
}

