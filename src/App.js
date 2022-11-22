import { useEffect, useState } from "react"
import RedditListContainer from "./components/redditListContainer"
import RedditListItem from "./components/redditListItem"

function App() {
  
  const [loadmore, setLoadmore] = useState('')
  const [listData, setListData] = useState([])
  const [triggerUI, setTriggerUI] = useState(0)

  useEffect(() => {
    getRedditPosts()
  }, [triggerUI])

  const getRedditPosts = async () => {
    let posts_retrieved;
    try {
      const res = await fetch(`https://www.reddit.com/r/aww/top.json?after=${loadmore}`)
      const data = await res.json()

      posts_retrieved = data

    } catch (error) {
      console.log(error)
    }
    setLoadmore(posts_retrieved.data.after)
    setListData([...listData,...posts_retrieved.data.children])
    createObserver()
  }

  const createObserver = () => {
    let options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.0
    }

    let observer = new IntersectionObserver(handleIntersection, options)

    observer.observe(document.querySelector('.item-container.last'))
  }

  function handleIntersection(entries) {
    entries.forEach((entry) => {
      if(entry.intersectionRatio > 0.0) {
        setTriggerUI(triggerUI + 1)
      }
    })
  }

  return (
    <div className="app-container">
      <h1>Reddit <span>Posts</span></h1>

      {listData.map((post, index) => {
        let last_item = '';
        if(index == listData.length - 1) {
          last_item = 'last'
        }
        return (
          <RedditListContainer key={index} position={last_item}> 
            <RedditListItem post = {post.data} />
          </RedditListContainer>
        )
      })}
    </div>
  );
}

export default App;
