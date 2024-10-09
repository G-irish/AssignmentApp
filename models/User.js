const mongoose=require('mongoose');
const bcrypt=require('bcrypt');
const userSchema=mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    role:{type:String,required:true}
});

// User method for verifying password
userSchema.methods.matchPassword=async function(password){
    return await bcrypt.compare(password,this.password);
}

// encrypt the password before storing user in database
userSchema.pre('save',async function(next){
    if(!this.isModified('password')){
        next();
    }
    const salt=await bcrypt.genSalt(10);
    this.password=await bcrypt.hash(this.password,salt);
});
module.exports=mongoose.model("User",userSchema);
