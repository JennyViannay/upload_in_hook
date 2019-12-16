import React, { useState, useEffect } from 'react'

const DragAndDrop = (props) => {
    const [drag, setDrag] = useState(false)
    const [dragCounter, setDragCounter] = useState(0)
    const dropRef = React.createRef()
    

    const handleDrag = (e) => {
        e.preventDefault()
        e.stopPropagation()
    }

    const handleDragIn = (e) => {
        e.preventDefault()
        e.stopPropagation()
        setDragCounter(dragCounter++)
        if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
            setDrag(true)
        }
    }
    const handleDragOut = (e) => {
        e.preventDefault()
        e.stopPropagation()
        setDragCounter(dragCounter--)
        if (this.dragCounter === 0) {
            setDrag(false)
        }
    }
    const handleDrop = (e) => {
        e.preventDefault()
        e.stopPropagation()
        setDrag(false)
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            props.handleDrop(e.dataTransfer.files)
            e.dataTransfer.clearData()
            setDragCounter(0)
        }
    }
    useEffect(() => {
        let div = dropRef.current
        div.addEventListener('dragenter', handleDragIn)
        div.addEventListener('dragleave', handleDragOut)
        div.addEventListener('dragover', handleDrag)
        div.addEventListener('drop', handleDrop)
    })
    useEffect(() => {
        let div = dropRef.current
        div.removeEventListener('dragenter', handleDragIn)
        div.removeEventListener('dragleave', handleDragOut)
        div.removeEventListener('dragover', handleDrag)
        div.removeEventListener('drop', handleDrop)
    })
   
        return (
            <div className="drag-drop-container" ref={dropRef}>
                <div className="drag-drop-input">
                    <div className="drag-drop-input py-5">
                        <div className="text-center my-3">Drop your bullshits here...</div>
                        <div className="text-center">
                            <i className="fas fa-fish fa-3x mx-3"></i>
                            <i className="fas fa-frog fa-3x mx-3"></i>
                            <i className="fas fa-user-ninja fa-3x vanished mx-3"></i>
                        </div>
                    </div>
                </div>
                {props.children}
            </div>
        )
    
}
export default DragAndDrop