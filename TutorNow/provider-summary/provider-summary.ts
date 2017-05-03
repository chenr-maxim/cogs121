import { Component, OnInit, OnDestroy } from '@angular/core';
import { Platform, NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-provider-summary',
  templateUrl: 'provider-summary.html'
})
export class ProviderSummaryPage {
  constructor(public navCtrl: NavController, public navParams: NavParams, 
    private platform:Platform) {

  }

}
