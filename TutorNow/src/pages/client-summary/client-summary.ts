import { Component, OnInit, OnDestroy } from '@angular/core';
import { Platform, NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-client-summary',
  templateUrl: 'client-summary.html'
})
export class ClientSummaryPage {
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private platform:Platform) {

  }

}
