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
  tutorLocations: Observable<TutorLocation[]>;
  currentTutor : TutorLocation;


  constructor(public navCtrl: NavController, private geolocation: Geolocation) {
  }  

  ngOnInit() {
    this.tutorLocations = TutorLocations.find(
      {
        'isActive': true,
        //lastUpdated': { $gte : moment().subtract(30, "seconds").toDate() }
      }
    ).zone();

    this.geolocation.getCurrentPosition().then((position) => {
      console.log(position);
      this.lat = position.coords.latitude;
      this.lng = position.coords.longitude;
    });
  }

  markerClick(tutor){
    this.currentTutor = tutor;
    console.log(tutor);
  }

  view(tutor){
    this.navCtrl.push(ClientRequestPage, {
      param: tutor
    })

  }

}



