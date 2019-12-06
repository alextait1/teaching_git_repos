const app = {};

app.API_KEY = `OMEfCRkKLeQi8YUuamQlZINCifpHi8TB`;

app.init = function() {
  app.getSearchTerm();
};

app.getGifs = function(query) {
  $.ajax({
    url: `http://api.giphy.com/v1/gifs/search`,
    method: "GET",
    dataType: "json",
    data: {
      api_key: app.API_KEY,
      q: query,
      format: "json"
    }
  }).then(function(result) {
    $(".results").empty();
    app.displayGifs(result.data);
  });
};

app.displayGifs = function(data) {
  data.forEach(gif => {
    const htmlToAppend = `
    <div class="gif-box">
      <div class="img-box">
        <img src="${gif.images.original_still.url}" alt="${gif.title}" />
        <p class="gif-title">${gif.title}</p>
      </div>
    </div>
    `;
    $(".results").append(htmlToAppend);
  });
};

app.getSearchTerm = function() {
  $("form").on("submit", function(e) {
    e.preventDefault();
    const searchTerm = $("input[type='text'").val();
    app.getGifs(searchTerm);
  });
};

$(function() {
  app.init();
});
