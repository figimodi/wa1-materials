'use strict'
const dayjs = require('dayjs')

//0.
const modStr = (array) => {
    array.forEach((element) => {
        console.log(element.length > 1 ? element.slice(0,2) + element.slice(element.length - 2, element.length) : element)    
    })
}

//1.
function Movie(id, title, favourites=false, date=undefined, rating=undefined) {
    this.id = id
    this.title = title
    this.favourites = favourites
    this.date = date && dayjs(date)
    this.rating = rating
}

function MovieLibrarie(movies=[]) {
    this.movies = movies

    this.addNewMovie = (movie) => {
        this.movies = [this.movies, ...movie]
    }

    this.sortByDate = () => {
        this.movies.sort((a, b) => {
            if(a.date && b.date)
                return a.date.isAfter(b.date) ? 1 : -1
            else if(a.date)
                return -1
            else if(b.date)
                return 1
        })
    }

    this.deleteMovie = (id) => {
        this.movies = this.movies.filter(movie => movie.id != id)
    }

    this.resetWatchedMovies = () => {
        this.movies.forEach(movie => {
            movie.date = undefined;
        })
    }

    this.getRated = () => {
        this.movies = this.movies.filter(movie => movie.rating)
        this.movies.sort((a, b) => {
            if(a.score > b.score)
                return 1
            else 
                return -1
        })
    }

    this.printAll = () => {
        this.movies.forEach(movie => {
            console.log(movie)
        })
    }
}

modStr(["cat", "it", "spring"])

const film1 = new Movie(1, "Pulp Ficition", true, "2023-03-10GMT", 5)
const film2 = new Movie(2, "21 Grams", true, "2023-01-02GMT", 5)
const film3 = new Movie(3, "Star Wars")
const film4 = new Movie(4, "Matrix", undefined, undefined, 5)
const film5 = new Movie(5, "Shrek", false, "2023-10-23GMT", 5)

const library = new MovieLibrarie([film1, film2, film3, film4, film5])

library.sortByDate()
library.deleteMovie(2)
library.getRated()
library.printAll()

debugger