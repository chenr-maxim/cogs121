import { MongoObservable } from 'meteor-rxjs';
import { Request } from '../models';

export const Requests = new MongoObservable.Collection<Request>('requests');