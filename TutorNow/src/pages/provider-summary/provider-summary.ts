import { Component, OnInit, OnDestroy } from '@angular/core';
import { Platform, NavController, NavParams, AlertController } from 'ionic-angular';
import { HomePage } from '../home/home';


@Component({
  selector: 'page-provider-summary',
  templateUrl: 'provider-summary.html'
})
export class ProviderSummaryPage {
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private platform:Platform, private alertCtrl: AlertController) {

  }

      returnToHome() {
    	  	let alert = this.alertCtrl.create({
		    title: 'Review Submitted!',
		    subTitle: 'You have reviewed + provider',
		    buttons: [{
		      text: 'Return to Home page',
		      handler: () => {
		        this.navCtrl.setRoot(HomePage, {}, {
		              animate: true
		            });
		      }
		    }]
		  });
		  alert.present();
	}


}
