import React, { useState, useEffect } from "react";

const Matches = () => {
  const [languages, setLanguages] = useState([
    "python",
    "javascript",
    "java",
    "html",
  ]);
  const [repos, setRepos] = useState([]);
  useEffect(() => {
    const handleSearch = async () => {
      const languageRepos = [];

      for (const language of languages) {
        const url = `https://api.github.com/search/repositories?q=language:${language}+good-first-issues:>3&sort=stars&order=desc`;

        const response = await fetch(url);
        const data = await response.json();
        languageRepos.push(...data.items);
      }

      setRepos(languageRepos);
      console.log(languageRepos);
    };

    handleSearch();
  }, [languages]);
  return (
    <div className="flex justify-center min-h-screen">
      <div className="flex flex-col gap-5 mt-12 w-9/12">
        <p className="font-semibold text-xl text-secondary">Top Matches</p>
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>Match Score</th>
                <th>Project Name</th>
                <th>
                  <i class="fa-solid fa-star"></i>
                </th>
                <th>
                  <i class="fa-solid fa-code-fork"></i>
                </th>
                <th>Tags</th>
              </tr>
            </thead>
            <tbody>
              {repos.map((repo, index) => {
                const matchScore = Math.floor(Math.random() * 36) + 65; // generate a random number between 65 and 100
                return (
                  <tr key={repo.id}>
                    <th>{index + 1}</th>
                    <th>
                      <div
                        className="radial-progress text-primary"
                        style={{ "--value": matchScore, "--size": "3rem" }}
                      >
                        {matchScore}
                      </div>
                    </th>
                    <td>
                      {repo.full_name.length > 30
                        ? repo.full_name.slice(0, 30) + "..."
                        : repo.full_name}{" "}
                      &nbsp;
                      <a href={repo.html_url} target="_blank">
                        <i class="fa-solid fa-arrow-up-right-from-square"></i>
                      </a>
                    </td>
                    <td>{repo.stargazers_count}</td>
                    <td>{repo.forks}</td>
                    <td>
                      {repo.topics.map(
                        (topic, index) =>
                          index < 5 && (
                            <span
                              key={index}
                              className="badge badge-accent mx-2"
                            >
                              {topic.length > 30
                                ? topic.slice(0, 30) + "..."
                                : topic}
                            </span>
                          )
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Matches;
