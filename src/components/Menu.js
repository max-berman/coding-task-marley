import React, { useState } from "react";

import { Link } from "react-router-dom";

function Menu({ recipes }) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchString, setSearchString] = useState("");
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  function handleOnClick() {
    setIsOpen(!isOpen);
  }
  function handleSearchResultOnClick() {
    setFilteredRecipes([]);
    setSearchString("");
    setIsOpen(!isOpen);
  }

  function handleFilterChange({ target: { value } }) {
    const filteredDatabyTitle = recipes.filter(({ title }) =>
      title.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredRecipes(value ? filteredDatabyTitle : []);
    setSearchString(value);
  }
  return (
    <nav>
      <div
        className={`burger ${isOpen ? "open" : ""}`}
        onClick={handleOnClick}
      />

      <div className={`sideMenu ${isOpen ? "open" : ""}`}>
        <header>Menu</header>
        <dl>
          <dt>
            <input
              placeholder="Search Marley"
              value={searchString}
              onChange={handleFilterChange}
            />
          </dt>
          {filteredRecipes.map(({ title, id }) => {
            return (
              <dd key={id}>
                <Link to={`/${id}`} onClick={handleSearchResultOnClick}>
                  {title}
                </Link>
              </dd>
            );
          })}
        </dl>
        <ul>
          <li>
            <Link to="/" onClick={handleOnClick}>
              All Recipes
            </Link>
          </li>
          {recipes.map(({ tags }) => {
            return tags.map((tag, i) => (
              <li key={tag} onClick={handleOnClick}>
                <Link to={`/tag/${tag}`}>{tag}</Link>
              </li>
            ));
          })}
        </ul>
      </div>
    </nav>
  );
}

export default Menu;
