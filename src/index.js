/**
 * es6 modules and imports
 */
const $ = require('jquery');

// $(document).ready(function(){
//   var remove = $('#loading_wrap').remove();
//   setTimeout(remove, 5000);
// });
const {
  getMovies,
  patchMovie,
  postMovie,
  getMovie,
  deleteMovie
} = require('./api.js');

// helper functions

/**/
const htmlRenderTableFrom = (html_element, array_of_movies) => {

  const col="column lg-col-25 md-col-25 sm-col-25 xs-col-25";

  let html_table = `<div class="row">` +
    `<div class="${col}">ID</div>` +
    `<div class="${col}">TITLE</div>` +
    `<div class="${col}">RATING</div>` +
    `<div class="${col}">DELETE</div>` +
    `</div>`;

  const imgBtn = {
    css : "btn-delete",
    svg : "img/delete.svg"
  };

  array_of_movies.forEach( movie => {
    html_table += `<div class="row">` +
      `<div class="${col}">${movie.id}</div>` +
      `<div class="${col}">${movie.title}</div>` +
      `<div class="${col}">${movie.rating}</div>` +
      `<div class="${col}"><img class="${imgBtn.css}" src="${imgBtn.svg}"><img></div>` +
    `</div>`
  });

  $(html_element).append(html_table);
};

getMovies()
  .then(movies => {

    const table = $("#table-of-movies");
    htmlRenderTableFrom(table, movies);

  }).catch((error) => {
    console.log(error);
  });
