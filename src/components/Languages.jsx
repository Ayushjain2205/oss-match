import React, { useEffect, useState } from "react";
import { Treemap } from "@ant-design/plots";

const Languages = ({ username }) => {
  const [languages, setLanguages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLanguages() {
      try {
        const reposUrl = `https://api.github.com/users/${username}/repos`;
        const reposResponse = await fetch(reposUrl);
        const repos = await reposResponse.json();

        // Retrieve languages for each repository and count them
        const languageCounts = {};
        for (const repo of repos) {
          const languagesUrl = repo.languages_url;
          const languagesResponse = await fetch(languagesUrl);
          const repoLanguages = await languagesResponse.json();

          for (const language in repoLanguages) {
            if (language in languageCounts) {
              languageCounts[language] += repoLanguages[language];
            } else {
              languageCounts[language] = repoLanguages[language];
            }
          }
        }

        // Convert the language counts object to an array of language objects
        const languageArray = Object.keys(languageCounts).map((language) => ({
          name: language,
          count: languageCounts[language],
        }));

        // Sort the language array by count in descending order
        languageArray.sort((a, b) => b.count - a.count);

        setLanguages(languageArray);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    }

    fetchLanguages();
  }, [username]);
  if (loading) {
    return <p>Loading...</p>;
  }

  const children = [];

  languages
    .slice(0, 10)
    .map((language) =>
      children.push({ name: language.name, value: language.count })
    );

  console.log(children);

  const data = {
    name: "root",
    children: children,
  };
  const config = {
    data,
    colorField: "name",
  };
  return (
    <div>
      <Treemap {...config} />
    </div>
  );
};

export default Languages;
