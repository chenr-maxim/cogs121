import { Component, OnInit, OnDestroy } from '@angular/core';
import { Platform, NavController, NavParams } from 'ionic-angular';
import {AlertController} from 'ionic-angular';
import { Meteor } from 'meteor/meteor';


@Component({
  selector: 'page-account-settings',
  templateUrl: 'account-settings.html'
})
export class AccountSettingsPage {
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private platform:Platform,private alertCtrl: AlertController) {
  }

  private name = '';
  private phonenumber = '';
  private email = '';


  ngOnInit(){
      Meteor.user();
      this.name = Meteor.user().profile.name;
      this.phonenumber = Meteor.user().profile.phonenumber;
      this.email = Meteor.user().username;
  }

  saveAccountInfo() {
  	let alert = this.alertCtrl.create({
    	title: 'Saved!',
    	subTitle: 'Your account settings are saved.',
    	buttons: [{
    		text:'Dismiss',
    		handler: () => {
    			Meteor.users.update({_id: Meteor.userId()}, {$set: {"profile.name": this.name}});
		        Meteor.users.update({_id: Meteor.userId()}, {$set: {"profile.phonenumber": this.phonenumber}});
    		}
    	}]
  	});
  		alert.present();
  }

  logout() {
  	Meteor.logout(function(err) {
  	// callback
  	Session.set("ses",false);
	});
  }


}
