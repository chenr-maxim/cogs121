import { Component, OnInit, OnDestroy } from '@angular/core';
import { Platform, NavController, NavParams } from 'ionic-angular';
import { ClientSummaryPage } from '../client-summary/client-summary';
import * as moment from 'moment';

@Component({
  selector: 'page-in-progress',
  templateUrl: 'in-progress.html'
})
export class InProgressPage {
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private platform:Platform,) {

  }

  private start:string;
  ngOnInit() {
    this.start = moment().format("H:m A");
  }

  finishTutoring() {
  	this.navCtrl.push(ClientSummaryPage);
  }


}
