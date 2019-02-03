const request = (url, callback) => {
  const oReq = new XMLHttpRequest();
  oReq.addEventListener("load", function(data) {
    // const resData = JSON.parse(data.target.responseText);
    const resData = JSON.parse(data.target.responseText);
    callback(resData);
  });
  oReq.open("GET", url);
  oReq.send();
};
const d = document;
const banner = d.getElementById("banner");
banner.classList.add("navbar", "fixed-top");
const navBar = d.getElementById("navBar");
navBar.classList.add("navbar", "fixed-top");
const footer = d.getElementById("footer");
footer.classList.add("navbar", "fixed-bottom");
const content = d.getElementById("content");
const btnMyBoards = d.createElement("div");
btnMyBoards.classList.add("btn");
btnMyBoards.innerHTML = "My Boards";
const btnRandom = d.createElement("div");
btnRandom.classList.add("btn");
btnRandom.innerHTML = "Random";
navBar.appendChild(btnMyBoards);
navBar.appendChild(btnRandom);
arrURLs = [
  "https://www.reddit.com/r/MY_FAVORITE_SUBBREDDIT.json",
  "https://www.reddit.com/r/ANOTHER_SUBBREDDIT.json"
];
request(arrURLs[1], function(dataR) {
  // console.log("dataR", dataR);
  // console.log("dataR.data", dataR.data);
  // DOM MANIPULATING CODE HERE
  const arrPosts = dataR.data.children;
  if (arrPosts.length > 0) {
    arrPosts.forEach((oPost, idx) => {
      //const oPost = arrPosts.pop();
      //console.log(oPost.data);
      const box = d.createElement("div");
      box.classList.add("box");

      // Title
      const title = d.createElement("h3");
      title.innerHTML = oPost.data.title;
      box.appendChild(title);
      // SubTitle
      const subtitle = d.createElement("p");
      subtitle.innerHTML = oPost.data.public_description;
      box.appendChild(subtitle);
      // Description
      // const p1 = d.createElement("p");
      // p1.innerHTML = oPost.data.description;
      // box.appendChild(p1);
      content.appendChild(box);
    });
  } else {
    // no data
    main.innerHTML = "No persons matched " + resourceIdValue + "!";
  }
});
