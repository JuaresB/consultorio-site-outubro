import { API } from 'aws-amplify'

var AWS = require('aws-sdk');
//https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/CloudWatchLogs.html#createLogStream-property

export default class LogApi {
  static sendLog(err){
    return API.put("API","/log", {body: err, headers: {"Content-Type":"application/json; charset=UTF-8"}})
  }
}
