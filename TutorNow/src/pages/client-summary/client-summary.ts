import { Component, OnInit, OnDestroy, NgModule } from '@angular/core';
import {Icon} from 'ionic-angular/components/icon/icon';
import { Platform, NavController, NavParams, AlertController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { ChooseServicePage } from '../choose-service/choose-service';
import {Ionic2RatingModule} from 'ionic2-rating';

@Component({
  selector: 'page-client-summary',
  templateUrl: 'client-summary.html'
})

export class ClientSummaryPage {
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private platform:Platform,private alertCtrl: AlertController) {

  }

  	private rate = 0;

    returnToHome() {
    	  	let alert = this.alertCtrl.create({
		    title: 'Review Submitted!',
		    subTitle: 'You have reviewed + provider',
		    buttons: [{
		      text: 'Return to Home page',
		      handler: () => {
		        this.navCtrl.setRoot(ChooseServicePage, {}, {
		              animate: true
		            });
		      }
		    }]
		  });
		  alert.present();
	}

}

