/* Empty JS object to act as endpoint for all routes */
projectData = {};

/* Express to run server and routes */
const express = require('express');

/* Start up an instance of app */
const app = express();
// start nedb
const Datastore = require('nedb');
/* Dependencies */
const bodyParser = require('body-parser');
/* Middleware*/
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const cors = require('cors');
app.use(cors());
app.use(express.json({ limit: '1mb' }));
/* Initialize the main project folder*/
app.use(express.static('website'));

const port = 8000;
/* Spin up the server*/
const server = app.listen(port, listening);
function listening() {
  // console.log(server);
  console.log(`running on localhost: ${port}`);
}
const database = new Datastore('database.db');
database.loadDatabase();

app.post('/api', addTemp);

function addTemp(req, res) {
  const data = req.body;
  // console.log(data);
  const timestamp = Date.now();
  data.timestamp = timestamp;
  database.insert(data);
  projectData = {
    timestamp: timestamp,
    temp: data.newTemp,
    feel: data.emotion,
  };
  // console.log(projectData);
  res.json({
    projectData,
  });
}

app.get('/api', getPost);
function getPost(req, res) {
  database.find({}, (err, projectData) => {
    if (err) {
      res.end();
    }
    res.json(projectData);
  });
}
