import React from "react";
import { useSearchParams } from 'react-router-dom';
import NoteList from "../Components/NoteList";
import SearchBar from "../Components/SearchBar";
import { getArchivedNotes } from '../utils/network-data';
import PropTypes from 'prop-types';
import { LocaleConsumer } from "../contexts/LocaleContext";

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
            notes: [],
            keyword: props.defaultKeyword || '',
        }

        this.onKeywordChangeHandler = this.onKeywordChangeHandler.bind(this);
    }

    async componentDidMount() {
        const { data } = await getArchivedNotes();
    
        this.setState(() => {
          return {
            notes: data
          }
        })
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
          <LocaleConsumer>
            {
              ({ locale }) => {
                return (
                  <div className="archives-page">
                    <h2>{locale === 'id' ? 'Catatan Arsip' : 'Archived Note'}</h2>
                    <SearchBar keyword={this.state.keyword} keywordChange={this.onKeywordChangeHandler} />
                    <NoteList notes={notes}/>
                  </div>
                )
              }
            }
          </LocaleConsumer>
        )
    }
}

ArchivedPage.propTypes = {
    keywordChange: PropTypes.func.isRequired,
    defaultKeyword: PropTypes.string,
}

export default ArchivedPageWrapper;