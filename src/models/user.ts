import { default as mongoose } from "mongoose";

const regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const subscriberSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  fullName: { type: String, required: true },
  email: {
    type: String,
    required: true,
    validate(email) {
      if (!regex.test(email)) {
        throw new Error("Invalid Email");
      }
    },
  },
});

export const User = mongoose.model("subscriber", subscriberSchema);
