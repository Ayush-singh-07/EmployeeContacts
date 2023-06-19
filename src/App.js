import React, { useEffect } from "react";
import Contactform from "./components/Contactform";
import SavedContacts from './components/SavedContacts'
import { useState } from "react";
import EditModal from "./components/EditModal";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function App() {

  const [updating  , setupdating] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [newContact, setNewContact] = useState({
    name: "",
    email: "",
    phone: "",
});

const [editId, setEditId] = useState(null);




//-----------localstorage code ----------------
useEffect(()=>{
  
  const storedData = localStorage.getItem('employeeContacts');
  if(storedData){
    const parsedData = JSON.parse(storedData);
    setContacts(parsedData);
  }
},[])


function handleValidation(){
  const {name, phone, email } = newContact;
  if(name === ""){
    toast.error("Name is required", {
      position: "bottom-right",
      autoClose: 8000,
      pauseOnHover:true,
      draggable: true,
      theme: "dark"
    })
    return false;
  }
  else if(email === ""){
    toast.error("Email is required", {
      position: "bottom-right",
      autoClose: 8000,
      pauseOnHover:true,
      draggable: true,
      theme: "dark"
    })
    return false;
  }
  else if(phone.length < 10){
    toast.error("Phone Should be of length 10", {
      position: "bottom-right",
      autoClose: 8000,
      pauseOnHover:true,
      draggable: true,
      theme: "dark"
    })
    return false;
  }
  else{
    return true;
  }

}

function handleChange(e){
    const {name, value} = e.target;
    setNewContact(prev=>{
      return {
        ...prev,
        [name]:value
      }
    })
}

// function handleEdit(idx){
//   const storedContact = localStorage.getItem("employeeContacts");
//   if(storedContact){
//     const parsedContact = JSON.parse(storedContact);
//     const element = parsedContact[idx];
//     setNewContact(element);
//   }
// }


function handleEdit(idx){
  const storedContact = localStorage.getItem("employeeContacts");
  if(storedContact){
    const parsedContact = JSON.parse(storedContact);
    const element = parsedContact[idx];
    setNewContact(element);
  }
  setEditId(idx);
}

function handleCloseModal(){
  setEditId(null);
}

function handleUpdate(e){
  console.log(newContact);

  const newcon = [];
  for(let i=0; i<contacts.length; i++){
    if(i !== editId){
      newcon.push(contacts[i]);
    }
    else{
      newcon.push(newContact);
    }
  }

  setContacts(newcon);

  localStorage.removeItem("employeeContacts");
  localStorage.setItem("employeeContacts", JSON.stringify(newcon));

  handleCloseModal();
  e.preventDefault();
  setNewContact({
    name: "",
    email: "",
    phone: ""
  });
}

function handleDelete(idx){
  setContacts(prev=>{
    return contacts.filter((elem, id)=>{
      return id !== idx;
    })
  })
}


function save(e){
  
  e.preventDefault();

  if(handleValidation()){
    const updatedContacts = [...contacts, newContact];
    setContacts(updatedContacts);
    localStorage.setItem("employeeContacts", JSON.stringify(updatedContacts));
    setNewContact({
      name: "",
      email: "",
      phone: ""
    });
  }



}

  return (
    <div className="App">
      {
          (editId === null)  ?
          <div><Contactform handleChange={handleChange} updating={updating} newContact={newContact} save={save}/>
          <SavedContacts  handleEdit={handleEdit} handleDelete={handleDelete} contacts={contacts}/></div>
          :
          <EditModal 
          isOpen={true}
          closeModal={handleCloseModal}
          handleEdit={handleEdit} handleChange={handleChange} handleUpdate={handleUpdate} newContact={newContact}/>
      }
    </div>
  );
}

export default App;
