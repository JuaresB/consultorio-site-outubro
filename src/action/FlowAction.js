import * as ActionType from './ActionType';
import mixpanel from '../components/mixpanel'
import TagManager from 'react-gtm-module';
import { saveSuggestionPickAction, getSuggestionsAction } from './SuggestionAction'
import { setPlanoIdResponse, getSuggestionDetails } from './SuggestionDetailsAction'
import { createCodeAction, sendSNSSmsAction, sendOwnSmsAction, checkForSignedUserAction, checkPhoneAction, signUpCognitoAction, signInAction, sendChallengeAnswerAction, signInAccountKitAction, getAccountKitTokenAction, signUpAddInfoAction, setChallengeTypeResponse, signInPasswordAction} from './LoginAction'
import { setChallengeLoadingResponse, setChallengeCodeErrorResponse } from './ChallengePageAction'
import { saveAnswerAction, setNeedToSendAnswer } from './AnswerAction'
import { push } from 'connected-react-router'

const tagManagerArgs = {
  gtmId: 'GTM-57QJBJD',
  dataLayer: {
    event: 'LeadConversion'
  }
}

export const ABPreferenceResponse = (abPreference) => ({
  type: ActionType.SET_AB_PREFERENCE,
  abPreference: abPreference
})

export function abPreferenceAction() {
  return (dispatch, getState) => {
    const { abReducer, prefHospitalReducer } = getState()
    if(prefHospitalReducer.hospitalType){
      dispatch(ABPreferenceResponse("Single-Preference"))
      mixpanel.register({
        "abPreference": "Single-Preference"
      })
      mixpanel.people.set({
        "abPreference": "Single-Preference"
      })
    } else if(abReducer.abPreference === ''){
      var abPreference = Math.floor(Math.random() * 2)?"Single-Preference":"Multiple-Preferences";
      dispatch(ABPreferenceResponse(abPreference))
      mixpanel.register({
        "abPreference":abPreference
      })
      mixpanel.people.set({
        "abPreference": abPreference
      })
      mixpanel.track("abPreference",{
        "value": abPreference
      })
    } else {
     mixpanel.register({
       "abPreference":abReducer.abPreference
     })
     mixpanel.people.set({
       "abPreference": abReducer.abPreference
     })
    }
  }
}

export function userDashFormEnd() {
  return (dispatch, getState) => {
    dispatch(push('/user-dash/end'))
  };
}

export function onWhatsContact() {
  return (dispatch, getState) => {
    window.open("https://api.whatsapp.com/send?1=pt_BR&phone=5511976522440", "_blank")
  }
}

export function userDashFormNextPage() {
  return (dispatch, getState) => {
    const {router, paraQuemReducer} = getState()
    switch(router.location.pathname) {
      case "/user-dash/documents": {
        dispatch(push("/user-dash/signature"))
        break
      }
      default: {}
    }
  }
}

export function formEndAction() {
  return (dispatch, getState) => {
    const {router, prefHospitalReducer} = getState()
    const preferenceType = prefHospitalReducer.hospitalType === "bairro"? "region" : prefHospitalReducer.hospitalType === "especifico" ? "name" : ""
    const preferenceChoice = prefHospitalReducer.hospitalType === "bairro"? "hospitalRegion" : prefHospitalReducer.hospitalType === "especifico" ? "hospitalName" : ""
    const preference = prefHospitalReducer.hospital
    mixpanel.people.set({
      'hospitalBy': preferenceType,
      [preferenceChoice] : preference
    })
    mixpanel.register({
      'preferenceType': preferenceType,
      [preferenceChoice] : preference
    })
    mixpanel.track("Click-MainForm-Hospital")
    mixpanel.track("Click-MainForm",{
      "formRequest": "hospital",
      "urlPath": router.location.pathname,
      "urlTitle": document.title
    })
    sendFormAction()(dispatch, getState)
  };
}

export function AB_formEndAction() {
  return (dispatch, getState) => {
    const {router, hospitalReducer} = getState()
    const preference = JSON.stringify(hospitalReducer.hospitals)
    mixpanel.people.set({
      "hospitalPreference": preference,
    })
    mixpanel.register({
      "hospitalPreference": preference,
    })
    mixpanel.track("Click-MainForm-Hospital")
    mixpanel.track("Click-MainForm",{
      "formRequest": "hospital",
      "urlPath": router.location.pathname,
      "urlTitle": document.title
    })
    sendFormAction()(dispatch, getState)
  };
}

export function sendFormAction() {
  return (dispatch, getState) => {
    const { loginReducer } = getState()
    if(loginReducer.userIsLogged){
      saveAnswerAction()(dispatch, getState).then(()=>{
        getSuggestionsAction()(dispatch, getState).then(()=>{
          const {suggestionReducer} = getState()
          if(suggestionReducer.suggestions.length){
            dispatch(push("/suggestions"))
          }else{
            dispatch(push('/plans'))
          }
        })
      })
    } else{
      dispatch(setNeedToSendAnswer(true));
      dispatch(push("/login"))
    }
  }
}

export function onLoginButtonAction() {
  return async (dispatch, getState) => {
    const { telephoneReducer, router } = getState()
    mixpanel.track("Click-Login",{
      "urlPath": router.location.pathname,
      "urlTitle": document.title
    })
    mixpanel.people.set({"$phone": telephoneReducer.telephoneDDI})
    await checkPhoneAction()(dispatch, getState)
    const { nameReducer } = getState()
    if(nameReducer.name === ''){
      mixpanel.alias(telephoneReducer.telephoneDDI)
      await signUpCognitoAction()(dispatch, getState)
    } else {
      mixpanel.identify(telephoneReducer.telephoneDDI)
    }
    await createCodeAction()(dispatch, getState)
    await sendOwnSmsAction()(dispatch, getState)
    const { loginReducer } = getState()
    if(loginReducer.sendCodeError){
      await sendSNSSmsAction()(dispatch, getState)
    }
    dispatch(setChallengeTypeResponse("SMS"))
    dispatch(push('/challenge'))
  }
}

export function onNotReceiveButtonAction() {
  return async (dispatch, getState) => {
    const { router } = getState()
    mixpanel.track("Click-NotReceive",{
      "urlPath": router.location.pathname,
      "urlTitle": document.title
    })
    signInAccountKitAction()(dispatch, getState).then(()=>{
      getAccountKitTokenAction()(dispatch, getState).then(() => {
        dispatch(setChallengeTypeResponse("AccountKit"))
        onChallengeButtonAction()(dispatch, getState)
      })
    })
  }
}

export function finishLoginFlow() {
  return async (dispatch, getState) => {
    const {answerReducer} = getState()
    if(answerReducer.needToSendAnswer){
      mixpanel.track("Event-LeadConverted")
      TagManager.initialize(tagManagerArgs)
      await sendFormAction()(dispatch, getState)
    } else {
      const {loginReducer} = getState()
      dispatch(push(loginReducer.returnToUrl))
    }
  }
}

export function onChallengeButtonAction() {
  return async (dispatch, getState) => {
    const { router } = getState()
    mixpanel.track("Click-Challenge",{
      "urlPath": router.location.pathname,
      "urlTitle": document.title
    })
    dispatch(setChallengeLoadingResponse(true))
    await signInAction()(dispatch, getState)
    await sendChallengeAnswerAction()(dispatch, getState)
    const { loginReducer } = getState()
    if(loginReducer.userIsLogged){
      const { nameReducer } = getState()
      if(nameReducer.name === ''){
        dispatch(push('/signup'))
      } else {
        finishLoginFlow()(dispatch, getState)
      }
    } else {
      dispatch(setChallengeCodeErrorResponse(true))
    }
    dispatch(setChallengeLoadingResponse(false))
  }
}
export function onNewCodeButtonAction() {
  return async (dispatch, getState) => {
    dispatch(setChallengeLoadingResponse(true))
    await createCodeAction()(dispatch, getState)
    await sendOwnSmsAction()(dispatch, getState)
    const { loginReducer } = getState()
    if(loginReducer.sendCodeError){
      await sendSNSSmsAction()(dispatch, getState)
    }
    dispatch(setChallengeLoadingResponse(false))
  }
}

export function onSignUpButtonAction() {
  return async (dispatch, getState) => {
    const { nameReducer, emailReducer, router } = getState()
    const now = new Date()
    mixpanel.people.set({
      "$name":nameReducer.name,
      "$email":emailReducer.email
    })
    mixpanel.register({
      "$name":nameReducer.name,
      "$email":emailReducer.email
    })
    mixpanel.track("Click-Signup",{
      "urlPath": router.location.pathname,
      "urlTitle": document.title
    })
    mixpanel.people.set({
      "created": now
    })
    await signUpAddInfoAction()(dispatch, getState)
    finishLoginFlow()(dispatch, getState)
  }
}

export function onSuggestionPickButtonAction(planoId) {
  return (dispatch, getState) => {
    const {suggestionDetailsReducer} = getState()
    dispatch(setPlanoIdResponse(planoId));
    mixpanel.register({
      operadora: suggestionDetailsReducer.planDetails.operadoraNomeFantasia,
      plano: suggestionDetailsReducer.planDetails.planoNome
    })
    return saveSuggestionPickAction(planoId)(dispatch, getState).then(()=>{
      dispatch(push('/contract'))
    }).catch()
  };
}

export function onSuggestionDetailsButtonAction(planoId) {
  return (dispatch, getState) => {
    const {suggestionDetailsReducer} = getState()
    mixpanel.register({
      operadora: suggestionDetailsReducer.planDetails.operadoraNomeFantasia,
      plano: suggestionDetailsReducer.planDetails.planoNome
    })
    dispatch(setPlanoIdResponse(planoId));
    return getSuggestionDetails()(dispatch, getState).then(()=>{
      dispatch(push('/suggestionDetails'))
    })
  };
}

export const formNextPageResponse = () => ({
  type: ActionType.FORM_NEXT_PAGE
});

export function formNextPageAction() {
  return (dispatch, getState) => {
    const {router, paraQuemReducer} = getState()
    switch(router.location.pathname) {
      case "/": {
        mixpanel.track("Click-Landing",{
          "urlPath": router.location.pathname,
          "urlTitle": document.title,
          "name": "main - product background"
        })
        dispatch(push("/signup/lives"))
        break
      }
      case "/signup/lives": {
        const { vidasReducer } = getState()
        const lives = vidasReducer.vidas
        mixpanel.track("Click-MainForm-Lives")
        mixpanel.track("Click-MainForm",{
          "formRequest": "lives",
          "urlPath": router.location.pathname,
          "urlTitle": document.title
        })
        mixpanel.people.set({"lives": lives})
        mixpanel.register({"lives": lives})
        dispatch(push("/signup/to-who"))
        break
      }
      case "/signup/cnpj": {
        const { vidasReducer, cnpjReducer } = getState()
        const cnpj = cnpjReducer.cnpj
        const vidas = vidasReducer.vidas
        const nextPage = cnpj === "cnpj" && vidas> 5? "/signup/range" : "/signup/ages"
        mixpanel.track("Click-MainForm-CNPJ")
        mixpanel.track("Click-MainForm",{
          "formRequest": "CNPJ",
          "urlPath": router.location.pathname,
          "urlTitle": document.title
        })
        mixpanel.people.set({"cnpj": cnpj})
        mixpanel.register({"cnpj": cnpj})
        dispatch(push(nextPage))
        break
      }
      case "/signup/to-who": {
        const {vidasReducer, paraQuemReducer} = getState()
        const choice = paraQuemReducer.paraQuem
        const vidas  = vidasReducer.vidas
        const nextPage = (choice === "personal" || choice === "other" ||(choice === "enterprise" && vidas <=5)) ? "/signup/ages": choice === "family" ? "/signup/cnpj": "/signup/people-included"
        mixpanel.track("Click-MainForm-ToWho")
        mixpanel.track("Click-MainForm",{
          "formRequest": "toWho",
          "urlPath": router.location.pathname,
          "urlTitle": document.title
        })
        mixpanel.people.set({"toWho": choice})
        mixpanel.register({"toWho": choice})
        dispatch(push(nextPage))
        break
      }
      case "/signup/ages": {
        const {cnpjReducer, idadePFReducer, idadePJReducer} = getState()
        const cnpj = cnpjReducer.cnpj
        const idadePF = idadePFReducer.idadePF
        const idadePJ = idadePJReducer.idadePJ
        const idades = cnpj === "cnpj"? idadePJ:idadePF
        mixpanel.track("Click-MainForm-Ages")
        mixpanel.track("Click-MainForm",{
          "formRequest": "ages",
          "urlPath": router.location.pathname,
          "urlTitle": document.title
        })
        idades.forEach((idade,index)=>{
          var id = "pessoa " + index
          mixpanel.people.append({
            "ages": idade.value
          })
          mixpanel.people.set({
            [id]: idade.value
          })
        })
        dispatch(push("/signup/previous-plan"))
        break
      }
      case "/signup/people-included": {
        const { quemSeraIncluidoReducer } = getState()
        const socios = quemSeraIncluidoReducer.socios
        const dependentes = quemSeraIncluidoReducer.dependentes
        const funcionarios = quemSeraIncluidoReducer.funcionarios
        mixpanel.people.set({"plo_Associates": String(socios), "plo_Employees": String(funcionarios), "plo_Dependents": String(dependentes)})
        mixpanel.register({"plo_Associates": String(socios), "plo_Employees": String(funcionarios), "plo_Dependents": String(dependentes)})
        mixpanel.track("Click-MainForm-PersonalLegalObligation")
        mixpanel.track("Click-MainForm",{
          "formRequest": "personalLegalObligation",
          "urlPath": router.location.pathname,
          "urlTitle": document.title
        })
        const nextPage = (socios === false && dependentes === false && funcionarios === false)?'/signup/people-included':'/signup/range'
        dispatch(push(nextPage))
        break
      }
      case "/signup/previous-plan": {
        const { paraQuemReducer, planoAnteriorReducer } = getState()
        const planoAnterior = planoAnteriorReducer.planoAnterior
        const nextPage = planoAnterior === "tem"? "/signup/reason": paraQuemReducer.paraQuem === "enterprise" ? "/signup/people-included" : "/signup/range"

        mixpanel.track("Click-MainForm-PreviousPlan")
        mixpanel.track("Click-MainForm",{
          "formRequest": "previousPlan",
          "urlPath": router.location.pathname,
          "urlTitle": document.title
        })
        mixpanel.people.set({'previousPlan': planoAnterior})
        mixpanel.register({'previousPlan': planoAnterior})
        dispatch(push(nextPage))
        break
      }
      case "/signup/range": {
        const { abrangenciaReducer } = getState()
        var abrangencia = ''
        if(abrangenciaReducer.showRegional){
          abrangencia = 'Regional'
        }else if(abrangenciaReducer.showNacional){
          abrangencia = 'Nacional'
        }
        const rangeType = abrangencia === 'Regional'?'local': abrangencia === 'Nacional'? 'national':""
        mixpanel.people.set({'coverageRange':rangeType})
        mixpanel.register({'coverageRange':rangeType})
        mixpanel.track("Click-MainForm-Range")
        mixpanel.track("Click-MainForm",{
          "formRequest":"range",
          "urlPath": router.location.pathname,
          "urlTitle": document.title
        })
        const nextPage = (abrangenciaReducer.showNacional || abrangenciaReducer.showRegional) ? '/signup/intermediary-plan' : '/signup/range'
        dispatch(push(nextPage))
        break
      }
      case "/signup/reason": {
        const { paraQuemReducer, reasonReducer } = getState()
        const paraQuem = paraQuemReducer.paraQuem
        const reason = reasonReducer.reason
        var nextPage = paraQuem === "enterprise" ? "/signup/people-included": "/signup/range"

        mixpanel.people.set({'reason': reason})
        mixpanel.register({'reason': reason})
        mixpanel.track("Click-MainForm-Reason")
        mixpanel.track("Click-MainForm",{
          "formRequest":"reason",
          "urlPath": router.location.pathname,
          "urlTitle": document.title
        })

        dispatch(push(nextPage))
        break
      }
      case "/signup/intermediary-plan": {
        const { acomodacaoReducer } = getState()
        var acomodacao = ''
        if(acomodacaoReducer.showEnfermaria){
          acomodacao = 'Enfermaria'
        }else if(acomodacaoReducer.showApartamento){
          acomodacao = 'Apartamento'
        }
        const nextPage = (acomodacaoReducer.showEnfermaria || acomodacaoReducer.showApartamento) ? '/signup/city' : '/signup/intermediary-plan'
        const roomType = acomodacao === 'Enfermaria' ? 'shared' : acomodacao === 'Apartamento' ? 'individual' : ""
        mixpanel.people.set({"roomType": roomType})
        mixpanel.register({"roomType": roomType})
        mixpanel.track("Click-MainForm",{
          "formRequest": "roomType",
          "urlPath": router.location.pathname,
          "urlTitle": document.title
        })
        mixpanel.track("Click-MainForm-RoomType")
        dispatch(push(nextPage))
        break
      }
      case "/signup/city": {
        const { locationReducer, cnpjReducer, abReducer } = getState()
        const state = locationReducer.state
        const city = locationReducer.city
        const cnpj = cnpjReducer.cnpj
        const abPreference = abReducer.abPreference === "Multiple-Preferences"? "region" : "preferences"

        mixpanel.people.set({
          "$region": state,
          "$city": city,
        });
        mixpanel.register({
          "$region": state,
          "$city": city
        });
        mixpanel.track("Click-MainForm",{
          "formRequest": "Location",
          "urlPath": router.location.pathname,
          "urlTitle": document.title
        })
        mixpanel.track("Click-MainForm-Location")
        const nextPage = (cnpj==="cnpj" || cnpj==='mei')?`/signup/${abPreference}`:'/signup/occupation'
        dispatch(push(nextPage))
        break
      }
      case "/signup/occupation": {
        const { ocupacaoReducer, abReducer } = getState()
        const ocupacao = String(ocupacaoReducer.ocupacao)
        const abPreference = abReducer.abPreference === "Multiple-Preferences"? "region" : "preferences"

        mixpanel.people.set({"professionalRole": ocupacao})
        mixpanel.register({"professionalRole": ocupacao})
        mixpanel.track("Click-MainForm",{
          "formRequest": "professionalRole",
          "urlPath": router.location.pathname,
          "urlTitle": document.title
        })
        mixpanel.track("Click-MainForm-ProfessionalRole")
        dispatch(push(`/signup/${abPreference}`))
        break
      }
      case "/signup/region" : {
        const { regionReducer } = getState()
        const regions = JSON.stringify(regionReducer.regions)
        mixpanel.people.set({"regionPreference": regions})
        mixpanel.register({"regionPreference": regions})
        mixpanel.track("Click-MainForm",{
          "formRequest": "regionPreference",
          "urlPath": router.location.pathname,
          "urlTitle": document.title
        })
        mixpanel.track("Click-MainForm-Region")
        dispatch(push('/signup/hospital'))
      }
      default: {}
    }
    dispatch(formNextPageResponse())
  };
}


export const viewPageResponse = () => ({
  type: ActionType.VIEW_PAGE
});

export function viewPageAction() {
  return (dispatch, getState) => {
    const {router} = getState()
    switch(router.location.pathname) {
      case "/": {
        const d = new Date()
        const timeRange = d.getHours() < 4 ? "00:00 às 04:00" :
          d.getHours() < 8 ? "04:00 às 08:00" :
          d.getHours() < 12 ? "08:00 às 12:00" :
          d.getHours() < 16 ? "12:00 às 16:00" :
          d.getHours() < 20 ? "16:00 às 20:00" : "20:00 às 00:00"
        mixpanel.people.set_once({
          "firstVisitTimeRange" : timeRange
        })
        mixpanel.register_once({
          "firstVisitTimeRange" : timeRange
        })
        mixpanel.track("View-Landing",{
          "landingName": "Montanha",
          "urlPath": router.location.pathname,
          "urlTitle": document.title,
          "name": "main - product background"
        })
        break
      }
      case "/signup/cnpj": {
        mixpanel.track("View-MainForm-CNPJ")
        mixpanel.track("View-MainForm",{
          "formRequest": "CNPJ",
          "urlPath": router.location.pathname,
          "urlTitle": document.title
        })
        break
      }
      case "/signup/lives": {
        mixpanel.track("View-MainForm-Lives")
        mixpanel.track("View-MainForm",{
          "formRequest": "lives",
          "urlPath": router.location.pathname,
          "urlTitle": document.title
        })
        break
      }
      case "/signup/to-who": {
        mixpanel.track("View-MainForm-ToWho")
        mixpanel.track("View-MainForm",{
          "formRequest": "toWho",
          "urlPath": router.location.pathname,
          "urlTitle": document.title
        })
        break
      }
      case "/signup/ages": {
        mixpanel.track("View-MainForm-Ages")
        mixpanel.track("View-MainForm",{
          "formRequest": "ages",
          "urlPath": router.location.pathname,
          "urlTitle": document.title
        })
        break
      }
      case "/signup/previous-plan": {
        mixpanel.track("View-MainForm-PreviousPlan")
        mixpanel.track("View-MainForm",{
          "formRequest": "previousPlan",
          "urlPath": router.location.pathname,
          "urlTitle": document.title
        })
        break
      }
      case "/signup/reason": {
        mixpanel.track("View-MainForm-Reason")
        mixpanel.track("View-MainForm",{
          "formRequest": "reason",
          "urlPath": router.location.pathname,
          "urlTitle": document.title
        })
        break
      }
      case "/signup/people-included": {
        mixpanel.track("View-MainForm-PersonalLegalObligation")
        mixpanel.track("View-MainForm",{
          "formRequest": "personalLegalObligation",
          "urlPath": router.location.pathname,
          "urlTitle": document.title
        })
        break
      }
      case "/signup/range": {
        mixpanel.track("View-MainForm-Range")
        mixpanel.track("View-MainForm",{
          "formRequest":"range",
          "urlPath": router.location.pathname,
          "urlTitle": document.title
        })
        break
      }
      case "/signup/intermediary-plan": {
        mixpanel.track("View-MainForm-RoomType")
        mixpanel.track("View-MainForm",{
          "formRequest":"roomType",
          "urlPath": router.location.pathname,
          "urlTitle": document.title
        })
        break
      }
      case "/signup/city": {
        mixpanel.track("View-MainForm-Location")
        mixpanel.track("View-MainForm",{
          "formRequest": "Location",
          "urlPath": router.location.pathname,
          "urlTitle": document.title
        })
        break
      }
      case "/signup/occupation": {
        mixpanel.track("View-MainForm-ProfessionalRole")
        mixpanel.track("View-MainForm",{
          "formRequest": "professionalRole",
          "urlPath": router.location.pathname,
          "urlTitle": document.title
        })
        break
      }
      case "/signup/region": {
        mixpanel.track("View-MainForm-Region")
        mixpanel.track("View-MainForm",{
          "formRequest": "regionPreference",
          "urlPath": router.location.pathname,
          "urlTitle": document.title
        })
        break
      }
      case "/signup/hospital": {
        mixpanel.track("View-MainForm-Hospital")
        mixpanel.track("View-MainForm",{
          "formRequest": "hospital",
          "urlPath": router.location.pathname,
          "urlTitle": document.title
        })
        break
      }
      case "/login": {
        mixpanel.track("View-Login",{
          "urlPath": router.location.pathname,
          "urlTitle": document.title
        })
        break
      }
      case "/signup": {
        mixpanel.track("View-Signup",{
          "urlPath": router.location.pathname,
          "urlTitle": document.title
        })
        break
      }
      case "/suggestions": {
        mixpanel.track("View-Suggestions",{
          "urlPath": router.location.pathname,
          "urlTitle": document.title
        })
        break
      }
      case "/suggestionDetails": {
        mixpanel.track("View-Suggestions-Details",{
          "urlPath": router.location.pathname,
          "urlTitle": document.title
        })
        break
      }
      case "/plans": {
        mixpanel.track("View-Plans",{
          "urlPath": router.location.pathname,
          "urlTitle": document.title
        })
        break
      }
      case "/contract": {
        mixpanel.track("View-Contract",{
          "urlPath": router.location.pathname,
          "urlTitle": document.title
        })
        break
      }
      default: {}
    }
    dispatch(viewPageResponse())
  };
}
