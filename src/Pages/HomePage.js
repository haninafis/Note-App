import React from "react";
import { useSearchParams } from 'react-router-dom';
import NoteList from "../Components/NoteList";
import SearchBar from "../Components/SearchBar";
import { getActiveNotes } from '../utils/network-data';
import HomePageAction from "../Components/HomePageAction";
import PropTypes from 'prop-types';
import { LocaleConsumer } from "../contexts/LocaleContext";

function HomePageWrapper() {
    const [searchParams, setSearchParams] = useSearchParams();
    const keyword = searchParams.get('keyword');
    function changeSearchParams(keyword) {
      setSearchParams({ keyword });
    }
   
    return <HomePage defaultKeyword={keyword} keywordChange={changeSearchParams} />
}

class HomePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            notes: [],
            keyword: props.defaultKeyword || '',
        }

        this.onKeywordChangeHandler = this.onKeywordChangeHandler.bind(this);
    }

    async componentDidMount() {
        const { data } = await getActiveNotes();
    
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
                <div className="homepage">
                  <h2>{locale === 'id' ? 'Catatan Aktif' : 'Active Note'}</h2>
                  <SearchBar keyword={this.state.keyword} keywordChange={this.onKeywordChangeHandler} />
                  <NoteList notes={notes}/>
                  <HomePageAction/>
                </div>
              )
            }
          }
        </LocaleConsumer>
        )
    }
}

HomePage.propTypes = {
    keywordChange: PropTypes.func.isRequired,
    defaultKeyword: PropTypes.string.isRequired
}

export default HomePageWrapper;
