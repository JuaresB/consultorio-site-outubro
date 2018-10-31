//This is to ensure that we can see the entirety of the store

export default {
  abReducer:{
    abLogin: '',
    abPreference: ''
  },
  answerReducer:{
    answerId: '',
    needToSendAnswer: false
  },
  apiReducer: {
    apiCallsInProgress: 0
  },
  challengeReducer: {
    challengeErrorValue: false,
    challengeLoadingValue: false,
  },
  loginReducer: {
    code: '',
    state: '',
    accessToken: '',
    challengeAnswer: '',
    cognitoPreAuthUser: '',
    challengeType: '',
    userIsLogged: false,
    idCognito: '',
    sendCodeError: false,
    returnToUrl: ''
  },
  suggestionReducer: {
    suggestions: [],
    agesArray: [],
    showRegional: false,
    showNacional: false,
    showEnfermaria: false,
    showApartamento: false,
    showHospitalar: false,
    showAmbulatorial: false,
    showCoparticipacao: false,
    showWithoutHospital: false,
    showOutsideRegion: false,
  },
  suggestionDetailsReducer: {
    planoId: '',
    planDetails: {}
  },
  cnpjReducer: {
    cnpj: ''
  },
  idadePFReducer: {
    idadePF: [{name:'Titular', key:1, value:""}],
    deleteCounterPF: 0
  },
  idadePJReducer: {
    idadePJ: [{name:'Titular', key:1, value:""}],
    deleteCounterPJ: 0
  },
  abrangenciaReducer: {
    showRegional: false,
    showNacional: false,
  },
  acomodacaoReducer: {
    showEnfermaria: false,
    showApartamento: false,
  },
  locationReducer: {
    state: "",
    city: "",
    isCapital: false,
    occupationList: [],
    hospitalList: [],
    regionList: []
  },
  ocupacaoReducer: {
    ocupacao: []
  },
  prefHospitalReducer: {
    hospital: "",
    hospitalType: ""
  },
  quemSeraIncluidoReducer: {
    socios: false,
    dependentes: false,
    funcionarios: false
  },
  nameReducer: {
    name: ""
  },
  emailReducer: {
    email: ""
  },
  telephoneReducer: {
    telephoneDDD: "",
    telephoneDDI: ""
  },
  vidasReducer: {
    vidas: 1
  },
  paraQuemReducer: {
    paraQuem: ""
  },
  planoAnteriorReducer: {
    planoAnterior: ""
  },
  reasonReducer: {
    reason: ""
  },
  regionReducer: {
    regions: []
  },
  hospitalReducer: {
    hospitals: []
  }
};
