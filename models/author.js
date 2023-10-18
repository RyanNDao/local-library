const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const dt = require('luxon');

const AuthorSchema = new Schema({
    first_name: {type: String, required: true, maxLength: 100},
    family_name: {type: String, required: true, maxLength: 100},
    date_of_birth: {type: Date},
    date_of_death: {type: Date},
})

AuthorSchema.virtual('name').get(function(){
    let fullName = '';
    if (this.first_name && this.family_name){
        fullName = `${this.family_name}, ${this.first_name}`;
    }
    return fullName;
})

AuthorSchema.virtual('url').get(function(){
    return `/catalog/author/${this._id}`;
})

AuthorSchema.virtual("formatted_date_of_birth").get(function(){
    return this.date_of_birth ? `${dt.DateTime.fromJSDate(this.date_of_birth).toLocaleString(dt.DateTime.DATE_FULL)}` : '';
})

AuthorSchema.virtual("date_of_birth_yyyy").get(function(){
    return this.date_of_birth ? `${dt.DateTime.fromJSDate(this.date_of_birth).toFormat('yyyy-MM-dd')}` : '';
})

AuthorSchema.virtual("formatted_date_of_death").get(function(){
    return this.date_of_death ? `${dt.DateTime.fromJSDate(this.date_of_death).toLocaleString(dt.DateTime.DATE_FULL)}` : '';
})

AuthorSchema.virtual("date_of_death_yyyy").get(function(){
    return this.date_of_death ? `${dt.DateTime.fromJSDate(this.date_of_death).toFormat('yyyy-MM-dd')}` : '';
})

AuthorSchema.virtual("lifespan").get(function(){
    return `${this.formatted_date_of_birth} - ${this.formatted_date_of_death}`
})

module.exports = mongoose.model('Author', AuthorSchema);