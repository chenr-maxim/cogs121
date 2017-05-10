import { Component, OnInit, OnDestroy } from '@angular/core';
import { Platform, NavController, NavParams } from 'ionic-angular';
import { InProgressPage } from '../in-progress/in-progress';


@Component({
  selector: 'page-client-request',
  templateUrl: 'client-request.html'
})
export class ClientRequestPage {
  private user;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private platform:Platform){
  	this.user = navParams.get('user');

  }

  request(){
    this.navCtrl.setRoot(InProgressPage, {}, {
      animate: true
    });
  }

  cancelToRoot() {
  		this.navCtrl.popToRoot();
  	}
}


