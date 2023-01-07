const apiToken = "71a79fd775b0727d7373c87fee9da21c";
const apiUrl = "https://v3.football.api-sports.io/";
const matchesContainer = document.querySelector(".matches .matches-list");

async function getMatches() {
  try {
    const requestHeaders = {
      "X-RapidAPI-Key": apiToken,
      "X-RapidAPI-Host": apiUrl,
    };

    const requestOptions = {
      method: "GET",
      headers: requestHeaders,
      redirect: "follow",
    };

    const response = await fetch(
      `${apiUrl}fixtures?league=1&season=2022`,
      requestOptions
    );
    const data = await response.json();
    const matches = data.response;

    matchesContainer.innerHTML = "";

    matches.forEach((match) => {
      const {
        fixture: {
          date,
          venue: { name: stadiumName },
        },
        league: { round },
        score: {
          fulltime: { home: fullTimeHome, away: fullTimeAway },
          extratime: { home: extraTimeHome, away: extraTimeAway },
          penalty: { home: penaltyHome, away: penaltyAway },
        },
        teams: {
          home: { name: homeTeamName, logo: homeTeamLogo },
          away: { name: awayTeamName, logo: awayTeamLogo },
        },
      } = match;

      // get the match time
      let hour = new Date(date).getHours();
      let minute = new Date(date).getMinutes();
      if (hour < 10) {
        hour = `0${hour}`;
      }
      if (minute < 10) {
        minute = `0${minute}`;
      }
      let matchTime = `${new Date(date).getDate() + 1}/${
        new Date(date).getMonth() + 1
      }/${new Date(date).getFullYear()}_${hour}:${minute}`;

      let stage = round.split(" ").slice(0, 1);

      const matchInfo = `
        <div class="match p-2 rounded-2" data-round=${stage}>
          <div class="match-teams d-flex justify-content-between align-items-center py-1 text-capitalize">
            <div class="team-1 text-center">
                <div class="team-1-flag">
                    <img src="${homeTeamLogo}" class="w-100 h-100" alt="">
                </div>
                <p>${homeTeamName}</p>
            </div>
          <div class="result-fulltime fs-3 text-light">${fullTimeHome}-${fullTimeAway}</div>
            <div class="team-2 text-center">
                <div class="team-2-flag">
                    <img src="${awayTeamLogo}" class="w-100 h-100" alt="">
                </div>
                <p>${awayTeamName}</p>
            </div>
          </div>
          <div class="result-extratime text-center text-capitalize">
            <p class="mb-0">extra-time</p>
            <p class="mb-0 text-light">${
              extraTimeHome === null ? "-" : extraTimeHome
            }-${extraTimeAway === null ? "-" : extraTimeAway}</p>
          </div>
          <div class="result-penalty text-center text-capitalize">
            <p class="mb-0">penalty</p>
            <p class="mb-0 text-light">${
              penaltyHome === null ? "-" : penaltyHome
            }-${penaltyAway === null ? "-" : penaltyAway}</p>
          </div>
          <div class="match-infos text-center text-capitalize">
            <p class="match-time mb-0">${matchTime}</p>
            <p class="round mb-0">${round}</p>
            <p class="round mb-0">${stadiumName}</p>
          </div>
        </div>
      `;
      matchesContainer.innerHTML += matchInfo;
    });
  } catch (error) {
    console.log(error);
  }
  filterMatches();
}

getMatches();

async function filterMatches() {
  const filters = document.querySelectorAll(".filter");
  const matches = [...document.querySelectorAll(".match")];
  filters.forEach((filter) => {
    // add active class to active filter
    filter.addEventListener("click", () => {
      filters.forEach((filter) => filter.classList.remove("active"));
      filter.classList.add("active");
      // filter matches
      matchesContainer.innerHTML = "";
      const round = filter.dataset.round;
      const filtredMatches = matches.filter(
        (match) => match.dataset.round === round
      );
      filtredMatches.forEach((match) => {
        matchesContainer.append(match);
      });
      if (filter.dataset.round === "all") {
        matches.forEach((match) => {
          matchesContainer.append(match);
        });
      }
    });
  });
}
