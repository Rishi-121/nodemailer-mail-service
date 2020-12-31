import { connect } from "mongoose";

export default connect(process.env.MONGO_URI, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log("DB Connected!");
  })
  .catch((error: any) => {
    console.log(error);
  });

  