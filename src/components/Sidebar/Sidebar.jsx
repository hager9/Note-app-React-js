import { useContext } from "react";
import style from "./Sidebar.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import { userContext } from "../../Context/UserContext";
import { showAddModal } from "../../utils/Note";
import { noteContext } from "../../Context/NoteContext";

export default function Sidebar({isMinimized, setIsMinimized}) {
  const { logOut, token } = useContext(userContext);
  const { setNotes} = useContext(noteContext);
  const navigate = useNavigate();

  async function userLogout() {
    await logOut();
    navigate('/login');
  };

  return (
    <>
      <nav className={`${style.nav} shadow-sm`}>
        <button className="btn btn-main text-capitalize w-100 mb-3" onClick={()=>{showAddModal({token , updater : setNotes })}}>
          <i className="fa-solid fa-plus me-2"></i>
          {isMinimized? "" : "New Note"}
        </button>
        <ul className="list-unstyled">
          <li>
            <NavLink to="/">
              <i className="bi bi-house-heart me-2"></i>
              {isMinimized? "" : "Home"}
            </NavLink>
          </li>
         
          <li onClick={userLogout}>
            <span className="pointer">
              <i className="bi bi-box-arrow-left me-2"></i>
              {isMinimized? "" : "Log Out"}
            </span>
          </li>
          <li></li>
        </ul>
        <div className={`${style.change} shadow pointer`} onClick={()=>{setIsMinimized(!isMinimized)}}>
          <i className={`fa-solid ${isMinimized? "fa-chevron-right" : "fa-chevron-left" }`}></i>
        </div>
      </nav>
    </>
  );
}
