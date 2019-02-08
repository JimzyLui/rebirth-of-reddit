const baseURL = "https://www.reddit.com/r/";
const arrRandomSubreddits = ["chihhuhua", "awwws", "WTF", "TIL", "javascript"];
const arrSubscribed = [];

const arrURLs = [
  "https://www.reddit.com/r/Chihuahua/.json",
  "https://www.reddit.com/r/MY_FAVORITE_SUBBREDDIT.json",
  "https://www.reddit.com/r/ANOTHER_SUBBREDDIT.json"
];

const request = async (url, callback) => {
  const oReq = new XMLHttpRequest();
  try {
    await oReq.addEventListener("load", async function(data) {
      // const resData = JSON.parse(data.target.responseText);
      const resData = await JSON.parse(data.target.responseText);
      await callback(resData);
    });
    oReq.open("GET", url);
    oReq.send();
  } catch (err) {
    console.log(err.message);
  }
};

function IsValidImageUrl(url, callback) {
  var img = new Image();
  img.onerror = function() {
    callback(url, false);
  };
  img.onload = function() {
    callback(url, true);
  };
  img.src = url;
}

// showMyBoards
const showMyBoards = () => {
  const url = arrURLs[0];
  displayBoards(url);
};

const d = document;
const banner = d.getElementById("banner");
banner.classList.add("navbar", "fixed-top", "center");
// const lbl = d.createElement("label");
// lbl.innerHTML = "Scanable";
// banner.appendChild(lbl);
const navBar = d.getElementById("navBar");
navBar.classList.add("navbar", "fixed-top");
const footer = d.getElementById("footer");
footer.classList.add("navbar", "fixed-bottom");
const content = d.getElementById("content");
content.classList.add("oswaldFont");
const btnMyBoards = d.createElement("div");
btnMyBoards.classList.add("btn");
btnMyBoards.innerHTML = "My Boards";

const btnRandom = d.createElement("div");
btnRandom.classList.add("btn");
btnRandom.innerHTML = "Random";

let arrAllPosts = [];
//const url = arrURLs[0];

const retrieveApiData = async function(url) {
  await request(url, async function(dataR) {
    // console.log("dataR", dataR);
    // console.log("dataR.data", dataR.data);
    if (dataR.error === 404) {
      content.innerHTML = "No data found at" + url + "!";
      return;
    }
    const arr = dataR.data.children;
    console.log(arr);
    displayBoards(arr);
    await arrAllPosts.concat(arr);
  });
};

const displayBoards = arrPosts => {
  if (arrPosts.length > 0) {
    arrPosts.forEach((oPost, idx) => {
      //const oPost = arrPosts.pop();
      //console.log("dcd: ", oPost.data.children);
      const box = d.createElement("div");
      box.classList.add("box");
      const panelTop = d.createElement("div");
      panelTop.classList.add("panelTop");
      const panelLeft = d.createElement("div");
      panelLeft.classList.add("panelLeft");
      const panelRight = d.createElement("div");
      panelRight.classList.add("panelRight");
      const panelBottom = d.createElement("div");
      panelBottom.classList.add("panelBottom");
      if (oPost.data.domain === "youtube.com") {
        const getYouTubeId = url => {
          const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
          const match = url.match(regExp);
          if (match && match[2].length == 11) {
            return match[2];
          } else {
            return "error";
          }
        };

        const videoId = getYouTubeId(oPost.data.url);
        const iframe = d.createElement("iframe");
        iframe.width = 560;
        iframe.height = 315;
        iframe.src = "//www.youtube.com/embed/" + videoId;
        iframe.frameborder = 0;
        iframe.allowfullscreen = true;
        panelLeft.appendChild(iframe);
      } else if (oPost.data.thumbnail !== "") {
        const img = d.createElement("div");
        // images.id = "images";
        img.id = oPost.data.id;
        img.classList.add("img");

        IsValidImageUrl(oPost.data.thumbnail, function(url, isvalid) {
          if (isvalid) {
            $("<img/>")
              // .attr("src", oPost.data.url)
              .attr("src", url)
              .width(500)
              // .appendTo("#images");
              .appendTo("#" + oPost.data.id);
          }
        });
        panelLeft.appendChild(img);
      }

      // Category
      console.log("oPost.data.subreddit:", oPost.data.subreddit);
      const category = d.createElement("div");
      category.classList.add("oswald", "category");
      category.innerHTML = oPost.data.subreddit;
      panelRight.appendChild(category);
      // Title
      const title = d.createElement("h3");
      title.classList.add("oswald", "title");
      title.innerHTML = oPost.data.title;
      panelBottom.appendChild(title);

      // Author
      const author = d.createElement("p");
      author.classList.add("oswald", "author");
      author.innerHTML = oPost.data.author;
      panelRight.appendChild(author);

      const toggleSubscription = function(event) {
        // toggle subscription
        const heart = event.target;
        if (heart.classList.contains("subscribed")) {
          heart.classList.add("subscribe");
          heart.classList.remove("subscribed");
        } else {
          heart.classList.add("subscribed");
          heart.classList.remove("subscribe");
        }
      };
      // subscribe
      const subscribe = d.createElement("div");
      subscribe.classList.add("oswald", "subscribe");
      subscribe.innerHTML = oPost.data.subreddit;
      subscribe.addEventListener("click", toggleSubscription);
      panelRight.appendChild(subscribe);

      // SubTitle
      if (oPost.data.public_description) {
        const subtitle = d.createElement("p");
        subtitle.classList.add("oswald", "subtitle");
        subtitle.innerHTML = oPost.data.public_description;
        panelRight.appendChild(subtitle);
      }

      // Description
      if (oPost.data.description) {
        const description = d.createElement("p");
        description.classList.add("oswald", "description");
        description.innerHTML = oPost.data.description;
        panelRight.appendChild(description);
      }

      // put it all together
      panelTop.appendChild(panelLeft);
      panelTop.appendChild(panelRight);
      box.appendChild(panelTop);
      box.appendChild(panelBottom);
      content.appendChild(box);
    });
  } else {
    // no data
    content.innerHTML = "No content available!";
  }
};

//const baseURL = "https://www.reddit.com/r/";
//const arrURLsFavs = ["chihhuhua", "awwws", "WTF", "WIL", "javascript"];
/*
const getArrRandomOrder = num => {
  let arr = Array.apply(null, { length: num }).map(Number.call, Number);
  // randomize
  arr = arr.sort(function(a, b) {
    return 0.5 - Math.random();
  });
  return arr;
}; */
const randomize = (a, b) => 0.5 - Math.random();
// const arr = arrRandomSubreddits.sort(function(a, b) {
//   return 0.5 - Math.random();
// });

const runRandomReddit = async function() {
  const arr = arrRandomSubreddits.sort(randomize);
  await arr.forEach(url => {
    url = baseURL + url + "/.json";
    console.log(url);
    retrieveApiData(url);
  });
  console.log("arrAllPosts: ", arrAllPosts);
  await displayBoards(arrAllPosts);
};

const runSubscribed = async function() {
  const arr = arrSubscribed.sort(randomize);
  if (arr.length === 0) return;
  await arr.forEach(url => {
    url = baseURL + url + "/.json";
    console.log(url);
    retrieveApiData(url);
  });
  console.log("arrAllPosts: ", arrAllPosts);
  await displayBoards(arrAllPosts);
};

const runDefaultReddit = function() {
  // url = baseURL + "chihuahua" + "/.json";
  url = baseURL + "til" + "/.json";
  console.log(url);
  retrieveApiData(url);
};

//const arr = Array.apply(null, { length: 8 }).map(Function.call, Math.random);
//console.log(arr);
//displayBoards(url);
// use async await

btnMyBoards.addEventListener("click", runSubscribed);
btnRandom.addEventListener("click", runRandomReddit);
navBar.appendChild(btnMyBoards);
navBar.appendChild(btnRandom);

runDefaultReddit();
