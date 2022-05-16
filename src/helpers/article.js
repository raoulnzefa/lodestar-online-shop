// replace "/" with "_" for routing
export function fixProductArticle(article) {
  return article.split("/").join('_')
}
