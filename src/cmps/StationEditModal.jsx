import { IoClose } from "react-icons/io5"
import { onToggleModal } from "../store/actions/app.actions"
import { useEffect, useState } from "react"
import { RiMusic2Line } from "react-icons/ri"
import { uploadService } from "../services/upload.service"
import { ThreeDots } from 'react-loader-spinner'

export function StationEditModal({ station, onUpdateStation }) {
    const [modalFields, setModalFields] = useState({
        title: '',
        description: ''
    })

    const [imgData, setImgData] = useState({
        imgUrl: null,
        height: 500,
        width: 500,
    })
    const [isUploading, setIsUploading] = useState(false)


    //const [imageUrl, setImageUrl] = useState('')

    useEffect(() => {
        // This effect will run on mount and whenever the `station` prop changes.
        setModalFields({
            title: station ? station.name : '',
            description: station ? station.description : ''
        })

        setImgData(prevData => ({
            ...prevData, imgUrl: station.imgUrl
        }))
        //       setImageUrl(station?.imgUrl)
    }, [station]); // Dependency array includes `station` to listen for changes


    function handleChange(event) {
        const { name, value } = event.target
        setModalFields({
            ...modalFields,
            [name]: value // Use the name attribute to update the correct state property
        })

    }

    async function uploadImg(ev) {
        setIsUploading(true)
        const { secure_url, height, width } = await uploadService.uploadImg(ev)
        setImgData({ imgUrl: secure_url, width, height })
        setIsUploading(false)
    }



    function onSave() {
        if (modalFields.title) station.name = modalFields.title
        if (modalFields.description) station.description = modalFields.description
        if (imgData.imgUrl) station.imgUrl = imgData.imgUrl
        onUpdateStation(station)
        onToggleModal(null)
    }

    if (!station) return ""

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

                <div className="station-image" onClick={() => document.getElementById('imgUpload').click()}>
                    {isUploading ? (
                        <div className="station-no-img">
                        <ThreeDots  visible={true} height="50" width="50" color="#D3D3D3" radius="4" ariaLabel="three-dots-loading" />
                        </div>) :
                        (
                            <div className='img-container'>
                                < input type="file" onChange={uploadImg} accept="img/*" id="imgUpload" />
                                {imgData.imgUrl
                                    ? <img src={imgData.imgUrl} className='station-img' />
                                    : <RiMusic2Line className='station-no-img' />
                                }
                            </div>
                        )}
                </div>

                <div className="save-button">
                    <div className="inner-button" onClick={onSave}>Save</div>
                </div>
                <div className="disclaimer">By proceeding, you agree to give beat access to the image you choose to upload.
                    Please make sure you have the right to upload the image.</div>






            </div>

            {/* <button className="simple-button">Approve</button> */}
        </div>
    )
}