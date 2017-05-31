import { Component, OnInit, OnDestroy } from '@angular/core';
import { Platform, NavController, NavParams, AlertController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { ChooseServicePage } from '../choose-service/choose-service';
import { Acknowledge } from 'api/models';
import { Acknowledges } from 'api/collections/acknowledges';
import * as moment from 'moment';

@Component({
  selector: 'page-provider-summary',
  templateUrl: 'provider-summary.html'
})
export class ProviderSummaryPage {
  private acknowledge: Acknowledge;
  private acknowledgeId: string;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private platform:Platform, private alertCtrl: AlertController) {

    this.acknowledgeId = navParams.get('acknowledgeId');

  }

  private account_review = '';
  private rating = '';
  private start:string;
  private end:string;

  private provider;
  private providername = '';

  ngOnInit() {
    this.end = moment().format("h:mm A");

    this.acknowledge = Acknowledges.findOne(this.acknowledgeId);

    Acknowledges.update(this.acknowledgeId, { $set: { endTime: new Date() } });

    this.provider = this.acknowledge.requestee;
    this.start = moment(this.acknowledge.startTime).format("h:mm A");
    this.providername = this.provider.profile.name;

    console.log("Ack", this.acknowledge);
  }

  venmo(){
    window.open("venmo://paycharge?txn=pay&audience=friends&recipients=" + this.provider.profile.venmo);
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
          this.saveSummary();
          this.navCtrl.setRoot(HomePage, {}, {
            animate: true
          });
        }
      }]
    });
    alert.present();
  }


}
