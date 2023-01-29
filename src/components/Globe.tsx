import React from 'react'
import ReactGlobe from 'react-globe.gl'
import earthMarble from '../assets/earth-blue-marble.jpg'
import nightSky from '../assets/night-sky.png'
function Globe() {
  return (
    <ReactGlobe
            backgroundColor="rgba(0,0,0,0)"
            globeImageUrl={earthMarble}
            backgroundImageUrl={nightSky}
            width={800}
            height={800}
        />
  )
}

export default Globe