import { IoClose } from "react-icons/io5";
import { onToggleModal } from "../store/actions/app.actions";
import { useEffect, useState } from "react";
import { RiMusic2Line } from "react-icons/ri";

export function StationEditModal({station}) {
    const [modalFields, setModalFields] = useState({
        title: '',
        description: ''
    });

    useEffect(() => {
        // This effect will run on mount and whenever the `station` prop changes.
        setModalFields({
            title: station ? station.name : '',
            description: station ? station.description : ''
        });
    }, [station]); // Dependency array includes `station` to listen for changes


    function handleChange(event) {
        const { name, value } = event.target
        setModalFields({
            ...modalFields,
            [name]: value // Use the name attribute to update the correct state property
        })
    }

    if(!station) return ""
    console.log(modalFields)

    return (
        <div className="station-edit-modal">
            <div className="modal-header">
                <div>Edit details </div>
                <IoClose className="close" onClick={() => { onToggleModal(null) }} />
            </div>
            <div className="modal-details">

                <input className="title" id="title" name="title" type="text" placeholder="Add a name" value={modalFields.title} onChange={handleChange} />
                <div className="description">
                    <label for="description"></label>
                    <textarea id="description" name="description" type="text"
                        placeholder="Add an optional description" value={modalFields.description} onChange={handleChange}> </textarea>
                </div>

                <div className="station-image">
                   
                    {station.createdBy.imgUrl
                            ? <img src={station.createdBy.imgUrl} className='station-img' />
                            : <RiMusic2Line className='station-no-img' />
                        }
                </div>


                <div className="save-button">
                    <div className="inner-button">Save</div>
                </div>
                <div className="disclaimer">By proceeding, you agree to give beat access to the image you choose to upload.
                    Please make sure you have the right to upload the image.</div>






            </div>

            {/* <button className="simple-button">Approve</button> */}
        </div>
    )
}