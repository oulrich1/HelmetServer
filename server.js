const express = require('express');

const app = express();
const port = process.env.PORT || 5001;

app.get('/videos', (req, res) => {
  res.send({
    videos: [{
      _id: 0,
      name: 'vid1',
      thumb: 'path',
      path: 'path'
    }, {
      _id: 1,
      name: 'vid2',
      thumb: 'path',
      path: 'path'
    }],
    userName: req.query.userName
  });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
