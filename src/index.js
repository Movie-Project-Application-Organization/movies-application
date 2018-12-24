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
    svg : "img/delete.png"
  };

  array_of_movies.forEach( movie => {
    html_table += `<div class="row">` +
      `<div class="${col}">${movie.id}</div>` +
      `<div class="${col}">${movie.title}</div>` +
      `<div class="${col}">${movie.rating}</div>` +
      `<div class="${col}"><img class="${imgBtn.css}" src="${imgBtn.svg}"><img></div>` +
    `</div>`
  });

  html_table += `<form class=row>` +
    `<div class="${col}">Add a movie</div>` +
    `<div class="${col}"><input type="text" name="movie-title"></div>` +
    `<div class="${col}"><input type="text" name="movie-rating"></div>` +
    `<div id="add-movie" class="${col}"><input type="submit" value="Add Movie"></div>` +
  `</form>`

  $(html_element).append(html_table);
};

getMovies()
  .then(movies => {

    const table = $("#table-of-movies");
    htmlRenderTableFrom(table, movies);

    // listener for remove button
    $('.btn-delete').click(function(event){
        const source = event.target;
        const div = $(source).parent().get(0);
        const movieRow = $(div).parent().get(0);
        const id = $(movieRow).children().first().get(0);
        const idNumber = $(id).text();
        deleteMovie(idNumber);
        movieRow.remove();
    });

    // listener for "add movie" button
    $("#add-movie").click( event => {
      event.preventDefault();
      const source = event.target;
      const div = $(source).parent().get(0);
      const form = $(div).parent().get(0);

      let movieTitle = $(form).children().get(1);
      movieTitle = $(movieTitle).children().get(0);
      movieTitle = $(movieTitle).val();

      let movieRating = $(form).children().get(2);
      movieRating = $(movieRating).children().get(0);
      movieRating = $(movieRating).val();

      movieRating = parseInt(movieRating);

      if(isNaN(movieRating)){
        alert(`Error: typeof(movieRating) = ${typeof(movieRating)}.\nPlease enter a number for the movie rating.`);
      }
      else if(movieRating < 0 || movieRating > 5){
        alert("Please enter a number between 0 and 5.");
      }
      else {
        postMovie({title: movieTitle, rating: movieRating});

        // TODO: alter html so the movie appears here.
        // How should be go about applying the id?
      }
    });

  }).catch((error) => {
    console.log(error);
  });
