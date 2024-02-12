import { useDispatch, useSelector } from "react-redux"
import { SET_MODAL_DATA } from "../store/reducers/app.reducer"
import { useEffect, useRef } from "react"



export function DynamicModal() {
    const modalData = useSelector(storeState => storeState.appModule.modalData)
    const dispatch = useDispatch()
    const modalRef = useRef()

    useEffect(() => {

        if (modalData) {
            setTimeout(() => {
                document.addEventListener('click', handleClickOutside)
            }, 0)
        }

        return () => {
            document.removeEventListener('click', handleClickOutside)
        }

    }, [modalData])

    function onCloseModal() {
        dispatch({ type: SET_MODAL_DATA, modalData: null })
    }

    function handleClickOutside(ev) {
        if (modalRef.current && !modalRef.current.contains(ev.target)) {
            onCloseModal()
        }
    }

    if (!modalData) return <></>
    const Cmp = modalData?.cmp

    return (
        <div ref={modalRef} className="dynamic-modal">
            <div className="content">
                {Cmp && <Cmp {...modalData.props} />}
            </div>
        </div>
    )
}

