import React from "react";
import { addNote } from '../utils/local-data';
import NoteInput from "../Components/NoteInput";
import { useNavigate } from 'react-router-dom';

function AddPage() {
    const navigate = useNavigate();

  function onAddNoteHandler(Note) {
    addNote(Note);
    navigate('/');
  }
 
  return (
    <div className="add-new-page">
      <NoteInput addNote={onAddNoteHandler} />
    </div>
  )
}
 
export default AddPage;