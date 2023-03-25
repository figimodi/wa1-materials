'use strict'
const dayjs = require('dayjs')
const sqlite = require('sqlite3');

const db = new sqlite.Database('films.db', (err) => {
    if (err) throw err;
});

//1.
function Movie(id, title, favourites=false, date=undefined, rating=undefined) {
    this.id = id
    this.title = title
    this.favourites = favourites
    this.date = date && dayjs(date)
    this.rating = rating
}

function MovieLibrary() {
    const db = new sqlite.Database('films.db', (err) => { if (err) throw err; });

    this.closeDB = () => {
        try {
        db.close();
        }
        catch (error) {
        console.error(`Impossible to close the database! ${error}`);
        }
    }

    this.getAll = () => {
        return new Promise((resolve, reject) => {
            const sql = "SELECT * FROM films"
            const movies = []
            db.all(sql, [], (err, rows) => {
                if (err)
                    reject(err)
                else {
                    const movies = rows.map(row => new Movie(row.id, row.title, row.favourites == 1, row.watchdate, row.rating))
                    resolve(movies)
                }
            })
        })
    }

    this.getFavorites = () => {
        return new Promise((resolve, reject) => {
            const sql = "SELECT * FROM films where favorite = ?"
            db.all(sql, [true], (err, rows) => {
                if (err)
                    reject(err)
                else {
                    const movies = rows.map(row => new Movie(row.id, row.title, row.favourites == 1, row.watchdate, row.rating))
                    resolve(movies)
                }
            })
        })
    }

    this.getToday = () => {
        return new Promise((resolve, reject) => {
            const today = dayjs().format('YYYY-MM-DD')
            const sql = "SELECT * FROM films WHERE watchdate = ?"
            db.all(sql, [today], (err, rows) => {
                if (err)
                    reject(err)
                else {
                    const movies = rows.map(row => new Movie(row.id, row.title, row.favourites == 1, row.watchdate, row.rating))
                    resolve(movies)
                }
            })
        })
    }

    this.getBeforeDate = (untilDate) => {
        return new Promise((resolve, reject) => {
            const sql = "SELECT * FROM films WHERE watchdate < ?"
            db.all(sql, [untilDate.format('YYYY-MM-DD')], (err, rows) => {
                if (err)
                    reject(err)
                else {
                    const movies = rows.map(row => new Movie(row.id, row.title, row.favourites == 1, row.watchdate, row.rating))
                    resolve(movies)
                }
            })
        })
    }

    this.getRated = (rating) => {
        return new Promise((resolve, reject) => {
            const sql = "SELECT * FROM films WHERE rating >= ?"
            db.all(sql, [rating], (err, rows) => {
                if (err)
                    reject(err)
                else {
                    const movies = rows.map(row => new Movie(row.id, row.title, row.favourites == 1, row.watchdate, row.rating))
                    resolve(movies)
                }
            })
        })
    }

    this.getWithWord = (string) => {
        return new Promise((resolve, reject) => {
            const sql = "SELECT * FROM films WHERE title LIKE ?"
            db.all(sql, ["%" + string  + "%"], (err, rows) => {
                if (err)
                    reject(err)
                else {
                    const movies = rows.map(row => new Movie(row.id, row.title, row.favourites == 1, row.watchdate, row.rating))
                    resolve(movies)
                }
            })
        })
    }

    this.addMovie = (movie) => {
        return new Promise((resolve, reject) => {
            const sql = "INSERT INTO films(id, title, favorite, watchdate, rating) VALUES(?, ?, ?, ?, ?)"
            db.run(sql, [movie.id, movie.title, movie.favourites, movie.date.format('YYYY-MM-DD'), movie.rating], function(err) {
                if (err)
                    reject(err)
                else
                    resolve(this.lastID)
            })

        })
    }

    this.deleteMovie = (id) => {
        return new Promise((resolve, reject) => {
            const sql = "DELETE FROM films WHERE id = ?"
            db.run(sql, [id], function(err) {
                if (err)
                    reject(err)
                else
                    resolve(this.changes)
            })

        })
    }

    this.resetWatchDate = () => {
        return new Promise((resolve, reject) => {
            const sql = "UPDATE films SET watchdate = NULL"
            db.all(sql, [], (err, rows) => {
                if (err)
                    reject(err)
                else
                    resolve()
            })
        })
    }
}

/* TESTING */
async function main() {

    const movieLibrary = new MovieLibrary();
    
    try {
      // get all the movies
      console.log('\n****** All the movies in the database: ******');
      const movies = await movieLibrary.getAll();
      if(movies.length === 0)
        console.log('No movies yet, try later.');
      else
        movies.forEach( (movie) => console.log(`${movie.title}`) );
  
      // get all favorite movies
      console.log('\n****** All favorite movies in the database: ******');
      const favoriteMovies = await movieLibrary.getFavorites();
      if(favoriteMovies.length === 0)
        console.log('No favorite movies yet, try later.');
      else
        favoriteMovies.forEach( (movie) => console.log(`${movie.title}`) );
  
      // retrieving movies watched today
      console.log('\n****** Movies watched today ******');
      const watchedToday = await movieLibrary.getToday();
      if(watchedToday.length === 0)
        console.log('No movies watched today, time to watch one?');
      else
        watchedToday.forEach( (movie) => console.log(`${movie.title}`) );
  
      // get films before a certain date
      const watchdate = dayjs('2023-03-19');
      console.log('\n****** Movies watched before ' + watchdate.format('YYYY-MM-DD') + ': ******');
      const watchedMovies = await movieLibrary.getBeforeDate(watchdate);
      if(watchedMovies.length === 0)
        console.log("No movies in this period, sorry.");
      else
        watchedMovies.forEach( (movie) => console.log(`${movie.title}`) );
  
      // get movies with a minimum score of 4
      const rating = 4
      console.log('\n****** Movies with a minimum rate of ' + rating + ': ******');
      const ratedMovies = await movieLibrary.getRated(rating);
      if(ratedMovies.length === 0)
        console.log('No movies with this rating, yet.');
      else
        ratedMovies.forEach( (movie) => console.log(`${movie.title}`) );
  
      // get movies with a the word "war" in the title
      const word = 'war';
      console.log(`\n****** Movies containing '${word}' in the title: ******`);
      const filteredMovies = await movieLibrary.getWithWord(word);
      if(filteredMovies.length === 0)
        console.log(`No movies with the word ${word} in the title...`);
      else
        filteredMovies.forEach( (movie) => console.log(`${movie.title}`) );
    } catch (error) {
      console.error(`Impossible to retrieve movies! ${error}`);
      movieLibrary.closeDB();
      return;
    }
  
    // inserting a new movie
    const movieID = 6;
    console.log(`\n****** Adding a new movie: ******`);
    const newMovie = new Movie(6, "Fast & Furious", false, dayjs().toISOString(), 2);
    try {
      const dbId = await movieLibrary.addMovie(newMovie);
      console.log(`New movie inserted! ID: ${dbId}.`);
    } catch (error) {
      console.error(`Impossible to insert a new movie! ${error}`);
    }
  
    // delete a movie
    console.log(`\n****** Deleting the movie with ID '${movieID}': ******`);
    try {
      const deleted = await movieLibrary.deleteMovie(movieID);
      if (deleted)
        console.log('Movie successfully deleted!');
      else
        console.error(`There is no movie to delete with id: ${movieID}`);
    } catch (error) {
      console.error(`Impossible to delete the movie with id: ${movieID}! ${error}`);
    }
  
    // reset all the whatchdate
    console.log(`\n****** Resetting all the watch dates: ******`);
    try {
      await movieLibrary.resetWatchDate();
      console.log('Watch dates resetted!');
    } catch (error) {
      console.error(`Impossible to reset watch dates! ${error}`);
    }
  
    // printing updated movies
    console.log('\n****** All the movies after the updates: ******');
    const movieUpdated = await movieLibrary.getAll();
    if(movieUpdated.length === 0)
      console.log('No movies yet, try later.');
    else
      movieUpdated.forEach( (movie) => console.log(`${movie.title}`) );
  
    movieLibrary.closeDB();
}

main();
debugger;
