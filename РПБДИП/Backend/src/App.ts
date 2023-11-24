import * as express from "express";
import students_router from "../router/Students_router"
import * as cors from "cors";
import users_router from "../router/users_router";
import * as morgan from "morgan"
const app = express();
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173',
    methods: 'GET,POST,DELETE, PUT',
    credentials: true
}));
app.use(morgan('tiny'));
app.use('/api', students_router);
app.use('/api', users_router);

export default app;