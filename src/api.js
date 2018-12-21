module.exports = {
  getMovies: () => {
    return fetch('/api/movies')
      .then(response => response.json())
  },
  getMovie: (id) => {
    return fetch(`/api/movies/${id}`)
        .then(response => response.json())
        .then(jsonResponse => console.log(jsonResponse));
  },
  postMovie: (data) => {
      return fetch("/api/movies",{
          method: "POST",
          headers: {
              "Content-Type": "application/json; charset=utf-8",
              // "Content-Type": "application/x-www-form-urlencoded",
          },
          body: JSON.stringify(data)
      })
          .then(response => {
              console.log(response.json());
          });
  },
  patchMovie: (data, id) => {
    fetch(`/api/movies/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            // "Content-Type": "application/x-www-form-urlencoded",
        },
        body: JSON.stringify(data),
    })
        .then(response => {
            console.log(response.json());
        })
  },
  deleteMovie: (id) => {
    fetch(`/api/movies/${id}`, {
        method: "DELETE",
    })
    .then(response => {
      console.log(response.json());
    })
  }
};
