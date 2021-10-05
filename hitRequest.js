var axios = require('axios');
const nconf = require('nconf');


async function hitGetRequest(policyname,region){
  let apiurl,apiregion,token; 
  if(region=="WIPDMEMEAPROD"){
    apiurl=`${nconf.get("emeaurl")}${policyname}`
    apiregion='EMEA';
    token=`Bearer ${nconf.get('emeatoken')}`;
  }
  else{
    apiurl= `${nconf.get("usurl")}${policyname}`;
    apiregion='US';
    token=`Bearer ${nconf.get('ustoken')}`
  } 
    
    var config = {
        method: 'get',
        url: apiurl,
        headers: { 
          'Content-Type': 'application/json', 
          'Authorization': token,
          'X-Ads-Region': apiregion, 
          'Cookie': 'PF=YitmvwJwuO1mIczEJtQVCl; PF=wR8d0lRfW8RVgu5YYO2SBK'
        }
      };
      
      return axios(config)
      
}
async function deleteRequest(policyname,region){
  let apiurl,apiregion,token; 
  if(region=="WIPDMEMEAPROD"){
    apiurl=`${nconf.get("emeaurl")}${policyname}`
    apiregion='EMEA';
    token=`Bearer ${nconf.get('emeatoken')}`;
  }
  else{
    apiurl= `${nconf.get("usurl")}${policyname}`;
    apiregion='US';
    token=`Bearer ${nconf.get('ustoken')}`
  } 
  var config = {
    method: 'delete',
    url: apiurl,
    headers: { 
      'Content-Type': 'application/json', 
      'Authorization': token,
      'X-Ads-Region': apiregion, 
      'Cookie': 'PF=YitmvwJwuO1mIczEJtQVCl; PF=wR8d0lRfW8RVgu5YYO2SBK'
    }
  };
  
  return axios(config)
}
module.exports={
    hitGetRequest,
    deleteRequest
}
