var mongojs = require('mongojs');
var db = mongojs("mongodb://root:root123@ds115442.mlab.com:15442/online-shop", ["man"]);

module.exports = function(express,app) {
  let route = express.Router();

  route.get('/',(req,res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // If needed
    res.setHeader('Access-Control-Allow-Credentials', true); // If needed
    res.send("Home Page is Rendering!");
  });

  // get all of man data
  route.get('/man',(req,res) => {
    db.man.find(function (err,result) {
      if (err)
        res.send("Database Selection error!");
      else
        res.send(result);
    });
  });

  // get one of man data
  route.get('/man/:id',(req,res) => {
    db.man.findOne({_id:mongojs.ObjectId(req.params.id)}, function(err,result) {
      if (err)
        res.send("Error Occur when finding one id");
      else {
        if (result)
          res.send(result);
        else
          res.send(false);
      }
    })
  });

  // create new man data
  route.post('/man',(req,res) => {
    let obj = {
      "size": req.query.size,
      "description": req.query.description,
      "type": req.query.man,
      "title": req.query.title,
      "price": req.query.price,
      "path": req.query.path
    }
    db.man.insert(obj,function(err,result) {
      if (err)
        res.send('Error');
      else
        res.send('Success');
    });
  });

  app.all('*', function(req, res,next) {
      /**
       * Response settings
       * @type {Object}
       */
      var responseSettings = {
          "AccessControlAllowOrigin": req.headers.origin,
          "AccessControlAllowHeaders": "Content-Type,X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5,  Date, X-Api-Version, X-File-Name",
          "AccessControlAllowMethods": "POST, GET, PUT, DELETE, OPTIONS",
          "AccessControlAllowCredentials": true
      };

      /**
       * Headers
       */
      res.header("Access-Control-Allow-Credentials", responseSettings.AccessControlAllowCredentials);
      res.header("Access-Control-Allow-Origin",  responseSettings.AccessControlAllowOrigin);
      res.header("Access-Control-Allow-Headers", (req.headers['access-control-request-headers']) ? req.headers['access-control-request-headers'] : "x-requested-with");
      res.header("Access-Control-Allow-Methods", (req.headers['access-control-request-method']) ? req.headers['access-control-request-method'] : responseSettings.AccessControlAllowMethods);

      if ('OPTIONS' == req.method) {
          res.send(200);
      }
      else {
          next();
      }


  });

  app.use('/', route);
}
