import { useContext , useEffect, useState } from "react";
import styles from "./Home.module.css";
import { noteContext } from "../../Context/NoteContext";
import { userContext } from "../../Context/UserContext";
import { getAllNotes } from "../../utils/Note";
import Loading from "../Loading/Loading";
import Note from "../Note/Note";

export default function Home() {
  const { notes, setNotes } = useContext(noteContext);
  const { token } = useContext(userContext);
  

  useEffect(() => {
    getAllNotes({ token, updater: setNotes });
  }, []);

  return <>
    <h2 className="font-Montserrat h4 heading">
        <i className="bi bi-folder me-2"></i>My Notes
    </h2>
    {notes === null ? <Loading /> : notes.length === 0 ? <h2 className="text-center my-5">No notes found</h2> : 
      <div className={styles.notes}>
        {notes.map((note) => (
          
        <Note noteObj={note} key={note._id}/>
        
      ))}
    </div>
      }
    </>
  
}
