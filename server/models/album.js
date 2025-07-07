const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var album = new mongoose.Schema({
    title:{
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
    isAlbum:{
        required:false,
        type:Boolean,
        default:true,
    },
    isSingle:{
        required:false,
        type:Boolean,
        default:false,
    },
    isActive :{
        required:false,
        type:Boolean,
        default:true,
    },
    artists:[{
        type:mongoose.Types.ObjectId,
        ref:'artist',
     
    }],

    genres:[{
        type:mongoose.Types.ObjectId,
        ref:'genre',
    
    }],
    album_art:{
        type:String,
        required:false,
    },
    album_cover:{
        type:String,
        required:false,
    },
    song :[{
        type:mongoose.Types.ObjectId,
        ref:'song',
        required:false,
    }],
    description:{
        type:String,
        required:false,
    },

    
    
},{
    timestamps:true
});
album.index({title:'text',
slug:'text',
description:'text',});
//Export the model
module.exports = mongoose.model('album', album);