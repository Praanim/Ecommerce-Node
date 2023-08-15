const {Schema, model} = require('mongoose');

const categorySchema = new Schema({
    title : {type:String , required:[true,'Title is required']},
    description :{type :String ,default:""},
    updatedOn : {type : Date},
    createdOn : {type :Date}
});

categorySchema.pre('save', function(next){
    //this keyword refers to document trying to be saved
 
    this.updatedOn = new Date();
    this.createdOn = new Date();

    next();
});


categorySchema.pre(['update','findOneAndUpdate','updateOne'],function(next){
    const update = this.getUpdate();

    delete update._id; // we r deleting this to make sure this is 
    //not updated
    this.updatedOn = new Date();

    next();
});

const CategoryModel = model('Category',categorySchema);

module.exports = CategoryModel;