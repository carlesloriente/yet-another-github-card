import graphql from 'https://cdn.skypack.dev/graphql@15.8.0';
import { gql, GraphQLClient } from 'https://cdn.skypack.dev/graphql-request@6.0.0';
import * as constants from './constants.js'
import * as graphQLQueries from './graphql.js';
import yagcStyles from './styles.js';
import stringFormat from './format.js';

let apiRequest, dataCollection, datasetLenght, dataName, dataHref, dataValue, responseLenght, shadowRoot, reposPromise, gistsPromise, totalStars, userName, yagcTheme;

const template = document.createElement('template');

const queryMap = {
  commits: graphQLQueries.COMMITS,
  contributions: graphQLQueries.CONTRIBUTIONS,
  following: graphQLQueries.FOLLOWING,
  stars: graphQLQueries.STARS,
  gist_stars: graphQLQueries.GIST_STARS,
  prs: graphQLQueries.PRS,
  usercard: graphQLQueries.USERCARD
};

const resourceMap = {
  repositories: "https://github.com",
  gists: "https://gist.github.com"
};

const themeMap = {
  cloud: constants.cloud,
  polygon: constants.polygon,
  default: constants.defaultTheme
};

const themeColor = {
  cloud: `filter: invert(41%) sepia(9%) saturate(3861%) hue-rotate(174deg) brightness(92%) contrast(87%)`,
  polygon: `filter: invert(33%) sepia(100%) saturate(785%) hue-rotate(193deg) brightness(97%) contrast(86%)`,
  defaultTheme: `filter: invert(20%) sepia(35%) saturate(718%) hue-rotate(314deg) brightness(94%) contrast(95%)`
};

const faviconMap = {
  generic: `./images/generic.svg`,
  github: `./images/github.svg`,
  helm: `./images/helm.svg`,
  instagram: `./images/instagram.svg`,
  linkedin: `./images/linkedin.svg`,
  npmjs: `./images/npmjs.svg`,
  nuget: `./images/nuget.svg`,
  rubygems: `./images/rubygems.svg`,
  sourceforge: `./images/sourceforge.svg`,
  twitter: `./images/twitter.svg`,
  yarnpkg: `./images/yarnpkg.svg`,
  default: `./images/generic.svg`
};


template.innerHTML = /*html*/ `
  <!-- 
    Created using npm package ${constants.NPM_PKG} ${constants.NPM_VER}
    ${constants.NPM_URL}
  -->
  <style>${yagcStyles}</style>
  <div class="gh-card">
  <div class="cover" style=""></div>
    <div class="wrapper">
      <a href="" target="_blank" class="created_at" rel="noopener"><img src="./images/github-logo.png" border="0" alt="Account since"></a><span class="since">Since <slot name="createdAt">{createdAt}</slot></span>
      <a href="${constants.NPM_URL}" target="_blank" class="info" rel="noopener"><img src="./images/info-logo.svg" border="0" alt="${constants.NPM_PKG}"></a><br>
      <ul id="list-resources"></ul>
      <div class="avatar">
        <img src=""/></slot>
        <div class="stars"><span><slot name="stars">{stars}</span></div>
      </div>
      <h1><a class="name" href="" target="_blank" rel="noopener"><slot name="name">{name}</slot></a></h1>
      <div class="location"><slot name="location">{location}</slot></div>
      <p><slot name="bio">{bio}</slot></p>
      <div class="grid-4">
        <ul id="list-social"></ul>
      </div>
      <div class="footer grid-4">
        <ul id="list-items"></ul>
      </div>
    </div>
  </div>
`;

class githubCard extends HTMLElement {
  static get observedAttributes() {
    return ["data-theme", "data-style"];
  }

  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });
    shadow.appendChild(template.content.cloneNode(true));
  }


  connectedCallback() {
    shadowRoot = document.querySelector('github-card').shadowRoot;

    apiRequest = queryMap['usercard'];
    userName = this.getAttribute('data-user');
    yagcTheme = this.getAttribute('data-style').toString();

    this.changeStyle(yagcTheme);

    this.main(apiRequest)
    .then((response) => {
      responseLenght = Object.keys(response.user).length;
      datasetLenght = Object.keys(constants.GH_DEF_COLLECTION).length;

      for (let i = 0; i < responseLenght; i++) {
        if(response.user.hasOwnProperty(Object.values(constants.GH_DEF_COLLECTION[i]|| {}))) {
          let value = Object.values(constants.GH_DEF_COLLECTION[i]);

          if (Object.values(constants.GH_DEF_COLLECTION[i]) == "createdAt") { 
            shadowRoot.querySelector(`slot[name=${value}`).textContent = response.user[value].substr(0,4);

          } else {
            shadowRoot.querySelector(`slot[name=${value}`).textContent = response.user[value];
          }
        }
      }

      shadowRoot.querySelector(".avatar img").setAttribute("src", response.user["avatarUrl"]);
      shadowRoot.querySelector(".gh-card a.created_at").setAttribute("href", response.user["url"]);
      shadowRoot.querySelector(".name").setAttribute("href", response.user["url"]);

      if (response.user["websiteUrl"]) { this.createListElements("list-social", response.user["websiteUrl"], "blog", null, "link", 30); }

      if (response.user["socialAccounts"]) {
        responseLenght = Object.keys(response.user.socialAccounts.nodes).length;

        for (let i = 0; i < responseLenght; i++) {
          this.createListElements("list-social", response.user.socialAccounts.nodes[i].url, response.user.socialAccounts.nodes[i].provider.toLowerCase(), null, "link", 30);
        }
      }
    })

    .catch((error) => {
      console.log(error);
    });

    dataCollection =  this.getAttribute("data-user-stars").toString();
    if (dataCollection == "true") { 

      this.main(graphQLQueries.STARS)
      .then((response) => {

        totalStars = 0;

        Object.keys(response.user).forEach(key => {
          const childKey = response.user[key];
          this.createListElements("list-resources", `${resourceMap[key]}/${userName}`, key, childKey["totalCount"] + " " + key, "link", 20);
           Object.keys(childKey).forEach(key => {
            const childDescKey = childKey[key];
            Object.keys(childDescKey).forEach(key => {
              totalStars = totalStars += childDescKey[key].stargazerCount;
            });
          });
        });
        shadowRoot.querySelector(`slot[name=stars`).textContent = stringFormat(totalStars);
      })
      
      .catch((error) => {
        console.log(error);
      });
    }

    dataCollection =  this.getAttribute("data-user-stats");
    const userCollection = JSON.parse(dataCollection);
    datasetLenght = Object.keys(userCollection).length;

    for (let i = 0; i < datasetLenght; i++) {
 
      apiRequest = queryMap[userCollection[i].name] || graphQLQueries.FOLLOWERS;

      this.main(apiRequest)
      .then((response) => {
        dataHref = '';
        dataName = userCollection[i].name;
        dataValue = 0
        dataValue = this.getStats(response);
        this.createListElements("list-items", dataHref, dataName.toUpperCase(), stringFormat(dataValue), "text", 25);
      })

      .catch((error) => {
        //console.log(error);
      });
    }
  }


  getStats(obj) {
    const processProperty = (property) => {
      if (property.totalCount || property.totalContributions) {
        dataValue += property.totalCount || property.totalContributions;
      } else if (property instanceof Object) {
        Object.keys(property).forEach((key) => {
          processProperty(property[key]);
        });
      }
    };

    processProperty(obj); // Start processing from the top-level object
    return dataValue;
  }


  getRootDomain(url) {
    if (url) {
      const parsedUrl = new URL(url);
      const hostname = parsedUrl.hostname;
      const hostnameParts = hostname.split('.');

      if (hostnameParts.length < 2) {
        return hostname; // Return the whole hostname if no subdomain
      }

      if (hostnameParts.length === 3 && hostnameParts[0] === 'www') {
        return hostnameParts[1]; // Root domain is the part before "www"
      }
      // Loop through known domains to check for a match
      for (const domain of Object.keys(faviconMap)) {
        if (hostnameParts.includes(domain)) {
          // If a match is found, return the root domain based on its position
          const rootDomainIndex = hostnameParts.indexOf(domain);
          return hostnameParts[rootDomainIndex - 1];
        } else {
          return hostnameParts[hostnameParts.length - 2];
        }
      }
      return hostnameParts[hostnameParts.length - 2]; // Default root domain (second-to-last element)
    }
  }


  async createListElements(parentId, href, name, value = 0, type, size = 16) {
    const shadowRoot = document.querySelector('github-card').shadowRoot;
    const itemNode = document.createElement('li');
    itemNode.classList.add('list-item');

    let srcImg, listImg, listEle, listChild;
    if (['gists', 'repositories'].includes(name)) {
      srcImg = `./images/${name}.svg`;
      href = href + '?tab=repositories';
    } else if (name === 'blog') {
      const validUrl = await this.urlCheckStatus(`${href}/assets/images/favicon_io/favicon.svg`);
      if (validUrl) {
        srcImg = validUrl;
      } else {
        srcImg = `./images/generic.svg`; // Fallback if URL check fails
      }
    } else {
      const domain = this.getRootDomain(href);
      srcImg = faviconMap[domain] || `./images/generic.svg`; // Default to generic if not found
    }

    switch (parentId) {
      case 'list-resources':
      case 'list-social':
        listEle = document.createElement('a');
        listEle.textContent = value;
        listEle.setAttribute('alt', name);
        listEle.setAttribute('href', href);
        listEle.setAttribute('target', '_blank');
        listEle.setAttribute('rel', 'noopener');
        listEle.setAttribute('title', href);
        listChild = null;
      break;
      default:
        listEle = document.createElement('span');
        listEle.textContent = value;
        listChild = document.createElement('p');
        listChild.textContent = name;
        itemNode.appendChild(listChild);
        srcImg = `./images/${name.toLowerCase()}.svg`;
    }

    listImg = document.createElement('img');
    Object.assign(listImg, {
      src: `${srcImg}`,
      height: size,
      width: size,
      alt: name,
      class: themeColor[yagcTheme]
    });

    listEle.prepend(listImg);
    itemNode.appendChild(listEle);
    if (listChild != null) { itemNode.appendChild(listChild); }

    const parentElement = shadowRoot.getElementById(parentId);
    if (parentElement) {
      parentElement.appendChild(itemNode);
    } else {
      console.error(`Parent element with id "${parentId}" not found.`);
    }
  }


  changeStyle(yagcTheme) {
    const shadowRoot = document.querySelector('github-card').shadowRoot;
    const cover = shadowRoot.querySelector(".cover");
    cover.setAttribute("style", themeMap[yagcTheme] || constants.defaultTheme);
    this.changeStyleColor(yagcTheme);
  }


  changeStyleColor(yagcTheme) {
    setTimeout(() => {
      const wrapper = shadowRoot.querySelector("#list-items").querySelectorAll(".list-item");
      const elementsArray = Array.from(wrapper);

      elementsArray.forEach(listItem => {
        const imgElements = listItem.querySelectorAll("img");
        imgElements.forEach(imgEle => {
          imgEle.setAttribute("style", themeColor[yagcTheme]);
        });
      });
    }, 2000);
  }


  attributeChangedCallback(name, oldValue, newValue) {
    console.log(`${name}'s value has been changed from ${oldValue} to ${newValue}`);
    this.changeStyle(newValue);
  }


  urlCheckStatus(url) {
    return fetch(url)
    .then((response) => {
      if (response.status == 200) {
        return url;
      } else {
        return null;
      }
    })
    .catch((error) => {
      console.log(error);
    });
  }


  async main(graphQLQuery) {

    const endPoint = constants.API_GQL_URL
    const variables = {
      login: `${userName}`,
    }

    try {
      const response = await fetch(endPoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: graphQLQuery,
          variables: variables,
        }),
      });

      if (!response.ok) {
        throw new Error(`Error en el proxy: ${response.statusText}`);
      }

      const data = await response.json();
      return data; 

    } catch (error) {
      console.error("Error al obtener datos del backend proxy:", error);
      throw error;
    }
  }
}

customElements.define('github-card', githubCard);
