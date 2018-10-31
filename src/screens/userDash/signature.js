import React from 'react'
import UserDashLayout from '../../components/layouts/userDash'
import DocCard from '../../components/userDashComponents/docCard'
import * as CnpjAction from '../../action/form/CnpjAction';
import * as FlowAction from '../../action/FlowAction';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Storage } from 'aws-amplify';


class Signature extends React.Component {
  constructor(props){
    super(props)
    const files = [{name: "Assinatura", id: "signature"}]
    this.state = {
      errorMessage: '',
      blink: '',
      visible: false,
      visibleBody: false,
      docIdentityOpened: true,
      files: files
    }
    this.onClickFile = this.onClickFile.bind(this)
    this.onClickCamera = this.onClickCamera.bind(this)
    this.onChangeFile = this.onChangeFile.bind(this)
    this.fileUpload = React.createRef()
    this.fileCameraUpload = React.createRef()
    this.onClickMaximize = this.onClickMaximize.bind(this)
    this.onClickMinimize = this.onClickMinimize.bind(this)
    this.onClick = this.onClick.bind(this)
  }
  async componentDidMount(){
    this.props.action.viewPageAction()
    var files = JSON.parse(JSON.stringify(this.state.files))
    var allFilesSet = true
    this.setState({
      visibleBody: true,
    })
    for(let documentIndex in files){
      try{
        let result = await Storage.get(files[documentIndex].id, {level: 'private'})
        let resFetch = await fetch(result)
        if(resFetch.status === 200){
          files[documentIndex].filePath = await resFetch.text()
          files[documentIndex].closed = true
        } else {
          allFilesSet = false
        }
        files[documentIndex].loaded = true
        var newFiles = JSON.parse(JSON.stringify(this.state.files))
        for(let newDocumentIndex in newFiles){
          if(newFiles[newDocumentIndex].id === files[documentIndex].id){
            newFiles[newDocumentIndex] = files[documentIndex]
          }
        }
        this.setState({
          files: newFiles
        })
      } catch (error){
        allFilesSet = false
      }
    }
    if(allFilesSet){
      this.setState({
        visible:true,
      })
    }
  }

  onClickCamera(e, photoId){
    e.preventDefault()
    if (encodeURI.stopPropagation) {
      e.stopPropagation();   // W3C model
    } else {
      e.cancelBubble = true; // IE model
    }
    this.setState({
      filePhotoId: photoId,
    }, () => {
      this.fileCameraUpload.current.click()
    })
  }
  onClickFile(e, photoId){
    e.preventDefault()
    if (e.stopPropagation) {
      e.stopPropagation();   // W3C model
    } else {
      e.cancelBubble = true; // IE model
    }
    this.setState({
      filePhotoId: photoId
    }, () => {
      this.fileUpload.current.click()
    })
  }

  async onChangeFile(event){
    if (!event.target.files[0]) {
      return
    }
    var newFiles = JSON.parse(JSON.stringify(this.state.files))
    for(let documentIndex in newFiles){
      if(newFiles[documentIndex].id === this.state.filePhotoId){
        newFiles[documentIndex].loaded = false
      }
    }
    this.setState({
      files: newFiles
    })
    var reader = new FileReader();  
    reader.onload = async (event) => { 
      const files = JSON.parse(JSON.stringify(this.state.files))
      var allFilesSet = true
      for(let document of files){
        if(document.id === this.state.filePhotoId){
          document.filePath = event.target.result
          document.loaded = true
          document.closed = true
        }
        if(!document.filePath){
          allFilesSet = false
        }
      }
      try {
        await Storage.put(this.state.filePhotoId, event.target.result, {
          level: 'private'
        })
      } catch (error) {
        this.setState({
          filePhotoId: ''
        })
        return
      }
      this.setState({
        files: files,
        filePhotoId: '',
        visible: allFilesSet
      })
    }
    reader.readAsDataURL(event.target.files[0]);
  }
  onClickMaximize(e, photoId){
    e.preventDefault()
    var files = JSON.parse(JSON.stringify(this.state.files))
    for(let document of files){
      if(document.id === photoId){
        document.closed = false
      }
    }
    this.setState({
      files: files,
    })
  }
  onClickMinimize(e, photoId){
    e.preventDefault()
    var files = JSON.parse(JSON.stringify(this.state.files))
    for(let document of files){
      if((document.id === photoId)&&(document.filePath)){
        document.closed = true
      }
    }
    this.setState({
      files: files,
    })
  }
  onClick(e){
    e.preventDefault()
    this.props.action.userDashFormEnd()
  }
  render(){
    const instructions = <div><p>1. Pegue um papel em branco e uma caneta</p><p>2. Faça duas versões da sua assinatura,</p><p>3. Tire uma foto</p> </div>
    const cards = this.state.files.map((document, index) => {
      return <DocCard instructions={instructions} key={index} docName={document.name} id={document.id} onClickFile={this.onClickFile} onClickCamera={this.onClickCamera} showCamera={this.state.showCameraButton} docPath={document.filePath} loading={!document.loaded} opened={!document.closed} onClickMaximize={this.onClickMaximize} onClickMinimize={this.onClickMinimize}/>
    })
    return (
      <UserDashLayout
        next= ''
        title={"Agora vamos capturar a sua assinatura para o contrato."}
        subtitle= ''
        onClick={this.onClick}
        visible={this.state.visible}
        visibleBody={this.state.visibleBody}
        formSignupMinHeight = {"auto"}
        termos = {true}
      >
        <React.Fragment>
          <input className="inputCamera" type="file" ref={this.fileCameraUpload} accept="image/*" capture="camera" onChange={this.onChangeFile}></input>
          <input className="inputFile" type="file" ref={this.fileUpload} accept="image/*" onChange={this.onChangeFile}></input>
          <div className="cardsContainer">
            {cards}
          </div>
          <style jsx="true">{`
            .cardsContainer{
              display: flex;
              align-items: center;
              justify-content: center;
              flex-direction: column;
            }
            .inputFile{
              display: none;
              visibility:hidden;
            }
            .inputCamera{
              display: none;
              visibility:hidden;
            }
          `}</style>
        </React.Fragment>
      </UserDashLayout>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  cnpj: state.cnpjReducer.cnpj,
  vidas: state.vidasReducer.vidas
});

const mapDispatchToProps = dispatch => ({
  action: bindActionCreators({ ...CnpjAction, ...FlowAction }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Signature);