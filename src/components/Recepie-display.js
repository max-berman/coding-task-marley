import React, { useState } from "react";
import { Link } from "react-router-dom";

function Iframe(props) {
  return <iframe {...props} title={props.title} />;
}

function RecipeDisplay({
  recepie: { title, chef, id, tags, description, url, video }
}) {
  const [showModal, setShowModal] = useState(false);

  function handleOnClick() {
    setShowModal(!showModal);
  }

  return (
    <section className="recipe">
      <div className="card">
        <h2>
          <span>{title}</span>
        </h2>
        <img src={url} alt={title} />

        <p>{description}</p>
        {tags.length > 0 && (
          <ul className="tags">
            {tags.map((tag, i) => (
              <li key={i}>
                <Link to={`/tag/${tag}`}>{tag}</Link>
              </li>
            ))}
          </ul>
        )}
        {chef && <strong>{chef}</strong>}
        <Link className="close" to="/">
          ×
        </Link>
        {video !== null && (
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <div onClick={handleOnClick} className="play">
              Play Video
            </div>
          </div>
        )}
      </div>
      {video !== null && showModal && (
        <div className="modalOn close" onClick={handleOnClick}>
          ×
        </div>
      )}
      {video !== null && showModal && (
        <div className="modal">
          <Iframe
            src={`https://www.youtube.com/embed/${video}`}
            title={title}
            style={{ border: 0, width: "100%", height: "100%" }}
          />
        </div>
      )}
    </section>
  );
}

export default RecipeDisplay;
