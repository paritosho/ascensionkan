module.exports = function(eleventyConfig) {
  // 静的ファイルをそのままコピー
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/img");
  eleventyConfig.addPassthroughCopy("src/bookshelf");
  eleventyConfig.addPassthroughCopy("src/movie");
  eleventyConfig.addPassthroughCopy("src/ndic");
  eleventyConfig.addPassthroughCopy("src/rdic");
  eleventyConfig.addPassthroughCopy("src/prose-poem");
  eleventyConfig.addPassthroughCopy("src/works");

  // 号数を4桁ゼロ埋めするフィルター
  eleventyConfig.addFilter("padStart", (val, len, fill) => {
    return String(val).padStart(len, fill || '0');
  });

  // 文字列の先頭N文字を返すフィルター（年抽出用）
  eleventyConfig.addFilter("truncate", (str, len) => {
    return String(str).substring(0, len);
  });

  // メルマガを号数でソート
  eleventyConfig.addCollection("mm", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/mm/*.md").sort((a, b) => {
      return (a.data.vol || 0) - (b.data.vol || 0);
    });
  });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes"
    }
  };
};
