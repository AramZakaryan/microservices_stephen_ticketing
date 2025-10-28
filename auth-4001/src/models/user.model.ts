import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const User = mongoose.model('User', userSchema);

type userAttrs = {
  email: string;
  password: string;
};

const buildUser = (attrs: userAttrs) => new User(attrs);

const user = buildUser({ email: 333, password: '' });
