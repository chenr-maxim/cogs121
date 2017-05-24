import { Component, OnInit, OnDestroy } from '@angular/core';
import { Platform, NavController, NavParams, LoadingController } from 'ionic-angular';
import { InProgressPage } from '../in-progress/in-progress';
import { Meteor } from 'meteor/meteor';
import { TutorLocation, Request, Acknowledge } from 'api/models';
import { Requests } from 'api/collections/requests';
import { Acknowledges } from 'api/collections/acknowledges';


@Component({
  selector: 'page-client-request',
  templateUrl: 'client-request.html'
})
export class ClientRequestPage {
  private tutorLocation: TutorLocation;
  private tutorUser: Meteor.User;
  private requesting:boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private platform:Platform, private loadingCtrl:LoadingController){
  	this.tutorLocation = navParams.get('tutorLocation');
    this.tutorUser = navParams.get('tutorUser');

  }

  call(){
    window.open("tel:" + this.tutorUser.profile.phonenumber);
  }
  private generateHandshake() : string {
    return (Math.floor(Math.random() * 10000000000).toString());
  }

  request() {
    let loading = this.loadingCtrl.create({
      content: "Requesting...",
      dismissOnPageChange: true,
      spinner: "crescent"
    });

    loading.present();

    let handshake = this.generateHandshake();
    console.log(`Requesting ${this.tutorUser._id} with handshake ${handshake}`);
    Requests.insert({
      requesterId: Meteor.userId(),
      requesteeId: this.tutorUser._id,
      handshake: handshake
    });
    this.requesting = true;

    const cursor = Acknowledges.find(
      {
        requesterId: Meteor.userId(),
        handshake: handshake
      });
    
    const handle = cursor.observe({
      added(ack:Acknowledge) {
        loading.dismiss();
        console.log(JSON.stringify(ack));
        if(ack.requesterId === Meteor.userId() && ack.handshake === handshake && ack.accepted) {
          handle.stop();
          //requesting = false;
          //this.navCtrl.setRoot(InProgressPage, {
            //tutorLocation: this.tutorLocation,
            //tutorUser: this.tutoruser,
            //sessionId: this.handeshake
          //}, {
           // animate: true
          //});
          alert("Accepted");
        } else {
          // rejected :(
          alert("Rejected");
          Acknowledges.remove(ack._id);
          handle.stop();
          //this.requesting = false;
        }
      }
    });
    //this.navCtrl.setRoot(InProgressPage, {}, {
     // animate: true
   // });

   setTimeout(() => {
     handle.stop();
     loading.dismiss();
   }, 15000);
  }

  cancelToRoot() {
  		this.navCtrl.popToRoot();
  	}
}


