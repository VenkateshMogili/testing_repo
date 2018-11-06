import {Observable, Subject} from 'rxjs';
import {Injectable} from '@angular/core';

export const enum VideoCallStates {
  noCall,
  incomingCall,
  calling,
  callStarted,
  callHungUpByOther
}

@Injectable()
export class VideoCallStateManagerService {

  private _state: Subject<number> = new Subject<number>();

  getStateChange(): Observable<number> {
    return this._state.asObservable();
  }

  changeState(newState: number) {
    this._state.next(newState);
  }

}
