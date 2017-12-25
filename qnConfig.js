'use strict';


var AK_SK = {
  // 2014-09-11
  'new': {
    AK: 'GJaULv9xaPCINla38lQan8OLpnQ3gGq2sp-2ZpFs',
    SK: 'HX3_YGPEoa59ETNa8Y5taPDauyTcPNPOebKMGoTl'
  },
  //2013-08-01
  'old': {
    AK: 'P44PMmT4laM-NHo-4wlzyhrvY1utPGhvBpguuZLT',
    SK: 'L0qRN6GEsKOk6CNhSvIIWQNV0ZE3KMBUeW9dYXAM'
  }
}

var curAK_SK = AK_SK['old'];

var qnConfig = {
  "hsq": {
    prefix: "",
    qnAK: curAK_SK.AK,
    qnSK: curAK_SK.SK,
    qnBucketUIS: "m-haoshiqi-net", // your bucket name
    qnDomainUIS: "https://img1.haoshiqi.net/",  // //xxxx.xxx.xx.glb.clouddn.com
    // qnDomainUIS: "//7xs7z4.com1.z0.glb.clouddn.com/",  // //xxxx.xxx.xx.glb.clouddn.com
    // selfDomain: "//m.haoshiqi.net/",
  },
};

module.exports = qnConfig;
