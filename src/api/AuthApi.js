import { Auth, API } from 'aws-amplify'

class AuthApi {
  static checkForSignedUser() {
    return Auth.currentUserInfo()
  }
  static createCode(idCognito) {
    return API.post("API","/create-code", {body: {idCognito:idCognito}, headers: {"Content-Type":"application/json; charset=UTF-8"}})
  }
  static sendSparkpostEmail(idCognito) {
    return API.post("API","/send-sparkpost-email", {body: {idCognito:idCognito}, headers: {"Content-Type":"application/json; charset=UTF-8"}})
  }
  static sendSNSSms(idCognito) {
    return API.post("API","/send-sns-sms", {body: {idCognito:idCognito}, headers: {"Content-Type":"application/json; charset=UTF-8"}})
  }
  static sendSESEmail(idCognito) {
    return API.post("API","/send-ses-email", {body: {idCognito:idCognito}, headers: {"Content-Type":"application/json; charset=UTF-8"}})
  }
  static sendOwnSms(idCognito) {
    return API.post("API","/send-own-sms", {body: {idCognito:idCognito}, headers: {"Content-Type":"application/json; charset=UTF-8"}})
  }
  static checkPhone(telephone) {
    return API.post("API","/check-phone", {body: {telephone:telephone}, headers: {"Content-Type":"application/json; charset=UTF-8"}})
  }
  static signInCognito(telephoneDDI){
    return Auth.signIn(telephoneDDI)
  }
  static sendChallengeAnswer(user, challengeAnswer){
    return Auth.sendCustomChallengeAnswer(user, challengeAnswer)
  }
  static signUpCognito(telephone){
    return Auth.signUp({
      username: telephone,
      password: 'consultorio',
      attributes: {
        phone_number: telephone,
      }
    })
  }
  static signUpAddInfo({email, name}){
    return API.put("API","/user-info", {body: {email:email, name:name}, headers: {"Content-Type":"application/json; charset=UTF-8"}})
  }
  static getAccountKitToken(code){
    var token_exchange_url = 'https://graph.accountkit.com/v1.1/access_token?grant_type=authorization_code&access_token=AA%7C195727444558197%7C6c900203637e83311e85965c7c3217ed&code=' + code;
    return fetch(token_exchange_url, {
      method: 'GET',
      headers: {}
      }).then((responseAccessToken) => {
        return responseAccessToken.json()
      }).then( responseAccessToken => {
        var me_endpoint_url = 'https://graph.accountkit.com/v1.1/me?access_token=' + responseAccessToken.access_token;
        return fetch(me_endpoint_url, {
          method: 'GET',
          headers: {}
          }).then((responsePhone) => {
            return responsePhone.json()
          }).then( responsePhone => {
            return {accessToken:responseAccessToken.access_token, telephoneDDD:responsePhone.phone.national_number, telephoneDDI:responsePhone.phone.number}
          })
      })
  }
  static signInAccountKit(telephone){
    return new Promise( (resolve, reject) => {
        const loginType = "PHONE"
        const options = {
          countryCode: "+55",
          phoneNumber: telephone,
        };
        window.AccountKit.login(loginType, options, resp => {
          if(resp.status === "PARTIALLY_AUTHENTICATED"){
            resolve({code: resp.code, state: resp.state})
          }
          else{
            reject({resp})
          }
        })
      }
    )
  }
  static accountKitInit(){
    const tag = document.createElement("script");
    tag.setAttribute(
      "src",
      `https://sdk.accountkit.com/pt_BR/sdk.js`
    );
    tag.setAttribute("id", "account-kit");
    tag.setAttribute("type", "text/javascript");
    tag.onload = (() => {
      window.AccountKit_OnInteractive = () => {
        window.AccountKit.init({
          appId: "195727444558197",
          state:"csrf",
          version:"v1.1",
          fbAppEventsEnabled:true,
          debug:true,
          redirect:"https://consultorio.com/login"
        });
      };
    });
    document.head.appendChild(tag);
  }
}

export default AuthApi;
