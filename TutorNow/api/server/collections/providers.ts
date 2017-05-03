import { MongoObservable } from 'meteor-rxjs';
import { Provider } from '../models';

export const Providers = new MongoObservable.Collection<Provider>('providers');