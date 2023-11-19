import { useContext } from "react";
import { showDeleteModal, showUpdateModal } from "../../utils/Note";
import style from "./Note.module.css";
import { userContext } from "../../Context/UserContext";
import { noteContext } from "../../Context/NoteContext";

export default function Note({ noteObj }) {
  const { token } = useContext(userContext);
  const {setNotes} = useContext(noteContext);
  return (
    <>

        <div className={`${style.note} note shadow `}>
        <div className="note-body">
        <h2 className="h6 fw-semibold m-0 font-Montserrat ">{noteObj.title}</h2>
        <p className={`mb-0 mt-2`}>{noteObj.content}</p>
        </div>

        <div className="note-footer">
          <i className="fa-solid fa-pen-to-square pointer me-2" onClick={()=>{showUpdateModal({noteId: noteObj._id , prevTitle: noteObj.title , prevContent: noteObj.content , token , updater: setNotes})}}></i>

          <i className="bi bi-archive-fill pointer" onClick={()=>{showDeleteModal({token, noteId: noteObj._id , updater: setNotes})}}></i>
        </div>
      </div>

     
    </>
  )
}
