import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Headers, Http, RequestOptions, Response} from '@angular/http';
import {AngularFireDatabase} from 'angularfire2/database';
import {AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase';
import {ActivatedRoute, Router} from '@angular/router';
import 'rxjs/add/operator/map';

@Injectable()
export class UserServiceService {
  messaging = firebase.messaging();
  user: any;

  constructor(private http: Http, private hc: HttpClient, private db: AngularFireDatabase, private afAuth: AngularFireAuth, private route: ActivatedRoute, private router: Router) {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
  }


  updatePersonalDetails(course) {
    return this.http.put('https://therightdoctors.com/api/beta/medhub/create-cart?key=7xOyNH554tY83cBN7Ktpw3s1y68ql6Eg',
      course, this.jwt()).map((response: Response) => response.json());
  }

  patient_quesans(id) {
    return this.hc.get('https://therightdoctors.com/api/beta/opm/doctor/all/questions/' + id + '?token=trd_token&key=7xOyNH554tY83cBN7Ktpw3s1y68ql6Eg');
  }

  end_consult(booking_id, data) {
    return this.http.post('https://therightdoctors.com/api/beta/opm/patient/video_consultation_booking/endcall/'+booking_id+'?token=trd_token&key=7xOyNH554tY83cBN7Ktpw3s1y68ql6Eg',
      {'json': data}, this.jwt()).map((response: Response) => response.json());
  }

  answer(id) {
    return this.hc.get('https://therightdoctors.com/api/beta/opm/patient/all/answers/' + id + '?token=trd_token&key=7xOyNH554tY83cBN7Ktpw3s1y68ql6Eg');
  }

  Registration(user) {
    console.log(user);
    return this.http.post('https://therightdoctors.com/api/beta/opm/user/register?key=7xOyNH554tY83cBN7Ktpw3s1y68ql6Eg&role=doctor',
      user, this.jwt()).map((response: Response) => response.json());
  }

  Add_Patient(user, id) {
    return this.http.post('https://therightdoctors.com/api/beta/opm/doctor/register/patient?doctor_id=' + id + '&key=7xOyNH554tY83cBN7Ktpw3s1y68ql6Eg&token=trd_token',
      user, this.jwt()).map((response: Response) => response.json());
  }

  personal_details(personal_data, id) {
    // let data = JSON.stringify(personal_data);
    return this.http.put('https://therightdoctors.com/api/beta/opm/doctor/ref_details/' + id + '?token=trd_token&key=7xOyNH554tY83cBN7Ktpw3s1y68ql6Eg', personal_data, this.jwt()).map((response: Response) => response.json());
  }

  bank_details(personal_data, id) {
     let data = JSON.stringify(personal_data);
    return this.http.put('https://therightdoctors.com/api/beta/opm/doctor/bank/' + id + '?token=trd_token&key=7xOyNH554tY83cBN7Ktpw3s1y68ql6Eg', {'json': data}, this.jwt()).map((response: Response) => response.json());
  }

  edu_details(personal_data, id) {
     let data = JSON.stringify(personal_data);
    return this.http.put('https://therightdoctors.com/api/beta/opm/doctor/degree/' + id + '?token=trd_token&key=7xOyNH554tY83cBN7Ktpw3s1y68ql6Eg', {'json': data}, this.jwt()).map((response: Response) => response.json());
  }
  professional_details(personal_data, id) {
    let data = JSON.stringify(personal_data);
    return this.http.put('https://therightdoctors.com/api/beta/opm/doctor/hospital/' + id + '?token=trd_token&key=7xOyNH554tY83cBN7Ktpw3s1y68ql6Eg', {'json': data}, this.jwt()).map((response: Response) => response.json());
  }

  sendone_ref(id) {
    return this.http.get('https://therightdoctors.com/api/beta/opm/doctor/sendmail/reftwo/' + id + '?token=trd_token&key=7xOyNH554tY83cBN7Ktpw3s1y68ql6Eg',
      this.jwt()).map((response: Response) => response.json());
  }

  sendtwo_ref(id) {
    return this.http.get('https://therightdoctors.com/api/beta/opm/doctor/sendmail/refthree/' + id + '?token=trd_token&key=7xOyNH554tY83cBN7Ktpw3s1y68ql6Eg',
      this.jwt()).map((response: Response) => response.json());
  }

  sendthree_ref(id) {
    return this.http.get('https://therightdoctors.com/api/beta/opm/doctor/sendmail/' + id + '?token=trd_token&key=7xOyNH554tY83cBN7Ktpw3s1y68ql6Eg',
      this.jwt()).map((response: Response) => response.json());
  }

  getAllCountries() {
    return this.http.get('https://therightdoctors.com/api/beta/opm/country/?token=trd_token&key=7xOyNH554tY83cBN7Ktpw3s1y68ql6Eg',
      this.jwt()).map((response: Response) => response.json());
  }

  getAllStates(id) {
    return this.http.get('https://therightdoctors.com/api/beta/opm/state/?token=trd_token&country_id=' + id + '&key=7xOyNH554tY83cBN7Ktpw3s1y68ql6Eg',
      this.jwt()).map((response: Response) => response.json());
  }

  getAllCities(id) {
    return this.http.get('https://therightdoctors.com/api/beta/opm/city/?token=trd_token&state_id=' + id + '&key=7xOyNH554tY83cBN7Ktpw3s1y68ql6Eg',
      this.jwt()).map((response: Response) => response.json());
  }

  getAllpatient_list(id) {
    return this.hc.get('https://therightdoctors.com/api/beta/opm/doctor/patient-list/%27' + id + '%27?token=trd_token&key=7xOyNH554tY83cBN7Ktpw3s1y68ql6Eg');
  }

  prescription_list(id) {
    return this.http.get('https://therightdoctors.com/api/beta/opm/prescription?id=%27' + id + '%27&token=trd_token&key=7xOyNH554tY83cBN7Ktpw3s1y68ql6Eg',
      this.jwt()).map((response: Response) => response.json());
  }

  single_prescription(id) {
    return this.http.get('https://therightdoctors.com/api/beta/opm/prescription/updated_listone/patient/%27' + id + '%27?token=trd_token&key=7xOyNH554tY83cBN7Ktpw3s1y68ql6Eg',
      this.jwt()).map((response: Response) => response.json());
  }

  single_prescription_adherence(id) {
    return this.http.get('https://therightdoctors.com/api/beta/opm/patient/adherence/' + id + '?token=trd_token&key=7xOyNH554tY83cBN7Ktpw3s1y68ql6Eg',
      this.jwt()).map((response: Response) => response.json());
  }

  hospital_single_Details(id) {
    return this.http.get('https://therightdoctors.com/api/beta/opm/doctor/hospital/one/record/' + id + '?token=trd_token&key=7xOyNH554tY83cBN7Ktpw3s1y68ql6Eg',
      this.jwt()).map((response: Response) => response.json());
  }

  hospital_Details(id) {
    return this.http.get('https://therightdoctors.com/api/beta/opm/doctor/hospital/' + id + '?token=trd_token&key=7xOyNH554tY83cBN7Ktpw3s1y68ql6Eg',
      this.jwt()).map((response: Response) => response.json());
  }

   // my

  hospital_D(id) {
    return this.http.get('https://therightdoctors.com/api/beta/opm/patient/hospital/' + id + '?token=trd_token&key=7xOyNH554tY83cBN7Ktpw3s1y68ql6Eg',
      this.jwt()).map((response: Response) => response.json());
  }

  // my

  doctor_general_details(id) {
    return this.http.get('https://therightdoctors.com/api/beta/opm/doctor/list/' + id + '?token=trd_token&key=7xOyNH554tY83cBN7Ktpw3s1y68ql6Eg',
      this.jwt()).map((response: Response) => response.json());
  }

  update_hospital(finaljson, id) {
    console.log('I am in service file of update_hospital function');
    return this.hc.put('https://therightdoctors.com/api/beta/opm/doctor/hospital/settings/' + id + '?token=trd_token&key=7xOyNH554tY83cBN7Ktpw3s1y68ql6Eg', {'json': finaljson});
  }

  Degree_Details(id) {
    return this.http.get('https://therightdoctors.com/api/beta/opm/doctor/degree/' + id + '?token=trd_token&key=7xOyNH554tY83cBN7Ktpw3s1y68ql6Eg',
      this.jwt()).map((response: Response) => response.json());
  }

  prescription_mail(id) {
    return this.http.get('https://therightdoctors.com/api/beta/opm/prescription/sendmail/%27' + id + '%27?token=trd_token&key=7xOyNH554tY83cBN7Ktpw3s1y68ql6Eg',
      this.jwt()).map((response: Response) => response.json());
  }

  consultationHistory(type, id) {
    return this.http.get('https://therightdoctors.com/api/beta/opm/patient/completed/requests/' + id + '?token=trd_token&type=' + type + '&key=7xOyNH554tY83cBN7Ktpw3s1y68ql6Eg',
      this.jwt()).map((response: Response) => response.json());
  }

  confirmedConsultation(type, id) {
    return this.http.get('https://therightdoctors.com/api/beta/opm/patient/confirmed/requests/' + id + '?token=trd_token&type=' + type + '&key=7xOyNH554tY83cBN7Ktpw3s1y68ql6Eg',
      this.jwt()).map((response: Response) => response.json());
  }

  notifications_consult(id) {
    return this.http.get('https://therightdoctors.com/api/beta/opm/doctor/consultation/list/' + id + '?token=trd_token&key=7xOyNH554tY83cBN7Ktpw3s1y68ql6Eg',
      this.jwt()).map((response: Response) => response.json());
  }

  PendingConsultation(type, id) {
    return this.http.get('https://therightdoctors.com/api/beta/opm/patient/booking/requests/' + id + '?token=trd_token&type=' + type + '&key=7xOyNH554tY83cBN7Ktpw3s1y68ql6Eg',
      this.jwt()).map((response: Response) => response.json());
  }

// need to change in rest-api
  UpdateConsultation(model, id) {
    let data = JSON.stringify(model);
    return this.http.put('https://therightdoctors.com/api/beta/opm/patient/video_consultation_booking/' + id + '?token=trd_token&key=7xOyNH554tY83cBN7Ktpw3s1y68ql6Eg', {'json': data},
      this.jwt()).map((response: Response) => response.json());
  }



  UpdateDoctorDetails(data, id) {
    return this.hc.put('https://therightdoctors.com/api/beta/opm/doctor/bank/' + id + '?token=trd_token&key=7xOyNH554tY83cBN7Ktpw3s1y68ql6Eg', {'json': data});
  }


  updatePasswords(finaljson, id) {
    return this.hc.put('https://therightdoctors.com/api/beta/opm/doctor/update/passwords/' + id + '?token=trd_token&key=7xOyNH554tY83cBN7Ktpw3s1y68ql6Eg', {'json':finaljson});
  }
  updatePassword(finaljson, id) {
    return this.hc.put('https://therightdoctors.com/api/beta/opm/doctor/update/password/' + id + '?token=trd_token&key=7xOyNH554tY83cBN7Ktpw3s1y68ql6Eg', {'json':finaljson});
  }
  get_charges_availabilty(id, day) {
    console.log('in get charges day');
    return this.hc.get<Array<string>>('https://therightdoctors.com/api/beta/opm/doctor/check_charges_slot/' + id + '/' + day + '?token=trd_token&key=7xOyNH554tY83cBN7Ktpw3s1y68ql6Eg');
  }

  updateChart(name, id) {
    return this.hc.post('https://therightdoctors.com/api/beta/opm/doctor/settings/chart/' + id + '?token=trd_token&key=7xOyNH554tY83cBN7Ktpw3s1y68ql6Eg', {'name': name});
  }

  SingleConsultation(type, id) {
    return this.http.get('https://therightdoctors.com/api/beta/opm/patient/booking/request/' + id + '?token=trd_token&key=7xOyNH554tY83cBN7Ktpw3s1y68ql6Eg',
      this.jwt()).map((response: Response) => response.json());
  }

  GetQuestionDetails(id) {
    return this.http.get('https://therightdoctors.com/api/beta/opm/patient/see_qtion/' + id + '?token=trd_token&key=7xOyNH554tY83cBN7Ktpw3s1y68ql6Eg',
      this.jwt()).map((response: Response) => response.json());
  }

  Answerpost(personal_data, id) {
    return this.http.post('https://therightdoctors.com/api/beta/opm/patient/post_answer/' + id + '?token=trd_token&key=7xOyNH554tY83cBN7Ktpw3s1y68ql6Eg',
      personal_data, this.jwt()).map((response: Response) => response.json());
  }

  Invoice_list(id) {
    return this.http.get('https://therightdoctors.com/api/beta/opm/doctor/invoice/list/' + id + '?token=trd_token&key=7xOyNH554tY83cBN7Ktpw3s1y68ql6Eg',
      this.jwt()).map((response: Response) => response.json());
  }

  Consultation_Invoice_view(id) {
    return this.http.get('https://therightdoctors.com/api/beta/opm/patient/booking/request/' + id + '?token=trd_token&key=7xOyNH554tY83cBN7Ktpw3s1y68ql6Eg',
      this.jwt()).map((response: Response) => response.json());
  }

  get_patient(id) {
    return this.http.get('https://therightdoctors.com/api/beta/opm/patient/' + id + '?token=trd_token&key=7xOyNH554tY83cBN7Ktpw3s1y68ql6Eg',
      this.jwt()).map((response: Response) => response.json());
  }

  get_list(id, d_id) {
    return this.http.get('https://therightdoctors.com/api/beta/opm/doctor-patient/all/requests/' + id + '?token=trd_token&doctor_id_c=' + d_id + '&key=7xOyNH554tY83cBN7Ktpw3s1y68ql6Eg',
      this.jwt()).map((response: Response) => response.json());
  }

  patient_prescriptions(id) {
    return this.http.get('https://therightdoctors.com/api/beta/opm/patient-prescriptions?id=%27' + id + '%27&token=trd_token&key=7xOyNH554tY83cBN7Ktpw3s1y68ql6Eg',
      this.jwt()).map((response: Response) => response.json());
  }

  doctor_archiving(id) {
    return this.http.get('https://therightdoctors.com/api/beta/opm/doctor_archving/' + id + '?key=7xOyNH554tY83cBN7Ktpw3s1y68ql6Eg&token=trd_token',
      this.jwt()).map((response: Response) => response.json());
  }

  reference_confirm_update(personal_data, id) {
    return this.http.put('https://therightdoctors.com/api/beta/opm/doctor/ref_details/' + id + '?token=trd_token&key=7xOyNH554tY83cBN7Ktpw3s1y68ql6Eg',
      personal_data, this.jwt()).map((response: Response) => response.json());
  }

  reference_confirm_get(id) {
    return this.http.get('https://therightdoctors.com/api/beta/opm/ref/doctor1/cnfm/' + id + '?token=trd_token&key=7xOyNH554tY83cBN7Ktpw3s1y68ql6Eg',
      this.jwt()).map((response: Response) => response.json());
  }

  reference_confirm_congrates(id) {
    return this.http.get('https://therightdoctors.com/api/beta/opm/doctor1/congrates/' + id + '?token=trd_token&key=7xOyNH554tY83cBN7Ktpw3s1y68ql6Eg',
      this.jwt()).map((response: Response) => response.json());
  }

  reference2_confirm_get(id) {
    return this.http.get('https://therightdoctors.com/api/beta/opm/ref/doctor2/cnfm/' + id + '?token=trd_token&key=7xOyNH554tY83cBN7Ktpw3s1y68ql6Eg',
      this.jwt()).map((response: Response) => response.json());
  }

  reference2_confirm_congrates(id) {
    return this.http.get('https://therightdoctors.com/api/beta/opm/doctor2/congrates/' + id + '?token=trd_token&key=7xOyNH554tY83cBN7Ktpw3s1y68ql6Eg',
      this.jwt()).map((response: Response) => response.json());
  }

  reference3_confirm_get(id) {
    return this.http.get('https://therightdoctors.com/api/beta/opm/ref/doctor3/cnfm/' + id + '?token=trd_token&key=7xOyNH554tY83cBN7Ktpw3s1y68ql6Eg',
      this.jwt()).map((response: Response) => response.json());
  }

  reference3_confirm_congrates(id) {
    return this.http.get('https://therightdoctors.com/api/beta/opm/doctor3/congrates/' + id + '?token=trd_token&key=7xOyNH554tY83cBN7Ktpw3s1y68ql6Eg',
      this.jwt()).map((response: Response) => response.json());
  }

  reference3_unconfirm_get(id) {
    return this.http.get('https://therightdoctors.com/api/beta/opm/ref/doctor3/uncnfm/' + id + '?token=trd_token&key=7xOyNH554tY83cBN7Ktpw3s1y68ql6Eg',
      this.jwt()).map((response: Response) => response.json());
  }

  reference3_unconfirm_congrates(id) {
    return this.http.get('https://therightdoctors.com/api/beta/opm/doctor3/uncnfm/' + id + '?token=trd_token&key=7xOyNH554tY83cBN7Ktpw3s1y68ql6Eg',
      this.jwt()).map((response: Response) => response.json());
  }

  reference2_unconfirm_get(id) {
    return this.http.get('https://therightdoctors.com/api/beta/opm/ref/doctor2/uncnfm/' + id + '?token=trd_token&key=7xOyNH554tY83cBN7Ktpw3s1y68ql6Eg',
      this.jwt()).map((response: Response) => response.json());
  }

  reference2_unconfirm_congrates(id) {
    return this.http.get('https://therightdoctors.com/api/beta/opm/doctor2/uncnfm/' + id + '?token=trd_token&key=7xOyNH554tY83cBN7Ktpw3s1y68ql6Eg',
      this.jwt()).map((response: Response) => response.json());
  }

  reference1_unconfirm_get(id) {
    return this.http.get('https://therightdoctors.com/api/beta/opm/ref/doctor1/uncnfm/' + id + '?token=trd_token&key=7xOyNH554tY83cBN7Ktpw3s1y68ql6Eg',
      this.jwt()).map((response: Response) => response.json());
  }

  reference1_unconfirm_congrates(id) {
    return this.http.get('https://therightdoctors.com/api/beta/opm/doctor1/uncnfm/' + id + '?token=trd_token&key=7xOyNH554tY83cBN7Ktpw3s1y68ql6Eg',
      this.jwt()).map((response: Response) => response.json());
  }


// need to change in rest-api
  Add_hospital_details(hospital) {

    let data = JSON.stringify(hospital);
    /*console.log(hospital);
    this.jsonv = {
     'json': hospital
    };*/
    console.log(data);
    return this.hc.post('https://therightdoctors.com/api/beta/opm/doctor/hospital/list/table?token=trd_token&key=7xOyNH554tY83cBN7Ktpw3s1y68ql6E', {'json': data});

  }

  savePrescription(finalJson) {
    return this.hc.post('https://therightdoctors.com/api/beta/opm/prescription?key=7xOyNH554tY83cBN7Ktpw3s1y68ql6Eg&token=trd_token',
      {'json': finalJson});
  }

  updatePrescription(finalJson, key) {
    return this.hc.put('https://therightdoctors.com/api/beta/opm/prescription?key=7xOyNH554tY83cBN7Ktpw3s1y68ql6Eg&token=trd_token',
      {'json': finalJson});
  }

  setAvailability(availability) {
    return this.hc.post('https://therightdoctors.com/api/beta/opm/doctor/set/consulation-charges?key=7xOyNH554tY83cBN7Ktpw3s1y68ql6Eg&token=trd_token',
      {'json': availability});
  }


  logout() {
    console.log('in logout fuction');
    // remove user from local storage to log user out
    const lostruser = JSON.parse(localStorage.getItem('currentUser'));
    const temp = JSON.parse(localStorage.getItem('trddpmdoctorfcmtoken'));
    console.log(lostruser);
    console.log(temp);
    let keys = [];
    for (let k in temp) {
      keys.push(k);
    }
    this.db.object('doctors/' + lostruser['userinfo'][0]['doctor_id_c'] + '/fcmtokens/' + temp[keys[0]]).remove()
      .then(res => {
        console.log('removed user token from datatse');
        console.log(res);
        localStorage.removeItem('trddpmdoctorfcmtoken');
        localStorage.removeItem('currentUser');
        this.router.navigate(['home']);
      }).catch((err) => {
      console.log('Unable to remove token from databse.');
      console.log(err);
    });
  }

  private jwt() {
    // create authorization header with jwt token
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser && currentUser.token) {
      let headers = new Headers({'Authorization': 'Bearer ' + currentUser.token});
      return new RequestOptions({headers: headers});
    }
  }

  reset_password(email) {
    return this.hc.get('https://therightdoctors.com/api/beta/opm/doctor/forgot/password/' + email + '?token=trd_token&key=7xOyNH554tY83cBN7Ktpw3s1y68ql6Eg');
  }
}
