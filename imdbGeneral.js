const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  //|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
  //edit these, title comes from episode list pages eg https://www.imdb.com/title/tt0944947/episodes?season=1   |
  const titleID = "tt0944947";                                                                                  
  const numSeasons = 8;
  //|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
  console.log("Script is now running, kick back and relax for a few minutes.");
  for (i = 1; i <= numSeasons; i++) {
    await page.goto(
      `https://www.imdb.com/title/${titleID}/episodes?season=${i}`,
      { waitUntil: "networkidle2" }
    );

    let data = await page.evaluate(() => {
      class EpisodeData {
        constructor(episode, title, rating, votes) {
          this.episode = episode;
          this.title = title;
          this.rating = rating;
          this.votes = votes;
        }
      }
      let x = Array.from(
        document.querySelectorAll(
          '#episodes_content > div.clear > div.list.detail.eplist > [class*="list_item"]'
        )
      );

      // episode number
      let episode = [];
      for (ep = 1; ep <= x.length; ep++) {
        episode.push(ep);
      }

      // title
      let tmp = Array.from(
        document.querySelectorAll(
          '#episodes_content > div.clear > div.list.detail.eplist > [class*="list_item"] > div.info > strong > a'
        )
      );
      let title = [];
      for (each of tmp) {
        if (title !== undefined) {
          title.push(each.innerText);
        }
      }

      // rating
      tmp = Array.from(
        document.querySelectorAll(
          '#episodes_content > div.clear > div.list.detail.eplist > [class*="list_item"] > div.info > div.ipl-rating-widget > div.ipl-rating-star.small > span.ipl-rating-star__rating'
        )
      );
      let rating = [];
      for (each of tmp) {
        if (rating !== undefined) {
          rating.push(each.innerText);
        }
      }

      // total votes
      tmp = Array.from(
        document.querySelectorAll(
          '#episodes_content > div.clear > div.list.detail.eplist > [class*="list_item"] > div.info > div.ipl-rating-widget > div.ipl-rating-star.small > span.ipl-rating-star__total-votes'
        )
      );
      let votes = [];
      for (each of tmp) {
        if (votes !== undefined) {
          votes.push(each.innerText);
        }
      }

      let formatted = [];
      let t;
      for (ep of episode) {
        t = new EpisodeData(
          episode[ep - 1],
          title[ep - 1],
          rating[ep - 1],
          votes[ep - 1]
        );
        try {
          votefunc = Number(t.votes.match(/\d/g).join(""));
        } catch (error) {
          votefunc = 0;
        }
        formatted.push(
          `{
    "episode": ${t.episode},
    "title": "${t.title}",
    "rating": ${t.rating},
    "votes": ${votefunc}
}`
        );
      }

      return `[${formatted}]`;
    });

    fs = require("fs");
    fs.writeFile(`Season${i}.txt`, data, function (err) {
      if (err) return console.log(err);
      console.log(`Season ${i - 1} complete.`);
    });
  }

  await browser.close();
})();
