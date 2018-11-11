const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');


const app = express();
app.use(cors());
app.use(bodyParser.json());

require('./connectToDb')();
require('./setupRoutes')(app);


const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`[OK] Server started on port ${port}`);
})