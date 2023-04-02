import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Issues = ({ issueURL }) => {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLanguages() {
      try {
        const issueRespone = await fetch(
          issueURL + "?state=open&labels=good%20first%20issue"
        );
        const issues = await issueRespone.json();
        setIssues(issues);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    }
    fetchLanguages();
  }, [issueURL]);

  if (loading) {
    return <p>Loading...</p>;
  }
  return (
    <div>
      <p className="font-semibold text-xl text-secondary mb-4">
        Top issues for you
      </p>
      <table className="table table-zebra w-full">
        <thead>
          <tr>
            <th></th>
            <th>Match Score</th>
            <th>Project Name</th>
            <th>
              <i class="fa-solid fa-comments"></i>
            </th>
            <th>
              <i class="fa-solid fa-users"></i>
            </th>
            <th>Tags</th>
          </tr>
        </thead>
        <tbody>
          {issues.map((issue, index) => {
            console.log(issue);
            const matchScore = Math.floor(Math.random() * 36) + 65; // generate a random number between 65 and 100
            return (
              <tr>
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
                  {issue.title.length > 60
                    ? issue.title.slice(0, 60) + "..."
                    : issue.title}{" "}
                  &nbsp;
                  <a href={issue.html_url} target="_blank">
                    <i class="fa-solid fa-arrow-up-right-from-square"></i>
                  </a>
                </td>
                <td>{issue.comments}</td>
                <td>{issue.comments}</td>
                <td>
                  {issue.labels.map(
                    (topic, index) =>
                      index < 5 && (
                        <span key={index} className="badge badge-accent mx-2">
                          {topic.name}
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
  );
};

export default Issues;
