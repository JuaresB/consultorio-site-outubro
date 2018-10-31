import {combineReducers} from 'redux';
import abReducer from './abReducer';
import answerReducer from './answerReducer';
import apiReducer from './apiReducer';
import challengeReducer from './challengePageReducer';
import loginReducer from  './loginReducer';
import suggestionReducer from  './suggestionReducer';
import suggestionDetailsReducer from  './suggestionDetailsReducer';
import locationReducer from  './locationReducer';
import cnpjReducer from './form/cnpjReducer';
import idadePFReducer from './form/idadePFReducer';
import idadePJReducer from  './form/idadePJReducer';
import abrangenciaReducer from './form/abrangenciaReducer';
import acomodacaoReducer from './form/acomodacaoReducer';
import ocupacaoReducer from './form/ocupacaoReducer';
import prefHospitalReducer from './form/prefHospitalReducer';
import quemSeraIncluidoReducer from './form/quemSeraIncluidoReducer';
import nameReducer from './form/nameReducer';
import emailReducer from './form/emailReducer';
import telephoneReducer from './form/telephoneReducer';
import vidasReducer from './form/vidasReducer';
import paraQuemReducer from './form/paraQuemReducer';
import planoAnteriorReducer from './form/planoAnteriorReducer';
import reasonReducer from './form/reasonReducer';
import regionReducer from './form/regionReducer';
import hospitalReducer from './form/hospitalReducer';

export default combineReducers({
  abReducer,
  answerReducer,
  challengeReducer,
  locationReducer,
  loginReducer,
  apiReducer,
  suggestionReducer,
  suggestionDetailsReducer,
  cnpjReducer,
  idadePFReducer,
  idadePJReducer,
  abrangenciaReducer,
  acomodacaoReducer,
  ocupacaoReducer,
  prefHospitalReducer,
  quemSeraIncluidoReducer,
  nameReducer,
  emailReducer,
  telephoneReducer,
  vidasReducer,
  paraQuemReducer,
  planoAnteriorReducer,
  reasonReducer,
  regionReducer,
  hospitalReducer
});
