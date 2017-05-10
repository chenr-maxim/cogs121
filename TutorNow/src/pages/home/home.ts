import { Component, OnInit} from '@angular/core';
import { NavController } from 'ionic-angular';
import { Observable } from 'rxjs';
import { TutorLocations } from 'api/collections/tutor-locations';
import { TutorLocation } from 'api/models';
import * as moment from 'moment';
import {ClientRequestPage} from '../client-request/client-request';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {
  ucsdLat: number = 32.8812;
  ucsdLong: number = -117.23674;
  lat: number = 51.678418;
  lng: number = 7.809007;
  tutorLocations: Observable<TutorLocation[]>;
  currentTutor : TutorLocation;


  constructor(public navCtrl: NavController) {

  }  

  ngOnInit() {
    this.tutorLocations = TutorLocations.find(
      {
        'isActive': true,
        //lastUpdated': { $gte : moment().subtract(30, "seconds").toDate() }
      }
    ).zone();
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



