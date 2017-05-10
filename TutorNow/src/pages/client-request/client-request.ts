import { Component, OnInit, OnDestroy } from '@angular/core';
import { Platform, NavController, NavParams } from 'ionic-angular';


@Component({
  selector: 'page-client-request',
  templateUrl: 'client-request.html'
})
export class ClientRequestPage {
  parameter1='';

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private platform:Platform){
  	this.parameter1 = navParams.get('param');

  }

  cancelToRoot() {
  		this.navCtrl.popToRoot();
  	}
}


