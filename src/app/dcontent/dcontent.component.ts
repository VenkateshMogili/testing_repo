import {Component, Inject, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {CurrentPatientService} from '../current-patient.service';
import {UserServiceService} from '../user-service.service';
import {MessagingService} from '../messaging.service';
import {moment} from 'ngx-bootstrap/chronos/test/chain';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { DataService1 } from './DataService';
import {Observable} from 'rxjs/Observable';
import {Notification} from '../models/notification';

@Component({
  selector: 'app-dcontent',
  templateUrl: './dcontent.component.html',
  styleUrls: ['./dcontent.component.css']
})
export class DcontentComponent implements OnInit {
  // @ViewChild('openModal') openModal: ElementRef;
  prescriptionForm: FormGroup;
  cloneform: any;
  hospi_list: [{}];
  user: any;
  selectPatient: any = null;
  cdate = new Date();
  hos: any;
  model: any = {};
  message: any;
  headeuser: any;
  hospital_id: any;
  id: any;
  soh: {};
  hos1: any;
  left1: any;
  left2: any;
  left3: any;
  right1: any;
  right2: any;
  right3: any;
  check: any = 0;
  constructor(public dialog: MatDialog, private _fb: FormBuilder,
              private ADServics: DataService1, public dialog1: MatDialog,
              private route: ActivatedRoute, private router: Router,
              private scPatient: CurrentPatientService, private service: UserServiceService,
              private msgService: MessagingService) {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    console.log(this.user);
    this.hos = this.user['hosp_list'][0];
  //  this.hos1 = this.user['hosp_list'][0];

  }

  get medicine_list(): FormArray {
    return this.prescriptionForm.get('medicine_list') as FormArray;
  }

  ngOnInit() {

    // const dialogRef1 = this.dialog1.open(PaymentComponent, {
    //   width: '500px',
    //   // height: '300px',
    //   data: {  }
    // });
    //
    // const dialogRef = this.dialog.open(WarningComponent, {
    //   width: '500px',
    //   // height: '300px',
    //   data: {  }
    // });
    if (this.user['subscription'][0]['ACCOUNT_STATUS'] === 'inactive') {
      const dialogRef1 = this.dialog1.open(PaymentComponent, {
        width: '500px',
        // height: '300px',
        data: {  }
      }) ;
    }
    if (this.user['subscription'][0]['SUBS_EXPIRY_DATE'] === 'inactive') {
      if (this.cdate > this.user['subscription'][0]['SUBS_EXPIRY_DATE']) {
        const dialogRef1 = this.dialog1.open(PaymentComponent, {
          width: '500px',
          // height: '300px',
          data: {  }
        }) ;
      }
    }


    if (this.user['userinfo'][0]['ref_email1'] === null ||
      this.user['userinfo'][0]['ref_email2'] === null
      || this.user['userinfo'][0]['ref_email3'] === null) {
      const dialogRef = this.dialog.open(WarningComponent, {
        width: '500px',
        // height: '300px',
        data: {  }
      });
    }
    if (this.user['userinfo'][0]['provisional_setup_page'] === 'true') {
      if (this.user['userinfo'][0]['cnfm_ref1'] === 'false' &&
        this.user['userinfo'][0]['cnfm_ref2'] === 'false' &&
        this.user['userinfo'][0]['cnfm_ref3'] === 'false') {
        console.log('yes');
        alert('Verification from one of the references submitted by you is still pending');
      }

    }
    this.get_hos();
    this.ADServics.currentMessage.subscribe(message => this.hos = message);
    /*console.log(this.date);
    console.log(moment(this.now, 'MM-DD-YYYY'));*/

    this.msgService.getPermission();
    this.msgService.receiveMessage();
    this.message = this.msgService.currentMessage;
    /*if (this.user['subscription'][0]['ACCOUNT_STATUS'] === 'inactive') {
      this.openModal.nativeElement.click();
    }*/

    this.scPatient.currentPatient.subscribe(scpatient => this.selectPatient = scpatient);
    console.log('in ng init prescription', this.selectPatient);
    this.prescriptionForm = this._fb.group({
      doctor_id: this.user['userinfo'][0]['doctor_id_c'],
      patient_id: this.selectPatient['patient_id_c'],
      doctor_note: '',
      investigation_name: '',
      clinical_impression: '',
      doc_hos_id: '',
      medicine_list: this._fb.array([]),
    });
    this.addNewRow();
    this.soh = this.selectPatient.doc_hospital_id;
    console.log(this.soh);
    this.get_dos();
  }
  get_hos() {
    this.service.hospital_Details(JSON.parse(localStorage.getItem('currentUser'))['userinfo'][0]['doctor_id_c']).subscribe(
      data2 => {
        console.log(data2['data']);
        this.hos = data2['data'][0];
        this.left1 = this.hos['cn'];
        this.left2 = this.hos['hc'];
        this.left3 = this.hos['cp'];
        console.log('I CANT SEE DATA of other hospital_list : ', this.hos);
      }
    );
  }

  get_dos() {
    this.service.hospital_single_Details(this.soh).subscribe(
      data2 => {
        this.hos = data2['data'][0];
        console.log('Patient hospital_list : ', this.hos);
      }
    );
  }

  addNewRow() {
    const control = <FormArray>this.prescriptionForm.controls['medicine_list'];
    const newmedicine = this.initContractQM();
    console.log(newmedicine.controls.hasOwnProperty('Start_Date'));
    control.push(newmedicine);
  }

  initContractQM() {
    return this._fb.group({
      name: '',
      frequency: '',
      frequency_2: '',
      frequency_3: '',
      duration: '',
      unit: '',
      start_date_time: null,
      end_date_time: null,
      special_instruction: '',
      dose: '',
      administer_route: '',
      drug_form: '',
      no_of_medicine: '',
      BB: false,
      AB: false,
      BL: false,
      AL: false,
      BD: false,
      AD: false,
      patient_mail: this.selectPatient['email'],
      doctor_name: this.user['userinfo'][0]['name'],
      patient_name: this.selectPatient['name'],
      patient_id_c: this.selectPatient['patient_id_c'],
      reminder_zone: 'asia/india',
      sir_m: false,
      sir_a: false,
      sir_e: false
    });
  }

  deleteRow(index: number) {
    const control = <FormArray>this.prescriptionForm.controls['medicine_list'];
    control.removeAt(index);
  }

  onSubmit(form) {
    console.log('in on subbmit');
    console.log(form);
      form.doc_hos_id = this.hos['doctor_hospital_list_id'];
    form.doctor_hospital_id = this.hos['doctor_hospital_list_id'];

    console.log(form);
    this.service.savePrescription(JSON.stringify(form)).subscribe(responce => {
      console.log('prescription saved');
      console.log(responce);
      if (responce['success']) {
        this.router.navigate(['/dashboard/prescription-view/' + responce['id']]);
      }
    }, error => {
      console.log(error);
    });
  }

  preview(form) {
    console.log('in preview');
    console.log(form);
    this.router.navigate(['/preview']);

  }

  change_hospital(hos_id) {
    console.log('in change hospital3');
    this.hospital_id = hos_id;
    const index = this.user['hosp_list'].findIndex((function (item, i) {
      return item.doctor_hospital_list_id === hos_id;
    }));
     this.hos = this.user['hosp_list'][index];

    this.ADServics.changeMessage(this.hos);
    console.log('Hii1' + this.hos['cn']);
  }

  // add_hos() {
  //   console.log('add new hospital');
  //   this.model['doctor_id_c'] = this.user['userinfo'][0]['doctor_id_c'];
  //   console.log(this.model);
  //   this.service.Add_hospital_details(this.model).subscribe(responce => {
  //     console.log('hospital saved');
  //     console.log(responce);
  //     if (responce['success']) {
  //       console.log('sussecus');
  //     }
  //   }, error => {
  //     console.log('erroe');
  //     console.log(error);
  //   });
  // }


  addP(): void {
    const dialogRef = this.dialog.open(AddpatientComponent, {
      width: '420px',
      height: '700px',
      data: {  }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  editP(): void {
    const dialogRef = this.dialog.open(EditpatientComponent, {
      width: '420px',
      height: '700px',
      data: {  }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}
//
// export class MyErrorStateMatcher implements ErrorStateMatcher {
//   isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
//     const isSubmitted = form && form.submitted;
//     return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
//   }
// }

@Component({
  selector: 'app-acontent',
  templateUrl: './addpatient.component.html',
})
export class AddpatientComponent implements OnInit{
  emailFormControl = new FormControl('', [
    Validators.required,
  ]);
  prescriptionForm: FormGroup;
  cloneform: any;
  hospi_list: [{}];
  user: any;
  selectPatient: any = null;
  cdate = new Date();
  hos: {};
  model: any = {};
  message: any;
  constructor(private _fb: FormBuilder, private route: ActivatedRoute,
              private router: Router, private scPatient: CurrentPatientService,
              private service: UserServiceService, private msgService: MessagingService,
              public dialogRef: MatDialogRef<AddpatientComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    console.log(this.user);
    this.hos = this.user['hosp_list'][0];

  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  get medicine_list(): FormArray {
    return this.prescriptionForm.get('medicine_list') as FormArray;
  }
  add_hos() {
    console.log('add new hospital');
    this.model['doctor_id_c'] = this.user['userinfo'][0]['doctor_id_c'];
    console.log(this.model);
    this.service.Add_hospital_details(this.model).subscribe(responce => {
      console.log('hospital saved');
      console.log(responce);
      if (responce['success']) {
        console.log('sussecus');
      }
    }, error => {
      console.log('erroe');
      console.log(error);
    });
  }
  ngOnInit() {
    this.get_hos();
    /*console.log(this.date);
    console.log(moment(this.now, 'MM-DD-YYYY'));*/

    this.msgService.getPermission();
    this.msgService.receiveMessage();
    this.message = this.msgService.currentMessage;
    /*if (this.user['subscription'][0]['ACCOUNT_STATUS'] === 'inactive') {
      this.openModal.nativeElement.click();
    }*/

    this.scPatient.currentPatient.subscribe(scpatient => this.selectPatient = scpatient);
    console.log('in ng init prescription', this.selectPatient);
    this.prescriptionForm = this._fb.group({
      doctor_id: this.user['userinfo'][0]['doctor_id_c'],
      patient_id: this.selectPatient['patient_id_c'],
      doctor_note: '',
      investigation_name: '',
      clinical_impression: '',
      medicine_list: this._fb.array([]),
    });
    this.addNewRow();
  }
  get_hos() {
    this.service.hospital_Details(JSON.parse(localStorage.getItem('currentUser'))['userinfo'][0]['doctor_id_c']).subscribe(
      data2 => {
        this.hos = data2['data'][0];
        console.log('I CANT SEE DATA of other hospital_list : ', this.hos);
      }
    );
  }

  addNewRow() {
    const control = <FormArray>this.prescriptionForm.controls['medicine_list'];
    const newmedicine = this.initContractQM();
    console.log(newmedicine.controls.hasOwnProperty('Start_Date'));
    control.push(newmedicine);
  }

  initContractQM() {
    return this._fb.group({
      name: '',
      frequency: '',
      frequency_2: '',
      frequency_3: '',
      duration: '',
      unit: '',
      start_date_time: null,
      end_date_time: null,
      special_instruction: '',
      dose: '',
      administer_route: '',
      drug_form: '',
      no_of_medicine: '',
      BB: false,
      AB: false,
      BL: false,
      AL: false,
      BD: false,
      AD: false,
      patient_mail: this.selectPatient['email'],
      doctor_name: this.user['userinfo'][0]['name'],
      patient_name: this.selectPatient['name'],
      patient_id_c: this.selectPatient['patient_id_c'],
      reminder_zone: 'asia/india',
      sir_m: false,
      sir_a: false,
      sir_e: false
    });
  }

  deleteRow(index: number) {
    const control = <FormArray>this.prescriptionForm.controls['medicine_list'];
    control.removeAt(index);
  }
  close() {
    this.dialogRef.close();
  }

  onSubmit(form) {
    console.log('in on subbmit');
    console.log(form);
    this.service.savePrescription(JSON.stringify(form)).subscribe(responce => {
      console.log('prescription saved');
      console.log(responce);
      if (responce['success']) {
        this.router.navigate(['/dashboard/prescription-view/' + responce['id']]);
      }
    }, error => {
      console.log(error);
    });
  }

  preview(form) {
    console.log('in preview');
    console.log(form);
    this.router.navigate(['/preview']);

  }

  change_hospital(hos_id) {
    console.log('in change hospital1');
    console.log('Id:-' + hos_id);

    const index = this.user['hosp_list'].findIndex((function (item, i) {
      return item.doctor_hospital_list_id === hos_id;
    }));
    this.hos = this.user['hosp_list'][index];
  }

  // add_hos() {
  //   console.log('add new hospital');
  //   this.model['doctor_id_c'] = this.user['userinfo'][0]['doctor_id_c'];
  //   console.log(this.model);
  //   this.service.Add_hospital_details(this.model).subscribe(responce => {
  //     console.log('hospital saved');
  //     console.log(responce);
  //     if (responce['success']) {
  //       console.log('sussecus');
  //     }
  //   }, error => {
  //     console.log('erroe');
  //     console.log(error);
  //   });
  // }


  // addP(): void {
  //   const dialogRef = this.dialog.open(AddpatientComponent, {
  //     width: '550px',
  //     data: {  }
  //   });
  //
  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log('The dialog was closed');
  //   });
  // }

}






@Component({
  selector: 'app-econtent',
  templateUrl: './editpatient.component.html',
})
export class EditpatientComponent implements OnInit{
  emailFormControl = new FormControl('', [
    Validators.required,
  ]);
  prescriptionForm: FormGroup;
  cloneform: any;
  hospi_list: [{}];
  user: any;
  selectPatient: any = null;
  cdate = new Date();
  hos: {};
  model: any = {};
  message: any;
  hospital_id: any;
  constructor(private _fb: FormBuilder, private route: ActivatedRoute,
              private ADService: DataService1,
              private router: Router, private scPatient: CurrentPatientService,
              private service: UserServiceService, private msgService: MessagingService,
              public dialogRef: MatDialogRef<EditpatientComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    console.log(this.user);
    this.hos = this.user['hosp_list'][0];

  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  get medicine_list(): FormArray {
    return this.prescriptionForm.get('medicine_list') as FormArray;
  }
  add_hos() {
    console.log('add new hospital');
    this.model['doctor_id_c'] = this.user['userinfo'][0]['doctor_id_c'];
    console.log(this.model);
    this.service.Add_hospital_details(this.model).subscribe(responce => {
      console.log('hospital saved');
      console.log(responce);
      if (responce['success']) {
        console.log('sussecus');
      }
    }, error => {
      console.log('erroe');
      console.log(error);
    });
  }
  ngOnInit() {
    this.get_hos();
    /*console.log(this.date);
    console.log(moment(this.now, 'MM-DD-YYYY'));*/

    this.msgService.getPermission();
    this.msgService.receiveMessage();
    this.message = this.msgService.currentMessage;
    /*if (this.user['subscription'][0]['ACCOUNT_STATUS'] === 'inactive') {
      this.openModal.nativeElement.click();
    }*/

    this.scPatient.currentPatient.subscribe(scpatient => this.selectPatient = scpatient);
    console.log('in ng init prescription', this.selectPatient);
    this.prescriptionForm = this._fb.group({
      doctor_id: this.user['userinfo'][0]['doctor_id_c'],
      patient_id: this.selectPatient['patient_id_c'],
      doctor_note: '',
      investigation_name: '',
      clinical_impression: '',
      medicine_list: this._fb.array([]),
    });
    this.addNewRow();
  }
  get_hos() {
    this.service.hospital_Details(JSON.parse(localStorage.getItem('currentUser'))['userinfo'][0]['doctor_id_c']).subscribe(
      data2 => {
        this.hos = data2['data'][0];
        console.log('I CANT SEE DATA of other hospital_list : ', this.hos);
      }
    );
  }

  addNewRow() {
    const control = <FormArray>this.prescriptionForm.controls['medicine_list'];
    const newmedicine = this.initContractQM();
    console.log(newmedicine.controls.hasOwnProperty('Start_Date'));
    control.push(newmedicine);
  }

  initContractQM() {
    return this._fb.group({
      name: '',
      frequency: '',
      frequency_2: '',
      frequency_3: '',
      duration: '',
      unit: '',
      start_date_time: null,
      end_date_time: null,
      special_instruction: '',
      dose: '',
      administer_route: '',
      drug_form: '',
      no_of_medicine: '',
      BB: false,
      AB: false,
      BL: false,
      AL: false,
      BD: false,
      AD: false,
      patient_mail: this.selectPatient['email'],
      doctor_name: this.user['userinfo'][0]['name'],
      patient_name: this.selectPatient['name'],
      patient_id_c: this.selectPatient['patient_id_c'],
      reminder_zone: 'asia/india'
    });
  }

  deleteRow(index: number) {
    const control = <FormArray>this.prescriptionForm.controls['medicine_list'];
    control.removeAt(index);
  }

  onSubmit(form) {
    console.log('in on subbmit');
    console.log(form);
    form.doc_hos_id = this.hospital_id;
    this.service.savePrescription(JSON.stringify(form)).subscribe(responce => {
      console.log('prescription saved');
      console.log(responce);
      if (responce['success']) {
        this.router.navigate(['/dashboard/prescription-view/' + responce['id']]);
      }
    }, error => {
      console.log(error);
    });
  }

  preview(form) {
    console.log('in preview');
    console.log(form);
    this.router.navigate(['/preview']);

  }

  change_hospital(hos_id) {
    console.log('in change hospital2');
    console.log('ID' + hos_id);
    console.log('What happen');
    this.hospital_id = hos_id;
    const index = this.user['hosp_list'].findIndex((function (item, i) {
      return item.doctor_hospital_list_id === hos_id;
    }));
    this.hos = this.user['hosp_list'][index];
    console.log(this.hos);
    this.ADService.changeMessage(this.hos);
    console.log('Hii2' + this.hos['cn']);
    console.log('Hii2' + this.hos['cp']);
    this.dialogRef.close();
  }

  // add_hos() {
  //   console.log('add new hospital');
  //   this.model['doctor_id_c'] = this.user['userinfo'][0]['doctor_id_c'];
  //   console.log(this.model);
  //   this.service.Add_hospital_details(this.model).subscribe(responce => {
  //     console.log('hospital saved');
  //     console.log(responce);
  //     if (responce['success']) {
  //       console.log('sussecus');
  //     }
  //   }, error => {
  //     console.log('erroe');
  //     console.log(error);
  //   });
  // }


  // addP(): void {
  //   const dialogRef = this.dialog.open(AddpatientComponent, {
  //     width: '550px',
  //     data: {  }
  //   });
  //
  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log('The dialog was closed');
  //   });
  // }


}

// export class MyErrorStateMatcher implements ErrorStateMatcher {
//   isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
//     const isSubmitted = form && form.submitted;
//     return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
//   }




@Component({
  selector: 'app-warning',
  templateUrl: './warning.component.html',
})
export class WarningComponent implements OnInit{
  emailFormControl = new FormControl('', [
    Validators.required,
  ]);
  prescriptionForm: FormGroup;
  cloneform: any;
  hospi_list: [{}];
  user: any;
  selectPatient: any = null;
  cdate = new Date();
  hos: {};
  model: any = {};
  message: any;
  constructor(private _fb: FormBuilder, private route: ActivatedRoute, public dialog: MatDialog,
              private ADService: DataService1,
              private router: Router, private scPatient: CurrentPatientService,
              private service: UserServiceService, private msgService: MessagingService,
              public dialogRef5: MatDialogRef<WarningComponent>,
              public dialogRef7: MatDialogRef<PaymentComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    console.log(this.user);
    this.hos = this.user['hosp_list'][0];

  }
  pay() {
    this.dialogRef5.close();
    this.dialogRef7.close();
  }
  ngOnInit() {

  }
}





@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
})
export class PaymentComponent implements OnInit {
  emailFormControl = new FormControl('', [
    Validators.required,
  ]);
  prescriptionForm: FormGroup;
  cloneform: any;
  hospi_list: [{}];
  user: any;
  selectPatient: any = null;
  cdate = new Date();
  hos: {};
  model: any = {};
  message: any;
  constructor(private _fb: FormBuilder, private route: ActivatedRoute,
              private ADService: DataService1,
              private router: Router, private scPatient: CurrentPatientService,
              private service: UserServiceService, private msgService: MessagingService,
              public dialogRef5: MatDialogRef<PaymentComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    console.log(this.user);
    this.hos = this.user['hosp_list'][0];

  }
  pay() {
    this.dialogRef5.close();
  }
  ngOnInit() {
  }



}





// ---------------------------------last-------------------------------
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }

}
