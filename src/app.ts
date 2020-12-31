import { config } from "dotenv";
import express, {
  Express,
  Request,
  Response,
  NextFunction,
  json,
  urlencoded,
} from "express";
import("./config/db");
import { default as mongoose } from "mongoose";
import ejs from "ejs";
import { User } from "./models/user";
import { mailer } from "./utils/mailer";

const app: Express = express();

const conf = config();
if (conf.error) throw new Error(conf.error.message);

app.set("view engine", "ejs");
app.use(json());
app.use(urlencoded({ extended: false }));

app.get("/", (req: Request, res: Response) => {
  res.send("It Works!");
});

app.post(
  "/subscribe",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email } = req.body;
      const isSubscriberAlreadyExists = await User.findOne({ email: email });
      if (!isSubscriberAlreadyExists) {
        const newSubscriber = new User({
          ...req.body,
          _id: new mongoose.Types.ObjectId(),
        });
        await mailer(req);
        await newSubscriber.save();
        res.send("Thank you!😊");
      } else {
        res.status(409).json({
          message: `Hey ${req.body.fullName}, You have already subscribed!`,
          success: false,
        });
      }
    } catch (err) {
      err.status = 500;
      next(err);
    }
  }
);

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  res.status(error.status).json({
    message: error.message,
    stack: process.env.NODE_ENV === "production" ? "👍" : error,
  });
});

app.listen(process.env.PORT || 8000, () => console.log("Server started..."));
