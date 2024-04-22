import axios from "axios";
import jsdom from "jsdom";

async function getContentOutline(keyword, country_code) {
  let excluded_sites =
    "-site:quora.com -site:twitter.com -site:facebook.com -site:reddit.com";
  const url = `https://www.google.com/search?q=${keyword}+${excluded_sites}&gl=${country_code}`;
  const response = await axios.get(url);
  const dom = new jsdom.JSDOM(response.data);
  const document = dom.window.document;

  console.log(document);

  return {
    title: document.title.trim(),
    headings: Array.from(document.querySelectorAll("h1, h2, h3")).map(
      (heading) => heading.textContent.trim()
    ),
    snippets: [],
  };
}

export default getContentOutline;
