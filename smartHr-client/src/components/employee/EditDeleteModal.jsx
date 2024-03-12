import React from 'react'
import { BiSolidEdit } from "react-icons/bi";
import { FcFullTrash } from "react-icons/fc";
import './EditDeleteModal.scss'

const EditDeleteModal = () => {
  return (
    <div className='EditDeleteModal'>
      <div className="edit-icon">
      <BiSolidEdit />
      <span>Edit</span>
      </div>
      <div className="delete-icon">
      <FcFullTrash />
      <span>Delete</span>
      </div>
    </div>
  )
}

export default EditDeleteModal
