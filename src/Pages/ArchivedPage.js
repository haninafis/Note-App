import React from "react";
import { useSearchParams } from 'react-router-dom';
import NoteList from "../Components/NoteList";
import SearchBar from "../Components/SearchBar";
import { getArchivedNotes } from '../utils/local-data';
import PropTypes from 'prop-types';

function ArchivedPageWrapper() {
    const [searchParams, setSearchParams] = useSearchParams();
    const keyword = searchParams.get('keyword');
    function changeSearchParams(keyword) {
      setSearchParams({ keyword });
    }
   
    return <ArchivedPage defaultKeyword={keyword} keywordChange={changeSearchParams} />
}

class ArchivedPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            notes: getArchivedNotes(),
            keyword: props.defaultKeyword || '',
        }

        this.onKeywordChangeHandler = this.onKeywordChangeHandler.bind(this);
    }

    onKeywordChangeHandler(keyword) {
        this.setState(() => {
          return {
            keyword,
          }
        });
    
        this.props.keywordChange(keyword);
    }

    render() {
        const notes = this.state.notes.filter((note) => {
            return note.title.toLowerCase().includes(
              this.state.keyword.toLowerCase()
            );
        });

        return (
            <div className="archives-page">
                <h2>Catatan Arsip</h2>
                <SearchBar keyword={this.state.keyword} keywordChange={this.onKeywordChangeHandler} />
                <NoteList notes={notes}/>
            </div>
        )
    }
}

ArchivedPage.propTypes = {
    keywordChange: PropTypes.func.isRequired,
    defaultKeyword: PropTypes.string.isRequired
}

export default ArchivedPageWrapper;