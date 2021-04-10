import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Navigation from "../components/Navigation";
import Header from "../components/Headers";
import Post from "../components/post";
import ShowStories from "../components/ShowStories";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <div className="container">
        <Header />
        <Navigation />

        <Switch>
          <Route path="/" render={() => <Redirect to="/news" />} exact={true} />

          <Route
            path="/:type"
            render={({ match }) => {
              const { type } = match.params;

              if (!["news", "news?page={1-10}"].includes(type)) {
                //  return <Redirect to="/:post_id" />;

                return <Post></Post>;
              }
              return <ShowStories type={type} />;
            }}
          />
          <Route path="/:post_id" component={Post} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default AppRouter;
