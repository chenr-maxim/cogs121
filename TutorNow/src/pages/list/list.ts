import { Component, OnInit, OnDestroy } from '@angular/core';
import { Platform, NavController, NavParams } from 'ionic-angular';
import { Providers } from 'api/collections/providers';
import { Geolocation } from '@ionic-native/geolocation';
import { TutorLocations } from 'api/collections/tutor-locations';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage implements OnInit, OnDestroy {
  intervalObs: Subscription;
  isActive:boolean = false;
  position:Position;
  lat:number;
  lng:number;
  constructor(public navCtrl: NavController, public navParams: NavParams, 
    private platform:Platform, private geolocation: Geolocation) {

  }

  ngOnInit() : void {
    this.intervalObs = this.reloadLocation().flatMapTo(
      Observable.interval(5000).timeInterval()).subscribe(() => {this.reloadLocation();});
  }

  ngOnDestroy() {
    if(this.intervalObs) {
      this.intervalObs.unsubscribe();
    }
  }

  reloadLocation() {
    return Observable.fromPromise(
      this.geolocation.getCurrentPosition().then((position) => {
        console.log(position);
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        if(this.isActive) {
          this.publishLocation();
        }
      }
    ));
  }

  goOnline() : void {
    this.isActive = true;
  }

  goOffline() : void {
    this.isActive = false;
    Meteor.call('TutorLocations.setActive', false);
  }

  publishLocation() : void {
    Meteor.call('TutorLocations.publishLocation', this.lat, this.lng);
  }

  public customStyle = [{"elementType":"geometry","stylers":[{"color":"#f5f5f5"}]},{"elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"elementType":"labels.text.fill","stylers":[{"color":"#616161"}]},{"elementType":"labels.text.stroke","stylers":[{"color":"#f5f5f5"}]},{"featureType":"administrative.land_parcel","elementType":"labels.text.fill","stylers":[{"color":"#bdbdbd"}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#eeeeee"}]},{"featureType":"poi","elementType":"labels.text.fill","stylers":[{"color":"#757575"}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#e5e5e5"}]},{"featureType":"poi.park","elementType":"labels.text.fill","stylers":[{"color":"#9e9e9e"}]},{"featureType":"road","elementType":"geometry","stylers":[{"color":"#ffffff"}]},{"featureType":"road.arterial","elementType":"labels.text.fill","stylers":[{"color":"#757575"}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"color":"#dadada"}]},{"featureType":"road.highway","elementType":"labels.text.fill","stylers":[{"color":"#616161"}]},{"featureType":"road.local","elementType":"labels.text.fill","stylers":[{"color":"#9e9e9e"}]},{"featureType":"transit.line","elementType":"geometry","stylers":[{"color":"#e5e5e5"}]},{"featureType":"transit.station","elementType":"geometry","stylers":[{"color":"#eeeeee"}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#c9c9c9"}]},{"featureType":"water","elementType":"labels.text.fill","stylers":[{"color":"#9e9e9e"}]}];
}
