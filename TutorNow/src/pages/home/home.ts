import { Component, OnInit} from '@angular/core';
import { NavController } from 'ionic-angular';
import { Observable } from 'rxjs';
import { TutorLocations } from 'api/collections/tutor-locations';
import { TutorLocation } from 'api/models';
import { Geolocation } from '@ionic-native/geolocation';
import * as moment from 'moment';
import {ClientRequestPage} from '../client-request/client-request';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {
  lat: number = 32.8812;
  lng: number = -117.23674;
  myLocationFound: boolean = false;
  tutorLocations: Observable<TutorLocation[]>;
  currentTutor : TutorLocation;


  constructor(public navCtrl: NavController, private geolocation: Geolocation) {
  }  

  ngOnInit() {
    this.tutorLocations = TutorLocations.find(
      {
        'isActive': true,
        'lastUpdated': { $gte : moment().subtract(1, "minute").toDate() }
      }
    ).zone();

    this.geolocation.getCurrentPosition().then((position) => {
      console.log(position);
      this.lat = position.coords.latitude;
      this.lng = position.coords.longitude;
      this.myLocationFound = true;
    });
  }

  markerClick(tutor){
    this.currentTutor = tutor;
    console.log(tutor);
  }

  view(tutor){
    console.log(tutor.user);
    this.navCtrl.push(ClientRequestPage, {
      tutorLocation: tutor,
      tutorUser: tutor.user
    })
  }



  public customStyle = [{"elementType":"geometry","stylers":[{"color":"#f5f5f5"}]},{"elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"elementType":"labels.text.fill","stylers":[{"color":"#616161"}]},{"elementType":"labels.text.stroke","stylers":[{"color":"#f5f5f5"}]},{"featureType":"administrative.land_parcel","elementType":"labels.text.fill","stylers":[{"color":"#bdbdbd"}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#eeeeee"}]},{"featureType":"poi","elementType":"labels.text.fill","stylers":[{"color":"#757575"}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#e5e5e5"}]},{"featureType":"poi.park","elementType":"labels.text.fill","stylers":[{"color":"#9e9e9e"}]},{"featureType":"road","elementType":"geometry","stylers":[{"color":"#ffffff"}]},{"featureType":"road.arterial","elementType":"labels.text.fill","stylers":[{"color":"#757575"}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"color":"#dadada"}]},{"featureType":"road.highway","elementType":"labels.text.fill","stylers":[{"color":"#616161"}]},{"featureType":"road.local","elementType":"labels.text.fill","stylers":[{"color":"#9e9e9e"}]},{"featureType":"transit.line","elementType":"geometry","stylers":[{"color":"#e5e5e5"}]},{"featureType":"transit.station","elementType":"geometry","stylers":[{"color":"#eeeeee"}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#c9c9c9"}]},{"featureType":"water","elementType":"labels.text.fill","stylers":[{"color":"#9e9e9e"}]}];

}



