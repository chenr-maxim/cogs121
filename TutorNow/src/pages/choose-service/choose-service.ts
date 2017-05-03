import { Component, OnInit, OnDestroy } from '@angular/core';
import { Platform, NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-choose-service',
  templateUrl: 'choose-service.html'
})
export class ChooseServicePage {
  constructor(public navCtrl: NavController, public navParams: NavParams, 
    private platform:Platform) {

  }

}
