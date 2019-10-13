let movies = [
  {
    name: 'The Big Lebowski',
    photoURL:
      'https://m.media-amazon.com/images/M/MV5BMTQ0NjUzMDMyOF5BMl5BanBnXkFtZTgwODA1OTU0MDE@._V1_UX182_CR0,0,182,268_AL__QL50.jpg',
    synopsis:
      'Jeff "The Dude" Lebowski, mistaken for a millionaire of the same name, seeks restitution for his ruined rug and enlists his bowling buddies to help get it.',
    director: 'Joel Coen, Ethan Coen',
    stars: 'Jeff Bridges, John Goodman',
    rating: 5
  },
  {
    name: 'Spirited Away',
    photoURL:
      'https://m.media-amazon.com/images/M/MV5BNmU5OTQ0OWQtOTY0OS00Yjg4LWE1NDYtNDRhYWMxYWY4OTMwXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_UY268_CR3,0,182,268_AL__QL50.jpg',
    synopsis:
      "During her family's move to the suburbs, a sullen 10-year-old girl wanders into a world ruled by gods, witches, and spirits, and where humans are changed into beasts.",
    director: 'Hayao Miyazaki',
    stars: 'Daveigh Chase, Suzanne Pleshette, Miyu Irino',
    rating: 5
  }
];
const moviesCopy = [...movies];
let newMovie = {};

const displayMovies = (movies, el) => {
  let html = '';
  if (movies.length === 0) {
    html =
      '<p style="font-size:20px;margin-left:20px;margin-top:7px;">MovieDB is empty. :( <p>';
  }
  movies.map(({ name, photoURL, synopsis, director, stars, rating }) => {
    return (html += `
  <div class="ui centered card">
    <div class="image">
      <img src="${photoURL}">
    </div>
    <div class="content">
      <div class="header" style="margin-bottom:10px">${name}</div>
      <div class="meta">
        ${synopsis}
      </div>
      <div class="description">
        Director(s): ${director} <br />
        Star(s): ${stars}
      </div>
    </div>
    <div class="extra content">
      <span class="left floated">
          <div class="ui basic red button" onclick="removeMovie(event)">Remove</div>
      </span>
      <span class="right floated" style="margin-top:10px">
        Rating : ${rating}/5
      </span>
    </div>
  </div>
    `);
  });
  el.innerHTML = html;
};

removeMovie = (e) => {
  const movieName = e.path[3].outerText.split('\n')[0];
  movies = movies.filter(({ name }) => name !== movieName);
  displayMovies(movies, document.querySelector('#show-movies'));
};

addMovieHandler = (e) => {
  e.preventDefault();
  const name = e.target[0].value;
  let photoURL = e.target[1].value;
  const synopsis = e.target[2].value;
  const director = e.target[3].value;
  const stars = e.target[4].value;
  const rating = e.target[5].value;
  if (!name || !director || !stars || !rating || !synopsis) {
    return alert('Invalid details');
  }
  if (rating > 5 || rating < 0) {
    return alert('Invalid rating');
  }
  if (!photoURL) {
    photoURL = 'https://via.placeholder.com/150';
  }
  newMovie = { name, photoURL, director, stars, rating, synopsis };
  movies = [...movies, newMovie];
  return alert('Successfully added movie.');
};

searchMovieHandler = (e) => {
  if (movies.length === 0) {
    return (document.querySelector('#show-movies').innerHTML =
      'No such movie found. Please refresh the page.');
  }
  if (e.keyCode === 8) {
    movies = moviesCopy;
    console.log('asdibaisdjasd');
  } else {
    movies = movies.filter(
      ({ name }) => name.toLowerCase().indexOf(e.target.value) !== -1
    );
  }
  displayMovies(movies, document.querySelector('#show-movies'));
};

window.addEventListener('DOMContentLoaded', () => {
  const showMoviesBtn = document.querySelector('#show-movies-btn');
  const addMovieBtn = document.querySelector('#add-movie-btn');
  const showMovies = document.querySelector('#show-movies');
  const addMovie = document.querySelector('.add-movie');
  const searchMovie = document.querySelector('#search-movie');
  const searchMovieInp = document.querySelector('#search-movie-inp');
  const addMovieForm = document.querySelector('#add-movie-form');
  showMovies.style.display = 'none';
  searchMovie.style.display = 'none';
  showMoviesBtn.addEventListener('click', () => {
    showMovies.style.display = 'block';
    addMovie.style.display = 'none';
    showMoviesBtn.className += ' active';
    addMovieBtn.className = 'item';
    searchMovie.style.display = 'block';
    displayMovies(movies, showMovies);
  });
  addMovieBtn.addEventListener('click', () => {
    addMovie.style.display = 'block';
    showMovies.style.display = 'none';
    addMovieBtn.className += ' active';
    showMoviesBtn.className = 'item';
    searchMovie.style.display = 'none';
  });
  addMovieForm.addEventListener('submit', addMovieHandler);
  searchMovieInp.addEventListener('keyup', searchMovieHandler);
});
