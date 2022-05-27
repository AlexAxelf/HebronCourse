

const { Schema, model } = require('mongoose');

const User = new Schema({
    name: { type: String, trim: true, required: true },
    email: { type: String, trim: true, lowercase: true, required: true },
    password: { type: String, trim: true, required: true },
    age: { type: Number, default: 18 },
    gender: { type: String, default: 'male' }
});

User.virtual('capsName').get(function () {
    return this.name.toUpperCase()
})

User.statics = {
    async createWithHashedPass(user) {
        const hashPassword = await authService.hashPassword(user.password);

        return this.create({ ...user, password: hashPassword });
    }
}

module.exports = model('user', User);