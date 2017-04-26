import { Component } from '@angular/core';
import { Platform, NavController } from 'ionic-angular';
import {GoogleMap, CameraPosition, MarkerOptions, Marker, LatLng} from '@ionic-native/google-maps'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  private map:GoogleMap;
  constructor(public navCtrl: NavController, private platform:Platform) {
    platform.ready().then(() => this.loadMap());
  }
  loadMap() : void {
    this.map = new GoogleMap('map', {
          'backgroundColor': 'white',
          'controls': {
            'compass': true,
            'myLocationButton': true,
            'indoorPicker': true,
            'zoom': true
          },
          'gestures': {
            'scroll': true,
            'tilt': true,
            'rotate': true,
            'zoom': true
          }
        });
        
        let ionic: LatLng = new LatLng(32.8708575,-117.233495);;

        // create CameraPosition
        let position: CameraPosition = {
          target: ionic,
          zoom: 18,
          tilt: 30
        };

        // move the map's camera to position
        this.map.moveCamera(position);

        // create new marker
        let markerOptions: MarkerOptions = {
          position: ionic,
          title: 'Test Marker'
        };

        this.map.addMarker(markerOptions)
          .then((marker: Marker) => {
              marker.showInfoWindow();
            });
        }
}
