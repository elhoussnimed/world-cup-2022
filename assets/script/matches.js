const apiToken = "54749a0b749540f1b2fe2f49f0121674";
const apiUrl = "https://api.football-data.org/v4/competitions/2000/matches";
const matchesContainer = document.querySelector(".matches .matches-list");

async function getMatches() {
  try {
    const requestOptions = {
      method: "GET",
      headers: {
        "X-Auth-Token": apiToken,
        "Access-Control-Allow-Origin": "https://elhoussnimed.github.io/world-cup-2022/matches.html",
      },
      redirect: "follow",
    };

    const response = await fetch(apiUrl, requestOptions);
    const data = await response.json();
    const matches = data.matches;

    matchesContainer.innerHTML = "";

    matches.forEach((match) => {
      const {
        awayTeam: { crest: awayTeamLogo, name: awayTeamName },
        homeTeam: { crest: homeTeamLogo, name: homeTeamName },
        score,
        stage,
        utcDate,
      } = match;

      const { duration } = score;
      let fullTimeResult;
      let extraTimeResult;
      let penaltiesResult;

      if (duration === "REGULAR") {
        const {
          fullTime: { home: fullTimeHome, away: fullTimeAway },
        } = score;
        fullTimeResult = `${fullTimeHome}-${fullTimeAway}`;
        extraTimeResult = "---";
        penaltiesResult = "---";
      } else if (duration === "PENALTY_SHOOTOUT") {
        const {
          regularTime: { home: regularTimeHome, away: regularTimeAway },
        } = score;
        const {
          extraTime: { home: extraTimeHome, away: extraTimeAway },
        } = score;
        const {
          penalties: { home: penaltiesHome, away: penaltiesAway },
        } = score;
        fullTimeResult = `${regularTimeHome}-${regularTimeAway}`;
        extraTimeResult = `${extraTimeHome}-${extraTimeAway}`;
        penaltiesResult = `${penaltiesHome}-${penaltiesAway}`;
      }

      // get the match time
      let hour = new Date(utcDate).getHours();
      let minute = new Date(utcDate).getMinutes();
      if (hour < 10) {
        hour = `0${hour}`;
      }
      if (minute < 10) {
        minute = `0${minute}`;
      }
      let matchTime = `${new Date(utcDate).getDate() + 1}/${
        new Date(utcDate).getMonth() + 1
      }/${new Date(utcDate).getFullYear()}_${hour}:${minute}`;

      const matchInfo = `
        <div class="match p-2 rounded-2" data-round=${stage}>
          <div class="match-teams d-flex justify-content-between align-items-center py-1 text-capitalize">
            <div class="team-1 text-center">
                <div class="team-1-flag">
                    <img src="${homeTeamLogo}" class="w-100 h-100" alt="">
                </div>
                <p>${homeTeamName}</p>
            </div>
          <div class="result-fulltime fs-3 text-light">${fullTimeResult}</div>
            <div class="team-2 text-center">
                <div class="team-2-flag">
                    <img src="${awayTeamLogo}" class="w-100 h-100" alt="">
                </div>
                <p>${awayTeamName}</p>
            </div>
          </div>
          <div class="result-extratime text-center text-capitalize">
            <p class="mb-0">extra-time</p>
            <p class="mb-0 text-light">${extraTimeResult}</p>
          </div>
          <div class="result-penalty text-center text-capitalize">
            <p class="mb-0">penalty</p>
            <p class="mb-0 text-light">${penaltiesResult}</p>
          </div>
          <div class="match-infos text-center text-capitalize">
            <p class="match-time mb-0">${matchTime}</p>
            <p class="round mb-0">${stage}</p>
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
