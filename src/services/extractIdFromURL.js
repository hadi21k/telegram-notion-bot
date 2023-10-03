function extractPageIdFromUrl(url) {
  const pageId = url.split("/").pop().split("-").pop().split("?")[0];
  return pageId;
}
module.exports = extractPageIdFromUrl;
