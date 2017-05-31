import { Component, OnInit, OnDestroy } from '@angular/core';
import { Platform, NavController, NavParams, AlertController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { ChooseServicePage } from '../choose-service/choose-service';

@Component({
  selector: 'page-provider-summary',
  templateUrl: 'provider-summary.html'
})
export class ProviderSummaryPage {
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private platform:Platform, private alertCtrl: AlertController) {

  }

  private account_review = '';
  private rating = '';

  saveSummary() {
    Meteor.users.update({_id: Meteor.userId()}, {$set: {"profile.rating": this.rating}});
    Meteor.users.update({_id: Meteor.userId()}, {$set: {"profile.account_review": this.account_review}});
  }

  returnToHome() {
	  	let alert = this.alertCtrl.create({
	    title: 'Review Submitted!',
	    subTitle: 'You have reviewed + provider',
	    buttons: [{
	      text: 'Return to Home page',
	      handler: () => {
	      	this.saveSummary();
	        this.navCtrl.setRoot(ChooseServicePage, {}, {
	              animate: true
	            });
	      }
	    }]
	  });
	  alert.present();
  }


}
