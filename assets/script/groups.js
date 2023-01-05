const apiToken = "54749a0b749540f1b2fe2f49f0121674";
const apiUrl = "https://api.football-data.org/v4/competitions/2000/standings";
const groupsContainer = document.querySelector(".groups-list");

async function getGroups() {
  try {
    const requestOption = {
      headers: {
        method: "GET",
        "X-Auth-Token": apiToken,
      },
      redirect: "follow",
      mode: "no-cors",
    };

    const response = await fetch(apiUrl, requestOption);
    const data = await response.json();
    const groups = data.standings;
    console.log(groups);

    groupsContainer.innerHTML = "";
    groups.forEach((group) => {
      const { group: groupName, table } = group;
      const groupParent = document.createElement("div");
      groupParent.classList.add("group");
      groupParent.classList.add("p-2");
      groupParent.classList.add("border");
      groupParent.classList.add("border-2");
      const groupInfo = `
                    <div class="group-name mb-2 fs-5 text-capitalize text-center">${groupName}</div>
                    <div class="group-head d-flex w-auto gap-1 gap-md-2 mb-2">
                        <p class="team-name d-flex align-items-center justify-content-start gap-2 text-capitalize text-center p-2 mb-0">team</p>
                        <p class="text-capitalize text-center p-2 mb-0">p</p>
                        <p class="text-capitalize text-center p-2 mb-0">w</p>
                        <p class="text-capitalize text-center p-2 mb-0">d</p>
                        <p class="text-capitalize text-center p-2 mb-0">l</p>
                        <p class="text-capitalize text-center p-2 mb-0">pts</p>
                    </div>
                `;

      groupParent.innerHTML += groupInfo;

      table.forEach((team) => {
        const {
          draw,
          lost,
          playedGames,
          points,
          won,
          team: { crest, tla },
        } = team;
        const teamInfo = `
                <div class="team d-flex w-auto gap-1 gap-md-2 mb-2">
                    <p class="team-name d-flex align-items-center justify-content-start gap-2 text-capitalize text-center p-2 mb-0"> 
                        <img src="${crest}" alt=""> 
                    ${tla}
                    </p>
                    <p class="text-capitalize text-center p-2 mb-0">${playedGames}</p>
                    <p class="text-capitalize text-center p-2 mb-0">${won}</p>
                    <p class="text-capitalize text-center p-2 mb-0">${draw}</p>
                    <p class="text-capitalize text-center p-2 mb-0">${lost}</p>
                    <p class="text-capitalize text-center p-2 mb-0">${points}</p>
                    </div>
                    `;
        groupParent.innerHTML += teamInfo;
      });
      groupsContainer.append(groupParent);
    });
  } catch (error) {
    console.log("error", error);
  }
}

getGroups();
