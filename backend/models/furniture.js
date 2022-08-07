const mongoose = require('mongoose');
const path = require('path');

const ImageBasePath = 'uploads';
const opts = { toJSON: { virtuals: true } };

const furnitureSchema = new mongoose.Schema({
    name: {
        type: String,
        // required: true
    },
    categoryID: {
        type: mongoose.Schema.Types.ObjectId,
        // required: true,
        ref: 'Category'
    },
    description: {
        type: String
    },
    imageName: {
        type: String,
        // required: true
    },
    image: {
        type: Buffer
    },
    ImageType: {
        type: String,
        // required: true
    },
}, opts)

furnitureSchema.virtual('ImagePath').get( function(){
    if( this.image != null && this.ImageType != null ){
        return `data:${this.ImageType};charset=utf-8;base64, ${this.image.toString('base64')}`
    }
})


module.exports = mongoose.model( 'Furniture', furnitureSchema )