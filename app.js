var express = require('express'),
    app     = express(),
    PORT    = process.env.PORT || 3000;

app.use(express.static('./dist'));

app.listen(PORT, function(err) {
  if (err) {
    console.log('Error starting server.', err);
  } else {
    console.log('Server up and running on port', PORT);
  }
});
