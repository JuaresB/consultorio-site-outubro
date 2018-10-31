import { API } from 'aws-amplify'

class AnswerApi {
  static saveAnswer(answer) {
    answer = Object.assign({}, answer);
    return API.post("API","/answer", {body: answer, headers: {"Content-Type":"application/json; charset=UTF-8"}})
  }
}

export default AnswerApi;
