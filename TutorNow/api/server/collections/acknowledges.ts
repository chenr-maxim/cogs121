import { MongoObservable } from 'meteor-rxjs';
import { Acknowledge } from '../models';

export const Acknowledges = new MongoObservable.Collection<Acknowledge>('Acknowledges');