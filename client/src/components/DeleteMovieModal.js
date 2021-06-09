import React from 'react';
import { useParams, useHistory } from 'react-router-dom'
import { deleteFromServer } from '../apiCalls'


const DeleteMovieModal = props => {
    const { id } = useParams()
    const { push } = useHistory()

    const shouldDelete = e => {
        e.preventDefault()
        props.setConfirmDelete(true);
        console.log('setting confirmDelete to true <DeleteMovieModal>', props.confirmDelete)
        deleteFromServer(id)
        props.deleteMovie(id)
        push('/movies')
    }

    const closeModal = () => {
        props.setConfirmDelete(false)
        push(`/movies/${id}`)
    }
    return (<div id="deleteMovieModal" className='show'>
        <div className="modal-dialog">
            <div className="modal-content">
                <form onSubmit={shouldDelete}>
                    <div className="modal-header">
                        <h4 className="modal-title">Delete Movie</h4>
                        <button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                    </div>
                    <div className="modal-body">
                        <p>Are you sure you want to delete these records?</p>
                        <p className="text-warning"><small>This action cannot be undone.</small></p>
                    </div>
                    <div className="modal-footer">
                        <input type="button" className="btn btn-default" data-dismiss="modal" value="Cancel" onClick={closeModal} />
                        <input type="submit" className="btn btn-danger" value="Delete" onClick={shouldDelete} />
                    </div>
                </form>
            </div>
        </div>
    </div>)
}

export default DeleteMovieModal;
