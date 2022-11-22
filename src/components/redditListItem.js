import React from 'react'

const RedditListItem = ({post}) => {
  const {title, subreddit, thumbnail, permalink} = post
  const url = `https://reddit.com${permalink}`

  return (
    <>
      <h3 className='post-title'>
        <a href={url} target="_blank">{title}</a>
      </h3>
      <div className='post-subreddit'>{subreddit}</div>
      <div className='post-thumb-container'>
        <img src={thumbnail} alt={title} className="post-thumbnail" />
      </div>
    </>
  )
}

export default RedditListItem