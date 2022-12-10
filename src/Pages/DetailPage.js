import React from "react";
import { useParams, useNavigate } from 'react-router-dom';
import NoteDetail from "../Components/NoteDetail";
import { getNote, deleteNote, archiveNote, unarchiveNote } from '../utils/network-data';
import ArchivedButton from "../Components/ArchivedButton";
import DeleteButton from "../Components/DeleteButton";
import NotFound from "./NotFound";
import Loading from "react-fullscreen-loading";
import LocaleContext from "../contexts/LocaleContext";

function DetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [note, setNote] = React.useState(null);
    const [isLoading, setIsLoading] = React.useState(true);
    const { theme } = React.useContext(LocaleContext);

    React.useEffect(() => {
        getNote(id).then(({ data }) => {
          setNote(data);
          setIsLoading(false);
        })
    }, [id]);

    async function onDeleteHandler(id) {
        await deleteNote(id);
        note.archived ? navigate("/archives")
        : navigate("/");
    }
    
      async function onArchiveHandler(id) {
        await archiveNote(id);
        navigate("/");
    }
    
      async function onUnarchiveHandler(id) {
        await unarchiveNote(id);
        navigate("/archives");
    }

    return (
        <>
            {
                (() => {
                    if (isLoading) {
                        return <Loading loading={true} background={theme === "dark" ? "#fff" : "#212529"} loaderColor="#0dcaf0" />;
                    }
                  
                    if (note === null) {
                        return (
                            <div>
                                <NotFound/>
                            </div>
                        )
                    }
                        return (
                            <>
                                <NoteDetail {...note}/>
                                <div className="detail-page__action">
                                    <ArchivedButton id={id} onUnarchive={onUnarchiveHandler} onArchive={onArchiveHandler} archived={note.archived}/>
                                    <DeleteButton id={id} onDelete={onDeleteHandler}/>        
                                </div>
                            </>
                        )
                })() 
            }
        </>
    )
}

export default DetailPage;