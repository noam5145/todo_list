import React, { useContext, useState} from 'react'
import "./TheChat.css"
import { AiOutlineSend } from 'react-icons/ai';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import { BsCheck2All } from 'react-icons/bs';
import { AiOutlineClose } from 'react-icons/ai';
import { BiSearchAlt } from 'react-icons/bi';
import { MyContext } from '../../../../App';

export default function TheChat({ setChatOpen, chatOpen, iForChat }) {
    const { missions, currentUser } = useContext(MyContext)
    const [called, setCalled] = useState(false);

    const textUpdate = (e) =>{
       const newMessage = e.target.value
        console.log(newMessage);
    }   

    return (
        <>
            <div className="chat">
                <div className="top_chat text-light d-flex justify-content-between">
                <div className="">
                        <h5 className="mb-0 mx-1">{missions? missions[iForChat]?.title : "משימה"}</h5>
                        <div className="d-flex">
                            <div className="mx-1">
                                {missions[iForChat]?.responsibility.length < 8 
                                ? missions[iForChat]?.responsibility
                                :missions[iForChat]?.responsibility.slice(0,8)+ "... ,"}
                            </div>
                            <div className="">
                               {currentUser?.username.length < 8 
                                ?currentUser?.username
                                :currentUser?.username.slice(0,8) + "..."}
                            </div>
                    </div>
                    </div>
                    <div className="mx-1 my-2 mx-2 d-flex">
                        <div className="icon_searc mx-1" title='חפש'> <BiSearchAlt size={25} /></div>
                        <div className="icon_searc mx-1" title='סגור'> <AiOutlineClose size={25} onClick={() => setChatOpen(!chatOpen)} /></div>
                    </div>
                </div>
                <div className="middle_chat mx-1">
                <div className="d-flex justify-content-end">
                    <div className="the_message mx-1 p-1 mt-2 text-light">
                        <div className="mb-1 taxt-dark text-info">{missions[iForChat]?.responsibility}</div>
                        <samp>
                            sadfhgjk Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta, magni? Repellendus impedit minus nulla culpa vel. Molestiae nemo fugit assumenda repudiandae eius est nostrum, et mollitia porro. Doloribus, at impedit. Id provident, maxime dolorum, ut earum sapiente mollitia ipsam cumque temporibus laborum placeat facilis unde et accusamus corrupti inventore facere animi eos.
                            {!called ? <div id='Down' className="form-check form-switch mb-1" dir='ltr' onChange={(e) => setCalled(e.target.checked)}>
                                <input className="form-check-input cursor ml-1" type="checkbox" role="switch" id="switchCheck" />
                                <label className="form-check-label" htmlFor="switchCheck">אשר קריאה</label>
                            </div> : <div className='d-flex justify-content-end mx-2'><BsCheck2All color='skyblue' /></div>}
                        </samp>
                    </div>
                    </div>
                    <a href="#Down">
                        <div className="d-flex justify-content-end sticky-bottom mx-3" 
                        ><KeyboardDoubleArrowDownIcon color='warning' title='למטה' className='icon_down mb-1 bg-light' /></div>
                    </a>
                </div>
                <div className="bottom_chat d-flex">
                    <input onChange={(e)=> textUpdate(e)} className='bottom_chat_input mx-1' type="text" placeholder='הודעה' />
                    <div className="div_icon_send" title='שלח'> <AiOutlineSend className='icon_send' size={40} /></div>
                </div>
            </div>
        </>
    )
}
