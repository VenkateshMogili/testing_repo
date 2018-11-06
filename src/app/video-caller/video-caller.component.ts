import {Component} from '@angular/core';
import {VideoCallWidgetComponent} from '../shared/video-call-widget/video-call-widget.component';
import {VideoCallStateManagerService} from '../../services/video-call-state-manager.service';
import {VideoCallManager} from '../../services/video-call-manager.service';

/*import {VideoCallWidgetComponent} from './shared/video-call-widget/video-call-widget.component';
import {VideoCallStateManagerService} from './../services/video-call-state-manager.service';
import {VideoCallManager} from './../services/video-call-manager.service';*/

@Component({
  selector: 'video-caller',
  providers: [VideoCallManager, VideoCallStateManagerService],
  templateUrl: 'video-caller.component.html',
  styleUrls: ['video-caller.component.css'],
  viewProviders: [VideoCallWidgetComponent]
})
export class VideoCallerComponent {

  sessionId = '2_MX40NTYwMDk4Mn5-MTUxNTM5Mzg0MDExNX40cXJQSDBSb2l4REtlM0xzV1dVWlU3cFh-fg';
  // valid until 1 January
  token = 'T1==cGFydG5lcl9pZD00NTYwMDk4MiZzaWc9OTBmZWE0MTYyY2VjY2JmN2M2NzUyNzNmNDVhMzg0Mzk0MWNmMGQ4MzpzZXNzaW9uX2lkPTJfTVg0ME5UWXdNRGs0TW41LU1UVXhOVE01TXpnME1ERXhOWDQwY1hKUVNEQlNiMmw0UkV0bE0weHpWMWRWV2xVM2NGaC1mZyZjcmVhdGVfdGltZT0xNTE1MzkzODU0Jm5vbmNlPTAuNjI0MDI1NjUyNzczMzY2NSZyb2xlPXB1Ymxpc2hlciZleHBpcmVfdGltZT0xNTE1OTk4NjUzJmluaXRpYWxfbGF5b3V0X2NsYXNzX2xpc3Q9';
}
