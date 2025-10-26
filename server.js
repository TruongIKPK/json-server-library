const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();
const PORT = process.env.PORT || 3000;

// Middleware xác thực Token
server.use((req, res, next) => {
  // Cho phép truy cập mà không cần token cho GET (public)
  if (req.method === "GET") {
    next();
  } else {
    // Kiểm tra header Authorization
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader === "Bearer mysecrettoken") {
      next();
    } else {
      res.status(401).json({ message: "Unauthorized - Invalid or missing token" });
    }
  }
});

server.use(middlewares);
server.use(router);

server.listen(PORT, () => {
  console.log(`✅ JSON Server running on port ${PORT}`);
});