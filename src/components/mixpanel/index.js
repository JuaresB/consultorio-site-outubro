var mixpanel = require('mixpanel-browser');

if(process.env.NODE_ENV === 'production'){
  mixpanel.init("fd8335074eda04cb591d4e453d1903df");
} else {
  mixpanel.init("a36e1d5cd3ffef56d274de2be727f97e");
}

export default mixpanel;
