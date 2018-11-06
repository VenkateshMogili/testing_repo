import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {UserServiceService} from "../user-service.service";
import {NgForm, FormGroupDirective, FormControl, Validators} from "@angular/forms";
import {ErrorStateMatcher} from "@angular/material";


/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  id: any;
  model: any = {};
  load: boolean = false;
  sent: boolean = false;
  result: string;
  inputChecking = new FormControl('', [
    Validators.required
  ]);
  matcher = new MyErrorStateMatcher();

  constructor(private route: ActivatedRoute, private users: UserServiceService, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(param => {
      this.id = param['id'];
    });
  }
  create_password(){
    this.load = true;
    this.sent = false;
    this.result = '';
    console.log('data');
    console.log(this.model['password']);
    if(this.model['password']===this.model['cpassword']){
      this.users.updatePassword(JSON.stringify(this.model['password']), this.id)
        .subscribe(data=>{
          console.log(data['success']);
          console.log('result data' + JSON.stringify(data));

          if(data['success']==true){
            this.load = false;
            this.sent = true;
            this.result = 'Password created successfully...';
            alert('Password created successfully...');
            this.router.navigate(['/home/doctor-log-in']);
          } else{
            this.load = false;
            this.result = 'Server Error';
            alert('Server Error');
          }
        })
    } else{
      this.load = false;
      this.result = 'Passwords are not matching';
      alert('Passwords are not matching');
    }
  }

}
