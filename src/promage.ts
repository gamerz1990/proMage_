import express from "express";
import bodyParser from "body-parser";
import { connectDB } from "./config/database";
import projectRoutes from "./routes/project";
import taskRoutes from "./routes/task";
import managerRoutes from "./routes/manager";
import Webhook from "./routes/webhook";

connectDB();

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api/v1/projects", projectRoutes);
app.use("/api/v1/tasks", taskRoutes);
app.use("/api/v1/managers", managerRoutes);
app.use("/api/v1/webhooks", Webhook);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
