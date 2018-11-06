import {Component, OnInit} from '@angular/core';
import {VideoCallWidgetComponent} from '../shared/video-call-widget/video-call-widget.component';
import {VideoCallStateManagerService} from '../../services/video-call-state-manager.service';
import {VideoCallManager} from '../../services/video-call-manager.service';
import {CurrentPatientService} from '../current-patient.service';


@Component({
  selector: 'video-recepient',
  templateUrl: 'video-recepient.component.html',
  styleUrls: ['video-recepient.component.css'],
  providers: [VideoCallManager, VideoCallStateManagerService],
  viewProviders: [VideoCallWidgetComponent]
})

export class VideoRecepientComponent {
  sessionId: any;
  token: any;
  caller:any;
  constructor(private pushPatient: CurrentPatientService) {
      this.pushPatient.tokcurrent.subscribe(tokconfig => {
      console.log('in video recipt screen');
      console.log(tokconfig);
      this.caller = tokconfig;
      this.sessionId = tokconfig['session'];
      this.token = tokconfig['token'];
      console.log(this.token);
    });
  }
}
