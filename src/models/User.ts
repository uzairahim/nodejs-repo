import { Model, model, Schema } from "mongoose";
import { IUser } from "../interfaces/users";
import enums from '../constants/default';
import error from '../constants/error_messages';

const userSchema: Schema = new Schema({
  name: {
    type: String
  },
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  phoneNo: {
    type: String
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  aboutUs: {
    type: String,
  },
  profilePicUrl: {
    type: String,
    default: "profile.png"
  },
  resumeUrl: {
    type: String,
  },
  isProfilePublic: {
    type: Boolean,
    default: false
  },
  experience: {
    type: String,
  },
  accountReason: {
    type: String,
  },
  role: {
    type: Schema.Types.ObjectId,
    ref: "Role",
    required: true
  },
  unionNo: {
    type: String,
  },
  country: {
    type: String,
  },
  isCompleted: {
    type: Boolean,
    default: false
  },
  date: {
    type: Date,
    default: Date.now
  },
}, {
  timestamps: true
});

userSchema.index({ firstName: 'text', lastName: 'text' })

const User: Model<IUser> = model("User", userSchema);

export default User;
