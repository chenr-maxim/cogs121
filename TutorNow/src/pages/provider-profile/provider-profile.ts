import { Component, OnInit, OnDestroy } from '@angular/core';
import { Platform, NavController, NavParams } from 'ionic-angular';
import {AlertController} from 'ionic-angular';
import {NgForm} from '@angular/forms';
import { HomePage } from '../home/home';
import { Meteor } from 'meteor/meteor';

export class Class {
  id: number;
  name: string;
}

@Component({
  selector: 'page-provider-profile',
  templateUrl: 'provider-profile.html'
})

export class ProviderProfilePage {
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private platform:Platform,
    private alertCtrl: AlertController) {
  }


  private radius = '';
  private classesText = '';
  classes = []
  options = [
    {
    name:'Tutoring', value:'1', checked:false},
    {name:'Lessons', value:'2', checked:false},
    {name:'Tour Guide', value:'3', checked:false},
    {name:'Miscellaneous', value:'4', checked:false}
  ]

  onInputKeypress({keyCode}: KeyboardEvent): void {
    if (keyCode === 13) {
      this.classes.push(this.classesText);
    }
  }

  presentConfirm() {
  let alert = this.alertCtrl.create({
    title: 'Confirmation',
    message: 'Are you sure these are the correct information?',
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'Yes',
        handler: () => {
          Meteor.users.update({_id: Meteor.userId()}, {$set: {"profile.radius": this.radius}});
          Meteor.users.update({_id: Meteor.userId()}, {$set: {"profile.options": this.options}});
          Meteor.users.update({_id: Meteor.userId()}, {$set: {"profile.classes": this.classesText}});
          this.classesText = '';
          this.presentAlert();
        }
      }
    ]
  });
  alert.present();
}

presentAlert() {
  let alert = this.alertCtrl.create({
    title: 'You are discoverable!',
    subTitle: 'Feel free to navigate off the app. A push notification will be sent to you when you are requested',
    buttons: [{
      text: 'Dismiss',
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


