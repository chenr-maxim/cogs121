import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Platform, NavController, NavParams } from 'ionic-angular';
import { Acknowledge } from 'api/models';
import { Acknowledges } from 'api/collections/acknowledges';
import { DirectionsMapDirective } from './directions';
import { InProgressPage } from '../in-progress/in-progress';

@Component({
  selector: 'page-routing',
  templateUrl: 'routing.html'
})
export class RoutingPage {
  lat: number = 32.8812;
  lng: number = -117.23674;

  destlat: number = 32.8815;
  destlng: number = -117.23670;

  @ViewChild(DirectionsMapDirective) vc: DirectionsMapDirective;

  private acknowledge: Acknowledge;
  private acknowledgeId: string;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, 
    private platform:Platform) {
  }

  ngOnInit() {
    this.acknowledgeId = this.navParams.get('acknowledgeId');
    this.acknowledge = Acknowledges.findOne(this.acknowledgeId);

    console.log("Ack", this.acknowledge);

    this.lat = this.acknowledge.requestee.profile.lat;
    this.lng = this.acknowledge.requestee.profile.lng;

    this.destlat = this.acknowledge.requester.profile.lat;
    this.destlng = this.acknowledge.requester.profile.lng;
  }

  call(){
    if(this.acknowledge.requesteeId === Meteor.userId()){
      window.open("tel:" + this.acknowledge.requester.profile.phonenumber);
    }
    else{
      window.open("tel:" + this.acknowledge.requestee.profile.phonenumber);
    }
  }

  startTutoring() {
    this.navCtrl.setRoot(InProgressPage, {
      acknowledgeId: this.acknowledgeId,
    }, {
      animate: true
    })
  }


  public customStyle = [{"elementType":"geometry","stylers":[{"color":"#f5f5f5"}]},{"elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"elementType":"labels.text.fill","stylers":[{"color":"#616161"}]},{"elementType":"labels.text.stroke","stylers":[{"color":"#f5f5f5"}]},{"featureType":"administrative.land_parcel","elementType":"labels.text.fill","stylers":[{"color":"#bdbdbd"}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#eeeeee"}]},{"featureType":"poi","elementType":"labels.text.fill","stylers":[{"color":"#757575"}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#e5e5e5"}]},{"featureType":"poi.park","elementType":"labels.text.fill","stylers":[{"color":"#9e9e9e"}]},{"featureType":"road","elementType":"geometry","stylers":[{"color":"#ffffff"}]},{"featureType":"road.arterial","elementType":"labels.text.fill","stylers":[{"color":"#757575"}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"color":"#dadada"}]},{"featureType":"road.highway","elementType":"labels.text.fill","stylers":[{"color":"#616161"}]},{"featureType":"road.local","elementType":"labels.text.fill","stylers":[{"color":"#9e9e9e"}]},{"featureType":"transit.line","elementType":"geometry","stylers":[{"color":"#e5e5e5"}]},{"featureType":"transit.station","elementType":"geometry","stylers":[{"color":"#eeeeee"}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#c9c9c9"}]},{"featureType":"water","elementType":"labels.text.fill","stylers":[{"color":"#9e9e9e"}]}];
}
