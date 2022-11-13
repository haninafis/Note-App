import React from "react";
import { useParams, useNavigate } from 'react-router-dom';
import NoteDetail from "../Components/NoteDetail";
import { getNote, deleteNote, archiveNote, unarchiveNote } from '../utils/local-data';
import ArchivedButton from "../Components/ArchivedButton";
import DeleteButton from "../Components/DeleteButton";
import NotFound from "./NotFound";
import PropTypes from 'prop-types';

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

        this.onArchiveHandler = this.onArchiveHandler.bind(this);
        this.onDeleteHandler = this.onDeleteHandler.bind(this);
    }

    onArchiveHandler(id) {
        if (this.state.notes.archived) {
           unarchiveNote(id);
           this.props.navigate('/');
        } else if (!this.state.notes.archived) {
           archiveNote(id);
           this.props.navigate('/');
        }
     }

    onDeleteHandler(id) {
        deleteNote(id);
        this.props.navigate('/');
    }

    render() {
        if(this.state.notes) {
            return (
                <>
                    <NoteDetail {...this.state.notes} />
                    <div className="detail-page__action">
                        <ArchivedButton id={this.props.id} archived={this.state.notes.archived} onArchive={this.onArchiveHandler}/>
                        <DeleteButton id={this.props.id} onDelete={this.onDeleteHandler}/>        
                    </div>
                </>    
            )
        }

        return (
            <NotFound/>
        );
    }
}

DetailPage.propTypes = {
    id: PropTypes.string,
    navigate: PropTypes.func.isRequired,
}

export default DetailPageWrapper;