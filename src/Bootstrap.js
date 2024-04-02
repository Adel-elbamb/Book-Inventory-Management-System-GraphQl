import connection from "./DB/connection.js";
import cors from "cors";
import bookRouter from "./module/book/book.router.js";
import authRouter from "./module/auth/auth.router.js";
import { globerErrorHandling } from "./utilis/asyncHandler.js";
function bootstrap(app, express) {
  connection();
  var whitelist = ["http://example1.com", "http://example2.com"];
  app.use(express.json());
  if (process.env.MODE == "DEV") {   // donent forget dev 
    app.use(cors());
  } else {
    app.use(async (req, res, next) => {
      if (!whitelist.includes(req.header("origin"))) {
        return next(new Error("not allowed by cores"));
      }
      await res.header("Access-Control-Alow-Origin", "*");
      await res.header("Access-Control-Alow-Header", "*");
      await res.header("Access-Control-Alow-Private-network", "true");
      await res.header("Access-Control-Alow-Method", "*");
      next();
    });
  }
  app.use("/auth", authRouter);
  app.use("/book", bookRouter);
  app.use(globerErrorHandling);
}
export default bootstrap;
