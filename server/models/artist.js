const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var artist = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        index:true,
    },
    slug:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
    },
    cover:{
        type : String,
        required:false,
    },
    thumbnail:{
        type:String,
        required:false,
    },
    follow : {
        type: Number,
        default: 0,
    },
    song :[{
        type:mongoose.Types.ObjectId,
        ref:'songs',
    }],
    album :[{
        type:mongoose.Types.ObjectId,
        ref:'albums',
    }],
    playlist :[{
        type:mongoose.Types.ObjectId,
        ref:'playlists',
    }],
    genre :[{
        type:mongoose.Types.ObjectId,
        ref:'genres',
    }],
    emailAddress :{
        type:String,
        required:false,
    },
    DateofBirth :{
        type:String,
        required:false,
    },
    description :{
        type:String,
        required:false,
    },
    
    
    
},{
    timestamps:true
    
}
);
artist.index({name:'text'});
//Export the model
module.exports = mongoose.model('artist', artist);