/**
 * Created by Oscar on 5/31/2017.
 */
import {Directive, OnInit, Input, Output} from '@angular/core';
import {GoogleMapsAPIWrapper} from '@agm/core';

declare var google: any;

@Directive({
  selector: 'sebm-google-map-directions'
})
export class DirectionsMapDirective {
  @Input() originlat:any ;
  @Input() originlng:any ;
  @Input() destlat:any;
  @Input() destlng:any;
  @Input() waypoints:any;
  @Input() directionsDisplay:any;
  @Input() estimatedTime : any;
  @Input() estimatedDistance : any;

  constructor (private gmapsApi: GoogleMapsAPIWrapper) {}
  ngOnInit(){
    this.gmapsApi.getNativeMap().then(map => {

      var directionsService = new google.maps.DirectionsService;
      this.directionsDisplay = new google.maps.DirectionsRenderer({
        suppressMarkers: true
      });
      var me = this;

      this.directionsDisplay.setMap(map);
      this.directionsDisplay.setOptions({
        polylineOptions: {
          strokeWeight: 8,
          strokeOpacity: 0.7,
          strokeColor:  '#00468c'
        }
      });
      this.directionsDisplay.setDirections({routes: []});
      directionsService.route({
        origin: {lat: this.originlat, lng: this.originlng },
        destination: {lat: this.destlat, lng: this.destlng },
        travelMode: google.maps.DirectionsTravelMode.WALKING
      }, function(response: any, status: any) {
        if (status === 'OK') {
          me.directionsDisplay.setOptions({ preserveViewport: true });
          me.directionsDisplay.setDirections(response);
          //map.setZoom(30);
          var point = response.routes[ 0 ].legs[ 0 ];
          me.estimatedTime = point.duration.text ;
          me.estimatedDistance = point.distance.text;
          console.log(me.estimatedTime);
          console.log( 'Estimated travel time: ' + point.duration.text + ' (' + point.distance.text + ')' );
        } else {
          console.log('Directions request failed due to ' + status);
        }
      });
    });

  }

}