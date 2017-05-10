import { TutorLocations } from './collections/tutor-locations';

Meteor.methods({
    'TutorLocations.publishLocation'(latitude:number, longitude:number){
        console.log("Called");
            TutorLocations.upsert({
                userId: this.userId
            },
            {
                $set: {
                    isActive: true,
                    latitude: latitude,
                    longitude: longitude,
                    lastUpdated: Date()
                }
            });
    },
    'TutorLocations.setActive'(active:boolean){
        console.log("Called");
        TutorLocations.upsert({
            userId: this.userId
        },
        {
            $set: {
                isActive: active
            }
        });
    }
})