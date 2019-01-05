/**
 * es6 modules and imports
 */
const $ = require('jquery');

const {
  getMovies,
  patchMovie,
  postMovie,
  getMovie,
  deleteMovie
} = require('./api.js');

const col="column lg-col-25 md-col-25 sm-col-25 xs-col-25";

const imgBtn = {
    css : "btn-delete",
    svg : "img/delete.png"
};

// helper functions
const htmlRenderTableFrom = (html_element, array_of_movies) => {

  let html_table = `<div class="row">` +
    `<div class="${col}">ID</div>` +
    `<div class="${col}">TITLE</div>` +
    `<div class="${col}">RATING</div>` +
    `<div class="${col}">DELETE</div>` +
    `</div>`;

  array_of_movies.forEach((movie, index) => {
    html_table += `<div class="row">` +
      `<div class="${col}">${movie.id}</div>` +
      `<div class="${col}" id="title-${index}">${movie.title}</div>` +
      `<div class="${col}" id="rating-${index}">${movie.rating}</div>` +
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
        const movieObject = {title: movieTitle, rating: movieRating}
        postMovie(movieObject);

        const len = $(table).length;
        const lastRow = $(table).children().get(len - 3);
        let id = $(lastRow).children().get(0);
        id = $(id).html();
        id++;

        $(lastRow).after(`<div class="row">` +
          `<div class="${col}">${id}</div>` +
          `<div class="${col}">${movieObject.title}</div>` +
          `<div class="${col}">${movieObject.rating}</div>` +
          `<div class="${col}"><img class="${imgBtn.css}" src="${imgBtn.svg}"><img></div>` +
        `</div>`);
      }
    });
    //edit on dblclick
    // $('div.row').each(function() {
    //   $(this).dblclick(event => {
    //     event.preventDefault();
    //     const source = event.target;
    //     const div = $(source).get(0);
    //     const placeholder = $(div).text();
    //     console.log(div);
    //     let newDiv = $(div).html(`<form><input type="text" name="${placeholder}" placeholder="${placeholder}"></form>`)
    //     let newInputValue = '';
    //
    //     $(div).html(`<form><input type="text" name="${placeholder}" placeholder="${placeholder}">${newInputValue}</form>`)
    //
    //     let inputValue;
    //
    //     $(newDiv).keypress(event => {
    //       const source = event.target;
    //       const div = $(source).get(0);
    //       const val = $(div).val();
    //       inputValue = val;
    //       console.log(inputValue);
    //     })
    //     const div2 = $(source).parent().get(0);
    //     const form = $(div2).parent().get(0);
    //     console.log(form);
    //     if(inputValue){
    //       newInputValue = inputValue;
    //     }
    //   })
    // });
    movies.forEach(movie => {
      $(`div.column#rating-${movie.id - 1}`).each(function(){
        $(this).dblclick(event => {
            event.preventDefault();
            const source = event.target;
            const div = $(source).get(0);
            const placeholder = $(div).text();
            let formInput = $(div).html(`<form><input type="text" name="${placeholder}" placeholder="${placeholder}"></form>`)

            $(div).html(`<form><input type="text" name="${placeholder}" placeholder="${placeholder}"></form>`)
            let inputValue;

            $(formInput).keyup(event => {
              const source = event.target;
              const div = $(source).get(0);
              const val = $(div).val();
              inputValue = val;

              if(isNaN(inputValue)){
                alert(`Error: typeof(movieRating) = ${typeof(inputValue)}.\nPlease enter a number for the movie rating.`);
              }
              else if(inputValue < 0 || inputValue > 5){
                alert("Please enter a number between 0 and 5.");
              }
              else {
                const movieRating = {rating: inputValue};
                $(div).html(`<div class="${col}">${movieRating}</div>`);
                patchMovie(movieRating, movie.id);
              }
            })
        })
      })
      $(`div.column#title-${movie.id - 1}`).each(function(){
        $(this).dblclick(event => {
            event.preventDefault();
            const source = event.target;
            const div = $(source).get(0);
            const placeholder = $(div).text();

            let formInput = $(div).html(`<form><input type="text" name="${placeholder}" placeholder="${placeholder}"></form>`)

            $(div).html(`<form><input type="text" name="${placeholder}" placeholder="${placeholder}"></form>`)

            $(formInput).keyup(event => {
              let inputValue;
              const source = event.target;
              const div = $(source).get(0);
              const val = $(div).val();
              inputValue = val;
              console.log(inputValue)
              const movieTitle = {title: inputValue};
              $(div).html(`<div class="${col}">${movieTitle}</div>`);
              patchMovie(movieTitle, movie.id);
              })
        })
      })
    })
  }).catch((error) => {
    console.log(error);
  });
