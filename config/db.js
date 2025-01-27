const { default: mongoose } = require("mongoose")

exports.dbConnect=()=>{
    mongoose.connect('mongodb+srv://riyamehta3008:7d8rcP9zovcDVlvk@school.w2zqm.mongodb.net/category')
    .then(() => console.log("db connect 👍"))
    .catch(err => console.log(err));
}