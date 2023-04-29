const auth = require("json-server-auth");
const jsonServer = require("json-server");

const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();
const port = process.env.PORT || 9000;

// Bind the router db to the app
server.db = router.db;

server.use(middlewares);

const rules = auth.rewriter({
    users: 640,
    videos: 660,
    assignments: 660,
    quizzes: 660,
    assignmentMark: 660,
    quizMark: 660,
});

server.use(rules);
server.use(auth);
server.use(router);

server.listen(port);