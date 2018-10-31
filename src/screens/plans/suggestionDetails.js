import React from 'react';
import mixpanel from '../../components/mixpanel';
import Details from '../../components/suggestionComponents/details';
import { withRouter } from 'react-router-dom';
import * as SuggestionDetailsAction from '../../action/SuggestionDetailsAction';
import * as FlowAction from '../../action/FlowAction';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { BeatLoader } from 'react-spinners';

class SuggestionDetails extends React.Component{
  constructor(props){
    super(props);
    this.returnPage = this.returnPage.bind(this);
    window.scrollTo(0,0);
  }

  componentDidMount(){
    this.props.action.viewPageAction()
  }

  returnPage(){
    this.props.history.push('/suggestions');
  }

  render(){
    if(JSON.stringify(this.props.planDetails)!=='{}'){
      return(
        <React.Fragment>
          <div className="suggestionImage">
            <Details/>
          </div>
          <style jsx="true">{`
            .suggestionImage {
              padding-top: 0;
              height: auto;
              display: flex;
              width: 100%;
              flex-direction: column;
              align-items: center;
            }
            .returnIcon{
              color: #777;
              vertical-align: sub;
            }
            .return{
              padding-left: 2vh;
              color: #777;
              font-size: 20px;
              font-family: gotham;
              align-self: flex-start;
            }
            .seeMore {
              border: 2px solid #FFF;
              border-radius: 30px;
              text-align: center;
              height: 50px;
              font-size: 18px;
              width:28vh;
              border-color: #fff;
              color: #fff;
              display: flex;
              flex-direction: column;
              justify-content:center;
              margin-bottom: 4vh;
              margin-top: 2vh;
            }
          `}</style>
        </React.Fragment>
      );
    }else{
      return(
        <React.Fragment>
          <div className="suggestionImage">
            <Details/>
          </div>
          <div className="load">
            {/* <h3>Carregando todos os detalhes do seu plano!</h3> */}
            <div className="loadAnimation">
              <BeatLoader color={'var(--pink)'} loading={true} />
            </div>
          </div>
          <style jsx="true">{`
            .loadAnimation{
              width: 60px;
              top: 50vh;
              right: 50vw;
              margin-right: -30px;
              position: fixed;
            }
            .suggestionImage {
              -webkit-filter: blur(6px);
              filter: blur(6px);
            }
          `}</style>
        </React.Fragment>
      )
    }
  }
}

const mapStateToProps = (state, ownProps) => ({
  planDetails: state.suggestionDetailsReducer.planDetails,
  apiCallsInProgress: state.apiReducer.apiCallsInProgress,
});

const mapDispatchToProps = dispatch => ({
  action: bindActionCreators({ ...SuggestionDetailsAction, ...FlowAction }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SuggestionDetails));
