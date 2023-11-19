import axios from "axios";
import Swal from "sweetalert2";

//? =================> ADD NOTE

//* 1--------> SHOW MODAL
export function showAddModal({token , updater}) {
    
    Swal.fire({
        title: "Add Note 💜",
        html: `
        <input type="text" placeholder="Enter a Title" id="title" name="title" class="form-control"/>
        <textarea type="text" placeholder="Enter a Description" id="content" name="content" class="form-control mt-3"></textarea>
        `,
        showCancelButton: true,
        confirmButtonText: "Add",
        showLoaderOnConfirm: true,
        preConfirm: () => {
            const title = document.getElementById("title").value;
            const content = document.getElementById("content").value;
            return {title , content}
        },
        allowOutsideClick: () => !Swal.isLoading()
        }).then((result) => {
            sendAddNoteData({
                title: result.value.title,
                content: result.value.content,
                token,
                updater
            })

      });
};
//* 2--------> SEND INPUTS TO API
async function sendAddNoteData({title , content , token , updater}) {
    const {data} = await axios.post(`https://note-sigma-black.vercel.app/api/v1/notes`,{title , content} , {headers: {token}})
    if (data.msg === "done") {
        getAllNotes({token, updater})
        Swal.fire({
            position: "center",
            icon: "success",
            title: "Your note has been added",
            showConfirmButton: false,
            timer: 1500
          });
    }
};
//* 3--------> SHOW NOTE
export async function getAllNotes({ token, updater }) {
    try {
        const { data } = await axios.get(`https://note-sigma-black.vercel.app/api/v1/notes`, { headers: { token } });
        updater(data.notes);
    } catch (error) {
        updater([]);
    }
    
}

//! =================> DELETE NOTE
export function showDeleteModal({ noteId , token , updater}) {
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
            deleteNote({ noteId, token, updater });
        }
      });
}
async function deleteNote({token, noteId , updater}) {
    const {data} = await axios.delete(`https://note-sigma-black.vercel.app/api/v1/notes/${noteId}`,{headers:{token}})
    console.log(data)
    if (data.msg === "done") {
        getAllNotes({token , updater})
        Swal.fire("Deleted!", "Your Note has been deleted.", "success");
    }
}


//? ================> UPDATE NOTE
export function showUpdateModal({ noteId , prevTitle , prevContent , token , updater}) {
    Swal.fire({
        title: "Update Note 💜",
        html: `
        <input type="text" placeholder="Enter a Title" id="title" name="title" class="form-control" value="${prevTitle}"/>
        <textarea type="text" placeholder="Enter a Description" id="content" name="content" class="form-control mt-3">${prevContent}</textarea>
        `,
        showCancelButton: true,
        confirmButtonText: "Update",
        showLoaderOnConfirm: true,
        preConfirm: () => {
            const title = document.getElementById("title").value;
            const content = document.getElementById("content").value;
            return {title , content}
        },
        allowOutsideClick: () => !Swal.isLoading()
        }).then((result) => {
           
            updateNote({noteId , title: result.value.title , content: result.value.content , token , updater})

      });
}

async function updateNote({ noteId , title , content , token , updater }) { 
    const { data } = await axios.put(`https://note-sigma-black.vercel.app/api/v1/notes/${noteId}`, { title, content }, { headers: { token } });
    

    getAllNotes({ token, updater });

    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Your Note has been updated',
        showConfirmButton: false,
        timer: 1000
      })
}
 
