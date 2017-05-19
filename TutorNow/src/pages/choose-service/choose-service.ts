import { Component, OnInit, OnDestroy } from '@angular/core';
import { Platform, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';


@Component({
  selector: 'page-choose-service',
  templateUrl: 'choose-service.html'
})
export class ChooseServicePage {
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private platform:Platform) {
  }


  chooseTutoring() {
  	this.navCtrl.push(HomePage)
  }
  chooseLessons() {
  	this.navCtrl.push(HomePage)
  }
  chooseTours() {
  	this.navCtrl.push(HomePage)
  }
  chooseOther() {
  	this.navCtrl.push(HomePage)
  }

}
