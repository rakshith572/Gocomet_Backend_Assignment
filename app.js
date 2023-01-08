const express = require('express');
const cors = require('cors');

const scraper = require('./scraper');

const app = express();
app.use(express.static('./client'));

app.get('/blog/:id', (req, res) => {
  // console.log(req.params)
  const ans = scraper.getBlog(req.params.id).then(ans=>{res.json(ans)})
  // console.log(ans)
  // res.json(ans);
});
app.get('/search/:title', (req, res) => {
    scraper
      .searchTag(req.params.title)
      .then(movies => {
        // console.log(mov)
        res.json(movies);
      });
});
const port = process.env.PORT || 5000;
app.listen(port,()=>{
    console.log(`server listening at port ${port}`)
})