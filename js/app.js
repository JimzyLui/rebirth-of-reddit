arrURLs = [
  "https://www.reddit.com/r/Chihuahua/.json",
  "https://www.reddit.com/r/MY_FAVORITE_SUBBREDDIT.json",
  "https://www.reddit.com/r/ANOTHER_SUBBREDDIT.json"
];

const request = (url, callback) => {
  const oReq = new XMLHttpRequest();
  try {
    oReq.addEventListener("load", function(data) {
      // const resData = JSON.parse(data.target.responseText);
      const resData = JSON.parse(data.target.responseText);
      callback(resData);
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
btnMyBoards.addEventListener("click", showMyBoards);

const btnRandom = d.createElement("div");
btnRandom.classList.add("btn");
btnRandom.innerHTML = "Random";
navBar.appendChild(btnMyBoards);
navBar.appendChild(btnRandom);

const url = arrURLs[0];
const displayBoards = url => {
  request(url, function(dataR) {
    // console.log("dataR", dataR);
    // console.log("dataR.data", dataR.data);
    if (dataR.error === 404) {
      content.innerHTML = "No data found!";
      return;
    }
    const arrPosts = dataR.data.children;
    if (arrPosts.length > 0) {
      arrPosts.forEach((oPost, idx) => {
        //const oPost = arrPosts.pop();
        //console.log("dcd: ", oPost.data.children);
        if (oPost.data.thumbnail !== "") {
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
        }
      });
    } else {
      // no data
      content.innerHTML = "No content available!";
    }
  });
};

displayBoards(url);
