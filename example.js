var api = require('./index.js')

var floor_id = 63;

api.init({
  domain: "my.dev.inloc.cloud/api",
  auth:{
    token:"zxc"
  }
})

api.state();

api.getWiFiCredentials(63)
.then(res => console.log(res))
.catch(err => console.log(err))

api.getInfo(63)
.then(res => console.log(res))
.catch(err => console.log(err))


aaa();

async function aaa(){
  const credentials = await api.getWiFiCredentials(63);
}
