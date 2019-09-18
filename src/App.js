import React, { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import RecepiesList from "./components/Recepies-list";
import RecipeDisplay from "./components/Recepie-display";
import Menu from "./components/Menu";
import DataFetcher from "./services/Data-fetcher";

import "./styles/App.css";

function AppRouter() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [errors, setErrors] = useState(null);
  const [data, setData] = useState([]);

  const stateProps = {
    setIsLoaded,
    setErrors,
    setData
  };

  return (
    <Router>
      <DataFetcher {...stateProps} />
      {errors ? (
        <div className="error status">
          <span>{errors.message}</span>
        </div>
      ) : !isLoaded ? (
        <div className="loading">Loading...</div>
      ) : (
        <div className="primary-content">
          <Menu recipes={data} />
          <Route
            path="/"
            exact
            render={() => <RecepiesList recipes={data} />}
          />
          <Route
            path="/tag/:id"
            recipes={data}
            render={({
              match: {
                params: { id }
              }
            }) => {
              const props_ = {
                recipes: data.filter(({ tags }) => tags.some(tag => tag === id))
              };
              return <RecepiesList {...props_} />;
            }}
          />
          {data.map(recepie => (
            <Route
              key={recepie.id}
              path={`/${recepie.id}`}
              render={() => <RecipeDisplay recepie={recepie} />}
            />
          ))}
        </div>
      )}
    </Router>
  );
}

export default AppRouter;
