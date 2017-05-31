import { Component, OnInit, OnDestroy, NgModule } from '@angular/core';
import {Icon} from 'ionic-angular/components/icon/icon';
import { Platform, NavController, NavParams, AlertController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { ChooseServicePage } from '../choose-service/choose-service';
import {Ionic2RatingModule} from 'ionic2-rating';
import { Acknowledge } from 'api/models';
import { Acknowledges } from 'api/collections/acknowledges';
import * as moment from 'moment';

@Component({
  selector: 'page-client-summary',
  templateUrl: 'client-summary.html'
})

export class ClientSummaryPage {
  private acknowledge: Acknowledge;
  private acknowledgeId: string;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private platform:Platform,private alertCtrl: AlertController) {
    this.acknowledgeId = navParams.get('acknowledgeId');
  }

  private account_review = '';
  private rating = '';
  private start:string;
  private end:string;

  private client;
  private clientname = '';

  ngOnInit() {
    this.end = moment().format("h:mm A");


    this.acknowledge = Acknowledges.findOne(this.acknowledgeId);

    Acknowledges.update(this.acknowledgeId, { $set: { endTime: new Date() } });

    this.client = this.acknowledge.requester;
    this.start = moment(this.acknowledge.startTime).format("h:mm A");
    this.clientname = this.client.profile.name;


    console.log("Ack", this.acknowledge);
  }

  saveSummary() {
    Meteor.users.update({_id: Meteor.userId()}, {$set: {"profile.rating": this.rating}});
    Meteor.users.update({_id: Meteor.userId()}, {$set: {"profile.account_review": this.account_review}});
  }

  returnToHome() {
    let alert = this.alertCtrl.create({
      title: 'Review Submitted!',
      subTitle: 'You have reviewed + provider',
      buttons: [{
        text: 'Return to Home page',
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

