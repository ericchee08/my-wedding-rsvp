import { useState } from "react";
import "../../styles/SubmitCheckModalStyle.css"

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
                <div className="modal-content">
                    <p>{message}</p>
                    <div className="modal-btn-container">
                        <button className="close-btn" onClick={toggleModal}>Close</button>
                        {closeBtn && (<button className="submit-btn" onClick={handleSubmit}>Submit</button>)}
                    </div>
                </div>
            </div>
        )}
    </div>
  )
}

export default SubmitCheckModal