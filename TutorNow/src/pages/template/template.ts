import { Component, OnInit, OnDestroy } from '@angular/core';
import { Platform, NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-template',
  templateUrl: 'template.html'
})
export class TemplatePage {
  constructor(public navCtrl: NavController, public navParams: NavParams, 
    private platform:Platform) {

  }

}
