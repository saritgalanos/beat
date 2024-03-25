import { IoClose } from "react-icons/io5"
import { onToggleModal } from "../store/actions/app.actions"
import { useEffect, useState } from "react"
import { RiMusic2Line } from "react-icons/ri"
import { uploadService } from "../services/upload.service"
import { ThreeDots } from 'react-loader-spinner'

export function MenuModal({ menuItems, position }) {
    const modalStyle = {
        position: 'absolute',
        ...position
      };
    


    return (
        <div className="menu-modal" style={modalStyle}>
          {menuItems.map((item, index) => (
            <div className="menu-item fs13" key={index} onClick={() => item.action(item.param)}>
              {item.text}
            </div>
          ))}
        </div>
      )

   
}