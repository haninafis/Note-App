import React from "react";
import { useParams, useNavigate } from 'react-router-dom';
import NoteDetail from "../Components/NoteDetail";
import { getNote, deleteNote } from '../utils/local-data';
import ArchivedButton from "../Components/ArchivedButton";
import DeleteButton from "../Components/DeleteButton";

function DetailPageWrapper() {
    const { id } = useParams();
    const navigate = useNavigate();

    return <DetailPage id={id} navigate={navigate}/>;
}

class DetailPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            notes: getNote(props.id)
        };

        this.onDeleteHandler = this.onDeleteHandler.bind(this);
    }

    onDeleteHandler(id) {
        deleteNote(id);
        this.props.navigate('/');
    }

    render() {
        return (
            <>
                <NoteDetail {...this.state.notes} />
                <div className="detail-page__action">
                    <ArchivedButton/>
                    <DeleteButton id={this.props.id} onDelete={this.onDeleteHandler}/>        
                </div>
            </>
        );
    }
}

export default DetailPageWrapper;