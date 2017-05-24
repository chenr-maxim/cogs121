import { Component, OnInit, OnDestroy } from '@angular/core';
import { Platform, NavController, NavParams } from 'ionic-angular';
import {AlertController} from 'ionic-angular';
import { Meteor } from 'meteor/meteor';
import { LoginPage } from '../login/login';
import { HomePage } from '../home/home';
import { MeteorObservable } from 'meteor-rxjs';
import { PictureService } from '../../services/picture';

@Component({
  selector: 'page-account-settings',
  templateUrl: 'account-settings.html'
})
export class AccountSettingsPage {
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private platform:Platform, private alertCtrl: AlertController, private pictureService: PictureService) {
  }

  private name = '';
  private phonenumber = '';
  private username = '';


  picture: string;
  sendPicture(): void {
    this.pictureService.select().then((blob) => {
      console.log(blob);

      this.pictureService.upload(blob).then((picture) => {
        console.log(picture);

        this.picture = picture.url;
        Meteor.users.update({_id: Meteor.userId()}, {$set: {"profile.pictureId": picture._id}});
      }).catch((e) => {
        this.handleError(e);
      });
    });
  }

  ngOnInit(){
      this.name = Meteor.user().profile.name;
      this.phonenumber = Meteor.user().profile.phonenumber;
      this.username = Meteor.user().username;
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
    			Meteor.users.update({_id: Meteor.userId()}, {$set: {"profile.name": this.name}});
		        Meteor.users.update({_id: Meteor.userId()}, {$set: {"profile.phonenumber": this.phonenumber}});
    		}
    	}]
  	});
  		alert.present();
  }

  logout() {
  	Meteor.logout();
  		this.navCtrl.setRoot(LoginPage, {}, {
              animate: true
            });
  }

  private radius = '';
  private classesText = '';
  classes = []
  options = [
    {name:'Tutoring', value:'1', checked:false},
    {name:'Lessons', value:'2', checked:false},
    {name:'Tour Guide', value:'3', checked:false},
    {name:'Miscellaneous', value:'4', checked:false}
  ]

  onInputKeypress({keyCode}: KeyboardEvent): void {
    if (keyCode === 13 ) {
      //this.classes.push(this.classesText);
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

  handleError(e: Error): void {
    console.error(e);

    const alert = this.alertCtrl.create({
      title: 'Oops!',
      message: e.message,
      buttons: ['OK']
    });

    alert.present();
  }


}
