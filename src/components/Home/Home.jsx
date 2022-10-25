import React, { useEffect } from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Home.css"
import Upload from '../../assests/upload.png'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import "react-bootstrap/";
import Swal from 'sweetalert2';

function HomeComponent() {
  const navigate = useNavigate()
  const [state, setState] = useState([])
  const [imgURL , setImageURL] = useState("")
  const [category , setCategory]=  useState("")
  const data = require("../../data/data.json")

  // //(data,'data')
  useEffect(() => {
    setState(data)
    //("state", state)
  })
  const [hover, setHover] = useState(0)
  const [file , setFile ] = useState(null)

  function hoverStart(e) {
    setHover(e)
  }
  function hoverEnd() {
    setHover(0)
  }
  
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  function triggerModal(){
  const { value: formValues  } =  Swal.fire({
    title: 'Multiple inputs',
    html:
    '<label>Select Category</label>'+
      '<select id="swal-input1" class="swal2-input"> <option value="Men">Men</option>'+
      '<option value="Women">Women</option>'+
      '<option value="Kids">Kids</option></select>' +
      '<br/>'+
      '<label>Add image URL</label>'+
      '<input id="swal-input2" class="swal2-input">',
    focusConfirm: false,
    preConfirm: () => {
      return [
        document.getElementById('swal-input1').value,
        document.getElementById('swal-input2').value,
        //(document.getElementById('swal-input1').value),
        data.push({id:data.length+1 ,category:document.getElementById('swal-input1').value ,thumbnail:document.getElementById('swal-input2').value, original:document.getElementById('swal-input2').value})
      ]
    }
  })
  
  if (file) {
    Swal.fire(JSON.stringify(file))
  }
}

async function triggerLocalModal(){
  const { value: formValues  } = await  Swal.fire({
    title: 'Multiple inputs',
    html:
    '<label>Select Category</label>'+
      '<select id="swal-input1" class="swal2-input"> <option value="Men">Men</option>'+
      '<option value="Women">Women</option>'+
      '<option value="Kids">Kids</option></select>' +
      '<br/>'+
      '<label>Select image From Computer</label>'+
      `<input id="swal-input2" class="swal2-input" onchange="${((e)=>{console.log(data)
         console.log((e.target.files[0]))})}" type="file">`,
    focusConfirm: false,
    preConfirm: () => {
        data.push({id:data.length+1 ,category:document.getElementById('swal-input1').value ,thumbnail:URL.createObjectURL(document.getElementById('swal-input2').files[0]), original:URL.createObjectURL(document.getElementById('swal-input2').files[0])})
    }
  })
  
  if (file) {
    Swal.fire(JSON.stringify(file))
  }
}
  return (
    <div >
      <div className='main'>
        <h2>Product gallery</h2>
      </div>
      <div className='flexrow'> 
        <div className='upload'>
          <button style={{ display: "", width: 120, height: 120,justifyContent:'center',alignItems:'center' }} type="file" onClick={()=>triggerLocalModal().then(e=>console.log(e,"e"))} >
            <img src={Upload} className='uploadimg'/>
            <h3>Upload from local</h3>
          </button>
        </div>
      </div>
      <div className='mainposition'>
        <h2 className='heading'>Men</h2>
        <div className='mainHolder'>
          {state.filter(e=>e.category == "Men").map((e) =>
            <div className='container'>
              <img onClick={() => {
                navigate(`/gallery/${e.id}`)
              }} className='image' src={e.thumbnail} onMouseEnter={() => hoverStart(e.id)}
                onMouseLeave={hoverEnd}></img>
              {e.id === hover ? <div class="middle">
                <p className="text" >View image</p>
              </div> : ""}
            </div>
          )}
        </div>
        <h2 className='heading'>Women</h2>
        <div className='mainHolder'>
          {state.filter(e=>e.category == "Women").map((e) =>
            <div className='container'>
              <img onClick={() => {
                navigate(`/gallery/${e.id}`)
              }} className='image' src={e.thumbnail} onMouseEnter={() => hoverStart(e.id)}
                onMouseLeave={hoverEnd}></img>
              {e.id === hover ? <div class="middle">
                <p className="text" >View All</p>
              </div> : ""}
            </div>
          )}
        </div>
        <h2 className='heading'>Kids</h2>
        <div className='mainHolder'>
          {state.filter(e=>e.category == "Kids").map((e) =>
            <div className='container'>
              <img onClick={() => {
                navigate(`/gallery/${e.id}`)
              }} className='image' src={e.thumbnail} onMouseEnter={() => hoverStart(e.id)}
                onMouseLeave={hoverEnd}></img>
              {e.id === hover ? <div class="middle">
                <p className="text" >View All</p>
              </div> : ""}
            </div>
          )}
        </div>
      </div>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Image</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <label>Select Category</label>
          <select></select>
          <br/>
          <label>Image URL</label>
          <input type="text" onChange={e=> {setImageURL(e.target.value)
            data.push({id:data.length+1, thumbnail:e.target.value , original:e.target.value})
            //(data,"set")
          }}/>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary">Save</Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default HomeComponent