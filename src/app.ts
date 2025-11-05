import express from "express";
import morgan from "morgan";
import loanRoutes from "./api/v1/routes/loanRoutes";
import { errorHandler } from "./api/v1/middleware/errorHandler";
import { loggerMiddleware } from "./api/v1/middleware/loggerMiddleware";
import userRoutes from "./api/v1/routes/userroutes";
import roleRoutes from "./api/v1/routes/roleRoutes";

const app = express();

// Middleware
app.use(express.json());
app.use(morgan("dev"));
app.use(loggerMiddleware);

// Routes
app.use("/api/v1", loanRoutes);

// global error handler
app.use(errorHandler);

app.use("/api/v1/users", userRoutes);

app.use("/api/v1/roles", roleRoutes);

// Root route
app.get("/", (req, res) => {
  res.send("High-Risk Loan Application Monitoring System API is running.");
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

export default app;