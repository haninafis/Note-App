import React from "react";
import { useParams } from 'react-router-dom';
import NoteDetail from "../Components/NoteDetail";
import { getNote } from '../utils/local-data';
import ArchivedButton from "../Components/ArchivedButton";
import DeleteButton from "../Components/DeleteButton";

function DetailPageWrapper() {
    const { id } = useParams();
    return <DetailPage id={id}/>;
}

class DetailPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            notes: getNote(props.id)
        };
    }

    render() {
        return (
            <>
                <NoteDetail {...this.state.notes} />
                <div className="detail-page__action">
                    <ArchivedButton/>
                    <DeleteButton/>        
                </div>
            </>
        );
    }
}

export default DetailPageWrapper;