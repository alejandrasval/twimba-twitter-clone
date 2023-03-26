// Imports

import { tweetsData } from "./data.js";
import { v4 as uuidv4 } from "https://jspm.dev/uuid";

// Declarations

const tweetInput = document.getElementById("tweet-input");
const feed = document.getElementById("feed");

// Even listener

document.addEventListener("click", function (e) {
  if (e.target.dataset.like) {
    handleLikeClick(e.target.dataset.like);
  } else if (e.target.dataset.retweet) {
    handleRetweetClick(e.target.dataset.retweet);
  } else if (e.target.dataset.reply) {
    handleReplyClick(e.target.dataset.reply);
  } else if (e.target.id === "tweet-btn") {
    handleTweetBtnClick();
  }
});

//Handlers

function handleLikeClick(tweetId) {
  const targetTweet = tweetsData.filter(function (tweet) {
    return tweetId === tweet.uuid;
  })[0];

  if (targetTweet.isLiked) {
    targetTweet.likes--;
  } else {
    targetTweet.likes++;
  }
  targetTweet.isLiked = !targetTweet.isLiked;
  render();
}

function handleRetweetClick(tweetId) {
  const targetTweet = tweetsData.filter(function (tweet) {
    return tweetId === tweet.uuid;
  })[0];

  if (targetTweet.isRetweeted) {
    targetTweet.retweets--;
  } else {
    targetTweet.retweets++;
  }
  targetTweet.isRetweeted = !targetTweet.isRetweeted;
  render();
}

function handleReplyClick(tweetId) {
  let feedHtmlReply = "";
  const reply = document.getElementById(`replies-${tweetId}`);
  const targetTweet = tweetsData.filter(function (tweet) {
    return tweetId === tweet.uuid;
  })[0];
  if (targetTweet.replies.length > 0) {
    targetTweet.replies.forEach(function (reply) {
      feedHtmlReply += `<div class="tweet-reply">
      <div class="tweet-inner">
          <img src="${reply.profilePic}" class="profile-pic">
              <div>
                  <p class="handle">${reply.handle}</p>
                  <p class="tweet-text">${reply.tweetText}</p>
              </div>
          </div>
  </div>`;
    });
    reply.innerHTML = feedHtmlReply;
    reply.classList.toggle("hidden");
  }
}

function handleTweetBtnClick() {
  const newTeet = {
    handle: `@felicette`,
    profilePic: `images/scrimbalogo.png`,
    likes: 0,
    retweets: 0,
    tweetText: tweetInput.value,
    replies: [],
    isLiked: false,
    isRetweeted: false,
    uuid: uuidv4(),
  };
  tweetInput.value ? tweetsData.unshift(newTeet) : null;
  render();
  tweetInput.value = "";
}

function getFeedHTml() {
  let feedHtml = "";
  tweetsData.forEach(function (tweet) {
    let classIconLike = "";
    let classIconRetweet = "";

    if (tweet.isLiked) {
      classIconLike = "liked";
    }

    if (tweet.isRetweeted) {
      classIconRetweet = "retweeted";
    }

    feedHtml += `<div class="tweet">
      <div class="tweet-inner">
          <img src="${tweet.profilePic}" class="profile-pic">
          <div>
              <p class="handle">${tweet.handle}</p>
              <p class="tweet-text">${tweet.tweetText}</p>
              <div class="tweet-details">
                  <span class="tweet-detail">
                  <i class="fa-regular fa-comment-dots" data-reply="${tweet.uuid}"></i>
                  ${tweet.replies.length}
                  </span>
                  <span class="tweet-detail">
                  <i class="fa-solid fa-heart ${classIconLike}" data-like="${tweet.uuid}"></i>
                  ${tweet.likes}
                  </span>
                  <span class="tweet-detail">
                  <i class="fa-solid fa-retweet ${classIconRetweet}" data-retweet="${tweet.uuid}"></i>
                  ${tweet.retweets}
                  </span>
              </div>   
          </div>            
      </div>
  </div>
  <div id="replies-${tweet.uuid}">
  </div> `;
  });
  return feedHtml;
}

function render() {
  feed.innerHTML = getFeedHTml();
}

render();
