const { Schema, model } = require('mongoose');

let userSchema = new Schema({
    username:{ type:String, default: '' },
    password:{ type:String, default: '' },
    role: {type: String, default: 'user'}, // admin, user, manager
    accessToken: {type: String, default: ''},
    refreshToken: {type: String, default: ''},
    email: {type: String, default: ''},
    creationDate: { type: Date, default: Date.now }
});

module.exports = model('User', userSchema)