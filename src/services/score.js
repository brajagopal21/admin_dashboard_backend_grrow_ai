import tfidf from "node-tfidf";
import stopwords from "stopwords";

async function calculateScore(keyword, articleId) {
  const articleContent = await getArticleContent(articleId);
  const preprocessedContent = preprocessContent(articleContent);
  const tfidfMatrix = new tfidf.Matrix([keyword, preprocessedContent]);
  const keywordTfIdf = tfidfMatrix.tfidf(keyword);
  const score =
    keywordTfIdf * 0.8 +
    calculatePositionalWeight(keyword, preprocessedContent) +
    calculateSentimentScore(preprocessedContent);

  return { score };
}

async function getArticleContent(articleId) {
  const content = `This is a placeholder article content for article ID: ${articleId}`;
  return content;
}
function preprocessContent(content) {
  const lowercaseContent = content.toLowerCase();
  const filteredContent = stopwords.removeStopwords(lowercaseContent);
  const tokens = filteredContent.split(/\s+/);
  return tokens.join(" ");
}
function calculatePositionalWeight(keyword, content) {
  const positions = [];
  let weight = 0;
  const regex = new RegExp(keyword, "gi");
  let match;
  while ((match = regex.exec(content)) !== null) {
    positions.push(match.index);
  }
  for (let i = 0; i < positions.length; i++) {
    weight += 1 / (positions[i] + 1);
  }

  return weight;
}
function calculateSentimentScore(content) {
  const sentimentScore = 0.5;
  return sentimentScore;
}

export default calculateScore;
