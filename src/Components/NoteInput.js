import React from "react";
import PropTypes from 'prop-types';

class NoteInput extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            id:'',
            title:'',
            body:'',
            createdAt:'',
            archived: false
        }

        this.onTitleChangeEventHandler = this.onTitleChangeEventHandler.bind(this);
        this.onBodyChangeEventHandler = this.onBodyChangeEventHandler.bind(this);
        this.onSubmitEventHandler = this.onSubmitEventHandler.bind(this);
    }

    onTitleChangeEventHandler(event) {
        this.setState(()=> {
            return {
                title: event.target.value,
            }
        });
    }

    onBodyChangeEventHandler(event) {
        this.setState(()=> {
            return {
                body: event.target.value,
            }
        });
    }

    onSubmitEventHandler(event) {
        event.preventDefault();
        this.props.addNote(this.state);
    }


    render () {
        return (
            <form className="add-new-page__input" onSubmit={this.onSubmitEventHandler}>
                <input className="add-new-page__input__title" placeholder="Ini adalah judul ..." value={this.state.title} onChange={this.onTitleChangeEventHandler}/>
                <textarea className="add-new-page__input__body" placeholder="Tuliskan catatanmu disini ..." value={this.state.body} onChange={this.onBodyChangeEventHandler}/>
                <div className="add-new-page__action">
                    <button className="action" type="submit" title="Simpan">
                    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0V0z"></path><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"></path></svg>
                    </button>
                </div>
            </form>
        )
    }
}

NoteInput.propTypes = {
    addNote: PropTypes.func.isRequired,
}

export default NoteInput;