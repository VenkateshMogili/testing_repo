import {Injectable} from '@angular/core';


@Injectable()
export class PusherService {
  pusher: any;

  constructor() {
    // replace xxxx's with your Pusher application key
    // this.pusher = new Pusher(environment.pusher.key);
  }

}
