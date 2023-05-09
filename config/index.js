
var key = {}
try{
  key = require("./keys");
}catch(e){
  key = {
    api_token : "",
    controller_token : ""
  }
}

module.exports = {
  domain : "my.dev.inloc.cloud/api",
  api_token : key.api_token,
  controller_token : key.controller_token,
  floor_id : 63,
  debug_axios : false,
}
