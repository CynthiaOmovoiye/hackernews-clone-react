import { useLocation } from "react-router-dom";
import axios from "axios";
import "../styles.scss";
import React, { useState, useEffect } from "react";

const Alink = ({ url, title }) => (
  <a href={url} target="_blank" className="" rel="noreferrer">
    {title}
  </a>
);

const Post = () => {
  const location = useLocation();

  const [post, setpost] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    fetchpost();
  }, []);
  useEffect(() => {}, [post]);
  const fetchpost = async () => {
    const response = await axios(
      `https://node-hnapi.herokuapp.com${location.pathname}`
    );
    setpost(response.data);
    setIsLoading(false);
  };
  return (
    <React.Fragment>
      {isLoading ? (
        <p className="loading">Loading...</p>
      ) : (
        <React.Fragment>
          <div className="story card">
            <div className="card-header">
              <div className="story-title">
                <h4 className="font-weight-bold">
                  <Alink url={post.url} title={post.title} />
                  <span className="domain ml-2">
                    <Alink url={`https://${post.domain}`} title={post.domain} />
                  </span>
                </h4>
              </div>
              <div className="story-info d-flex flex-column flex-md-row align-items-md-center">
                <div className="d-flex post-info">
                  <span className="">
                    <i
                      className="fas fa-comments"
                      style={{
                        fontSize: "10px",
                        marginTop: "16px",
                        padding: "0px",
                        marginRight: "2px",
                        color: "#d3d3d3",
                      }}
                    />

                    <span>{`${post.comments_count}`} Comments</span>
                  </span>
                  <span className="">
                    <i
                      className="fas fa-clock"
                      style={{
                        fontSize: "10px",
                        marginTop: "16px",
                        padding: "0px",
                        marginRight: "2px",
                        color: "#d3d3d3",
                      }}
                    />
                    {`${post.time_ago}`}
                  </span>
                </div>
                <div>
                  <span className="user">
                    Submitted by{" "}
                    <Alink
                      url={`https://news.ycombinator.com/user?id=${post.user}`}
                      title={post.user}
                    />
                  </span>
                </div>
              </div>
            </div>

            <div className="card-body">
              <h4>Comments</h4>
              <ul>
                {post.comments &&
                  post.comments.map((Parentcomment) => (
                    <Comments
                      key={Parentcomment.id}
                      comment={Parentcomment}
                      type="parent"
                    />
                  ))}
              </ul>
            </div>
          </div>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};
function Comments({ comment }) {
  const [showChildren, setShowChildren] = useState(true);

  // this causes the data to check if there are more "children" comments under
  // the current comment. If there are then is recursively renders more of this
  // same component below the one we originally called and if not renders nothing
  const nestedComments = (comment.comments || []).map((Childcomment) => {
    return (
      <ul>
        {" "}
        <Comments key={Childcomment.id} comment={Childcomment} type="child" />
      </ul>
    );
  });

  return (
    // this margin causes the recursive nested comments to indent so
    // the user can see the thread

    <li>
      <div
        style={{ display: "inline", fontWeight: "bold", fontSize: "large" }}
        onClick={() => setShowChildren(!showChildren)}
      >
        {showChildren ? (
          <i className="fas fa-caret-down comment-icons"></i>
        ) : (
          <i className="fas fa-caret-up comment-icons"></i>
        )}

        <span className="comment-user">
          <Alink
            url={`https://news.ycombinator.com/user?id=${comment.user}`}
            title={comment.user}
          />
        </span>
        <span style={{ fontSize: "10pt", color: "#9d9ca0" }}>
          {comment.time_ago}
        </span>
      </div>
      {/* this left border is the line that connects the comments on the same level in the thread */}
      {showChildren && (
        <div
          style={{
            marginTop: "2px",
            borderLeft: "2px solid #cadbce",
            marginLeft: "4px",
            position: "relative",
          }}
        >
          {/* this next line is the invisible div next to the left border that will collapse the comment thread when clicked */}
          <div
            style={{
              width: "15px",
              float: "left",
              position: "absolute",
              top: "0",
              bottom: "0",
            }}
            onClick={() => {
              setShowChildren(!showChildren);
            }}
          />
          {/* outputs the comment text in the HTML format in which it was saved. this is the main comment */}
          <div
            className="commentDiv"
            dangerouslySetInnerHTML={{ __html: comment.content }}
          />
          {/* display any nested comments */}
        </div>
      )}
      {nestedComments}
    </li>
  );
}

export default Post;
