const Event = require('../../models/event');
const User = require('../../models/user');
const { dateToString } = require('../../helpers/date');


const events = async eventIds => {
    const events = await Event.find({_id: {$in: eventIds}})
     try{
          return events.map(event => {
             return transformEvent(event);
     });
    }
    catch (err){
            throw err;
     }
 };
 
 const singleEvent = async eventId =>{
     try{
         const event = await Event.findById(eventId);
         return transformEvent(event);
     }
     catch (err) {
         throw err;
     }
 }
 
 const user =  async userId => {
     try{
      const user = await User.findById(userId);
         return { 
              ...user._doc,
               _id: user.id/*event._doc._id.toString() não mais necessário*/,
             createdEvents: events.bind(this, user._doc.createdEvents)
             };
         }
         catch (err){
         throw err;
     }
     
 };

 const transformEvent = event => {
    return {
        ...event._doc,
        _id: event.id/*event._doc._id.toString() não mais necessário*/,
        date: dateToString(event._doc.date),
       creator: user.bind(this, event.creator) 
    };
};


const transformBooking = booking => {
    return{
        ...booking._doc,
        _id: booking.id,
        user: user.bind(this, booking._doc.user),
        event: singleEvent.bind(this, booking._doc.event),
         createdAt: dateToString(booking._doc.createdAt),
         updatedAt: dateToString(booking._doc.updatedAt)                    
       }
}

 //exports.user = user;
 //exports.events = events;
 //exports.singleEvent = singleEvent;

 exports.transformEvent = transformEvent;
 exports.transformBooking = transformBooking;