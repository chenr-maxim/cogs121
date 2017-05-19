import { Component, OnInit, OnDestroy } from '@angular/core';
import { Platform, NavController, NavParams } from 'ionic-angular';
import {AlertController} from 'ionic-angular';
import { Meteor } from 'meteor/meteor';
import { LoginPage } from '../login/login';
import { HomePage } from '../home/home';
import { ImagePicker } from '@ionic-native/image-picker';


@Component({
  selector: 'page-account-settings',
  templateUrl: 'account-settings.html'
})
export class AccountSettingsPage {
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private platform:Platform,private alertCtrl: AlertController, private imagePicker: ImagePicker) {
  }

  private name = '';
  private phonenumber = '';
  private username = '';
  private radius = '';
  private classesText = '';
  provider;
  classes = []
  options = [
    {name:'Tutoring', value:'1', checked:false},
    {name:'Lessons', value:'2', checked:false},
    {name:'Tour Guide', value:'3', checked:false},
    {name:'Miscellaneous', value:'4', checked:false}
  ]



  ngOnInit(){
      Meteor.user();
      this.name = Meteor.user().profile.name;
      this.phonenumber = Meteor.user().profile.phonenumber;
      this.username = Meteor.user().username;
      this.provider = Meteor.user().profile.provider;
      if( (Meteor.user().profile.radius || Meteor.user().profile.classes || Meteor.user().profile.options) != null ) {
        this.radius = Meteor.user().profile.radius;
        this.classesText = Meteor.user().profile.classes;
        this.options = Meteor.user().profile.options;
      }
  }

  saveAccountInfo() {
  	let alert = this.alertCtrl.create({
    	title: 'Saved!',
    	subTitle: 'Your account settings are saved.',
    	buttons: [{
    		text:'Dismiss',
    		handler: () => {
    			Meteor.users.update({_id: Meteor.userId()}, {
            $set:
              {
                "profile.name": this.name,
                "profile.phonenumber": this.phonenumber,
                "profile.radius": this.radius,
                "profile.options": this.options,
                "profile.classes": this.classesText,
                "profile.provider": this.provider

              }
          });
    		}
    	}]
  	});
  		alert.present();
  }

  providerOnClick() {
    Meteor.users.update({_id: Meteor.userId()}, {$set: {"profile.provider": this.provider}});
  }

  logout() {
  	Meteor.logout();
  		this.navCtrl.setRoot(LoginPage, {}, {
              animate: true
            });
  }

}
