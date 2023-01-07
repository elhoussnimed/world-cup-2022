const apiToken = "71a79fd775b0727d7373c87fee9da21c";
const apiUrl = "https://v3.football.api-sports.io/";
const groupsContainer = document.querySelector(".groups-list");

async function getGroups() {
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
      `${apiUrl}standings?league=1&season=2022`,
      requestOptions
    );
    const data = await response.json();
    const groups = data.response[0].league.standings;
    console.log(groups);

    groupsContainer.innerHTML = "";

    groups.forEach((group) => {
      const groupParent = document.createElement("div");
      groupParent.classList.add("group");
      groupParent.classList.add("p-2");
      groupParent.classList.add("border");
      groupParent.classList.add("border-2");
      const groupName = group[0].group;
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

      group.forEach((team) => {
        const {
          all: { played, win, draw, lose },
          points,
          team: { logo, name: teamName },
        } = team;
        const teamInfo = `
          <div class="team d-flex w-auto gap-1 gap-md-2 mb-2">
              <p class="team-name d-flex align-items-center justify-content-start gap-2 text-capitalize text-center p-2 mb-0"> 
                  <img src="${logo}" alt=""> 
              ${teamName}
              </p>
              <p class="text-capitalize text-center p-2 mb-0">${played}</p>
              <p class="text-capitalize text-center p-2 mb-0">${win}</p>
              <p class="text-capitalize text-center p-2 mb-0">${draw}</p>
              <p class="text-capitalize text-center p-2 mb-0">${lose}</p>
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
