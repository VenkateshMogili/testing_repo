import {Component, OnInit} from '@angular/core';
import {UserServiceService} from "../user-service.service";
import {FormControl, NgForm, FormGroupDirective, Validators} from "@angular/forms";
import {ErrorStateMatcher} from "@angular/material";


/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit {
  model: any = {};
  sent: boolean = false;
  err: boolean = false;
  load: boolean = false;
  result: string;
  inputChecking = new FormControl('', [
    Validators.required
  ]);
  matcher = new MyErrorStateMatcher();

  constructor(private users: UserServiceService) {
  }

  ngOnInit() {
  }

  pwd_reset () {
    this.load = true;
    if (this.model.email) {
      this.users.reset_password(this.model.email)
        .subscribe(data => {
          if (data['success']) {
            this.sent = true;
            this.load = false;
            this.result = 'Reset link sent to your email';
            alert('Reset Link sent to your email');
          } else {
            this.sent = false;
            this.load = false;
            this.err = true;
            this.result = 'Please enter correct email address';
            alert('Please enter correct email address');
          }
        });
    }
  }
}
