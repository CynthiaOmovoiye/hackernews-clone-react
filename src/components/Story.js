import React from 'react';
// import { BASE_API_URL } from '../utils/constants';


const Link = ({ url, title }) => (
  <a href={url} target="_blank" rel="noreferrer">
    {title}
  </a>
);

const Story = ({ story: { id, user, title, comments_count, time_ago, url,points, domain } }) => {
  return (
    <div className="d-flex">
      <div className="points">
      <span className="card">
      <i
                className="fas fa-sort-up"
                style={{
                  fontSize: "50px",
                  marginTop: "16px",
                  padding: "0px",
                  marginRight: "0px",
                  color:"#d3d3d3"
                }}
              />
         
        </span>
        <p>
        {`${points} `}
        </p>
      </div>
 <div className="story card">
      <div className="story-title">
        <h4 className="font-weight-bold">
        <Link url={url} title={title} />
        <span className="domain ml-2"><Link  url={`https://${domain}`} title={domain} /></span>
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
          {/*http://node-hnapi.herokuapp.com/item/{id}  seems deprecated, after some research I found 
          https://news.ycombinator.com/item?id=${id} to work just fine 
          
          */}
          <Link
          
            url={`https://news.ycombinator.com/item?id=${id}`}
            title={`${comments_count} comments` }
          />
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
          {`${time_ago}`}
        </span>
        </div>
        <div>
        <span className="user">
         Submitted by{' '}
         {/*http://node-hnapi.herokuapp.com/user/{user} 
         seems deprecated, after some research I found 
          https://news.ycombinator.com/user?id=${user} to work just fine*/}
          <Link url={`https://news.ycombinator.com/user?id=${user}`} title={user} />
        </span>
        
        
        </div>
       
      </div>
    </div>
 
    </div>
    );

};







export default Story;