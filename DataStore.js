// Fake data store

var ids = 0, db = {};

var Post = exports = module.exports = function Post(title, body) {
  this.id = ++ids;
  this.title = title;
  this.body = body;
  this.createdAt = new Date;
};

Post.prototype.save = function(fn){
  db[this.id] = this;
  fn();
};

Post.prototype.validate = function(fn){
  if (!this.title) return fn(new Error('_title_ required'));
  if (!this.body) return fn(new Error('_body_ required'));
  if (this.body.length < 10) {
    return fn(new Error(
        '_body_ should be at least **10** characters long, was only _' + this.title.length + '_'));
  }
  fn();
};


Post.prototype.update = function(data, fn){
  this.updatedAt = new Date;
  for (var key in data) {
    if (undefined != data[key]) {
      this[key] = data[key];
    }
  }
  this.save(fn);
};

Post.prototype.destroy = function(fn){
  exports.destroy(this.id, fn);
};

exports.count = function(fn){
  fn(null, Object.keys(db).length);
};

exports.all = function(fn){
  var arr = Object.keys(db).reduce(function(arr, id){
    arr.push(db[id]);
    return arr;
  }, []);
  fn(null, arr);
};

exports.get = function(id, fn){
  fn(null, db[id]);
};

exports.destroy = function(id, fn) {
  if (db[id]) {
    delete db[id];
    fn();
  } else {
    fn(new Error('post ' + id + ' does not exist'));
  }
};

var p = new Post('test','test');
p.save(function(err)
{
    if (err)
    {
        console.log(err);
    }
    else
    {
        console.log("saved!");
    };
});

var p = new Post('23423443','23423423423');
p.save(function(err)
{
    if (err)
    {
        console.log(err);
    }
    else
    {
        console.log("saved!");
    };
});


Post.count(function(err, count) {
    Post.all(function (err, posts) {
        console.log("count: " + count);
        for (var z in posts)
        {
            for (var i in Object.keys(z))
            {
                console.log(i);
            }
        }
    })
});

