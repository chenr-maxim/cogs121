import { Component, OnInit, OnDestroy } from '@angular/core';
import { Platform, NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-in-progress',
  templateUrl: 'in-progress.html'
})
export class InProgressPage {
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private platform:Platform,) {

  }


}
