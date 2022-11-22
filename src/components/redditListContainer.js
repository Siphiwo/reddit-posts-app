import React from 'react'

const RedditListContainer = ({children, position}) => {
  
  return (
    <div className={`item-container ${position}`}>
        <div className='item-content'>{children}</div>
    </div>
  )
}

export default RedditListContainer