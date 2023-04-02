import React, { useState, useEffect } from "react";

const Contributors = ({ contributorsURL }) => {
  const [contributors, setContributors] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function fetchContributors() {
      try {
        const reposResponse = await fetch(contributorsURL);
        const contributorsResponse = await reposResponse.json();
        setContributors(contributorsResponse);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    }
    fetchContributors();
  }, [contributorsURL]);

  if (loading) {
    return <p>Loading...</p>;
  }
  return (
    <div className="mx-12 my-6 grid grid-rows-4 grid-flow-col gap-4">
      {contributors.map((contributor) => (
        <div className="tooltip" data-tip={contributor.contributions}>
          <img
            className="mask mask-hexagon h-[50px]"
            src={contributor.avatar_url}
            alt="avatar"
          />
        </div>
      ))}
    </div>
  );
};

export default Contributors;
