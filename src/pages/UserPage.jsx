import React, { useEffect, useState } from "react";

const UserPage = ({ userDetails }) => {
  const [userData, setUserData] = useState({});
  const [events, setEvents] = useState([]);
  const username = userDetails.user_metadata.preferred_username;

  async function getEvents(username) {
    const events = [];
    let page = 1;

    do {
      const url = `https://api.github.com/users/${username}/events?page=${page}`;
      var body = await fetch(url).then((res) => res.json());
      page++;
      events.push(...body);
    } while (!body.length);

    return events;
  }

  useEffect(() => {
    async function fetchEvents() {
      try {
        const data = await getEvents(username);
        setEvents(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    }

    fetchEvents();
  }, [username]);

  useEffect(() => {
    fetch(`https://api.github.com/users/${username}`)
      .then((response) => response.json())
      .then((data) => {
        setUserData(data);
        console.log(data);
      });
  }, [username]);
  return (
    <div className="flex justify-center min-h-screen">
      <div className="flex flex-col gap-5 mt-12 w-9/12">
        <div className="flex justify-around w-full h-[100px] rounded-lg bg-neutral align-center">
          <div className="flex items-center gap-10">
            <img
              className="mask mask-hexagon h-[75px]"
              src={userDetails.user_metadata.avatar_url}
            />
            <p className="font-semibold text-xl text-secondary ">
              @{userDetails.user_metadata.preferred_username}
            </p>
          </div>
          <div className="flex items-center">
            <p className="font-semibold text-xl text-secondary">
              <i class="fa-regular fa-file-code"></i>&nbsp;
              {userData && userData.public_repos}
            </p>
          </div>
          <div className="flex items-center gap-10">
            <p className="font-semibold text-xl text-secondary">
              <i class="fa-solid fa-users"></i>&nbsp;
              {userData && userData.followers}
            </p>
          </div>
        </div>
        <div className=" w-3/5 h-[400px] rounded-lg bg-neutral align-center">
          {events && (
            <div className="flex flex-col justify-between ">
              <p className="mx-12 my-2 font-semibold text-xl text-secondary ">
                Total Events: {events.length}
              </p>
              <p className="mx-12 my-2 font-semibold text-xl text-secondary ">
                Pull Requests:{" "}
                {
                  events.filter((event) => event.type === "PullRequestEvent")
                    .length
                }
              </p>
              <p className="mx-12 my-2 font-semibold text-xl text-secondary ">
                Forks:{" "}
                {events.filter((event) => event.type === "ForkEvent").length}
              </p>
              <p className="mx-12 my-2 font-semibold text-xl text-secondary ">
                Open Issues:{" "}
                {events.filter((event) => event.type === "IssuesEvent").length}
              </p>
              <p className="mx-12 my-2 font-semibold text-xl text-secondary ">
                Reviews:{" "}
                {
                  events.filter(
                    (event) => event.type === "PullRequestReviewEvent"
                  ).length
                }
              </p>
              <img
                src={`https://ghchart.rshah.org/${username}`}
                alt="Name Your Github chart"
                className="mt-6 w-4/5 self-center"
              ></img>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserPage;
