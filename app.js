const express = require('express');
const cors = require('cors');

const scraper = require('./scraper');

const app = express();
app.use(express.static('./client'));

app.get('/blog/:id', (req, res) => {
  scraper
  .getBlog(req.params.id)
  .then(ans=>{
    res.json(ans)
  });
});
app.get('/search/:title', (req, res) => {
    scraper
      .searchTag(req.params.title)
      .then(Blogs => {
        res.json(Blogs);
      });
});
const port = process.env.PORT || 5000;
app.listen(port,()=>{
    console.log(`server listening at port ${port}`)
})