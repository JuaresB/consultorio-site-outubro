import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../../logo'

export default ({ children, next, buttonTitle  }) => (
  <div className="account">
    <div className="container">
      <div>
        <Logo />
      </div>
        {children}
      <div className="footer">
        <Link to={next} className="button clean">{buttonTitle}</Link>
      </div>
    </div>
    <style jsx>{`
      .account{
        justify-content: flex-start;
      }
    `}</style>
  </div>
)
