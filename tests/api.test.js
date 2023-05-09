const assert = require('assert');
var moment = require('moment');

var api = require('../index.js')
var config = require('../config')

const floor_id = config.floor_id;

api.init({
  domain: config.domain,
  auth:{
    token: config.api_token
  }
},config.debug_axios)

describe('check API state', () => {

  it('should return the correct result', async () => {

    const res = await api.state()
    expect(res).toHaveProperty("status");
    expect(res?.status).toBe("ok");
  });
});

describe('test Map API', () => {

  it('getInfo', async () => {

    const res = await api.map.getInfo(floor_id);
    expect(res).toHaveProperty("address");
    expect(res).toHaveProperty("level");
    expect(res).toHaveProperty("name");
    expect(res).toHaveProperty("svg_info");
  });

  it('getRooms', async () => {

    const res = await api.map.getRooms(floor_id);
    expect(Array.isArray(res)).toBe(true);
    expect(res.length).toBeGreaterThan(0);
  });

  it('getLayout', async () => {

    const res = await api.map.getSVG(floor_id);
    expect(res).toHaveProperty("svg_info");
  });

  it('getSVG', async () => {

    const res = await api.map.getSVG(floor_id);
    expect(res).toHaveProperty("svg_info");
  });

  it('getItemsBySector', async () => {

    const res = await api.map.getItemsBySector(floor_id);
    expect(Array.isArray(res)).toBe(true);
    //expect(res.length).toBeGreaterThan(0);
  });

  it('getMqttConfig', async () => {

    const res = await api.map.getMqttConfig(floor_id);
    expect(res).toHaveProperty("host");
    expect(res).toHaveProperty("password");
    expect(res).toHaveProperty("port");
    expect(res).toHaveProperty("user");
    //expect(Array.isArray(res)).toBe(true);
    //expect(res.length).toBeGreaterThan(0);
  });

  it('getWiFiCredentials', async () => {

    const res = await api.map.getWiFiCredentials(floor_id);
    expect(res).toHaveProperty("ssid");
    expect(res).toHaveProperty("password");
  });

  it('getWorkerProcess', async () => {

    const res = await api.map.getWorkerProcess(floor_id);
    expect(res).not.toBe(null);
    expect(res).toHaveProperty("uptime");
    expect(res).toHaveProperty("memory");
    expect(res).toHaveProperty("online_anchors");
    expect(res).toHaveProperty("online_nodes");
    expect(res).toHaveProperty("all_nodes");
  });

  it('getControllerInfo', async () => {

    const res = await api.map.getControllerInfo(floor_id);
    expect(res).toHaveProperty("id");
    expect(res).toHaveProperty("user_type_type");
    expect(res).toHaveProperty("name");
    expect(res).toHaveProperty("macAddress");
    expect(res).toHaveProperty("api_token");
    expect(res).toHaveProperty("ws_token");

    expect(res.user_type_type).toBe("controller")
    expect(res.Floor_id).toBe(floor_id)
  });

});

describe('test Map Node API', () => {
  it('getInfo', async () => {

    let mac_address = "3a:3b:a7:57:7c:7d"
    const res = await api.map.node.getInfo(floor_id,mac_address);
    expect(res).toHaveProperty("node_id");
    expect(res).toHaveProperty("type");
    //expect(res).toHaveProperty("level");
    expect(res).toHaveProperty("macAddress");

  });

  it('getMacAddress', async () => {
    let ip = "10.168.1.1";
    const res = await api.map.node.getMacAddress(floor_id,ip);
    expect(res).toHaveProperty("macAddress");
  });

  it('get Node History', async () => {

    let init_time = moment().subtract(7, 'days').unix();
    let end_time = moment().unix();
    let mac_address = "3a:3b:a7:57:7c:7d"
    const res = await api.map.node.getHistory(floor_id,mac_address,init_time, end_time);
    expect(Array.isArray(res)).toBe(true);
  });

});

describe('test Map Sniffers API', () => {
  it('get', async () => {

    const res = await api.map.sniffers.get(floor_id);
    expect(Array.isArray(res)).toBe(true);
    expect(res.length).toBeGreaterThan(0);
    expect(res[0]).toHaveProperty("id");
    expect(res[0]).toHaveProperty("sniffer_id");
    expect(res[0]).toHaveProperty("identifier");
    expect(res[0]).toHaveProperty("pos_x");
    expect(res[0]).toHaveProperty("pos_y");
    expect(res[0]).toHaveProperty("IP");
    expect(res[0]).toHaveProperty("Floor_id");
    res.forEach((sniffer) => expect(sniffer.Floor_id).toBe(floor_id));

  });

  it('getSettings', async () => {

    const res = await api.map.sniffers.getSettings(floor_id);
    expect(res.Floor_id).toBe(floor_id);
    expect(res).toHaveProperty("host");
    expect(res).toHaveProperty("port");

  });

  it('online', async () => {

    const res = await api.map.sniffers.online(floor_id);
    expect(Array.isArray(res)).toBe(true);
    expect(res.length).toBeGreaterThan(0);
  });

  it('groups', async () => {

    const res = await api.map.sniffers.groups(floor_id);
    expect(Array.isArray(res)).toBe(true);
    expect(res.length).toBeGreaterThan(0);
  });

});

describe('test Map Data API', () => {

  it('getActualPositions', async () => {

    const res = await api.map.data.getActualPositions(floor_id);
    expect(Array.isArray(res)).toBe(true);
    expect(res.length).toBeGreaterThan(0);
  });

  it('getValidatedNodes', async () => {

    const res = await api.map.data.getValidatedNodes(floor_id);
    expect(Array.isArray(res)).toBe(true);
    expect(res.length).toBeGreaterThan(0);
  });

  it('getHistoryCounter', async () => {

    const res = await api.map.data.getHistoryCounter(floor_id);
    expect(Array.isArray(res)).toBe(true);
    expect(res.length).toBeGreaterThan(0);
  });

  it('getMovements', async () => {

    let from = moment().subtract(1, "days").unix();
    let to = moment().unix();
    const res = await api.map.data.getMovements(floor_id,from,to);
    expect(Array.isArray(res)).toBe(true);
    expect(res.length).toBeGreaterThan(0);
  });

  it('getDetectedNodes', async () => {

    const res = await api.map.data.getDetectedNodes(floor_id);
    expect(Array.isArray(res)).toBe(true);
    expect(res.length).toBeGreaterThan(0);
  });

  it('getLastMovements', async () => {

    const res = await api.map.data.getLastMovements(floor_id);
    expect(Array.isArray(res)).toBe(true);
    expect(res.length).toBeGreaterThan(0);
  });

  it('getMovementsByType', async () => {

    let from = moment().subtract(1, "days").unix();
    let to = moment().unix();
    const res = await api.map.data.getMovementsByType(floor_id,from,to,"phone");
    expect(Array.isArray(res)).toBe(true);
    //expect(res.length).toBeGreaterThan(0);
  });

  it('getPatternMessagesOfGroupId', async () => {

    let group_id = 1;
    const res = await api.map.data.getPatternMessagesOfGroupId(floor_id, group_id);
    expect(Array.isArray(res)).toBe(true);
    expect(res.length).toBeGreaterThan(0);
  });

  it('getNodesFeedback', async () => {

    let group_id = 1;
    const res = await api.map.data.getNodesFeedback(floor_id, group_id);
    expect(Array.isArray(res)).toBe(true);
    //expect(res.length).toBeGreaterThan(0);
  });

  it('getSniffersGroups', async () => {

    const res = await api.map.data.getSniffersGroups(floor_id);
    expect(Array.isArray(res)).toBe(true);
    expect(res.length).toBeGreaterThan(0);
  });

  it('getAccountPermission', async () => {

    const res = await api.map.data.getAccountPermission(floor_id);
    expect(Array.isArray(res)).toBe(true);
    expect(res.length).toBeGreaterThan(0);
  });

});

describe('test Sniffers API', () => {

  it('getSniffers', async () => {

    const res = await api.sniffers.getSniffers();
    expect(Array.isArray(res)).toBe(true);
    expect(res.length).toBeGreaterThan(0);

  });

});

describe('test global methods API', () => {

  it('getMaps', async () => {

    const res = await api.getMaps();
    expect(Array.isArray(res)).toBe(true);
    expect(res.length).toBeGreaterThan(0);

  });

  it('getMapId', async () => {

    let ssid = "Vodafone-rocks";
    let router_mac = "";
    const res = await api.getMapId(ssid);
    expect(res).not.toBeNull();
    expect(res).toBe(floor_id);
  });

  it('getUserProfile', async () => {

    let user_id = 1;
    const res = await api.getUserProfile(user_id);
    expect(res).not.toBeNull();
    expect(res).toHaveProperty("info");
  });

});
