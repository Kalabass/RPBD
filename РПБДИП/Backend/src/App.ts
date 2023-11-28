import * as express from "express";
import * as cors from "cors";
import users_router from "../router/users_router";
import * as morgan from "morgan"
import rooms_router from "../router/rooms_router";
import logger_router from "../router/logger_router";
const app = express();
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173',
    methods: 'GET,POST,DELETE, PUT',
    credentials: true
}));
app.use(morgan('tiny'));
app.use('/api', users_router, rooms_router, logger_router);


export default app;