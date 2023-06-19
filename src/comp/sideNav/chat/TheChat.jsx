import React, { useContext, useState } from 'react'
import "./TheChat.css"
import { AiOutlineSend } from 'react-icons/ai';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import { BsCheck2All } from 'react-icons/bs';
import { AiOutlineClose } from 'react-icons/ai';
import { BiSearchAlt } from 'react-icons/bi';
import { MyContext } from '../../../App';

export default function TheChat({ setChatOpen, chatOpen, iForChat }) {
    const { missions } = useContext(MyContext)
    const [called, setCalled] = useState(false)
    console.log(iForChat);
    let i = 0;

    return (
        <>
            <div className="chat">
                <div className="top_chat text-light d-flex justify-content-between">
                    <div className="">
                        <h5 className="mb-0 mx-1">{missions[iForChat]?.title}</h5>
                        <div className="mx-1">משתתפים ..     
                        {/* {missions[iForChat].responsibility} */}
                         </div>
                    </div>
                    <div className="mx-1 my-2 mx-2 d-flex">
                        <div className="icon_searc mx-1" title='חפש'> <BiSearchAlt size={25} /></div>
                        <div className="icon_searc mx-1" title='סגור'> <AiOutlineClose size={25} onClick={() => setChatOpen(!chatOpen)} /></div>
                    </div>
                </div>
                <div className="middle_chat">
                    <div className="the_message mx-1 p-1 mt-2 text-light">
                        <samp className="mb-1 taxt-dark">{missions[iForChat]?.responsibility}</samp>
                        <samp>
                            sadfhgjk Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta, magni? Repellendus impedit minus nulla culpa vel. Molestiae nemo fugit assumenda repudiandae eius est nostrum, et mollitia porro. Doloribus, at impedit. Id provident, maxime dolorum, ut earum sapiente mollitia ipsam cumque temporibus laborum placeat facilis unde et accusamus corrupti inventore facere animi eos.
                            {!called ? <div id='Down' className="form-check form-switch mb-1" dir='ltr' onChange={(e) => setCalled(e.target.checked)}>
                                <input className="form-check-input cursor ml-1" type="checkbox" role="switch" id="switchCheck" />
                                <label className="form-check-label" htmlFor="switchCheck">אשר קריאה</label>
                            </div> : <div className='d-flex justify-content-end mx-2'><BsCheck2All color='skyblue'/></div>}
                        </samp>
                    </div>
                  <a href="#Down" className=''>
                  <div className="d-flex justify-content-end sticky-bottom mx-3" title='למטה'
                       ><KeyboardDoubleArrowDownIcon color='dark' className='icon_down mb-1' /></div>
                  </a>
                </div>
                <div className="bottom_chat d-flex">
                    <input className='bottom_chat_input mx-1' type="text" placeholder='הודעה' />
                    <div className="div_icon_send" title='שלח'> <AiOutlineSend className='icon_send' size={40} /></div>
                </div>
            </div>
        </>
    )
}
