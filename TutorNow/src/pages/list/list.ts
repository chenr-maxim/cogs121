import { Component, OnInit, OnDestroy } from '@angular/core';
import { Platform, NavController, NavParams } from 'ionic-angular';
import { Providers } from 'api/collections/providers';
import { Geolocation } from '@ionic-native/geolocation';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage implements OnInit, OnDestroy {
  intervalObs: Subscription;
  lat:number = 32.8812;
  lng:number = -117.23674;
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
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
      }
    ));
  }

  publishLocation() : void {
    Providers.collection.insert({
      latitude: this.lat + (-1 * (Math.random() > 0.5 ? 1 : 0 )) * (Math.random() / 1000),
      longitude: this.lng  + (-1 * (Math.random() > 0.5 ? 1 : 0 )) * (Math.random() / 1000),
      createdAt: new Date()
    });
    alert("PUBLISHED");
  }
}
