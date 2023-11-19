import * as express from "express";
import students_router from "../router/Students_router"
import * as cors from "cors";

const app = express();
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173',
    methods: 'GET,POST,DELETE, PUT',
    credentials: true
}));
app.use('/api', students_router);

export default app;