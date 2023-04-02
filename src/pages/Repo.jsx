import React from "react";
import { useLocation } from "react-router-dom";

import RepoLanguages from "../components/RepoLanguages";
import Contributors from "../components/Contributors";
import Issues from "../components/Issues";

const Repo = () => {
  const location = useLocation();
  console.log(location.state.details);
  const repoDetails = location.state.details;
  return (
    <div className="flex justify-center min-h-screen">
      <div className="flex flex-col gap-5 mt-12 w-9/12">
        <div className="flex justify-around w-full h-[100px] rounded-lg bg-neutral align-center">
          <div className="flex items-center">
            <img
              className="mask mask-hexagon h-[75px]"
              src={repoDetails.owner.avatar_url}
            />

            <p className="font-semibold text-xl text-secondary ">
              &nbsp; {repoDetails.full_name}
            </p>
          </div>
          <div className="flex items-center">
            <span className="badge badge-accent mx-2">
              {repoDetails.language}
            </span>
          </div>
          <div className="flex items-center">
            <p className="font-semibold text-xl text-secondary">
              <i class="fa-solid fa-circle-exclamation"></i>&nbsp;
              {repoDetails.open_issues}
            </p>
          </div>
          <div className="flex items-center">
            <p className="font-semibold text-xl text-secondary">
              <i class="fa-solid fa-eye"></i>&nbsp;
              {repoDetails.watchers_count}
            </p>
          </div>
          <div className="flex items-center">
            <p className="font-semibold text-xl text-secondary">
              <i class="fa-solid fa-code-fork"></i>&nbsp;
              {repoDetails.forks}
            </p>
          </div>
        </div>
        <div className="flex gap-10">
          <div className=" w-2/5 h-[450px] rounded-lg bg-neutral align-center">
            <p className="mx-12 my-2 font-semibold text-xl text-secondary">
              Top Languages
            </p>
            <RepoLanguages languageURL={repoDetails.languages_url} />
          </div>
          <div className=" w-3/5 h-[450px] rounded-lg bg-neutral align-center">
            <p className="mx-12 my-2 font-semibold text-xl text-secondary">
              Top Contributors
            </p>
            <Contributors contributorsURL={repoDetails.contributors_url} />
          </div>
        </div>
        <div className="flex gap-10">
          <Issues issueURL={repoDetails.url + "/issues"} />
        </div>
      </div>
    </div>
  );
};

export default Repo;
