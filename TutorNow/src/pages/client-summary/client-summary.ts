import { Component, OnInit, OnDestroy, NgModule } from '@angular/core';
import {Icon} from 'ionic-angular/components/icon/icon';
import { Platform, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';

import {Ionic2RatingModule} from 'ionic2-rating';

@Component({
  selector: 'page-client-summary', 
  templateUrl: 'client-summary.html'
})

export class ClientSummaryPage {
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private platform:Platform) {

  }

    returnToHome() {
    	this.navCtrl.popToRoot();

	}

}

