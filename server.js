const express = require('express');

const app = express();
const port = process.env.PORT || 5001;
const log = console.log;

const sampleImages = [
  "/sample-images/1.png",
  "/sample-images/2.png",
  "/sample-images/3.png",
];

app.get('/videos', (req, res) => {
  res.send({
    userName: req.query.userName,
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
    }]
  });
});
app.get('/images', (req, res) => {
  res.send({
    userName: req.query.userName,
    images: sampleImages
  });
});
app.get('/record', (req, res) => {
  const newFilename = 'recording-date-file';
  log('Recording to file: ' + newFilename);
  res.send({
    userName: req.query.userName,
    filename: newFilename
  });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
