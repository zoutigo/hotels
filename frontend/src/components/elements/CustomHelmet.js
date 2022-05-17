import React from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'
import { siteName } from '../constants/globals'

function CustomHelmet({
  seoKeywords,
  seoDescription,
  nofollow,
  pageName,
  nosnippet,
}) {
  return (
    <Helmet>
      <meta charSet="utf-8" />
      <meta name="description" content={seoDescription} />
      <meta name="keywords" content={seoKeywords.join()} />
      {!nofollow && <meta name="robots" content="nofollow" />}
      {nosnippet && <meta name="robots" content="nosnippet" />}
      <meta name="robots" content="max-snippet:140" />
      <meta name="robots" content="noimageindex" />
      <title>
        {pageName} - {siteName}
      </title>
    </Helmet>
  )
}

CustomHelmet.defaultProps = {
  nofollow: true,
  nosnippet: false,
}

CustomHelmet.propTypes = {
  pageName: PropTypes.string.isRequired,
  seoDescription: PropTypes.string.isRequired,
  seoKeywords: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  nofollow: PropTypes.bool,
  nosnippet: PropTypes.bool,
}

export default CustomHelmet
