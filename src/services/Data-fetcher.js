import { useEffect } from "react";
import { createClient } from "contentful";
import API from "./api.js";
const { space, accessToken } = API;
const client = createClient({ space, accessToken });
const VID_REGEX = /(\?|&)v=([^&#)]+)/;

function DataFetcher({ setIsLoaded, setErrors, setData }) {
  useEffect(() => {
    //Get recipes data.
    client
      .getEntries({
        content_type: "recipe",
        select: "sys.id,fields"
      })
      .then(
        ({ items }) => {
          // Strip out useless information & flatten data structure
          const cleanData = items.map(
            ({
              sys: { id },
              fields: {
                chef,
                tags,
                title,
                description,
                photo: {
                  fields: {
                    file: { url }
                  }
                }
              }
            }) => ({
              id,
              title,
              description,
              url,
              video:
                description.match(VID_REGEX) !== null
                  ? description.match(VID_REGEX)[2]
                  : null,
              chef: chef !== undefined ? chef.fields.name : "Anonimus Cook",
              tags:
                tags !== undefined
                  ? tags.map(({ fields: { name } }) => name)
                  : []
            })
          );
          //console.log(cleanData);
          setData(cleanData);
          setIsLoaded(true);
        },
        error => {
          setErrors(error);
          setIsLoaded(true);
        }
      );
  }, [setData, setErrors, setIsLoaded]);
  return null;
}

export default DataFetcher;
