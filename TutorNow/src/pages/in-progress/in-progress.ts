import { Component, OnInit, OnDestroy } from '@angular/core';
import { Platform, NavController, NavParams } from 'ionic-angular';
import { ClientSummaryPage } from '../client-summary/client-summary';


@Component({
  selector: 'page-in-progress',
  templateUrl: 'in-progress.html'
})
export class InProgressPage {
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private platform:Platform,) {

  }

  finishTutoring() {
  	this.navCtrl.push(ClientSummaryPage);
  }


}
