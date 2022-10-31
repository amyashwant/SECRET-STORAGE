const connectToMongo = require("./db");
var cors = require('cors')
const express = require("express");
//const { application } = require('express');
connectToMongo();
const app = express();
const port = 5000;
 
app.use(cors())

// app.get('/', (req, res) => {
//   res.send('Hello yash!')
// })
// available routes
app.use(express.json());
app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));
app.listen(port, () => {
  console.log(`iNotebook listening on port ${port}`);
});
