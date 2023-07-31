import { Divider, IconButton } from '@mui/material'
import React from 'react'
import CloseFullscreenIcon from '@mui/icons-material/CloseFullscreen';

export default function NewEnvironment({ setOpen }) {
    return (
        <>
            <div className="container-fluid linear">
                <div className="mt-2 p-0">
                    <div className="d-flex">
                        <IconButton className="mx-2" onClick={() => setOpen(false)} ><CloseFullscreenIcon/></IconButton> 
                        <h4 className="">מאגר משימות</h4>
                    </div>
                    <div className="">  לבקשת הצטרפות נא מלא את הטופס  *</div>
                </div>
            </div>
        </>
    )
}


{/* <div className="" onClick={() => setOpen(false)} >uiyt</div> */ }
