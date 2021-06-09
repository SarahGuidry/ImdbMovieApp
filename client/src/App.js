import React, { useEffect, useState } from "react";
import { Route, Switch, Redirect, useHistory } from "react-router-dom";

import MovieList from './components/MovieList';
import Movie from './components/Movie';
import MovieHeader from './components/MovieHeader';
import EditMovieForm from './components/EditMovieForm';
import FavoriteMovieList from './components/FavoriteMovieList';
import AddMovieForm from './components/AddMovieForm'
import DeleteMovieModal from './components/DeleteMovieModal'

import axios from 'axios';

const App = (props) => {
  const [movies, setMovies] = useState([]);
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const { push } = useHistory();
  const [confirmDelete, setConfirmDelete] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:5000/api/movies')
      .then(res => {
        setMovies(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const deleteMovie = (id) => {
    const editedList = movies.filter(movie => movie.id !== id);
    confirmDelete ? setMovies(editedList) : setMovies(movies)
    push('/movies')
  }

  const addToFavorites = (movie) => {

  }

  return (
    <div>
      <nav className="navbar navbar-dark bg-dark">
        <span className="navbar-brand" ><img width="40px" alt="" src="./Lambda-Logo-Red.png" /> HTTP / CRUD Module Project</span>
      </nav>

      <div className="container">
        <MovieHeader />
        <div className="row ">
          <FavoriteMovieList favoriteMovies={favoriteMovies} />

          <Switch>
            <Route
              exact path="/movies/edit/:id"
              render={(props) => {
                return (<EditMovieForm {...props} setMovies={setMovies} />)
              }} />

            <Route
              exact path="/movies/:id"
              render={(props) => {
                return (<Movie {...props} deleteMovie={deleteMovie} setConfirmDelete={setConfirmDelete} />)
              }}
            />

            <Route
              exact path='/confirm/:id'
              render={(props) => {
                return (<DeleteMovieModal {...props} confirmDelete={confirmDelete} deleteMovie={deleteMovie} setConfirmDelete={setConfirmDelete} setMovies={setMovies} />)
              }}
            />
            <Route
              exact path="/movies"
              render={props => <MovieList {...props} setMovies={setMovies} movies={movies} />} />


            <Route exact path='/add'>
              <AddMovieForm setMovies={setMovies} />
            </Route>

            <Route exact path="/">
              <Redirect to="/movies" />
            </Route>
          </Switch>
        </div>
      </div>
    </div >
  );
};


export default App;

