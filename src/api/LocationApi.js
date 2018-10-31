import { API } from 'aws-amplify'

class AnswerApi {
  static saveAnswer(answer) {
    answer = Object.assign({}, answer);
    return API.post("API","/api/user", {body: answer, headers: {"Content-Type":"application/json; charset=UTF-8"}})
  }
  static geoLocationBrowser(){
    return new Promise(
      (resolve, reject) => {
        setTimeout(() => reject('timeout'),5000)
        window.navigator.geolocation.getCurrentPosition(
          position => {
            let myInit = { // OPTIONAL
              headers: {
                'geocode-lat': JSON.stringify(position.coords.latitude),
                'geocode-long': JSON.stringify(position.coords.longitude)
              }
            }
            API.get("API", "/api/geoCode",myInit).then(location => {
              resolve({state: location.estado, city: location.cidade})
            }).catch( err => {reject(err)});
          }
        );
      }
    )
  }
  static geoLocationIp(){
    return new Promise(
      (resolve, reject) => {
        let myInit = { // OPTIONAL
          headers: {}
        }
        API.get("API", "/api/geoLocation",myInit).then(location => {
          resolve({state: location.state, city: location.city})
        }).catch( err => {reject(err)});
      }
    )
  }
  static regionHospitalOccupationByState(state){
    return API.post(
      "API", 
      "/regionhospitaloccupation", 
      {
        body: {estado: state}, 
        headers: {"Content-Type":"application/json; charset=UTF-8"}
      }
    )
  }
}

export default AnswerApi;
