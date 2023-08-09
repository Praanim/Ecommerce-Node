const {Schema , model} = require('mongoose');
const uuid = require('uuid');
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    id:{type: String , unique: true},
    fullName :{type: String , default:''},
    email:{type: String , unique: true, required:true},
    password:{type:String, required:true},
    address:{type:String, default :""},
    city:{type:String, default :""},
    state: {type:String, default :""},
    profile:{type: Number ,default: 0},
    updatedOn:{type:Date},
    createdOn:{type:Date},

});

userSchema.pre('save', function(next){
    //this keyword refers to document trying to be saved
    this.id = uuid.v1();
    this.updatedOn = new Date();
    this.createdOn = new Date();

    //hash the pasword
    const salt = bcrypt.genSaltSync(10);
    const hash= bcrypt.hashSync(this.password,salt);

    this.password = hash;

    next();
});

userSchema.pre(['update','findOneAndUpdate','updateOne'],function(next){
    const update = this.getUpdate();

    delete update._id;
    delete update.id;

    this.updatedOn = new Date();

    next();
});

const UserModel = model('User',userSchema);

module.exports = UserModel;