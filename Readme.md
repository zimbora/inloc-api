

# Example

```
var api = require('inloc-api')

api.init({
  domain: "ask for domain",
  auth:{
    token:"ask for token"
  }
})

api.state()
.then(res => console.log(res))
.catch(err => console.log(err))

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


```

# Tests

## run all tests
  >> npm run

## run only one test
  >> npx jest --testPathPattern=controller.test.js
