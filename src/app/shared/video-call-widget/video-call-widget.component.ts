import {AfterViewInit, Component, Input, OnDestroy, OnInit, Inject, ViewChild} from '@angular/core';
import {LoadingComponent} from '../loading/loading.component';
import {VideoCallStateManagerService} from '../../../services/video-call-state-manager.service';
import {VideoCallLifeCycles, VideoCallManager} from '../../../services/video-call-manager.service';
import {UserServiceService} from '../../user-service.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'video-call-widget',
  templateUrl: 'video-call-widget.component.html',
  providers: [VideoCallManager, VideoCallStateManagerService],
  viewProviders: [LoadingComponent]
})

export class VideoCallWidgetComponent implements OnInit, VideoCallLifeCycles, OnDestroy, AfterViewInit {
  isCallEstablished: Boolean = false;
  isCallAnswered: Boolean = false;
  end_call_msg: string;
  hasIncomingCall: Boolean = false;
  isIncomingCallAnswered: Boolean = false;

  isVideoOn: boolean;

  screenshotOfTheOtherUser: string;
  msgFromBuddy: string;
  msgForBuddy: string;

  publisherProperties = {
    insertMode: 'append',
    width: '100%',
    height: '100%',
    usePreviousDeviceSelection: false
  };

  subscriberProperties = {
    insertMode: 'append',
    width: '100%',
    height: '100%',
    usePreviousDeviceSelection: false
  };

  publisherTag: string = 'publisher';
  subscriberTag: string = 'subscriber';

  @Input() sessionId: string;
  @Input() token: string;
  @Input() caller: any;
  constructor(private videoCallManager: VideoCallManager, private service: UserServiceService, public dialog: MatDialog) {
    console.log('constroctor called');
  }

  ngOnInit(): void {
    console.log('on init called');
    this.videoCallManager.addVideoCallLifeCyclesListener(this);
    this._initIncomingCallRequirements();
  }

  ngAfterViewInit() {
    console.log('after view init called');
  //  this.onIncomingCall();
  }
  call() {
    if (!this.isCallEstablished) {
      this.isCallEstablished = true;
      this.videoCallManager.call(this.publisherTag, this.publisherProperties).subscribe(() => {
        console.log('CALLING');
        this.isIncomingCallAnswered = false;
        this.hasIncomingCall = false;
        this.isVideoOn = true;
      });
    }
  }

  hangUp() {
    this.openDialog();
    /*this.videoCallManager.sendSignal(this.end_call_msg);
    this.videoCallManager.hangUp();
    this.hideVideosSection();
    this.service.end_consult(this.caller['booking_id']).subscribe(
      data => {
        console.log(data);
        },
      error => {
        console.log(error);
      });*/

   // this._initIncomingCallRequirements();

  }

  hideVideosSection() {
    this.isCallAnswered = false;
    this.isCallEstablished = false;
    this.isIncomingCallAnswered = false;
    this.hasIncomingCall = false;
  }

  answerCall() {
    this.videoCallManager.call(this.publisherTag, this.publisherProperties).subscribe(() => {
      this.isVideoOn = true;
      console.log('onIncomingCallAnswered');
      this.hasIncomingCall = false;
      this.isIncomingCallAnswered = true;
    });

  }

  takeScreenshot() {
    this.screenshotOfTheOtherUser = this.videoCallManager.getSubscriberScreenshot();
  }

  removeVideo() {
    this.videoCallManager.showVideo(false);
    this.isVideoOn = false;
  }

  showVideo() {
    this.videoCallManager.showVideo(true);
    this.isVideoOn = true;

  }

  sendSignalToBuddy() {
    this.videoCallManager.sendSignal(this.msgForBuddy);
  }

  clearMsg() {
    this.msgFromBuddy = null;
  }

  onIncomingCall(): void {
    if (this.isCallEstablished) {
      console.log('onCallStarted');
      this.isCallAnswered = true;
    } else {
      console.log('onIncomingCall');
      this.hasIncomingCall = true;
    }
  }

  onMediaAccessRequest(): void {
    console.log('MEDIA ACCESS REQUEST');
  }

  onMediaAccessDenied(): void {
    console.log('MEDIA ACCESS DENIED');
  }

  onCallHungUpByOther(): void {
    console.log('onCallHungUpByOther');
    this.hangUp();
  }

  onCallHungUp(): void {
    console.log('onCallHungUp');
  }

  onNetworkLost(): void {
    console.log('Network Lost');
  }

  onMissedCall(): void {
    console.log('Missed Call');
  }

  onMessageReceived(msg: string) {
    this.msgFromBuddy = msg;
  }

  onVideoChanged() {
    console.log('onVideoChanged');
  }
  ngOnDestroy() {
    this.videoCallManager.removeVideoCallLifeCyclesListener(this);
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialogComponent, {
      width: '250px',
      data: {end_call_msg: this.end_call_msg}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.end_call_msg = result;
      console.log(this.end_call_msg);
      this.videoCallManager.sendSignal(this.end_call_msg);
      this.videoCallManager.hangUp();
      this.hideVideosSection();
      const sdata = {booking_flag : this.end_call_msg};
      this.service.end_consult(this.caller['booking_id'], JSON.stringify(sdata)).subscribe(
        data => {
          console.log(data);
        },
        error => {
          console.log(error);
        });
      });
  }
  private _initIncomingCallRequirements() {
    this.videoCallManager.initIncomingCallRequirements(this.sessionId, this.token, this.publisherTag, this.publisherProperties, this.subscriberTag, this.subscriberProperties)
      .subscribe();
    }

}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog-data-example-dialog.html',
})

export class DialogOverviewExampleDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

    onNoClick(): void {
    this.dialogRef.close();
    }

}
