import * as express from "express";
import * as cors from "cors";
import users_router from "../router/users_router";
import * as morgan from "morgan"
import rooms_router from "../router/rooms_router";
import logger_router from "../router/logger_router";
import access_router from "../router/acess_router";
import incidents_router from "../router/incidents_router";
import * as cookieParser from "cookie-parser";
import * as bodyParser from "body-parser"

const app = express();
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173',
    methods: 'GET,POST,DELETE, PUT',
    credentials: true
}));
app.use(morgan('tiny'));
app.use('/api', users_router, rooms_router, logger_router, access_router, incidents_router);

app.options('*', cors());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
});


export default app;