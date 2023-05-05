
var key = {}
try{
  key = require("./keys");
}catch(e){
  key = {
    api_token : ""
  }
}

module.exports = {
  domain : "my.dev.inloc.cloud/api",
  token : key.api_token,
  floor_id : 63,
  debug_axios : false,
}
