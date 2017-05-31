import { MongoObservable } from 'meteor-rxjs';
import { Acknowledge } from '../models';

export const Acknowledges = new MongoObservable.Collection<Acknowledge>('Acknowledges', {
  transform: (acknowledge) => {
    acknowledge.requester = Meteor.users.findOne({_id: acknowledge.requesterId})
    acknowledge.requestee = Meteor.users.findOne({_id: acknowledge.requesteeId})

    return acknowledge
  }
});