import React from "react";
import { showFormattedDate } from '../utils/index';

function NoteDetail ({title, createdAt, body}){

    return (
        <div className="detail-page">
            <h3 className="detail-page__title">{title}</h3>
            <p className="detail-page__createdAt">{showFormattedDate(createdAt)}</p>
            <p className="detail-page__body">{body}</p>
        </div>
    );
}

export default NoteDetail;