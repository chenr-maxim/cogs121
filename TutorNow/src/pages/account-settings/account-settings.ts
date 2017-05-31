import { Component, OnInit, OnDestroy } from '@angular/core';
import { Platform, NavController, NavParams } from 'ionic-angular';
import {AlertController} from 'ionic-angular';
import { Meteor } from 'meteor/meteor';
import { LoginPage } from '../login/login';
import { HomePage } from '../home/home';
import { ImagePicker } from '@ionic-native/image-picker';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { GalleryPage } from '../gallery/gallery';
import { ActionSheetController } from 'ionic-angular';

@Component({
  selector: 'page-account-settings',
  templateUrl: 'account-settings.html'
})
export class AccountSettingsPage {
  constructor(public navCtrl: NavController, public navParams: NavParams,
              private platform:Platform, private alertCtrl: AlertController, private actionSheetCtrl: ActionSheetController,
              private imagePicker:ImagePicker, private camera:Camera) {
  }

  private name = '';
  private phonenumber = '';
  private username = '';
  private venmo = '';
  private provider:boolean = false;
  private profilePicture:string = "https://i.imgur.com/8DXVFbX.png";

  private openCamera() : void {
    const options: CameraOptions = {
      quality: 1,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true
    }
    this.camera.getPicture(options).then((imageData) => {
      // got picture
      this.profilePicture = "data:image/png;base64," + imageData;
      this.saveProfilePicture();
    }, (err) => {
      //error
    })
  }

  openActionSheet() : void {
    let actionSheet = this.actionSheetCtrl.create({
      title: "Choose a Profile Picture",
      buttons: [
        {
          text: 'Camera',
          handler: () => {
            this.openCamera();
          }
        },
        {
          text: 'Image Gallery',
          handler: () => {
            this.openGallery();
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
        }
      ]
    });
    actionSheet.present();
  }

  private openGallery (): void {
    const options = {
      maximumImagesCount: 1,
      width: 80,
      height: 80,
      quality: 1,
      outputType: 1 // base64
    }

    this.imagePicker.getPictures(options).then(
      (results) => {
        if(results.length > 0) {
          let imageData = results[0];
          this.profilePicture = "data:image/png;base64," + imageData;
          this.saveProfilePicture()
        }
      },
      (err) => console.log('uh oh')
    );
  }

  ngOnInit(){
    let profile = Meteor.user().profile;
    if(profile) {
      this.name = profile.name;
      this.phonenumber = profile.phonenumber
      this.username = Meteor.user().username;
      this.radius = profile.radius;
      this.classesText = profile.classes;
      this.options = profile.options;
      this.provider = profile.provider;
      this.venmo = profile.venmo;
      if(profile.picture) {
        this.profilePicture = profile.picture;
      }
    }
  }

  saveProfilePicture() : void {
    Meteor.users.update({_id: Meteor.userId()}, {
      $set: {
        "profile.picture" : this.profilePicture
      }
    });
  }
  saveAccountInfo() {
    let alert = this.alertCtrl.create({
      title: 'Saved!',
      subTitle: 'Your account settings are saved.',
      buttons: [{
        text:'Dismiss'
      }]
    });
    Meteor.users.update({_id: Meteor.userId()}, {
      $set: {
        "profile.name": this.name,
        "profile.provider": this.provider,
        "profile.phonenumber": this.phonenumber,
        "profile.classes": this.classesText,
        "profile.venmo": this.venmo,
      }
    }, () => {
      alert.present();
    });
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

  saveProvider() {
    Meteor.users.update({_id: Meteor.userId()}, {$set: {"profile.provider": this.provider}});
  }

  presentConfirm() {
    let alert = this.alertCtrl.create({
      title: 'Confirmation',
      message: 'Are you sure this the correct information?',
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
