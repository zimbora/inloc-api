const assert = require('assert');
var moment = require('moment');

var api = require('../index.js')
var config = require('../config')

const floor_id = config.floor_id;

api.init({
  domain: config.domain,
  auth:{
    token: config.token
  }
},config.debug_axios)

describe('test Controller API', () => {

  it('getWSToken', async () => {

    var res = await api.map.getControllerInfo(floor_id);

    let uid = res.macAddress;
    let token = res.api_token;

    res = await api.controllers.getWSToken(uid,token);

    expect(res).not.toBeNull();
  });
});
