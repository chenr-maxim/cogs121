import { Component, OnInit} from '@angular/core';
import { NavController } from 'ionic-angular';
import { Observable } from 'rxjs';
import { Providers } from 'api/collections/providers';
import { Provider } from 'api/models';
import * as moment from 'moment';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {
  ucsdLat: number = 32.8812;
  ucsdLong: number = -117.23674;
  lat: number = 51.678418;
  lng: number = 7.809007;
  providers: Observable<Provider[]>;
  constructor(public navCtrl: NavController) {

  }

  ngOnInit() {
    this.providers = Providers.find(
      {
        //createdAt: { $gte : moment().subtract(5, "minutes").toDate() }
      }).zone();
  }
}
