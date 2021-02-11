import express from 'express';
import routes from './routes';
import db from './stores/db';
import seed from './db/Seed';
import config from "../config/config.json"
import path from "path"

// Create a new express application instance
const port = config.server.port
const server: express.Application = express();

db.setup(config.db).then(()=>{
  seed.plantThemAll()
})
server.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
routes(server)
// server.use(express.static(htmlPath));
// server.get('*', function (req, res) {
//   res.sendFile(path.join(htmlPath, 'index.html'));
// });

server.listen(port, function () {
  console.log(`Ready for takeof on port ${port} 🚀!`);
});
