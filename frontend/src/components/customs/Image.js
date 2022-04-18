import React from 'react'
import Proptypes from 'prop-types'
import useImage from '../hook/useImage'

function Image({ alt, url }) {
  const { image } = useImage(url)

  return <img src={image} alt={alt} />
}

Image.propTypes = {
  alt: Proptypes.string.isRequired,
  url: Proptypes.string.isRequired,
}

export default Image
