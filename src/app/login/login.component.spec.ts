import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {LoginComponent} from './login.component';
import {RouterTestingModule} from '@angular/router/testing';
import {FormsModule} from '@angular/forms';
import {MatButtonModule, MatCardModule, MatFormFieldModule, MatInputModule} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';
import {AuthenticationserviceService} from '../authenticationservice.service';
import {HttpClientModule} from '@angular/common/http';
import {UserServiceService} from '../user-service.service';
import {HttpModule} from '@angular/http';
import {environment} from '../../environments/environment';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {AngularFireModule} from 'angularfire2';
import {MessagingService} from '../messaging.service';
import {CurrentPatientService} from '../current-patient.service';
import {StoreModule} from '@ngrx/store';
import {reducers} from '../reducers';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DebugElement, NgModule} from '@angular/core';
import {BrowserModule, By} from '@angular/platform-browser';
import {AppRoutingModule} from '../app-routing.module';
import {HomeComponent} from '../home/home.component';

describe('LoginComponent', () => {
  let originalTimeout;
  let component: LoginComponent;
  let el: HTMLElement;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule,
        FormsModule,
        MatInputModule,
        MatFormFieldModule,
        MatCardModule,
        MatButtonModule,
        FlexLayoutModule,
        HttpClientModule,
        HttpModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireDatabaseModule,
        AngularFireAuthModule,
        StoreModule.forRoot(reducers),
        BrowserAnimationsModule,
        BrowserModule,
      AppRoutingModule,
        NgModule
        ],
      declarations: [LoginComponent, HomeComponent],
      providers: [AuthenticationserviceService, UserServiceService, MessagingService, CurrentPatientService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 100000;
  });
  afterEach(function() {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
  });

  // component is present or not
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  // Component should has the title "Log in as Doctor"
  it('should have the form title Log in as Doctor', async(() => {
    expect(component.title).toEqual('Log in as Doctor');
  }));
  // Checking login credentials are working or not.
  it(`should call the login method`, async(() => {
    fixture.detectChanges();
    spyOn(component, 'login');
    component.model.email = 'Trdmailer1232@gmail.com';
    component.model.password = '1234567';
    el = fixture.debugElement.query(By.css('button')).nativeElement;
    el.click();
    expect(component.login).toHaveBeenCalledTimes(1);
  }));
  // Form should be valid and logged in successfully.
  it(`form should be valid and logged in successfully`, async(() => {
    component.model.email = 'Trdmailer1232@gmail.com';
    component.model.password = '1234567';
    component.login();
    expect(component.loading).toBe(true);
  }));
});
