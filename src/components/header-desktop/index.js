import React from 'react'
import { Link } from 'react-router-dom'
import mixpanel from '../mixpanel'

export default ({ shadow }) => (
  // <div className={`header-desktop ${shadow ? 'white' : ''}`}>
  //   <h2>
  //     <Link to="/"><Logo white={!shadow} /></Link>
  //   </h2>
  //   <ul>
      <Link style={{textDecoration:'none', color: 'white'}} to="/contact">
        <span onClick={() => { mixpanel.track("Event-Contact") }}>.</span>
      </Link>
  //   </ul>
  // </div>
)
