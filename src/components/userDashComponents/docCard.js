import React from 'react'
import { FadeLoader } from 'react-spinners';


export default ({docName, docPath, onClickCamera, onClickFile, id, loading, opened, onClickMaximize, onClickMinimize, instructions}) => {
  const documentLoaded = !(!docPath||docPath==='')
  return(
    <React.Fragment>
      <div className={`documentContainer ${opened ? 'opened' : 'closed'} ${documentLoaded ? 'checked' : ''}`} onClick={(e) => {if(!opened){onClickMaximize(e, id)}else{onClickMinimize(e, id)}}} >
        <div className="documentContainerHeader">
          <div className={`outerCheckmark ${documentLoaded ? 'checked' : ''}`}><div className={`checkmark ${documentLoaded ? 'checked' : ''}`}></div></div>
          {docName}
        </div>
        <div className={`docCard ${opened ? 'opened' : 'closed'}`}>
          <span className="bar"></span>
          {loading&&<div className=""><FadeLoader color={'var(--pink)'} loading={true} /></div>}
          <div className="instructContainer">
            {(!loading&&!documentLoaded&&instructions)&&<div className="instructions">{instructions}</div>}
            {(!loading&&!documentLoaded)&&<i className={`material-icons uploadIcon ${instructions ? 'uploadIconWithInstructions' : ''}`}>add_photo_alternate</i>}
          </div>
          {(!loading&&documentLoaded)&&<img className="docCardImage" name="identidade" src={docPath}/>}
          <span className="bar"></span>
          <div className="docCardButtons">
            <div className="buttonUpload buttonCamera" onClick={(e) => {onClickCamera(e, id)}}>
              <a>Câmera</a>
              <i className="material-icons upload uploadCamera"> camera_alt </i>  
            </div>
            <div className="buttonUpload" onClick={(e) => {onClickFile(e, id)}}>
              <a>Arquivo</a>
              <i className="material-icons upload"> attach_file </i>
            </div>
          </div>
        </div>
      </div>
      <style jsx="true">{`
        .instructContainer{
          display: flex;
          align-items: center;
          flex-direction: column;
          text-align: left;
          font-weight: 500;
        }
        .instructions{
          height: 100px;
          display: flex;
          align-items: center;
        }
        .documentContainerHeader{
          display: flex;
          flex-direction: row;
          align-items: center;
        }
        .docCard{
          width: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: center;
        }  
        .docCard.closed{
          visibility:hidden;
          display:none;
        }
        .buttonUpload{
          font-weight: 400;
          font-family: 'Gotham';
          width: 100px;
          padding-left: 4px;
          border: solid 1px var(--pink);;
          display: flex;
          flex-direction: row;
          justify-content: center;
          color: var(--pink);
          align-items: center;
          justify-content: center;
          border-radius: 5px;
          outline: none;
          font-size: 13px;
          text-decoration: none;
          height: 42px;
          text-decoration: none;
          cursor: pointer;
        }
        img.docCardImage{
          width: 100%;
          object-fit: contain;
          border-radius: 5px;
          box-shadow: 2px 0px 4px rgba(0, 0, 0, 0.05), 0px 2px 4px rgba(0, 0, 0, 0.1);
        }
        .material-icons.uploadIcon{
          margin-left: 4px;
          margin-right: 4px;
          font-size: 100px;
          color: var(--pink);
        }
        .material-icons.uploadIconWithInstructions{
          opacity: 0.1;
          margin-top: -100px
        }
        .bar {
          content:"";
          height: 1px;
          background-color: #EDEDED;
          margin-top: 2vh;
          margin-bottom: 2vh;
          width: 100%;
        }
        .docCardButtons{
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          width: 100%;
        }
        .material-icons.uploadCamera{
          margin-left: 4px;
          margin-right: 4px;
        }
        .material-icons.upload{
          font-size: 24px;
          color: var(--pink);
        }

        /* Radio Button */
        .documentContainer {
          user-select: none;
          padding: 15px 20px;
          background: #FFF;
          box-shadow: 2px 0px 4px rgba(0, 0, 0, 0.05), 0px 2px 4px rgba(0, 0, 0, 0.1);
          font-size: 16px;
          font-family: 'Roboto', sans-serif;
          outline: none;
          font-weight: 400;
          width: 100%;
          max-width: 400px;
          position: relative;
          display: flex;
          border-radius: 5px;
          margin-bottom: 20px;
        }

        .documentContainer.opened {
          flex-direction: column;
        }

        .documentContainer.checked.closed {
          background-color: var(--pink);
          color: #FFF;
        }

        .documentContainer.checked {
          cursor: pointer;
        }

        .checked.checkmark {
          height: 12px;
          width: 12px;
          background-color: var(--pink);
          box-shadow: none;
          border: 3px solid #FFF;
          margin-right: 0px;   
        }
        .outerCheckmark.checked{
          height: 14px;
          width: 14px;
          border: 1px solid var(--pink);
          border-radius: 50%;
          align-items: center;
          display: flex;
          margin-right: 10px;
        }
        .checkmark {
          height: 14px;
          width: 14px;
          background-color: #FFF;
          border-radius: 50%;
          box-shadow: inset 0px 0px 10px #EBE8E8;      
          margin-right: 10px;   
        }

        @media(min-width: 769px){
          .buttonCamera{
            display: none;
            visibility:hidden;
          }
          .docCardButtons{
            display: flex;
            flex-direction: row;
            justify-content: center;
          }
        }
      `}</style>
    </React.Fragment>
  )
}