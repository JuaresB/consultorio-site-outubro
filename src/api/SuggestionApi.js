import { API } from 'aws-amplify'

export default class SuggetionApi {
  static getSuggestions(request) {
    request = Object.assign({}, request);
    return API.post("API","/suggestions", {body: request, headers: {"Content-Type":"application/json; charset=UTF-8"}})
  }

  static getPlanDetails(planoId) {
    return API.get("API", "/plan/"+planoId, {headers:{}})
  }

  static postSuggestionPick(suggestionPick) {
    return API.post("API", "/suggestion-pick", {body: suggestionPick, headers: {"Content-Type":"application/json; charset=UTF-8"}})
  }
}
