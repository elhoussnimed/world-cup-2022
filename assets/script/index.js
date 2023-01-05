const navbar = document.querySelector(".navbar");
const hero = document.querySelector(".hero");
const scorersContainer = document.querySelector(".scorers .players");

window.onresize = () => {
  setHeroHeightDynamic();
};

if (window.width > 768) {
  setHeroHeightDynamic();
}

function setHeroHeightDynamic() {
  const heroHeight = window.innerHeight - navbar.clientHeight;
  hero.style.height = `${heroHeight}px`;
}

// add the map with markers to the dom
function setMap() {
  let mapZoom = 9.5;
  if (window.innerWidth < 768) {
    mapZoom = 8.5;
  }

  const map = L.map("map").setView([25.4209, 51.4903], mapZoom);

  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);

  addMarkersToMap(map);
}
setMap();

function addMarkersToMap(map) {
  const lusailStadium = L.marker([25.42086, 51.49043]).addTo(map);
  const alBaytStadium = L.marker([25.6521, 51.4878]).addTo(map);
  const al974Stadium = L.marker([25.2886, 51.5664]).addTo(map);
  const ahmadBinAliStadium = L.marker([25.3295, 51.3424]).addTo(map);
  const alJanoubStadium = L.marker([25.1596, 51.5742]).addTo(map);
  const alThumamaStadium = L.marker([25.2353, 51.5321]).addTo(map);
  const educationCityStadium = L.marker([25.3108, 51.4245]).addTo(map);
  const khalifaInternationalStadium = L.marker([25.2636, 51.4483]).addTo(map);

  lusailStadium.bindPopup(
    "<b>Lusail Stadium</b><p class='text-center'>80.000 Seats</p>"
  );
  alBaytStadium.bindPopup(
    "<b>Al Bayt Stadium</b><p class='text-center'>60.000 Seats</p>"
  );
  al974Stadium.bindPopup(
    "<b>974 Stadium</b><p class='text-center'>40.000 Seats</p>"
  );
  ahmadBinAliStadium.bindPopup(
    "<b>Ahmad Bin Ali Stadium</b><p class='text-center'>40.000 Seats</p>"
  );
  alJanoubStadium.bindPopup(
    "<b>Al Janoub Stadium</b><p class='text-center'>40.000 Seats</p>"
  );
  alThumamaStadium.bindPopup(
    "<b>Al Thumama Stadium</b><p class='text-center'>40.000 Seats</p>"
  );
  educationCityStadium.bindPopup(
    "<b>Education City Stadium</b><p class='text-center'>40.000 Seats</p>"
  );
  khalifaInternationalStadium.bindPopup(
    "<b>Khalifa International Stadium</b><p class='text-center'>40.000 Seats</p>"
  );
}

// add animation to hero section
function animateHeroSection() {
  const timeLine = gsap.timeline({ defaults: { duration: 0.5 } });

  timeLine.from(".hero .logo", { opacity: 0, scale: 0 });
  timeLine.from(".hero .word", { bottom: -100, opacity: 0 });
  timeLine.from(".hero .hero-text", { scale: 0, opacity: 0 });
}
animateHeroSection();

// animation for winner section on scroll
function animateWinners() {
  const timeLine = gsap.timeline();
  const winners = document.querySelectorAll(".winners-container .winner");

  timeLine.staggerTo(winners, 0.5, { opacity: 1, scale: 1, bottom: 0 }, 0.25);
}

window.addEventListener("scroll", () => {
  const winnersTop = document.querySelector(".winners").offsetTop;
  if (window.scrollY >= winnersTop - 150) {
    animateWinners();
  }
});

// get top scorers

async function getTopScorers() {
  try {
    const requestOptions = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "71a79fd775b0727d7373c87fee9da21c",
        "X-RapidAPI-Host": "v3.football.api-sports.io",
      },
      redirect: "follow",
    };

    const response = await fetch(
      "https://v3.football.api-sports.io/players/topscorers?league=1&season=2022",
      requestOptions
    );
    const data = await response.json();
    const scorers = data.response;
    console.log(scorers);

    scorersContainer.innerHTML = "";
    scorers.forEach((scorer) => {
      const {
        player: { firstname, lastname, photo },
        statistics,
      } = scorer;
      const {
        goals: { total, assists },
        team: { name: teamName },
      } = statistics[0];
      const playerName = `${firstname.split(" ").slice(0, 1)} ${lastname
        .split(" ")
        .slice(0, 1)}`;

      const player = `
      <div class="player ">
          <div class="player-img">
              <img src="${photo}" class="w-100 h-100" alt="${playerName}">
          </div>
          <div class="player-infos p-2">
              <p class="player-name text-center text-capitalize p-2 mb-2 fs-5">${playerName}</p>
              <div class="statistics d-flex justify-content-between align-items-center">
                  <div class="assist p-2 text-center text-capitalize">
                      <p class="text-light">assists</p>
                      <p class="fs-5">${assists || 0}</p>
                  </div>
                  <div class="goals p-2 text-center text-capitalize">
                      <p class="text-light">goals</p>
                      <p class="fs-5">${total}</p>
                  </div>
                  <div class="team p-2 text-center text-capitalize">
                      <p class="text-light">team</p>
                      <p class="fs-5">${teamName}</p>
                  </div>
              </div>
          </div>
        </div>
        `;
      scorersContainer.innerHTML += player;
    });
  } catch (error) {
    (error) => console.log("error", error);
  }
}

getTopScorers();

// animate scorers section on scroll
window.addEventListener("scroll", () => {
  const scorerTop = document.querySelector(".scorers").offsetTop;
  if (window.scrollY >= scorerTop - 250) {
    animateScorers();
  }
});

async function animateScorers() {
  const timeLine = gsap.timeline();

  timeLine.staggerTo(
    ".scorers .players .player",
    0.7,
    { bottom: 0, opacity: 1 },
    0.2
  );
}
