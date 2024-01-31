const {Schema, model} = require('mongoose');

const productSchema = new Schema({
    category: {type : Schema.Types.ObjectId , ref: 'Category',required:true},
    title : {type:String , required:[true,'Title is required']},
    description :{type :String ,default:""},
    price: {type: Number , required: true},
    images: {type : Array ,default : []},
    sales: {
        quantitySold: { type: Number, default: 0 },
        totalRevenue: { type: Number, default: 0 }
    },
    updatedOn : {type : Date},
    createdOn : {type :Date}
});

productSchema.pre('save', function(next){
    //this keyword refers to document trying to be saved
 
    this.updatedOn = new Date();
    this.createdOn = new Date();

    next();
});


productSchema.pre(['update','findOneAndUpdate','updateOne'],function(next){
    const update = this.getUpdate();

    delete update._id; // we r deleting this to make sure this is 
    //not updated
    this.updatedOn = new Date();

    next();

    //TODO:on update revenue should be quantity sold * price
});

const ProductModel = model('Product',productSchema);

module.exports = ProductModel;