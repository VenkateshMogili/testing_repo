import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {HomeComponent} from './home/home.component';
import {RegistrationComponent} from './registration/registration.component';
import {ForgotpasswordComponent} from './forgotpassword/forgotpassword.component';
import {PersonalDetailsComponent} from './personal-details/personal-details.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {DcontentComponent} from './dcontent/dcontent.component';
import {AddPatientComponent} from './add-patient/add-patient.component';
import {PatientListComponent} from './patient-list/patient-list.component';
import {SpechComponent} from './spech/spech.component';
import {SetAvailabilityComponent} from './set-availability/set-availability.component';
import {PreviewComponent} from './preview/preview.component';
import {SelectPatientComponent} from './select-patient/select-patient.component';
import {VideoCallerComponent} from './video-caller/video-caller.component';
import {VideoRecepientComponent} from './video-recepient/video-recepient.component';
import {ReferenceConfirmation1Component} from './reference-confirmation-1/reference-confirmation-1.component';
import {ReferenceConfirmation2Component} from './reference-confirmation-2/reference-confirmation-2.component';
import {ReferenceConfirmation3Component} from './reference-confirmation-3/reference-confirmation-3.component';
import {ReferenceReject1Component} from './reference-reject-1/reference-reject-1.component';
import {ReferenceReject2Component} from './reference-reject-2/reference-reject-2.component';
import {ReferenceReject3Component} from './reference-reject-3/reference-reject-3.component';
import {SinglePatientComponent} from './single-patient/single-patient.component';
import {ArchivingListComponent} from './archiving-list/archiving-list.component';
import {SettingsComponent} from './settings/settings.component';
import {InvoiceListComponent} from './invoice-list/invoice-list.component';
import {InvoiceViewComponent} from './invoice-view/invoice-view.component';
import {InvoicePrintComponent} from './invoice-print/invoice-print.component';
import {ConsultationInvoiceViewComponent} from './consultation-invoice-view/consultation-invoice-view.component';
import {ConsultationInvoicePrintComponent} from './consultation-invoice-print/consultation-invoice-print.component';
import {DoctorPricingComponent} from './doctor-pricing/doctor-pricing.component';
import {DoctorPricingAutomaticComponent} from './doctor-pricing-automatic/doctor-pricing-automatic.component';
import {PrescriptionListComponent} from './prescription-list/prescription-list.component';
import {PrescriptionPrintComponent} from './prescription-print/prescription-print.component';
import {PrescriptionViewComponent} from './prescription-view/prescription-view.component';
import {PrescriptionMailComponent} from './prescription-mail/prescription-mail.component';
import {PendingConsultationsComponent} from './pending-consultations/pending-consultations.component';
import {SinglePendingConsultationsComponent} from './single-pending-consultations/single-pending-consultations.component';
import {ConfirmedConsultationsComponent} from './confirmed-consultations/confirmed-consultations.component';
import {ConsultationHistoryComponent} from './consultation-history/consultation-history.component';
import {HomecontentComponent} from './homecontent/homecontent.component';
import {PrescriptionEditComponent} from './prescription-edit/prescription-edit.component';
import {AnswerQuestionComponent} from './answer-question/answer-question.component';
import {QuestionNswersComponent} from './question-nswers/question-nswers.component';
import {SettingGeneralComponent} from './setting-general/setting-general.component';
import {SettingAccountComponent} from './setting-account/setting-account.component';
import {SettingChartComponent} from './setting-chart/setting-chart.component';
import {SettingEmailComponent} from './setting-email/setting-email.component';
import {SettingPractiseComponent} from './setting-practise/setting-practise.component';
import {SettingPasswordComponent} from './setting-password/setting-password.component';
import {SettingSmsComponent} from './setting-sms/setting-sms.component';
import {ProvisionalDetailsComponent} from './provisional-details/provisional-details.component';
import {ProfessionalDetailsComponent} from './professional-details/professional-details.component';
import {EducationalDetailsComponent} from './educational-details/educational-details.component';
import {EditHospitalComponent} from './edit-hospital/edit-hospital.component';
import {SinglePatientProfileComponent} from './single-patient-profile/single-patient-profile.component';
import {SinglePatientPrescriptionsComponent} from './single-patient-prescriptions/single-patient-prescriptions.component';
import {SinglePatientConsultationsComponent} from './single-patient-consultations/single-patient-consultations.component';
import {SinglePatientReportsComponent} from './single-patient-reports/single-patient-reports.component';
import {SinglePatientPaymentsComponent} from './single-patient-payments/single-patient-payments.component';
import {PrescriptionAdherenceComponent} from './prescription-adherence/prescription-adherence.component';
import {RedirectComponent} from './redirect/redirect.component';
import {MobileSinglePatientProfileComponent} from './mobile-single-patient-profile/mobile-single-patient-profile.component';
import { AboutComponent } from './about/about.component';
import { MyHealthComponent } from './my-health/my-health.component';
import { MyLifeStyleComponent } from './my-life-style/my-life-style.component';
import { MyFamilyHistoryComponent } from './my-family-history/my-family-history.component';
import { MyContactComponent } from './my-contact/my-contact.component';
import { BankComponent } from './bank/bank.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},

  {
    path: 'home', component: HomeComponent,
    children: [
      {path: '', component: HomecontentComponent},
      {path: 'doctor-log-in', component: LoginComponent},
      {path: 'doctor-quick-registration', component: RegistrationComponent}
    ]
  },
  {
    path: 'recepient',
    component: VideoRecepientComponent
  },
  {
    path: 'caller',
    component: VideoCallerComponent
  },
  {
    path: 'redirect',
    component: RedirectComponent
  },
  {path: 'bank-details', component: BankComponent},
  {
    path: 'dashboard', component: DashboardComponent,
    children: [
      {path: '', component: DcontentComponent, pathMatch: 'full'},
      {path: 'settings/practise/:id', component: EditHospitalComponent},
      {path: 'prescription-edit/:key', component: PrescriptionEditComponent},
      {path: 'patient-list', component: PatientListComponent, pathMatch: 'full'},
      {path: 'select-patient', component: SelectPatientComponent},
      {path: 'overview', component: DcontentComponent},

      {path: 'add-patient', component: AddPatientComponent},
      {path: 'set-availability', component: SetAvailabilityComponent},
      {path: 'specs3', component: SpechComponent},

      {path: 'prescription-list', component: PrescriptionListComponent},

      {path: 'prescription-view/:key', component: PrescriptionViewComponent},
      {path: 'prescription-mail/:key', component: PrescriptionMailComponent},
      {path: 'prescription/adherence/:key', component: PrescriptionAdherenceComponent},
      {path: 'pending/requests/:type/:id', component: PendingConsultationsComponent},
      {path: 'pending/request/:type/:id', component: SinglePendingConsultationsComponent},
      {path: 'scheduled/consultations/:type/:id', component: ConfirmedConsultationsComponent},
      {path: 'consultation/history/:type/:id', component: ConsultationHistoryComponent},

      {path: 'question/reply/:q_id', component: AnswerQuestionComponent},
      {path: 'Question-Answer', component: QuestionNswersComponent},
      {path: 'pricing', component: DoctorPricingComponent},
      {path: 'automatic-pricing', component: DoctorPricingAutomaticComponent},

      {path: 'invoice/list', component: InvoiceListComponent},
      {path: 'invoice/view/:id', component: InvoiceViewComponent},
      {path: 'consultation/invoice/view/:id/:b_id/:b_date', component: ConsultationInvoiceViewComponent},


      {
        path: 'single-patient/:id', component: SinglePatientComponent,
        children: [
          {path: '', redirectTo: 'profile', pathMatch: 'full'},
          {path: 'profile', component: SinglePatientProfileComponent},
          {path: 'prescriptions', component: SinglePatientPrescriptionsComponent},
          {path: 'consultations', component: SinglePatientConsultationsComponent},
          {path: 'reports', component: SinglePatientReportsComponent},
          {path: 'payments', component: SinglePatientPaymentsComponent},

        ]
      },
      /*{
        path: 'single-patient', component: SinglePatientComponent,
        children: [*/
          /*{path: '', redirectTo: 'profile-view', pathMatch: 'full'},*/
          {path: 'single-patient/:id/profile-view', component: MobileSinglePatientProfileComponent},
          {path: 'single-patient/:id/prescriptions-view', component: SinglePatientPrescriptionsComponent},
          {path: 'single-patient/:id/consultations-view', component: SinglePatientConsultationsComponent},
          {path: 'single-patient/:id/reports-view', component: SinglePatientReportsComponent},
          {path: 'single-patient/:id/payments-view', component: SinglePatientPaymentsComponent},

      /*  ]
      },*/
      {path: 'single-patient/:id/profile-view/about', component: AboutComponent},
      {path: 'single-patient/:id/profile-view/my-health', component: MyHealthComponent},
      {path: 'single-patient/:id/profile-view/my-lifesyle', component: MyLifeStyleComponent},
      {path: 'single-patient/:id/profile-view/my-family-history', component: MyFamilyHistoryComponent},
      {path: 'single-patient/:id/profile-view/my-contact', component: MyContactComponent},
      {path: 'archiving-list', component: ArchivingListComponent},
      {
        path: 'settings', component: SettingsComponent,
        children: [
          {path: '', redirectTo: 'general', pathMatch: 'full'},
          {path: 'general', component: SettingGeneralComponent},
          {path: 'account', component: SettingAccountComponent},
          {path: 'password', component: SettingPasswordComponent},
          {path: 'practise', component: SettingPractiseComponent},

          {path: 'email', component: SettingEmailComponent},
          {path: 'chart', component: SettingChartComponent},
          {path: 'sms', component: SettingSmsComponent}
        ]
      },

    ]
  },
  {path: 'doctor-log-in', component: LoginComponent},
  {path: 'doctor-quick-registration', component: RegistrationComponent},
  {path: 'doctor/forgot/password', component: ForgotpasswordComponent},
  {path: 'personal-details', component: PersonalDetailsComponent},
  {path: 'educational-details', component: EducationalDetailsComponent},
  {path: 'provisional-details', component: ProvisionalDetailsComponent},
  {path: 'professional-details', component: ProfessionalDetailsComponent},
  {path: 'review', component: PreviewComponent},
  {path: 'prescription-print/:key', component: PrescriptionPrintComponent},

  {path: 'invoice/print/:id', component: InvoicePrintComponent},
  {path: 'consultation/invoice/print/:id/:b_id/:b_date', component: ConsultationInvoicePrintComponent},

  {path: 'reference-doctor-confirmation-1/:id', component: ReferenceConfirmation1Component},
  {path: 'reference-doctor-confirmation-2/:id', component: ReferenceConfirmation2Component},
  {path: 'reference-doctor-confirmation-3/:id', component: ReferenceConfirmation3Component},

  {path: 'reference-doctor-unable-confirmation-1/:id', component: ReferenceReject1Component},
  {path: 'reference-doctor-unable-confirmation-2/:id', component: ReferenceReject2Component},
  {path: 'reference-doctor-unable-confirmation-3/:id', component: ReferenceReject3Component},
  {path: 'doctor/new/password/:id', component: ResetPasswordComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
