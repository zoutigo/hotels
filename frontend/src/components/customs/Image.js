import React from 'react'
import Proptypes from 'prop-types'
import useImage from '../hook/useImage'

function Image({ alt, filepath }) {
  // const { image } = useImage(url)

  return <img src={filepath} alt={alt} />
}

Image.propTypes = {
  alt: Proptypes.string.isRequired,
  filepath: Proptypes.string.isRequired,
}

export default Image
