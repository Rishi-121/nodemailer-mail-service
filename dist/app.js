"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
const express_1 = __importStar(require("express"));
Promise.resolve().then(() => __importStar(require("./config/db")));
const mongoose_1 = __importDefault(require("mongoose"));
const user_1 = require("./models/user");
const mailer_1 = require("./utils/mailer");
const app = express_1.default();
const conf = dotenv_1.config();
if (conf.error)
    throw new Error(conf.error.message);
app.set("view engine", "ejs");
app.use(express_1.json());
app.use(express_1.urlencoded({ extended: false }));
app.get("/", (req, res) => {
    res.send("It Works!");
});
app.post("/subscribe", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.body;
        const isSubscriberAlreadyExists = yield user_1.User.findOne({ email: email });
        if (!isSubscriberAlreadyExists) {
            const newSubscriber = new user_1.User(Object.assign(Object.assign({}, req.body), { _id: new mongoose_1.default.Types.ObjectId() }));
            yield mailer_1.mailer(req);
            yield newSubscriber.save();
            res.send("Thank you!😊");
        }
        else {
            res.status(409).json({
                message: `Hey ${req.body.fullName}, You have already subscribed!`,
                success: false,
            });
        }
    }
    catch (err) {
        err.status = 500;
        next(err);
    }
}));
app.use((error, req, res, next) => {
    res.status(error.status).json({
        message: error.message,
        stack: process.env.NODE_ENV === "production" ? "👍" : error,
    });
});
app.listen(process.env.PORT || 8000, () => console.log("Server started..."));
//# sourceMappingURL=app.js.map