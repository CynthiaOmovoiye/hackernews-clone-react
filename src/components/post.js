import { useLocation } from 'react-router-dom'
import axios from 'axios'
import parse from 'html-react-parser';
import React,{useState,useEffect} from 'react';




const Alink = ({ url, title }) => (
  <a href={url} target="_blank" rel="noreferrer">
    {title}
  </a>
);

const Contact = () => {
	const location = useLocation()



  const [post,setpost]=useState([])
  useEffect(() => {
    fetchpost();
  }, [])
  useEffect(() => {
    console.log(post)
  }, [post])
  const fetchpost=async()=>{
    const response=await axios(`http://node-hnapi.herokuapp.com${location.pathname}`);
    setpost(response.data)    
  }
  return (
    <div className="story card">
      
         <div className="card-header">
         <div className="story-title">
           <h4 className="font-weight-bold">
           <Alink url={post.url} title={post.title} />
           <span className="domain ml-2"><Alink  url={`https://${post.domain}`} title={post.domain} /></span>
           </h4>
            
         </div>
         <div className="story-info d-flex flex-column flex-md-row align-items-md-center">
           <div className="d-flex post-info">
           <span className="w-50">
           <i
                   className="fas fa-comments"
                   style={{
                     fontSize: "15px",
                     marginTop: "16px",
                     padding: "0px",
                     marginRight: "0px",
                     color:"#d3d3d3"
                   }}
                 />
            
             <span
             
   
             >
             {`${post.comments_count}`}Comments
             
              
             </span>
           </span>
           <span className="w-50">
           <i
                   className="fas fa-clock"
                   style={{
                     fontSize: "15px",
                     marginTop: "16px",
                     padding: "0px",
                     marginRight: "0px",
                     color:"#d3d3d3"
                   }}
                 />
             {`${post.time_ago}`}
           </span>
           </div>
           <div>
           <span className="user">
            Submitted by{' '}
           
             <Alink url={`https://news.ycombinator.com/user?id=${post.user}`} title={post.user} />
           </span>
           
           
           </div>
          
         </div>
       </div>
    
       <div className="card-body">
       {
        post.comments && post.comments.map((comment) => <Comment postAuthor={comment.user} key={comment.id} comment={comment} />
         
        )
      }
       
       
         
         
         

       
      
    </div>
    </div>
    );

  




  
    
    
}
function Comment({ comment,postAuthor }) {

  const [showChildren,setShowChildren] = useState(true);

  // this causes the data to check if there are more "children" comments under
  // the current comment. If there are then is recursively renders more of this
  // same component below the one we originally called and if not renders nothing
    const nestedComments = (comment.comments || []).map(comment => {
      return <Comment key={comment.id} postAuthor={postAuthor} comment={comment} type="child" />
    })
   
    return (
      // this margin causes the recursive nested comments to indent so
      // the user can see the thread
      <div style={{"marginLeft": "45px",marginBottom:'10px'}}>
      <div style={{display:'inline',fontWeight:'bold',fontSize:'large'}} onClick={()=> setShowChildren(!showChildren)}>{showChildren ? '-' : '+'}<img src={`https://robohash.org/${comment.user}.png`} style={{width:'30px',marginRight:'4px',verticalAlign:'middle'}} title='' alt=''></img>
      <span style={{fontWeight:'bold'}}>{comment.user}</span> 
      {comment.user===postAuthor && <img src="" alt='' title='Original Author' style={{width:'16px',marginLeft:'4px'}} />}
      </div>
      {/* this left border is the line that connects the comments on the same level in the thread */}
      {showChildren && 
      <div style={{"marginTop": "2px",borderLeft:'2px solid #cadbce',marginLeft:'4px',position:'relative'}}>
      {/* this next line is the invisible div next to the left border that will collapse the comment thread when clicked */}
      <div style={{width:'15px',float:'left',position:'absolute',top:'0',bottom:'0'}} onClick={()=>{setShowChildren(!showChildren)}} />
         {/* outputs the comment text in the HTML format in which it was saved. this is the main comment */}
        <div className="commentDiv" dangerouslySetInnerHTML={{ __html: comment.content }} />
        {/* display any nested comments */}
        {nestedComments}
      </div>
      }
      </div>
    )
} 

export default Contact