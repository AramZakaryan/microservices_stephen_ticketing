import mongoose, { Model, Document } from 'mongoose';
import { Password } from '../services/password';

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

userSchema.pre('save', async function (done) {
  if (this.isModified('password')) {
    const hash = await Password.toHash(this.get('password'));
    this.set('password', hash);
  }

  done();
});

type UserModel = Model<UserDoc> & {
  buildUser(attrs: userAttrs): UserDoc;
};

export const User = mongoose.model<UserDoc, UserModel>('User', userSchema);
