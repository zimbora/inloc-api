const axios = require('axios');

var map_id = null;
var instance;

module.exports = {

  init : (opts, debug) =>{

    return axios_init(opts, debug)

  },

  state : ()=>{

    return axios_get("/api-status")
    .then( (response) => {return Promise.resolve(response)})
    .catch( (error) => {return Promise.reject(error)})

  },

  map : {

    node : {

      getInfo : (map_id,mac_address)=>{

        let params = {
          macAddress : mac_address
        }
        return axios_get('/map/'+map_id+'/data/node/info',params)
        .then( (response) => {return Promise.resolve(response[0])})
        .catch( (error) => {return Promise.reject(error)})

      },

      getMacAddress : (map_id,ip)=>{

        let params = {
          ip : ip
        }
        return axios_get('/map/'+map_id+'/data/mac',params)
        .then( (response) => {return Promise.resolve(response[0])})
        .catch( (error) => {return Promise.reject(error)})

      },

      getHistory : (map_id,mac_address,init_time,end_time)=>{

        let params = {
            macAddress : mac_address,
            low_timestamp : init_time,
            high_timestamp : end_time
        }
        return axios_get('/map/'+map_id+'/data/node/history/getPositions',params)
        .then( (response) => {return Promise.resolve(response)})
        .catch( (error) => {return Promise.reject(error)})

      },

      update : ()=>{

      },

      updateMac : ()=>{

      }

    },

    sniffers : {

      get: (map_id)=>{

        return axios_get('/map/'+map_id+'/sniffers')
        .then( (response) => {return Promise.resolve(response)})
        .catch( (error) => {return Promise.reject(error)})
      },

      getSettings: (map_id)=>{

        return axios_get('/map/'+map_id+'/sniffers/settings')
        .then( (response) => {return Promise.resolve(response[0])})
        .catch( (error) => {return Promise.reject(error)})
      },

      online : (map_id)=>{

        return axios_get('/map/'+map_id+'/online_sniffers')
        .then( (response) => {return Promise.resolve(response)})
        .catch( (error) => {return Promise.reject(error)})
      },

      groups : (map_id)=>{

        return axios_get('/map/'+map_id+'/data/sniffers/groups')
        .then( (response) => {return Promise.resolve(response)})
        .catch( (error) => {return Promise.reject(error)})
      },
    },

    data : {

      getActualPositions : (map_id)=>{

        return axios_get('/map/'+map_id+'/data/actual/positions')
        .then( (response) => {return Promise.resolve(response)})
        .catch( (error) => {return Promise.reject(error)})
      },

      getValidatedNodes : (map_id)=>{

        return axios_get('/map/'+map_id+'/data/validated/nodes')
        .then( (response) => {return Promise.resolve(response)})
        .catch( (error) => {return Promise.reject(error)})
      },

      getHistoryCounter : (map_id,interval_h=24)=>{

        let params = {
          interval: interval_h
        };

        return axios_get('/map/'+map_id+'/data/history/counter',params)
        .then( (response) => {return Promise.resolve(response)})
        .catch( (error) => {return Promise.reject(error)})
      },

      getMovements : (map_id,low_timestamp,high_timestamp)=>{

        let params = {
          low_timestamp: low_timestamp,
          high_timestamp: high_timestamp
        };

        return axios_get('/map/'+map_id+'/data/history/interval_movements',params)
        .then( (response) => {return Promise.resolve(response)})
        .catch( (error) => {return Promise.reject(error)})
      },

      getDetectedNodes : (map_id,interval_h=24)=>{

        let params = {
          interval: interval_h
        };

        return axios_get('/map/'+map_id+'/data/detected/nodes',params)
        .then( (response) => {return Promise.resolve(response)})
        .catch( (error) => {return Promise.reject(error)})
      },

      getLastMovements : (map_id,interval_s=900)=>{

        let params = {
          interval: interval_s
        };

        return axios_get('/map/'+map_id+'/data/history/last_movements',params)
        .then( (response) => {return Promise.resolve(response)})
        .catch( (error) => {return Promise.reject(error)})
      },

      getMovementsByType : (map_id,low_timestamp,high_timestamp,node_type)=>{

        let params = {
          low_timestamp: low_timestamp,
          high_timestamp: high_timestamp,
          type: node_type
        };

        return axios_get('/map/'+map_id+'/data/history/interval',params)
        .then( (response) => {return Promise.resolve(response)})
        .catch( (error) => {return Promise.reject(error)})
      },

      getPatternMessagesOfGroupId : (map_id,group_id)=>{

        let params = {
          group_id: group_id
        };

        return axios_get('/map/'+map_id+'/data/messages/count/pattern',params)
        .then( (response) => {return Promise.resolve(response)})
        .catch( (error) => {return Promise.reject(error)})
      },

      getNodesFeedback : (map_id,group_id)=>{

        let params = {
          group_id: group_id
        };

        return axios_get('/map/'+map_id+'/data/nodes/feedback',params)
        .then( (response) => {return Promise.resolve(response)})
        .catch( (error) => {return Promise.reject(error)})
      },

      getSniffersGroups : (map_id)=>{

        return axios_get('/map/'+map_id+'/data/sniffers/groups')
        .then( (response) => {return Promise.resolve(response)})
        .catch( (error) => {return Promise.reject(error)})
      },

      getAccountPermission : (map_id)=>{

        return axios_get('/map/'+map_id+'/data/account/permission')
        .then( (response) => {return Promise.resolve(response)})
        .catch( (error) => {return Promise.reject(error)})
      }

    },

    getInfo : (map_id)=>{

      return axios_get('/map/'+map_id+'/info')
      .then( (response) => {return Promise.resolve(response[0])})
      .catch( (error) => {return Promise.reject(error)})

    },

    getRooms : (map_id)=>{

      return axios_get('/map/'+map_id+'/rooms')
      .then( (response) => {return Promise.resolve(response)})
      .catch( (error) => {return Promise.reject(error)})
    },

    // same thing that getSVG
    getLayout : (map_id)=>{

      return axios_get('/map/'+map_id+'/layout')
      .then( (response) => {return Promise.resolve(response)})
      .catch( (error) => {return Promise.reject(error)})
    },

    getSVG : (map_id)=>{

      return axios_get('/map/'+map_id+'/svg_info')
      .then( (response) => {return Promise.resolve(response[0])})
      .catch( (error) => {return Promise.reject(error)})
    },

    getItemsBySector : (map_id,sector)=>{

      return axios_get('/map/'+map_id+'/data/item?sector='+sector)
      .then( (response) => {return Promise.resolve(response)})
      .catch( (error) => {return Promise.reject(error)})

    },

    getMqttConfig : (map_id)=>{

      return axios_get('/map/'+map_id+'/mqtt')
      .then( (response) => {return Promise.resolve(response)})
      .catch( (error) => {return Promise.reject(error)})
    },

    getWiFiCredentials : (map_id)=>{

      return axios_get('/map/'+map_id+'/wifi/credentials')
      .then( (response) => {return Promise.resolve(response[0])})
      .catch( (error) => {return Promise.reject(error)})
    },

    getWorkerProcess : (map_id)=>{

      return axios_get('/map/'+map_id+'/child')
      .then( (response) => {return Promise.resolve(response)})
      .catch( (error) => {return Promise.reject(error)})
    },

    getControllerInfo : (map_id)=>{

      return axios_get('/map/'+map_id+'/controller')
      .then( (response) => {return Promise.resolve(response)})
      .catch( (error) => {return Promise.reject(error)})
    },

  },

  sniffers : {

    getSniffers : ()=>{

      return axios_get('/sniffers')
      .then( (response) => {return Promise.resolve(response)})
      .catch( (error) => {return Promise.reject(error)})
    },
  },

  controllers : {

    getWSToken : (uid,token)=>{

      let headers = {
        controllertoken : token
      };

      let params = {
        uid : uid
      };

      return axios_get('/controllers/ws_token',params,headers)
      .then( (response) => {return Promise.resolve(response)})
      .catch( (error) => {return Promise.reject(error)})
    }
  },

  getMaps : ()=>{

    return axios_get('/maps')
    .then( (response) => {return Promise.resolve(response)})
    .catch( (error) => {return Promise.reject(error)})
  },

  getMapId : (ssid,router_mac="",lat=0,lon=0)=>{

    let params = {
      ssid:ssid,
      router_mac:router_mac,
      lat:lat,
      lon:lon
    }
    return axios_get('/map/id',params)
    .then( (response) => {return Promise.resolve(response)})
    .catch( (error) => {return Promise.reject(error)})
  },

  getUserProfile : (user_id)=>{

    let params = {
      user_id:user_id
    }
    return axios_get('/user/profile',params)
    .then( (response) => {return Promise.resolve(response[0])})
    .catch( (error) => {return Promise.reject(error)})
  },

}

function axios_init(opts, debug = false){

  instance = axios.create({
    baseURL: 'https://'+opts.domain,
    timeout: 1000,
    headers: opts.auth
  });

  return instance.interceptors.request.use(function (config) {
      // Do something before request is sent
      if(debug)
        console.log(config)
      return config;
    }, function (error) {
      // Do something with request error
      return Promise.reject(error);
  });

}

function axios_get(path, params = {}, headers = {}){

  var data;
  var error;

  return instance.get(path,{params:params,headers:headers})
    .then(function (response) {
      if(response.data.Error){
        console.log(response.data.Message);
        return Promise.reject(response.data.Message);
      }else
        return Promise.resolve(response.data.Result)
    })
    .catch(function (err) {
      console.log(err.code+": "+err.response?.data?.Message);
      return Promise.reject(err.code+": "+err.response?.data?.Message);
    })
    .finally(function () {
      // always executed
    });
}
