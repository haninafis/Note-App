import React from "react";
import NoteList from "../Components/NoteList";
import {getAllNotes} from '../utils/local-data';

class HomePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            notes: getAllNotes(),
            keyword: props.defaultKeyword || '',
        }
    }

    render() {
        return (
            <div>
                <NoteList notes={this.state.notes}/>
            </div>
        )
    }
}

export default HomePage;
