import { Component, OnInit, OnDestroy } from '@angular/core';
import { Platform, NavController, NavParams } from 'ionic-angular';
import {AlertController} from 'ionic-angular';
import {NgForm} from '@angular/forms';

export class Class {
  id: number;
  name: string;
}

export class SimpleFormComp {
  onSubmit(f: NgForm) {
    console.log(f.value);  // { first: '', last: '' }
    console.log(f.valid);  // false
  }
}

const CLASSES: Class[] = [
  { id: 1, name: 'CSE12' },
  { id: 2, name: 'CSE30' },
  { id: 3, name: 'CSE20' },
  { id: 4, name: 'MATH109' },
  { id: 5, name: 'MATH20A' },
  { id: 6, name: 'MATH20B' },
  { id: 7, name: 'MATH18' },
  { id: 8, name: 'COGS120' },
  { id: 9, name: 'COGS121' },
  { id: 10, name: 'COGS122' }
];

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

  options = [
    {name:'Tutoring', value:'1', checked:false},
    {name:'Lessons', value:'2', checked:false},
    {name:'Tour Guide', value:'3', checked:false},
    {name:'Miscellaneous', value:'4', checked:false}
  ]

  get selectedOptions() { // right now: ['1','3']
    return this.options
              .filter(opt => opt.checked)
              .map(opt => opt.value)
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
    buttons: ['Dismiss']
  });
  alert.present();
}



}


