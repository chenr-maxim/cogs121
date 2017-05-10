import { MongoObservable } from 'meteor-rxjs';
import { Observable } from 'rxjs';
import { TutorLocation } from '../models';

export const TutorLocations = new MongoObservable.Collection<TutorLocation>('location', {
  transform: (location) => {
    location.user = Meteor.users.findOne({_id: location.userId})

    return location
  }
});