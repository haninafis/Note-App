import React from "react";
import NoteItem from "./NoteItem";

function NoteList ({notes}) {

    return (
        <div className="notes-list">
            {
                notes.length ?
                notes.map((note)=> (
                    <NoteItem key={note.id} id={note.id} {...note}/>
                ))
                : <p>Tidak ada catatan</p>
            }
        </div>
    );

}

export default NoteList;