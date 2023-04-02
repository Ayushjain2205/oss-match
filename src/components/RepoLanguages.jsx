import React, { useEffect, useState } from "react";
import { Treemap } from "@ant-design/plots";

const RepoLanguages = ({ languageURL }) => {
  const [languages, setLanguages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLanguages() {
      try {
        const reposResponse = await fetch(languageURL);
        const repos = await reposResponse.json();

        const languageList = Object.keys(repos).map((key) => ({
          name: key,
          value: repos[key],
        }));
        setLanguages(languageList);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    }
    fetchLanguages();
  }, [languageURL]);

  if (loading) {
    return <p>Loading...</p>;
  }

  const data = {
    name: "root",
    children: languages,
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

export default RepoLanguages;
