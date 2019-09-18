import React from "react";
import { Link } from "react-router-dom";

function Recepies(props) {
  const { recipes } = props;
  return (
    <div className="home">
      <h1>
        <span>Marley's Top 5 Recipes</span>
      </h1>

      <div className="cards">
        {recipes.map(({ id, title, url }) => {
          return (
            <div key={id} className="card">
              <figure>
                <Link className="more" to={`/${id}`}>
                  Read Full Recipe
                </Link>
                <Link to={`/${id}`}>
                  <img src={url} alt={title} />
                </Link>
                <figcaption>
                  <Link to={`/${id}`}>{title}</Link>
                </figcaption>
              </figure>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Recepies;
