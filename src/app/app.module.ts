import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {HomeComponent} from './home/home.component';
import {RegistrationComponent} from './registration/registration.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AuthenticationserviceService} from './authenticationservice.service';
import { ProfessionComponent } from './professional-details/profession.component';
import {HttpClientModule} from '@angular/common/http';
import {HttpModule} from '@angular/http';
import {ForgotpasswordComponent} from './forgotpassword/forgotpassword.component';
import {UserServiceService} from './user-service.service';
import {AlertServiceService} from './alert-service.service';
import {PersonalDetailsComponent} from './personal-details/personal-details.component';
import {EducationalDetailsComponent} from './educational-details/educational-details.component';
import {ProfessionalDetailsComponent} from './professional-details/professional-details.component';
import {ProvisionalDetailsComponent} from './provisional-details/provisional-details.component';
import {SuccessProvisionalComponent} from './success-provisional/success-provisional.component';
import {DashboardComponent} from './dashboard/dashboard.component';
// import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {AddpatientComponent, DcontentComponent} from './dcontent/dcontent.component';
import {AddPatientComponent} from './add-patient/add-patient.component';
import { DataService2 } from './add-patient/DataService2';
import {PatientListComponent} from './patient-list/patient-list.component';
import {MedicineComponent} from './dcontent/medicine.component';
import {MedicineEditComponent} from './prescription-edit/medicine-edit.component';
import {AlertModule} from 'ngx-bootstrap';
import {BsDatepickerModule} from 'ngx-bootstrap/datepicker';
import {TestComponent} from './test/test.component';
import {MatBadgeModule} from '@angular/material/badge';
import {SpechComponent} from './spech/spech.component';
import {SetAvailabilityComponent} from './set-availability/set-availability.component';
import {PreviewComponent} from './preview/preview.component';
import {SelectPatientComponent} from './select-patient/select-patient.component';
import {CurrentPatientService} from './current-patient.service';
import {AngularFireModule} from 'angularfire2';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {environment} from '../environments/environment';
import {DataService} from './data.service';
import { MatFormFieldModule} from '@angular/material';
import {HomecontentComponent} from './homecontent/homecontent.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AddhospitalComponent } from './prescription-edit/prescription-edit.component';
import { AddHospitalComponent, ChangeHospitalComponent } from './add-patient/add-patient.component';
import { EditpatientComponent } from './dcontent/dcontent.component';
import { DataService1 as ADService } from './dcontent/DataService';
import {DataService9} from './prescription-edit/DataService';
import {DialogOverviewExampleDialog2} from './invoice-list/invoice-list.component';
import {EducationComponent} from './educational-details/education.component';
import { MobileSinglePatientProfileComponent } from './mobile-single-patient-profile/mobile-single-patient-profile.component';
import { MobileSinglePetientContactComponent } from './mobile-single-petient-contact/mobile-single-petient-contact.component';
import { MobileSinglePetientMyfamilyComponent } from './mobile-single-petient-myfamily/mobile-single-petient-myfamily.component';
import { MobileSinglePetientMyhealthComponent } from './mobile-single-petient-myhealth/mobile-single-petient-myhealth.component';
import { MobileSingleProfileMylifestyleComponent } from './mobile-single-profile-mylifestyle/mobile-single-profile-mylifestyle.component';
import { AboutComponent } from './about/about.component';
import { MyHealthComponent } from './my-health/my-health.component';
import {  MyLifeStyleComponent} from './my-life-style/my-life-style.component';
import { MyFamilyHistoryComponent } from './my-family-history/my-family-history.component';
import { MyContactComponent } from './my-contact/my-contact.component';
import { WarningComponent } from './dcontent/dcontent.component';
import { PaymentComponent } from './dcontent/dcontent.component';
import { EditpComponent } from './prescription-edit/prescription-edit.component';
import { NgProgressModule, NgProgressBrowserXhr  } from 'ngx-progressbar';
import { BrowserXhr } from '@angular/http';
// open tolk
import {VideoRecepientComponent} from './video-recepient/video-recepient.component';
import {VideoCallerComponent} from './video-caller/video-caller.component';
import {LoadingComponent} from './shared/loading/loading.component';
import {VideoCallWidgetComponent} from './shared/video-call-widget/video-call-widget.component';
import {OpentokModule} from 'ng2-opentok/dist/opentok.module';
import {PusherService} from './pusher.service';
import {ReferenceReject3Component} from './reference-reject-3/reference-reject-3.component';
import {ReferenceReject2Component} from './reference-reject-2/reference-reject-2.component';
import {ReferenceReject1Component} from './reference-reject-1/reference-reject-1.component';
import {ReferenceConfirmation1Component} from './reference-confirmation-1/reference-confirmation-1.component';
import {ReferenceConfirmation2Component} from './reference-confirmation-2/reference-confirmation-2.component';
import {ReferenceConfirmation3Component} from './reference-confirmation-3/reference-confirmation-3.component';
import {ArchivingListComponent} from './archiving-list/archiving-list.component';
import {SettingsComponent} from './settings/settings.component';
import {SinglePatientComponent} from './single-patient/single-patient.component';
import {ConsultationInvoicePrintComponent} from './consultation-invoice-print/consultation-invoice-print.component';
import {ConsultationInvoiceViewComponent} from './consultation-invoice-view/consultation-invoice-view.component';
import {InvoiceListComponent} from './invoice-list/invoice-list.component';
import {InvoicePrintComponent} from './invoice-print/invoice-print.component';
import {InvoiceViewComponent} from './invoice-view/invoice-view.component';
import {DoctorPricingComponent} from './doctor-pricing/doctor-pricing.component';
import {DoctorPricingAutomaticComponent} from './doctor-pricing-automatic/doctor-pricing-automatic.component';
import {PrescriptionListComponent} from './prescription-list/prescription-list.component';
import {PrescriptionMailComponent} from './prescription-mail/prescription-mail.component';
import {PrescriptionPrintComponent} from './prescription-print/prescription-print.component';
import {PrescriptionViewComponent} from './prescription-view/prescription-view.component';
import {PendingConsultationsComponent} from './pending-consultations/pending-consultations.component';
import {ConfirmedConsultationsComponent} from './confirmed-consultations/confirmed-consultations.component';
import {ConsultationHistoryComponent} from './consultation-history/consultation-history.component';
import {SinglePendingConsultationsComponent} from './single-pending-consultations/single-pending-consultations.component';
import {PrescriptionEditComponent} from './prescription-edit/prescription-edit.component';
import {AnswerQuestionComponent} from './answer-question/answer-question.component';
import {EqualValidator} from './registration/password.match.directive';
import {QuestionNswersComponent} from './question-nswers/question-nswers.component';
import {SettingGeneralComponent} from './setting-general/setting-general.component';
import {SettingPractiseComponent} from './setting-practise/setting-practise.component';
import {SettingPasswordComponent} from './setting-password/setting-password.component';
import {SettingChartComponent} from './setting-chart/setting-chart.component';
import {SettingEmailComponent} from './setting-email/setting-email.component';
import {SettingSmsComponent} from './setting-sms/setting-sms.component';
import {environment as dep_env} from './environments/environment';
import {SettingAccountComponent} from './setting-account/setting-account.component';
import {ToastyModule} from 'ng2-toasty';
import {ServiceWorkerModule} from '@angular/service-worker';
import {MessagingService} from './messaging.service';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {StoreModule} from '@ngrx/store';

import {reducers} from './reducers/index';
import {EditHospitalComponent} from './edit-hospital/edit-hospital.component';
import {SinglePatientProfileComponent} from './single-patient-profile/single-patient-profile.component';
import {SinglePatientPrescriptionsComponent} from './single-patient-prescriptions/single-patient-prescriptions.component';
import {SinglePatientConsultationsComponent} from './single-patient-consultations/single-patient-consultations.component';
import {SinglePatientReportsComponent} from './single-patient-reports/single-patient-reports.component';
import {SinglePatientPaymentsComponent} from './single-patient-payments/single-patient-payments.component';
import {PatientAboutComponent} from './patient-about/patient-about.component';
import {PatientHealthComponent} from './patient-health/patient-health.component';
import {PatientLifestyleComponent} from './patient-lifestyle/patient-lifestyle.component';
import {PatientFamilyhistoryComponent} from './patient-familyhistory/patient-familyhistory.component';
import {PatientContactComponent} from './patient-contact/patient-contact.component';
import {PatientprofileService} from './patientprofile.service';
import {DialogOverviewExampleDialogComponent } from './shared/video-call-widget/video-call-widget.component';
// open tolk
import {ChartsModule} from 'ng2-charts/ng2-charts';
import {PrescriptionAdherenceComponent} from './prescription-adherence/prescription-adherence.component';
import {CapitalizePipe} from './capitalize.pipe';
import {MomentModule} from 'angular2-moment';
import {RedirectComponent} from './redirect/redirect.component';
import {NgxPaginationModule} from 'ngx-pagination';
// app state managing using @ngrx/store for notification update
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MatAutocompleteModule, MatButtonModule, MatButtonToggleModule, MatCardModule, MatCheckboxModule, MatChipsModule,
  MatDatepickerModule, MatDialogModule, MatDividerModule, MatExpansionModule, MatGridListModule, MatIconModule,
  MatInputModule, MatListModule, MatMenuModule, MatNativeDateModule, MatPaginatorModule, MatProgressBarModule, MatProgressSpinnerModule,
  MatRadioModule, MatRippleModule, MatSelectModule, MatSidenavModule, MatSliderModule, MatSlideToggleModule, MatSnackBarModule, MatSortModule,
  MatStepperModule, MatTableModule, MatTabsModule, MatToolbarModule, MatTooltipModule} from '@angular/material';
import { BankComponent } from './bank/bank.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

@NgModule({
  declarations: [
    AppComponent,
    WarningComponent,
    PaymentComponent,
    ResetPasswordComponent,
    AddpatientComponent,
    AddhospitalComponent,
    MyHealthComponent,
    MyLifeStyleComponent,
    EditpatientComponent,
    MyContactComponent,
    DialogOverviewExampleDialog2,
    MyFamilyHistoryComponent,
    LoginComponent,
    ProfessionComponent,
    AboutComponent,
    HomeComponent,
    RedirectComponent,
    MobileSinglePatientProfileComponent,
    MobileSinglePetientContactComponent,
    MobileSinglePetientMyfamilyComponent,
    MobileSinglePetientMyhealthComponent,
    MobileSingleProfileMylifestyleComponent,
    ChangeHospitalComponent,
    AddHospitalComponent,
    CapitalizePipe,
    RegistrationComponent,
    ForgotpasswordComponent,
    PersonalDetailsComponent,
    EducationalDetailsComponent,
    ProfessionalDetailsComponent,
    ProvisionalDetailsComponent,
    SuccessProvisionalComponent,
    DashboardComponent,
    /*HeaderComponent,*/
    EditpComponent,
    EducationComponent,
    AddPatientComponent,
    FooterComponent,
    DcontentComponent,
    AddPatientComponent,
    PatientListComponent,
    TestComponent,
    SpechComponent,
    SetAvailabilityComponent,
    MedicineComponent,
    MedicineEditComponent,
    PreviewComponent,
    SelectPatientComponent,
    VideoCallerComponent,
    VideoRecepientComponent,
    LoadingComponent,
    VideoCallWidgetComponent,
    ReferenceReject3Component,
    ReferenceReject2Component,
    ReferenceReject1Component,
    ReferenceConfirmation1Component,
    ReferenceConfirmation2Component,
    ReferenceConfirmation3Component,
    ArchivingListComponent,
    SettingsComponent,
    SinglePatientComponent,
    ConsultationInvoicePrintComponent,
    ConsultationInvoiceViewComponent,
    InvoiceListComponent,
    InvoicePrintComponent,
    InvoiceViewComponent,
    DoctorPricingComponent,
    DoctorPricingAutomaticComponent,
    PrescriptionListComponent,
    PrescriptionMailComponent,
    PrescriptionPrintComponent,
    PrescriptionViewComponent,
    PendingConsultationsComponent,
    ConfirmedConsultationsComponent,
    ConsultationHistoryComponent,
    HomecontentComponent,
    SinglePendingConsultationsComponent,
    PrescriptionEditComponent,
    AnswerQuestionComponent,
    EqualValidator,
    QuestionNswersComponent,
    SettingGeneralComponent,
    SettingPractiseComponent,
    SettingPasswordComponent,
    SettingChartComponent,
    SettingEmailComponent,
    SettingSmsComponent,
    SettingAccountComponent,
    EditHospitalComponent,
    SinglePatientProfileComponent,
    SinglePatientPrescriptionsComponent,
    SinglePatientConsultationsComponent,
    SinglePatientReportsComponent,
    SinglePatientPaymentsComponent,
    PatientAboutComponent,
    PatientHealthComponent,
    PatientLifestyleComponent,
    PatientFamilyhistoryComponent,
    PatientContactComponent,
    PrescriptionAdherenceComponent,
    DialogOverviewExampleDialogComponent,
    BankComponent,

  ],
  entryComponents: [DialogOverviewExampleDialogComponent, AddpatientComponent, AddhospitalComponent, EditpatientComponent,
    DialogOverviewExampleDialog2, AddHospitalComponent, ChangeHospitalComponent, WarningComponent, PaymentComponent, EditpComponent],
  imports: [
    environment.production ? ServiceWorkerModule.register('ngsw-worker.js') : [],
    BrowserModule,
    ReactiveFormsModule,
    NgProgressModule,
    BrowserAnimationsModule,
    NgxPaginationModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatBadgeModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatFormFieldModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    dep_env.production ? ServiceWorkerModule.register('ngsw-worker.js') : [],
    AppRoutingModule,
    FormsModule,
    MomentModule,
    ChartsModule,
    StoreModule.forRoot(reducers),
    HttpClientModule,
    ToastyModule,
    FlexLayoutModule,
    HttpModule,
    OpentokModule.forRoot({apiKey: '45600982'}),
    BsDatepickerModule.forRoot(),
    AlertModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })],
  providers: [AuthenticationserviceService, UserServiceService, AlertServiceService, CurrentPatientService, PusherService,
    DataService, PatientprofileService, MessagingService, ADService, DataService2, DataService9, {provide: BrowserXhr, useClass: NgProgressBrowserXhr}],
  bootstrap: [AppComponent]
})
export class AppModule {
}
