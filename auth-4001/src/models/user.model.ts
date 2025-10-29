import mongoose, { Model, Document } from 'mongoose';

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

type userAttrs = {
  email: string;
  password: string;
};

type UserDoc = Document & {
  email: string;
  password: string;
};

userSchema.statics.buildUser = (attrs: userAttrs) => new User(attrs);

type UserModel = Model<UserDoc> & {
  buildUser(attrs: userAttrs): UserDoc;
};

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

const user1 = User.buildUser({ email: '', password: '' });
const user2 = new User({ email: '', password: '' });
