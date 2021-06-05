import getData from "@utils/getData.js";
// LOADERS DE IMAGENES, colocando un hash en la img y moviendo a dist, al tener la regla en webpack config.
import twitter from "@images/twitter.png";
import github from "@images/github.png";
import instagram from "@images/instagram.png";
import { indexOf } from "lodash";

const Template = async () => {
  const data = await getData();
  const view = `
    <div class="About">
      <div class="card">
        <div class="card_details">
          <div class="card_photo center circle">
            <img src="${data.photo}" alt="${data.name}">
            <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" style="enable-background:new -580 439 577.9 194;"
              xml:space="preserve">
              <circle cx="50" cy="50" r="40" />
            </svg>
          </div>
          <p class="card_title">Hi, My name is</p>
          <p class="card_value">${data.name.slice(
            0,
            indexOf(" ")
          )} ${data.name.slice(-1, indexOf(" "))}</p>
        </div>
        <div class="card_userdata">
          <ul>
            <li>${data.born}</li>
            <li>${data.gender}</li>
            <li>${data.status}</li>
          </ul>
        </div>
        <div class="card_social">
          <a href="https://twitter.com/gndx">
            <img src="${twitter}" />
          </a>
          <a href="https://github.com/gndx">
            <img src="${github}" />
          </a>
          <a href="https://instagram.com/gndx">
            <img src="${instagram}" />
          </a>
        </div>
      </div>
    </div>
  `;
  return view;
};

export default Template;
