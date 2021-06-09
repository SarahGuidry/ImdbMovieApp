import React, { useEffect, useState } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';

import axios from 'axios';

import DeleteMovieModal from './DeleteMovieModal'

const Movie = (props) => {
    const { addToFavorites } = props;

    const [movie, setMovie] = useState('');
    const [showModal, setShowModal] = useState(false)

    const { id } = useParams();
    const { push } = useHistory();

    useEffect(() => {
        axios.get(`http://localhost:5000/api/movies/${id}`)
            .then(res => {
                setMovie(res.data);
            })
            .catch(err => {
                console.log(err.response);
            })
    }, [id]);

    const toggleShowModal = () => {
        console.log('toggling showModal', showModal)
        setShowModal(!showModal)
    }

    const showModalToDelete = () => {
        toggleShowModal()
        return (<DeleteMovieModal setConfirmDelete={props.setConfirmDelete} />)
    }

    const onDelete = e => {
        e.preventDefault();
        //    toggleShowModal();
        props.confirmDelete ? console.log('delete confirmed') : console.log('delete cancelled')
        props.confirmDelete ?
            axios.delete(`http://localhost:5000/api/movies/${id}`)
                .then(res => {
                    props.deleteMovie(res.data)
                    console.log(res.data)
                })
                .catch(err => console.log(err.response))
            : push(`/movie/${id}`)
    }

    return (<div className="modal-page col">
        <div className="modal-dialog">
            <div className="modal-content">
                <div className="modal-header">
                    <h4 className="modal-title">{movie.title} Details</h4>
                </div>
                <div className="modal-body">
                    <div className="flexContainer">

                        <section className="movie-details">
                            <div>
                                <label>Title: <strong>{movie.title}</strong></label>
                            </div>
                            <div>
                                <label>Director: <strong>{movie.director}</strong></label>
                            </div>
                            <div>
                                <label>Genre: <strong>{movie.genre}</strong></label>
                            </div>
                            <div>
                                <label>Metascore: <strong>{movie.metascore}</strong></label>
                            </div>
                            <div>
                                <label>Description:</label>
                                <p><strong>{movie.description}</strong></p>
                            </div>
                        </section>

                        <section>
                            <span className="m-2 btn btn-dark">Favorite</span>
                            <Link to={`/movies/edit/${movie.id}`} className="m-2 btn btn-success">Edit</Link>
                            <span className="delete"><input type="button" className="m-2 btn btn-danger" onClick={onDelete} value="Delete" /></span>
                        </section>
                    </div>
                </div>
            </div>
        </div>
        {showModal && <DeleteMovieModal showModal={showModal} setConfirmDelete={props.setConfirmDelete} />}
    </div>);
}

export default Movie;