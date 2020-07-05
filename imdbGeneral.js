//|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
//edit these, title comes from episode list pages eg https://www.imdb.com/title/tt0944947/episodes?season=1   |
const titleID = "tt0108778";
const numSeasons = 1;
//|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||

const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();


  console.log("Script is now running, kick back and relax for a few minutes.");
  fs = require("fs");
  fs.writeFile(`out.json`, `{`, function (err) {
    if (err) return console.log(err);
  });
  for (i = 1; i <= numSeasons; i++) {
    await page.goto(
      `https://www.imdb.com/title/${titleID}/episodes?season=${i}`,
      { waitUntil: "networkidle2" }
    );
    // scraping logic
    let data = await page.evaluate(() => {
      // get number of elements
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
          votes.push(
            each.innerText ? Number(each.innerText.match(/\d/g).join("")) : 0
          );
        }
      }


      let formatted = [];
      let t = {}
      for (ep of episode) {
        t.episode = episode[ep - 1],
        t.title = title[ep - 1],
        t.rating = rating[ep - 1] ? Number(rating[ep - 1]) : 0,
        t.votes = votes[ep - 1]

        formatted.push(JSON.stringify(t));
      }

      return `[${formatted}]`;
    });

    fs.appendFile(
      `out.json`,
      i !== numSeasons ? `"season${i}":${data},` : `"season${i}":${data}}`,
      function (err) {
        if (err) return console.log(err);
        console.log(`Season ${i - 1} complete.`);
      }
    );
  }

  await browser.close();
})();
