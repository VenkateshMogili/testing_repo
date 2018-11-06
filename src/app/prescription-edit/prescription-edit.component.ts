import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UserServiceService} from '../user-service.service';
import {FormArray, FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {CurrentPatientService} from '../current-patient.service';
import {ToastyConfig, ToastyService} from 'ng2-toasty';
import {ErrorStateMatcher} from '@angular/material/core';
import {MessagingService} from '../messaging.service';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {AddpatientComponent, EditpatientComponent} from '../dcontent/dcontent.component';
import { DataService9 } from './DataService';

export class SP {
  doctor_id = '';
  patient_id = '';
  doctor_note = '';
  investigation_name = '';
  clinical_impression = '';
  prescription_record_id_c = '';
  doc_hos_id = '';
}

export class Pm {
  json: Presm[];
}

export class Presm {
  name = '';
  frequency = '';
  frequency_2 = '';
  frequency_3 = '';
  duration = '';
  unit = '';
  start_date_time = null;
  end_date_time = null;
  special_instruction = '';
  dose = '';
  administer_route = '';
  drug_form = '';
  no_of_medicine = '';
  BB = false;
  AB = false;
  BL = false;
  AL = false;
  BD = false;
  AD = false;
  patient_mail = '';
  doctor_name = '';
  patient_name = '';
  prescription_id_c = '';
  med_type = '';
}

@Component({
  selector: 'app-prescription-edit',
  templateUrl: './prescription-edit.component.html',
  styleUrls: ['./prescription-edit.component.css']
})


export class PrescriptionEditComponent implements OnInit {
  @ViewChild('openModal') openModal: ElementRef;
  prescriptionForm: FormGroup;
  cloneform: any;
  user: any;
  p_id: any;
  selectPatient: any = null;
  prescription: any;
  pre_list: any;
  hospital_list: any;
  doc_details: any;
  degree_list: any;
  key: any;
  patient_id: any;
  hos: {};
  hos1: any;
  soh: any;
  model: any = {};
  hospital_id: any;
  message: any;
  view: boolean = true;

  constructor(public dialog: MatDialog, private _fb: FormBuilder, private route: ActivatedRoute,
              private router: Router, private scPatient: CurrentPatientService, private ADServics: DataService9,
              private service: UserServiceService, private toastyService: ToastyService, private toastyConfig: ToastyConfig) {
    this.toastyConfig.theme = 'bootstrap';
    this.toastyConfig.position = 'bottom-right';
  }


  addH(): void {
    const dialogRef = this.dialog.open(AddhospitalComponent, {
      width: '420px',
      data: {  }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  editP(): void {
    const dialogRef = this.dialog.open(EditpComponent, {
      width: '420px',
      height: '700px',
      data: {  }
    });
    this.view = false;
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }


  get medicine_list(): FormArray {
    return this.prescriptionForm.get('medicine_list') as FormArray;
  }
  change_hospital(hos_id) {
    console.log('in change hospital');
    this.hospital_id = hos_id;
    const index = this.user['hosp_list'].findIndex((function (item, i) {
      return item.doctor_hospital_list_id === hos_id;
    }));
    this.hos = this.user['hosp_list'][index];
    this.ADServics.changeMessage(this.hos);
    this.hospital_list[0]['doctor_hospital_list_id'] = this.hos['doctor_hospital_list_id'];
    console.log('Hii1' + this.hos);
  }

  ngOnInit() {
    this.doc_details = JSON.parse(localStorage.getItem('currentUser'))['userinfo'];
    this.route.params.subscribe(params => {
      this.key = params['key'];
    });
    this.get_degree(JSON.parse(localStorage.getItem('currentUser'))['userinfo'][0]['doctor_id_c']);
    this.get_single_prescription(this.key);
    console.log('Param Key' + this.key);
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    console.log(this.user);

    if (this.user['subscription'][0]['ACCOUNT_STATUS'] === 'inactive') {
      this.openModal.nativeElement.click();
    }
    this.scPatient.currentPatient.subscribe(scpatient => this.selectPatient = scpatient);
    console.log('in ng init prescription', this.selectPatient);

    this.prescriptionForm = this._fb.group({
      doctor_id: this.user['userinfo'][0]['doctor_id_c'],
      patient_id: '',
      doctor_note: '',
      investigation_name: '',
      clinical_impression: '',
      prescription_record_id_c: this.key,
      doc_hos_id: '',
      medicine_list: this._fb.array([]),
    });
    this.addNewRow();
  //  this.get_hos();
 //   this.get_dos();
    this.ADServics.currentMessage.subscribe(message => this.hos = message);
  }
  // get_hos() {
  //   this.service.hospital_Details(JSON.parse(localStorage.getItem('currentUser'))['userinfo'][0]['doctor_id_c']).subscribe(
  //     data2 => {
  //       this.hos = data2['data'][0];
  //       console.log('I CANT SEE DATA of other hospital_ : ', this.hos);
  //     }
  //   );
  //
  // }
      // this.service.hospital_single_Details(JSON.parse(localStorage.getItem('currentUser'))['userinfo'][0]['doctor_id_c']).subscribe(
      //   data1 => {
      //     this.hos = data1['data'];
      //     console.log('I CANT SEE DATA of single hospital_list rdx : ', this.hos);
      //   }
      // );


  //
  // get_dos() {
  //   console.log('sending' + this.soh);
  //   this.service.hospital_single_Details(this.soh).subscribe(
  //     data2 => {
  //       this.hos1 = data2['data'][0];
  //       console.log('Patient hospital_list hiii : ', this.hos1);
  //     }
  //   );
  // }

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
      BB: '',
      AB: '',
      BL: '',
      AL: '',
      BD: '',
      AD: '',
      patient_mail: this.selectPatient['email'],
      doctor_name: this.user['userinfo'][0]['name'],
      patient_name: this.selectPatient['name'],
      prescription_id_c: this.p_id,
      med_type: 'new',
      sir_m: '',
      sir_a: '',
      sir_e: ''
    });
  }

  deleteRow(index: number) {
    const control = <FormArray>this.prescriptionForm.controls['medicine_list'];
    control.removeAt(index);
    console.log('Delete' + index);
  }

  open_pay_monthly() {
    this.router.navigate(['/dashboard/pricing']);
  }

  open_pay_anually() {
    this.router.navigate(['/dashboard/automatic-pricing/'], {queryParams: {page: 'renewal'}});
  }

  onSubmit(form) {
    console.log('in on subbmit');
    form.patient_id = this.patient_id;
    form.doc_hos_id = this.hos['doctor_hospital_list_id'];
    console.log(form);
    for (let i = 0; i < form.medicine_list.length ; i++) {
      delete form.medicine_list[i].doctor_note;
      delete form.medicine_list[i].investigation_name;
      delete form.medicine_list[i].clinical_impression;
      form.medicine_list[i].patient_mail =  form.medicine_list[i].patient_email;
      delete form.medicine_list[i].patient_email;
      if (form.medicine_list[i].med_type) {
        console.log('t');
      } else {
        console.log('f');
        form.medicine_list[i].med_type = 'old';
      }
    }
    this.service.updatePrescription(JSON.stringify(form), this.key).subscribe(responce => {
      console.log(responce);
      if (responce['success']) {
        alert('Prescription Changes Saved Successfully');
      }
    }, error => {
      console.log(error);
    });
  }

  get_degree(id) {
    this.service.Degree_Details(id).subscribe(
      datad => {
        this.degree_list = datad['data'];
        console.log('I CANT SEE DATA of hospital_list : ', this.degree_list);
      }
    );
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

  get_single_prescription(key) {
    console.log('Key' + key);
    // this.service.single_prescription(key).subscribe(
    //   data => {
    //     console.log(data);
    //     this.prescription = data['data'];
    //     this.pre_list = data['data'];
    //     this.p_id = data['data'][0]['med_id'];
    //     this.patient_id = data['data'][0]['patient_id_c'];
    //     console.log(this.patient_id);
    //     console.log('aaa' + data['data'][0]['patient_id_c']);
    //     for (let i = 0; i < this.pre_list.length; i++) {
    //       this.pre_list[i]['name'] = this.pre_list[i]['medicine'];
    //       // delete this.pre_list[i]['medicine'];
    //       /*delete this.pre_list[i]['clinical_impression'];
    //       delete this.pre_list[i]['investigation_name'];
    //       delete this.pre_list[i]['doctor_note'];*/
    //       delete this.pre_list[i]['doc_hos_id'];
    //       delete this.pre_list[i]['changed_on_d'];
    //       delete this.pre_list[i]['gender'];
    //       delete this.pre_list[i]['age'];
    //       delete this.pre_list[i]['med_history'];
    //       delete this.pre_list[i]['l_name'];
    //       delete this.pre_list[i]['patient_mobile'];
    //
    //       delete this.pre_list[i]['doctor_city'];
    //       delete this.pre_list[i]['did'];
    //       delete this.pre_list[i]['lname'];
    //       delete this.pre_list[i]['qualification'];
    //       delete this.pre_list[i]['specialty'];
    //       delete this.pre_list[i]['licence_number'];
    //       delete this.pre_list[i]['doctor_mobile'];
    //       delete this.pre_list[i]['doctor_email'];
    //
    //       // delete this.pre_list[i]['clinical_impression'];
    //       // delete this.pre_list[i]['investigation_name'];
    //       //  delete this.pre_list[i]['doctor_note'];
    //
    //       // delete this.pre_list[i]['patient_email'];
    //
    //       if (this.pre_list[i]['AB'] === '1') {
    //         this.pre_list[i]['AB'] = true;
    //       }
    //       if (this.pre_list[i]['AB'] === '0') {
    //         this.pre_list[i]['AB'] = false;
    //       }
    //       if (this.pre_list[i]['BB'] === '1') {
    //         this.pre_list[i]['BB'] = true;
    //       }
    //       if (this.pre_list[i]['BB'] === '0') {
    //         this.pre_list[i]['BB'] = false;
    //       }
    //
    //       if (this.pre_list[i]['AL'] === '1') {
    //         this.pre_list[i]['AL'] = true;
    //       }
    //       if (this.pre_list[i]['AL'] === '0') {
    //         this.pre_list[i]['AL'] = false;
    //       }
    //
    //       if (this.pre_list[i]['BL'] === '1') {
    //         this.pre_list[i]['BL'] = true;
    //       }
    //       if (this.pre_list[i]['BL'] === '0') {
    //         this.pre_list[i]['BL'] = false;
    //       }
    //
    //       if (this.pre_list[i]['AD'] === '1') {
    //         this.pre_list[i]['AD'] = true;
    //       }
    //       if (this.pre_list[i]['AD'] === '0') {
    //         this.pre_list[i]['AD'] = false;
    //       }
    //
    //       if (this.pre_list[i]['BD'] === '1') {
    //         this.pre_list[i]['BD'] = true;
    //       }
    //       if (this.pre_list[i]['BD'] === '0') {
    //         this.pre_list[i]['BD'] = false;
    //       }
    //       /*this.pre_list.patchValue({
    //         name: this.pre_list[i]['medicine'],
    //
    //         //investigation_name: this.prescription[0]['investigation_name'],
    //       //  doctor_note: this.prescription[0]['doctor_note'],
    //         // formControlName2: myValue2 (can be omitted)
    //       });*/
    //       delete this.pre_list[i]['medicine'];
    //
    //     }
    //
    //     console.log(this.pre_list);;
    //     this.setAddresses(this.pre_list);
    //
    //     this.prescriptionForm.patchValue({
    //       clinical_impression: this.prescription[0]['clinical_impression'],
    //       investigation_name: this.prescription[0]['investigation_name'],
    //       doctor_note: this.prescription[0]['doctor_note'],
    //       // formControlName2: myValue2 (can be omitted)
    //     });
    //
    //     console.log('I CANT SEE DATA of prescription_list : ', this.prescription);
    //     console.log('Hiiii' + data['data'][0]);
    //     console.log('Hiii2' + data['data'][0]['medicine']);
    //     if (data['data'][0]['doc_hos_id']) {
    //       this.service.hospital_single_Details(data['data'][0]['doc_hos_id']).subscribe(
    //         data1 => {
    //           this.hospital_list = data1['data'];
    //           console.log('I CANT SEE DATA of hospital_list : ', this.hospital_list);
    //         });
    //
    //     } else {
    //       this.service.hospital_Details(JSON.parse(localStorage.getItem('currentUser'))['userinfo'][0]['doctor_id_c']).subscribe(
    //         data2 => {
    //           this.hospital_list = data2['data'];
    //           console.log('I CANT SEE DATA of hospital_list : ', this.hospital_list);
    //         }
    //       );
    //     }
    //   }
    // );

    this.service.single_prescription(key).subscribe(
      data => {
        console.log('ghk'+ data);
        this.prescription = data['data'];
        this.soh = data['data'][0]['doc_hos_id'];
        console.log(this.soh);
        console.log('I CANT SEE DATA of prescription_list : ', this.prescription);
            this.prescription = data['data'];
            this.pre_list = data['data'];
            this.p_id = data['data'][0]['prescription_id_c'];
            console.log('Venky' + this.p_id);
            this.patient_id = data['data'][0]['patient_id_c'];
            console.log('hello' + this.patient_id);
            console.log('aaa' + data['data'][0]['patient_id_c']);
            for (let i = 0; i < this.pre_list.length; i++) {
              this.pre_list[i]['name'] = this.pre_list[i]['medicine'];
              // delete this.pre_list[i]['medicine'];
              /*delete this.pre_list[i]['clinical_impression'];
              delete this.pre_list[i]['investigation_name'];
              delete this.pre_list[i]['doctor_note'];*/
              delete this.pre_list[i]['doc_hos_id'];
              delete this.pre_list[i]['changed_on_d'];
              delete this.pre_list[i]['gender'];
              delete this.pre_list[i]['age'];
              delete this.pre_list[i]['med_history'];
              delete this.pre_list[i]['l_name'];
              delete this.pre_list[i]['patient_mobile'];

              delete this.pre_list[i]['doctor_city'];
              delete this.pre_list[i]['did'];
              delete this.pre_list[i]['lname'];
              delete this.pre_list[i]['qualification'];
              delete this.pre_list[i]['specialty'];
              delete this.pre_list[i]['licence_number'];
              delete this.pre_list[i]['doctor_mobile'];
              delete this.pre_list[i]['doctor_email'];

              // delete this.pre_list[i]['clinical_impression'];
              // delete this.pre_list[i]['investigation_name'];
              //  delete this.pre_list[i]['doctor_note'];

              // delete this.pre_list[i]['patient_email'];

              if (this.pre_list[i]['AB'] === '1') {
                this.pre_list[i]['AB'] = true;
              }
              if (this.pre_list[i]['AB'] === '0') {
                this.pre_list[i]['AB'] = false;
              }
              if (this.pre_list[i]['BB'] === '1') {
                this.pre_list[i]['BB'] = true;
              }
              if (this.pre_list[i]['BB'] === '0') {
                this.pre_list[i]['BB'] = false;
              }

              if (this.pre_list[i]['AL'] === '1') {
                this.pre_list[i]['AL'] = true;
              }
              if (this.pre_list[i]['AL'] === '0') {
                this.pre_list[i]['AL'] = false;
              }

              if (this.pre_list[i]['BL'] === '1') {
                this.pre_list[i]['BL'] = true;
              }
              if (this.pre_list[i]['BL'] === '0') {
                this.pre_list[i]['BL'] = false;
              }

              if (this.pre_list[i]['AD'] === '1') {
                this.pre_list[i]['AD'] = true;
              }
              if (this.pre_list[i]['AD'] === '0') {
                this.pre_list[i]['AD'] = false;
              }

              if (this.pre_list[i]['BD'] === '1') {
                this.pre_list[i]['BD'] = true;
              }
              if (this.pre_list[i]['BD'] === '0') {
                this.pre_list[i]['BD'] = false;
              }
              /*this.pre_list.patchValue({
                name: this.pre_list[i]['medicine'],

                //investigation_name: this.prescription[0]['investigation_name'],
              //  doctor_note: this.prescription[0]['doctor_note'],
                // formControlName2: myValue2 (can be omitted)
              });*/
              delete this.pre_list[i]['medicine'];

            }

            console.log('suv' + this.pre_list);
            this.setAddresses(this.pre_list);

            this.prescriptionForm.patchValue({
              clinical_impression: this.prescription[0]['clinical_impression'],
              investigation_name: this.prescription[0]['investigation_name'],
              doctor_note: this.prescription[0]['doctor_note'],
              // formControlName2: myValue2 (can be omitted)
            });

        if (this.soh) {
          console.log('in have hospital id');
          this.service.hospital_single_Details(this.soh).subscribe(
            data1 => {
              this.hos = data1['data'];
              console.log('I CANT SEE DATA of single hospital_list rdx : ', this.hos);
            }
          );
        }
        // } else {
        //   console.log('in set by default hospital');
        //   // this.hospital_list = JSON.parse(localStorage.getItem('currentUser'))['hosp_list'];
        //   this.service.hospital_Details(JSON.parse(localStorage.getItem('currentUser'))['userinfo'][0]['doctor_id_c']).subscribe(
        //     data2 => {
        //       this.hos = data2['data'];
        //       console.log('I CANT SEE DATA of other hospital_list rdx1 : ', this.hos);
        //     }
        //   );
        // }
      }
    );
  }

  setAddresses(address: Presm[]) {
    const addressFGs = address.map(json => this._fb.group(json));
    const addressFormArray = this._fb.array(addressFGs);
    this.prescriptionForm.setControl('medicine_list', addressFormArray);
  }

}




@Component({
  selector: 'app-hcontent',
  templateUrl: './addhospital.component.html',
})
export class AddhospitalComponent {
  emailFormControl = new FormControl('', [
    Validators.required,
  ]);
  @ViewChild('openModal') openModal: ElementRef;
  prescriptionForm: FormGroup;
  cloneform: any;
  user: any;
  p_id: any;
  selectPatient: any = null;
  prescription: any;
  pre_list: any;
  hospital_list: any;
  doc_details: any;
  degree_list: any;
  key: any;
  patient_id: any;
  hos: {};
  hos1: any;
  model: any = {};
  message: any;
  soh: any;

  constructor(private _fb: FormBuilder, private route: ActivatedRoute, private router: Router,
              private scPatient: CurrentPatientService, private service: UserServiceService, private ADServics: DataService9,
              private toastyService: ToastyService, private toastyConfig: ToastyConfig,
              public dialogRef: MatDialogRef<AddhospitalComponent>,
              @Inject(MAT_DIALOG_DATA) public data1d: any) {
    this.toastyConfig.theme = 'bootstrap';
    this.toastyConfig.position = 'bottom-right';
  }
  onNoClick(): void {
    this.dialogRef.close();
  }


  get medicine_list(): FormArray {
    return this.prescriptionForm.get('medicine_list') as FormArray;
  }
  change_hospital(hos_id) {
    console.log('in change hospital');
    const index = this.user['hosp_list'].findIndex((function (item, i) {
      return item.doctor_hospital_list_id === hos_id;
    }));
    this.hos = this.user['hosp_list'][index];
    this.ADServics.changeMessage(this.hos);
  }

  // ngOnInit() {
  //   this.doc_details = JSON.parse(localStorage.getItem('currentUser'))['userinfo'];
  //   this.route.params.subscribe(params => {
  //     this.key = params['key'];
  //   });
  //   this.get_degree(JSON.parse(localStorage.getItem('currentUser'))['userinfo'][0]['doctor_id_c']);
  //   // this.get_single_prescription(this.key);
  //
  //   this.user = JSON.parse(localStorage.getItem('currentUser'));
  //   console.log(this.user);
  //
  //   if (this.user['subscription'][0]['ACCOUNT_STATUS'] === 'inactive') {
  //     this.openModal.nativeElement.click();
  //   }
  //   this.scPatient.currentPatient.subscribe(scpatient => this.selectPatient = scpatient);
  //   console.log('in ng init prescription', this.selectPatient);
  //   this.soh = this.selectPatient.doc_hospital_id;
  //   console.log('Hiii' + this.selectPatient.doc_hospital_id);
  //   this.prescriptionForm = this._fb.group({
  //     doctor_id: this.user['userinfo'][0]['doctor_id_c'],
  //     patient_id: '',
  //     doctor_note: '',
  //     investigation_name: '',
  //     clinical_impression: '',
  //     prescription_record_id_c: this.key,
  //     medicine_list: this._fb.array([]),
  //   });
  //   this.addNewRow();
  // }

  // addNewRow() {
  //   const control = <FormArray>this.prescriptionForm.controls['medicine_list'];
  //   const newmedicine = this.initContractQM();
  //   console.log(newmedicine.controls.hasOwnProperty('Start_Date'));
  //   control.push(newmedicine);
  // }

  // initContractQM() {
  //   return this._fb.group({
  //     name: '',
  //     frequency: '',
  //     frequency_2: '',
  //     frequency_3: '',
  //     duration: '',
  //     unit: '',
  //     start_date_time: null,
  //     end_date_time: null,
  //     special_instruction: '',
  //     dose: '',
  //     administer_route: '',
  //     drug_form: '',
  //     no_of_medicine: '',
  //     BB: '',
  //     AB: '',
  //     BL: '',
  //     AL: '',
  //     BD: '',
  //     AD: '',
  //     patient_mail: this.selectPatient['email'],
  //     doctor_name: this.user['userinfo'][0]['name'],
  //     patient_name: this.selectPatient['name'],
  //     prescription_id_c: this.p_id,
  //     med_type: 'new',
  //     doc_hos_id:'',
  //   });
  // }

  // deleteRow(index: number) {
  //   const control = <FormArray>this.prescriptionForm.controls['medicine_list'];
  //   control.removeAt(index);
  // }
  //
  // open_pay_monthly() {
  //   this.router.navigate(['/dashboard/pricing']);
  // }
  //
  // open_pay_anually() {
  //   this.router.navigate(['/dashboard/automatic-pricing/'], {queryParams: {page: 'renewal'}});
  // }

  // onSubmit(form) {
  //   console.log('in on subbmit');
  //   form.patient_id = this.patient_id;
  //   console.log(form);
  //   for (let i = 0; i < form.medicine_list.length ; i++) {
  //     delete form.medicine_list[i].doctor_note;
  //     delete form.medicine_list[i].investigation_name;
  //     delete form.medicine_list[i].clinical_impression;
  //     form.medicine_list[i].patient_mail =  form.medicine_list[i].patient_email;
  //     delete form.medicine_list[i].patient_email;
  //     if (form.medicine_list[i].med_type) {
  //       console.log('t');
  //     } else {
  //       console.log('f');
  //       form.medicine_list[i].med_type = 'old';
  //     }
  //   }
  //   this.service.updatePrescription(JSON.stringify(form), this.key).subscribe(responce => {
  //     console.log(responce);
  //     if (responce['success']) {
  //       alert('Prescription Changes Saved Successfully');
  //     }
  //   }, error => {
  //     console.log(error);
  //   });
  // }
  //
  // get_degree(id) {
  //   this.service.Degree_Details(id).subscribe(
  //     data => {
  //       this.degree_list = data['data'];
  //       console.log('I CANT SEE DATA of hospital_list : ', this.degree_list);
  //     }
  //   );
  // }

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

  // get_single_prescription(key) {
  //   this.service.single_prescription(key).subscribe(
  //     data => {
  //       this.prescription = data['data'];
  //       this.pre_list = data['data'];
  //       this.p_id = data['data'][0]['med_id'];
  //       this.patient_id = data['data'][0]['patient_id_c'];
  //       console.log(this.patient_id);
  //
  //       for (let i = 0; i < this.pre_list.length; i++) {
  //         this.pre_list[i]['name'] = this.pre_list[i]['medicine'];
  //         // delete this.pre_list[i]['medicine'];
  //         /*delete this.pre_list[i]['clinical_impression'];
  //         delete this.pre_list[i]['investigation_name'];
  //         delete this.pre_list[i]['doctor_note'];*/
  //         delete this.pre_list[i]['doc_hos_id'];
  //         delete this.pre_list[i]['changed_on_d'];
  //         delete this.pre_list[i]['gender'];
  //         delete this.pre_list[i]['age'];
  //         delete this.pre_list[i]['med_history'];
  //         delete this.pre_list[i]['l_name'];
  //         delete this.pre_list[i]['patient_mobile'];
  //
  //         delete this.pre_list[i]['doctor_city'];
  //         delete this.pre_list[i]['did'];
  //         delete this.pre_list[i]['lname'];
  //         delete this.pre_list[i]['qualification'];
  //         delete this.pre_list[i]['specialty'];
  //         delete this.pre_list[i]['licence_number'];
  //         delete this.pre_list[i]['doctor_mobile'];
  //         delete this.pre_list[i]['doctor_email'];
  //
  //         // delete this.pre_list[i]['clinical_impression'];
  //         // delete this.pre_list[i]['investigation_name'];
  //         //  delete this.pre_list[i]['doctor_note'];
  //
  //         // delete this.pre_list[i]['patient_email'];
  //
  //         if (this.pre_list[i]['AB'] === '1') {
  //           this.pre_list[i]['AB'] = true;
  //         }
  //         if (this.pre_list[i]['AB'] === '0') {
  //           this.pre_list[i]['AB'] = false;
  //         }
  //         if (this.pre_list[i]['BB'] === '1') {
  //           this.pre_list[i]['BB'] = true;
  //         }
  //         if (this.pre_list[i]['BB'] === '0') {
  //           this.pre_list[i]['BB'] = false;
  //         }
  //
  //         if (this.pre_list[i]['AL'] === '1') {
  //           this.pre_list[i]['AL'] = true;
  //         }
  //         if (this.pre_list[i]['AL'] === '0') {
  //           this.pre_list[i]['AL'] = false;
  //         }
  //
  //         if (this.pre_list[i]['BL'] === '1') {
  //           this.pre_list[i]['BL'] = true;
  //         }
  //         if (this.pre_list[i]['BL'] === '0') {
  //           this.pre_list[i]['BL'] = false;
  //         }
  //
  //         if (this.pre_list[i]['AD'] === '1') {
  //           this.pre_list[i]['AD'] = true;
  //         }
  //         if (this.pre_list[i]['AD'] === '0') {
  //           this.pre_list[i]['AD'] = false;
  //         }
  //
  //         if (this.pre_list[i]['BD'] === '1') {
  //           this.pre_list[i]['BD'] = true;
  //         }
  //         if (this.pre_list[i]['BD'] === '0') {
  //           this.pre_list[i]['BD'] = false;
  //         }
  //         /*this.pre_list.patchValue({
  //           name: this.pre_list[i]['medicine'],
  //
  //           //investigation_name: this.prescription[0]['investigation_name'],
  //         //  doctor_note: this.prescription[0]['doctor_note'],
  //           // formControlName2: myValue2 (can be omitted)
  //         });*/
  //         delete this.pre_list[i]['medicine'];
  //
  //       }
  //
  //       console.log(this.pre_list);
  //       this.setAddresses(this.pre_list);
  //
  //       this.prescriptionForm.patchValue({
  //         clinical_impression: this.prescription[0]['clinical_impression'],
  //         investigation_name: this.prescription[0]['investigation_name'],
  //         doctor_note: this.prescription[0]['doctor_note'],
  //         // formControlName2: myValue2 (can be omitted)
  //       });
  //
  //       console.log('I CANT SEE DATA of prescription_list : ', this.prescription);
  //       if (data['data'][0]['doc_hos_id']) {
  //         this.service.hospital_single_Details(data['data'][0]['doc_hos_id']).subscribe(
  //           data1 => {
  //             this.hospital_list = data1['data'];
  //             console.log('I CANT SEE DATA of hospital_list : ', this.hospital_list);
  //           });
  //
  //       } else {
  //         this.service.hospital_Details(JSON.parse(localStorage.getItem('currentUser'))['userinfo'][0]['doctor_id_c']).subscribe(
  //           data2 => {
  //             this.hospital_list = data2['data'];
  //             console.log('I CANT SEE DATA of hospital_list : ', this.hospital_list);
  //           }
  //         );
  //       }
  //     }
  //   );
  // }

  setAddresses(address: Presm[]) {
    const addressFGs = address.map(json => this._fb.group(json));
    const addressFormArray = this._fb.array(addressFGs);
    this.prescriptionForm.setControl('medicine_list', addressFormArray);
  }

}

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }

}





@Component({
  selector: 'app-ep',
  templateUrl: './editp.component.html',
})
export class EditpComponent {
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
              private ADService: DataService9,
              private router: Router, private scPatient: CurrentPatientService,
              private service: UserServiceService, private msgService: MessagingService,
              public dialogRef: MatDialogRef<EditpComponent>,
              @Inject(MAT_DIALOG_DATA) public data2d: any) {
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
  // ngOnInit() {
  //   this.get_hos();
  //   /*console.log(this.date);
  //   console.log(moment(this.now, 'MM-DD-YYYY'));*/
  //
  //   this.msgService.getPermission();
  //   this.msgService.receiveMessage();
  //   this.message = this.msgService.currentMessage;
  //   /*if (this.user['subscription'][0]['ACCOUNT_STATUS'] === 'inactive') {
  //     this.openModal.nativeElement.click();
  //   }*/
  //
  //   this.scPatient.currentPatient.subscribe(scpatient => this.selectPatient = scpatient);
  //   console.log('in ng init prescription', this.selectPatient);
  //   this.prescriptionForm = this._fb.group({
  //     doctor_id: this.user['userinfo'][0]['doctor_id_c'],
  //     patient_id: this.selectPatient['patient_id_c'],
  //     doctor_note: '',
  //     investigation_name: '',
  //     clinical_impression: '',
  //     medicine_list: this._fb.array([]),
  //   });
  //   this.addNewRow();
  // }
  // get_hos() {
  //   this.service.hospital_Details(JSON.parse(localStorage.getItem('currentUser'))['userinfo'][0]['doctor_id_c']).subscribe(
  //     data2 => {
  //       this.hos = data2['data'][0];
  //       console.log('I CANT SEE DATA of other hospital_list : ', this.hos);
  //     }
  //   );
  // }
  //
  // addNewRow() {
  //   const control = <FormArray>this.prescriptionForm.controls['medicine_list'];
  //   const newmedicine = this.initContractQM();
  //   console.log(newmedicine.controls.hasOwnProperty('Start_Date'));
  //   control.push(newmedicine);
  // }
  //
  // initContractQM() {
  //   return this._fb.group({
  //     name: '',
  //     frequency: '',
  //     frequency_2: '',
  //     frequency_3: '',
  //     duration: '',
  //     unit: '',
  //     start_date_time: null,
  //     end_date_time: null,
  //     special_instruction: '',
  //     dose: '',
  //     administer_route: '',
  //     drug_form: '',
  //     no_of_medicine: '',
  //     BB: false,
  //     AB: false,
  //     BL: false,
  //     AL: false,
  //     BD: false,
  //     AD: false,
  //     patient_mail: this.selectPatient['email'],
  //     doctor_name: this.user['userinfo'][0]['name'],
  //     patient_name: this.selectPatient['name'],
  //     patient_id_c: this.selectPatient['patient_id_c'],
  //     reminder_zone: 'asia/india'
  //   });
  // }

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


