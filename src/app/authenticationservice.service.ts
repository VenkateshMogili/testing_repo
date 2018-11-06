import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';


@Injectable()
export class AuthenticationserviceService {

  constructor(private httpclient: HttpClient) {
  }

  login(username: string, password: string) {
    return this.httpclient.get('https://therightdoctors.com/api/beta/opm/doctor/authenticate?role=doctor&email=' + username + '&password=' + password + '&key=7xOyNH554tY83cBN7Ktpw3s1y68ql6Eg');

  }

  logout() {
    console.log(localStorage.getItem('currentUser'));
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    localStorage.removeItem('course_id');
  }

  get_local_storage_user() {
    console.log(localStorage.getItem('currentUser'));
    // remove user from local storage to log user out
    return localStorage.getItem('currentUser');
  }

}
