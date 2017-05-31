import { Component, OnInit, OnDestroy } from '@angular/core';
import { Platform, NavController, NavParams } from 'ionic-angular';
import { ClientSummaryPage } from '../client-summary/client-summary';
import { ProviderSummaryPage } from '../provider-summary/provider-summary';
import { Acknowledge } from 'api/models';
import { Acknowledges } from 'api/collections/acknowledges';
import * as moment from 'moment';

@Component({
  selector: 'page-in-progress',
  templateUrl: 'in-progress.html'
})
export class InProgressPage {
  private acknowledge: Acknowledge;
  private acknowledgeId: string;

  private pic1: string = '';
  private pic2: string = '';

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private platform:Platform,) {
    this.acknowledgeId = navParams.get('acknowledgeId');

    console.log("Ack", this.acknowledgeId);

  }

  private start:string;
  ngOnInit() {
    this.start = moment().format("H:mm A");
    Meteor.users.update({_id: Meteor.userId()}, {$set: {"profile.start_time": this.start}});

    this.acknowledge = Acknowledges.findOne(this.acknowledgeId);

    Acknowledges.update(this.acknowledgeId, { $set: { startTime: new Date() } });

    this.pic1 = this.acknowledge.requestee.profile.picture;
    this.pic2 = this.acknowledge.requester.profile.picture;

    console.log("Ack", this.acknowledge);
  }

  finishTutoring() {
    if(this.acknowledge.requesterId === Meteor.userId()){
      this.navCtrl.push(ProviderSummaryPage, {
        acknowledgeId: this.acknowledgeId,
      });
    }
    else{
      this.navCtrl.push(ClientSummaryPage, {
        acknowledgeId: this.acknowledgeId,
      });
    }
  }

}
