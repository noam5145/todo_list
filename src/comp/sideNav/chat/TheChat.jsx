import React, { useContext, useState } from 'react'
import "./TheChat.css"
import { AiOutlineSend } from 'react-icons/ai';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import { BsCheck2All } from 'react-icons/bs';
import { AiOutlineClose } from 'react-icons/ai';
import { BiSearchAlt } from 'react-icons/bi';
import { MyContext } from '../../../App';

export default function TheChat({ setChatOpen, chatOpen }) {
    const { missions } = useContext(MyContext)
    const [called, setCalled] = useState(false)
    let i = 0;
console.log(missions.title);
    return (
        <>
            <div className="chat">
                <div className="top_chat text-light d-flex justify-content-between">
                    <div className="">
                        {/* <h5 className="mb-0 mx-1">פירוט משימה</h5> */}
                        <h5 className="mb-0 mx-1">{missions[0].title}</h5>
                        <div className="mx-1">משתתפים ..     
                        {/* {missions[0].responsibility} */}
                         </div>
                    </div>
                    <div className="mx-1 my-2 mx-2 d-flex">
                        <div className="icon_searc mx-1" title='חפש'> <BiSearchAlt size={25} /></div>
                        <div className="icon_searc mx-1" title='סגור'> <AiOutlineClose size={25} onClick={() => setChatOpen(!chatOpen)} /></div>
                    </div>
                </div>
                <div className="middle_chat">
                    <div className="the_message mx-1 p-1 mt-2 text-light">
                        <h5 className="mb-1 taxt-dark">{missions[0].responsibility}</h5>
                        <samp>
                            sadfhgjk Lorem ipsum dolor sit amet consectetur adipisicing elit. Id provident, maxime dolorum, ut earum sapiente mollitia ipsam cumque temporibus laborum placeat facilis unde et accusamus corrupti inventore facere animi eos.
                            {!called ? <div className="form-check form-switch mb-1" dir='ltr' onChange={(e) => setCalled(e.target.checked)}>
                                <input className="form-check-input ml-1" type="checkbox" role="switch" id="switchCheck" />
                                <label className="form-check-label" htmlFor="switchCheck">אשר קריאה</label>
                            </div> : <div className='d-flex justify-content-end mx-2'><BsCheck2All color='skyblue'/></div>}
                        </samp>
                    </div>
                    <div className="d-flex justify-content-end sticky-bottom mx-3" title='למטה' onClick={() =>
                        window.scrollTo(30, 30)}><KeyboardDoubleArrowDownIcon className='icon_down mb-1' /></div>
                </div>
                <div className="bottom_chat d-flex">
                    <input className='bottom_chat_input mx-1' type="text" placeholder='הודעה' />
                    <div className="div_icon_send" title='שלח'> <AiOutlineSend className='icon_send' size={40} /></div>
                </div>
            </div>
        </>
    )
}