import { MongoObservable } from 'meteor-rxjs';
import { Observable } from 'rxjs';
import { TutorLocation } from '../models';

export const TutorLocations = new MongoObservable.Collection<TutorLocation>('location');