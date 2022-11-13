import React from "react";
import PropTypes from 'prop-types';
import { showFormattedDate } from '../utils/index';
import { Link } from 'react-router-dom';

function NoteItem ({title, createdAt, body, id}){

    return (
        <div className="note-item">
            <h3 className="note-item__title"><Link to={`/notes/${id}`}>{title}</Link></h3>
            <p className="note-item__createdAt">{showFormattedDate(createdAt)}</p>
            <p className="note-item__body">{body}</p>
        </div>
    );
}

NoteItem.propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
}

export default NoteItem;
