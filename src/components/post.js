import { useLocation } from 'react-router-dom'
import axios from 'axios'
import parse from 'html-react-parser';
import React,{useState,useEffect} from 'react';
import { Button, Comment, Form, Header } from 'semantic-ui-react'




const Alink = ({ url, title }) => (
  <a href={url} target="_blank" rel="noreferrer">
    {title}
  </a>
);

const Post = () => {
	const location = useLocation()



  const [post,setpost]=useState([])
  useEffect(() => {
    fetchpost();
  }, [])
  useEffect(() => {
    console.log(post)
  }, [post])
  const fetchpost=async()=>{
    const response=await axios(`https://node-hnapi.herokuapp.com${location.pathname}`);
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
       <Comment.Group threaded>
    <Header as='h3' dividing>
      Comments
    </Header>
       {
        post.comments && post.comments.map((comment) => <Comments postAuthor={post.user} key={comment.id} comment={comment} />
         
        )
      }
       </Comment.Group>
         <ul>
      
      </ul>
       
       
         
         
         

       
      
    </div>
    </div>
    );

  




  
    
    
}
function Comments({ comment,postAuthor }) {

  const [showChildren,setShowChildren] = useState(true);

  // this causes the data to check if there are more "children" comments under
  // the current comment. If there are then is recursively renders more of this
  // same component below the one we originally called and if not renders nothing
    const nestedComments = (comment.comments || []).map(comment => {
      return<Comment.Group style={{margin: '-1.5em 0 -1em 1.25em', padding: '3em 0 2em 2.25em'}}> <Comments key={comment.id} postAuthor={postAuthor} comment={comment} type="child" /></Comment.Group>
    })
   
    return (
      // this margin causes the recursive nested comments to indent so
      // the user can see the thread
      <Comment>
      <Comment.Avatar as='a' src='https://react.semantic-ui.com/images/avatar/small/matt.jpg' />
      <Comment.Content>
        <Comment.Author as='a'>{comment.user}</Comment.Author>
        <Comment.Metadata>
          <span>{comment.time_ago}</span>
        </Comment.Metadata>
        <Comment.Text><div className="commentDiv" dangerouslySetInnerHTML={{ __html: comment.content }} /></Comment.Text>
        <Comment.Actions>
          <a>Reply</a>
        </Comment.Actions>
      </Comment.Content>
      {nestedComments}
    </Comment>
      // <div class="comment">
      //   <a class="avatar">
      //     <img />
      //     </a>
      //     <div class="content">
      //       <a class="author"></a>
      //       <div class="metadata">
      //         <span>{comment.user}</span>
      //         </div>
      //         <div class="text"> </div>
      //         <div class="actions"><a>Reply</a>
      //         </div>
      //         </div>
             
      //         </div>
      // <li>
      // <div style={{display:'inline',fontWeight:'bold',fontSize:'large'}} onClick={()=> setShowChildren(!showChildren)}>{showChildren ? '-' : '+'}<img src={`https://robohash.org/${comment.user}.png`} style={{width:'30px',marginRight:'4px',verticalAlign:'middle'}} title='' alt=''></img>
      // <span style={{fontWeight:'bold'}}>{comment.user}</span> <span style={{fontSize:'10pt'}}>{comment.time_ago}</span>
      // {comment.user===postAuthor && <img src="https://robohash.org/original.png" alt='' title='Original Author' style={{width:'16px',marginLeft:'4px'}} />}
      // </div>
      // {/* this left border is the line that connects the comments on the same level in the thread */}
      // {showChildren && 
      // <div style={{"marginTop": "2px",borderLeft:'2px solid #cadbce',marginLeft:'4px',position:'relative'}}>
      // {/* this next line is the invisible div next to the left border that will collapse the comment thread when clicked */}
      // <div style={{width:'15px',float:'left',position:'absolute',top:'0',bottom:'0'}} onClick={()=>{setShowChildren(!showChildren)}} />
      //    {/* outputs the comment text in the HTML format in which it was saved. this is the main comment */}
      //   <div className="commentDiv" dangerouslySetInnerHTML={{ __html: comment.content }} />
      //   {/* display any nested comments */}
        
      // </div>
      // }
      // {nestedComments}
      // </li>
      
    )
} 

export default Post





{/* import React from 'react'
import { Button, Comment, Form, Header } from 'semantic-ui-react'

const CommentExampleThreaded = () => (
  <Comment.Group threaded>
    <Header as='h3' dividing>
      Comments
    </Header>

    <Comment>
      <Comment.Avatar as='a' src='https://react.semantic-ui.com/images/avatar/small/matt.jpg' />
      <Comment.Content>
        <Comment.Author as='a'>Matt</Comment.Author>
        <Comment.Metadata>
          <span>Today at 5:42PM</span>
        </Comment.Metadata>
        <Comment.Text>How artistic!</Comment.Text>
        <Comment.Actions>
          <a>Reply</a>
        </Comment.Actions>
      </Comment.Content>
    </Comment>

    <Comment>
      <Comment.Avatar as='a' src='https://react.semantic-ui.com/images/avatar/small/elliot.jpg' />
      <Comment.Content>
        <Comment.Author as='a'>Elliot Fu</Comment.Author>
        <Comment.Metadata>
          <span>Yesterday at 12:30AM</span>
        </Comment.Metadata>
        <Comment.Text>
          <p>This has been very useful for my research. Thanks as well!</p>
        </Comment.Text>
        <Comment.Actions>
          <a>Reply</a>
        </Comment.Actions>
      </Comment.Content>

      
        <Comment>
          <Comment.Avatar as='a' src='https://react.semantic-ui.com/images/avatar/small/jenny.jpg' />
          <Comment.Content>
            <Comment.Author as='a'>Jenny Hess</Comment.Author>
            <Comment.Metadata>
              <span>Just now</span>
            </Comment.Metadata>
            <Comment.Text>Elliot you are always so right :)</Comment.Text>
            <Comment.Actions>
              <a>Reply</a>
            </Comment.Actions>
          </Comment.Content>
        </Comment>
      </Comment.Group>
    </Comment>

    <Comment>
      <Comment.Avatar as='a' src='https://react.semantic-ui.com/images/avatar/small/joe.jpg' />
      <Comment.Content>
        <Comment.Author as='a'>Joe Henderson</Comment.Author>
        <Comment.Metadata>
          <span>5 days ago</span>
        </Comment.Metadata>
        <Comment.Text>Dude, this is awesome. Thanks so much</Comment.Text>
        <Comment.Actions>
          <a>Reply</a>
        </Comment.Actions>
      </Comment.Content>
    </Comment>

    <Form reply>
      <Form.TextArea />
      <Button content='Add Reply' labelPosition='left' icon='edit' primary />
    </Form>
  </Comment.Group>
)

export default CommentExampleThreaded */}