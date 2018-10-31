import React from 'react';
import Amplify from 'aws-amplify';
import TagManager from 'react-gtm-module';
import { Route, Switch, Redirect } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router'

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as LoginAction from './action/LoginAction'
import PrivateRoute from './privateRoute'

import Landing from './screens/landing'

import City from './screens/signup/city'
import Cnpj from './screens/signup/cnpj'
import ToWho from './screens/signup/to-who'
import Lives from './screens/signup/lives'
import Ages from './screens/signup/ages'
import Reason from './screens/signup/reason'
import Occupation from './screens/signup/occupation';
import IntermediaryPlan from './screens/signup/intermediary-plan';
import PeopleIncluded from './screens/signup/people-included';
import Range from './screens/signup/range';
import Plans from './screens/plans';
import Contact from './screens/contact';
import Perfil from './screens/perfil';
import Login from './screens/account/login';
import Challenge from './screens/account/challenge';
import Signup from './screens/account/signup'
import FAQ from './screens/faq'
import About from './screens/about'
import Suggestions from './screens/plans/suggestions'
import SuggestionDetails from './screens/plans/suggestionDetails'
import Contract from './screens/contract';
import PreviousPlan from './screens/signup/previousPlan';
import Documents from './screens/userDash/documents';
import Signature from './screens/userDash/signature';
import EndUserDash from './screens/userDash/end';
import Region from './screens/signup/region';
import Hospital from './screens/signup/hospital';
import Preferences from './screens/signup/prefrences'

class App extends React.Component {
  constructor(props){
    super(props)
    const tagManagerArgs = {
      gtmId: 'GTM-57QJBJD'
    }
    TagManager.initialize(tagManagerArgs);
    Amplify.configure({
      Auth: {
        identityPoolId: 'us-east-1:0e9f9567-4e34-40c4-a99a-cb1fe973702e',
      // REQUIRED - Amazon Cognito Region
          region: 'us-east-1',
      // OPTIONAL - Amazon Cognito User Pool ID
          userPoolId: 'us-east-1_ZOwNElTsG',
      // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
          userPoolWebClientId: '345nnv6q7sobvh3kf3l2i36ue',
      },
      Storage: {
          bucket: 'consultorio-user-files', //REQUIRED -  Amazon S3 bucket
          region: 'us-east-1', //OPTIONAL -  Amazon service region
      },
      API: {
        endpoints: [
          {
            name:"API",
             endpoint: "https://api.consultorio.com"    //"https://0bwz4ayj28.execute-api.us-east-1.amazonaws.com/production"
          }
        ]
      }
    });
    this.onUnauthorizedAccess = this.onUnauthorizedAccess.bind(this)
  }
  onUnauthorizedAccess(){
    this.props.action.setReturnToUrlAction()
  }
  componentDidMount(){
    this.props.action.checkForSignedUserAction()
  }
  render(){
    return(
      <ConnectedRouter history={this.props.history}>
        <React.Fragment>
          <Route exact path="/" component={Landing} />
          <Route exact path="/signup/city" component={City} />
          <Route exact path="/signup/cnpj" component={Cnpj} />
          <Route exact path="/signup/to-who" component={ToWho} />
          <Route exact path="/signup/lives" component={Lives} />
          <Route exact path="/signup/ages" component={Ages} />
          <Route exact path="/signup/reason" component={Reason} />
          <Route exact path="/signup/previous-plan" component={PreviousPlan} />
          <Route exact path="/signup/occupation" component={Occupation} />
          <Route exact path="/signup/intermediary-plan" component={IntermediaryPlan} />
          <Route exact path="/signup/range" component={Range} />
          <Route exact path="/signup/people-included" component={PeopleIncluded} />
          <Route exact path="/signup/preferences" component={Preferences} />
          <Route exact path="/signup/hospital" component={Hospital} />
          <Route exact path="/signup/region" component={Region} />
          <Route exact path="/contract" component={Contract} />
          <Route exact path="/contact" component={Contact} />
          <Route exact path="/challenge" component={Challenge} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/perfil" component={Perfil} />
          <Route exact path="/faq" component={FAQ}/>
          <Route exact path="/about" component={About} />
          <PrivateRoute exact path="/user-dash/documents" component={Documents} onUnauthorizedAccess={this.onUnauthorizedAccess} userIsLogged={this.props.userIsLogged}/>
          <PrivateRoute exact path="/user-dash/signature" component={Signature} onUnauthorizedAccess={this.onUnauthorizedAccess} userIsLogged={this.props.userIsLogged}/>
          <PrivateRoute exact path="/user-dash/end" component={EndUserDash} onUnauthorizedAccess={this.onUnauthorizedAccess} userIsLogged={this.props.userIsLogged}/>
          <PrivateRoute exact path="/plans" component={Plans} onUnauthorizedAccess={this.onUnauthorizedAccess} userIsLogged={this.props.userIsLogged}/>
          <PrivateRoute exact path="/suggestions" component={Suggestions} onUnauthorizedAccess={this.onUnauthorizedAccess} userIsLogged={this.props.userIsLogged}/>
          <PrivateRoute exact path="/suggestionDetails" component={SuggestionDetails} onUnauthorizedAccess={this.onUnauthorizedAccess} userIsLogged={this.props.userIsLogged}/>
        </React.Fragment>
      </ConnectedRouter>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  userIsLogged: state.loginReducer.userIsLogged,
});

const mapDispatchToProps = dispatch => ({
  action: bindActionCreators({ ...LoginAction}, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
