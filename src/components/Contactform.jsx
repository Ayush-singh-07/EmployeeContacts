import React, { useState } from "react";
import 'tachyons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Contactform(props){


    return (<div className="fl w-third pa2">
    
        <article className="center mw5 mw6-ns hidden ba mv4">
            <h1 className="f4 bg-near-black white mv0 pv2 ph3">Employee Contact Book</h1>
            <div clasNames="pa3 bt">
                <form className="pa4 black-80">
                    <div className="measure">
                        <label htmlFor="name" className="f6 b db mb2">Name </label>
                        <input id="name" name="name" onChange={props.handleChange} className="input-reset ba b--black-20 pa2 mb2 db w-100" type="text" aria-describedby="name-desc" value={props.newContact.name}/>
                    </div>
                    <div className="measure">
                        <label htmlFor="name" className="f6 b db mb2">Email </label>
                        <input id="name" name="email" onChange={props.handleChange} className="input-reset ba b--black-20 pa2 mb2 db w-100" type="email" aria-describedby="name-desc" value={props.newContact.email}/>
                    </div>
                    <div className="measure">
                        <label htmlFor="name" Name="f6 b db mb2">Phone Number </label>
                        <input id="name" name="phone" onChange={props.handleChange} class="input-reset ba b--black-20 pa2 mb2 db w-100" type="text" aria-describedby="name-desc" value={props.newContact.phone}/>
                    </div>

                    {
                        props.updating ? 
                            <div className="measure">
                                <button onClick={props.handleUpdate} className="f6 link dim br2 ph3 pv2 mb2 dib white bg-black" > Update </button>
                            </div>
                        :
                            <div className="measure">
                                <button onClick={props.save} className="f6 link dim br2 ph3 pv2 mb2 dib white bg-black" > Save </button>
                            </div>
                    }
                </form>
            </div>
        </article>
        <ToastContainer/>
    </div>)
}

export default Contactform;