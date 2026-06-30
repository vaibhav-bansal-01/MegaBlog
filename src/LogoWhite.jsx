import React from 'react'
import logo from '../public/MegaBlog_Logo_White.png'

function Logo({width = '100px'}) {
  return (
    <img
    src={logo}
    alt="MegaBlog"
    style={{width: width}}
    className="obejct-contain"
    ></img>
  )
}

export default Logo