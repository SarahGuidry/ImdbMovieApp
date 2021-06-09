import React from 'react';

import axios from 'axios'

export function deleteFromServer(id) {

    console.log('deleteFromServer function called')
    console.log(id, 'movie id')
    axios.delete(`http://localhost:5000/api/movies/${id}`)
        .then(res => {
            props.deleteMovie(res.data)
            console.log(res.data)
            props.setMovies(res.data)
            push('/movies')
        })
        .catch(err => console.log(err.response))
}