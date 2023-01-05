const apiToken = "71a79fd775b0727d7373c87fee9da21c";
const apiUrl = "https://v3.football.api-sports.io/";
const teamsContainer = document.querySelector(".teams .teams-list");

async function getTeams() {
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
      `${apiUrl}teams?league=1&season=2022`,
      requestOptions
    );
    const data = await response.json();
    const teams = data.response;
    teamsContainer.innerHTML = "";

    teams.forEach((team) => {
      const {
        team: { name, founded, logo },
        venue: { name: stadeName, city, capacity },
      } = team;
      const teamInfo = `
            <div class="team">
                <div class="team-img w-100">
                    <img src="${logo}" alt="">
                </div>
                <div class="team-infos p-2">
                    <div class="name d-flex align-items-center gap-2 text-capitalize">
                        <p class="m-0 p-1 text-dark">name:</p>
                        <p class="m-0 p-1">${name}</p>
                    </div>
                    <div class="founded d-flex align-items-center gap-2 text-capitalize">
                        <p class="m-0 p-1 text-dark">founded:</p>
                        <p class="m-0 p-1">${founded}</p>
                    </div>
                    <div class="stade d-flex align-items-center gap-2 text-capitalize">
                        <p class="m-0 p-1 text-dark">stadium:</p>
                        <p class="m-0 p-1">${stadeName}</p>
                    </div>
                    <div class="city d-flex align-items-center gap-2 text-capitalize">
                        <p class="m-0 p-1 text-dark">city:</p>
                        <p class="m-0 p-1">${city}</p>
                    </div>
                    <div class="capacity d-flex align-items-center gap-2 text-capitalize">
                        <p class="m-0 p-1 text-dark">capacity:</p>
                        <p class="m-0 p-1">${capacity}</p>
                    </div>
                </div>
            </div>
            `;
      teamsContainer.innerHTML += teamInfo;
    });
  } catch (error) {
    console.log("error", error);
  }
}

getTeams();
