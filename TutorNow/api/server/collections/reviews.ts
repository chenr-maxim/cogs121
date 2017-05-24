import { MongoObservable } from 'meteor-rxjs';
import { Provider } from '../models';

export const Reviews = new MongoObservable.Collection<Provider>('reviews');