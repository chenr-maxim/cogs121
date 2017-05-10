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
      Observable.interval(500).timeInterval()).subscribe(() => {this.reloadLocation();});
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
}
