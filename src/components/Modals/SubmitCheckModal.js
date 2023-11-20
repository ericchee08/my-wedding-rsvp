import { useState } from "react";
import "./SubmitCheckModalStyle.css"

const SubmitCheckModal = ({ handleSubmit, message, closeBtnStatus }) => {
    const[modal, setModal] = useState(false);
    
    const toggleModal = () => {
        setModal(!modal)
    }
    const closeBtn = closeBtnStatus;

    if(modal) {
        document.body.classList.add('active-modal')    
    }
    else {
        document.body.classList.remove('active-modal')
    }

  return (
    <div>
        <button onClick={toggleModal} className="btn-modal">Submit</button>

        {modal && (<div className="modal">
            <div className="overlay"></div>
                <div className="modal-content"><h2>Are you Sure?</h2>
                    <p>{message}</p>
                    <button className="close-modal" onClick={toggleModal}>Close</button>
                    {closeBtn && (<button className="" onClick={handleSubmit}>Submit</button>)}
                </div>
            </div>
        )}
    </div>
  )
}

export default SubmitCheckModal