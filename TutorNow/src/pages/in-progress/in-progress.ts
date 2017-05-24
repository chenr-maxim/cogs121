import { Component, OnInit, OnDestroy } from '@angular/core';
import { Platform, NavController, NavParams } from 'ionic-angular';
import { ClientSummaryPage } from '../client-summary/client-summary';
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

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private platform:Platform,) {
    this.acknowledgeId = navParams.get('acknowledgeId');

  }

  private start:string;
  ngOnInit() {
    this.start = moment().format("H:m A");

    this.acknowledge = Acknowledges.findOne(this.acknowledgeId);
  }

  finishTutoring() {
  	this.navCtrl.push(ClientSummaryPage);
  }


}
