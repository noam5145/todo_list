import React, { useContext, useEffect, useRef, useState } from 'react'
import "./TheChat.css"
import { AiOutlineSend } from 'react-icons/ai';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import { BsCheck2All } from 'react-icons/bs';
import { AiOutlineClose } from 'react-icons/ai';
import { BiSearchAlt } from 'react-icons/bi';
import { MyContext } from '../../../../App';
import { Chat } from '@mui/icons-material';

export default function TheChat({ setChatOpen, chatOpen, iForChat }) {
    const { missions, currentUser, updateChat } = useContext(MyContext)
    const [called, setCalled] = useState(false);
    const [chat, setChat] = useState([]);
    const [msgTime, setMsgTime] = useState([]);
    const [msgReaded, setMsgReaded] = useState([]);
    const messageRef = useRef();

    useEffect(() => {
        if (missions[0]) {
            setChat(missions[iForChat]?.chat.messages.msg ? missions[iForChat]?.chat.messages.msg?.split('\n') : []);
            setMsgTime(missions[iForChat]?.chat.messages.time?.split('\n'));
            setMsgReaded(missions[iForChat]?.chat.messages.readed?.slice(0));
        }
    }, [missions])

    useEffect(() => {
        if (chat[0]) {
            scrollToDown();
        }
    }, [chat])

    const scrollToDown = () => {
        const element = document.getElementById("Down");
        element.scrollIntoView();
    }

    const textUpdate = () => {
        const newMessage = messageRef.current?.value;
        let time = new Date();
        time = time.getDate() + '/' + (time.getMonth() + 1) + '/' + time.getFullYear() + " " + time.getHours() + ':' + time.getMinutes();
        missions[iForChat].chat.messages.msg += '{' + currentUser.username + '}' + " " + newMessage + '\n';
        missions[iForChat].chat.messages.time += time + '\n';
        missions[iForChat].chat.messages.readed.length > 0 ? missions[iForChat].chat.messages.readed[iForChat + 1] : missions[iForChat].chat.messages.readed[iForChat] = false;
        setMsgReaded([...missions[iForChat].chat.messages.readed]);
        setChat(missions[iForChat].chat.messages.msg.split('\n'));
        setMsgTime(missions[iForChat].chat.messages.time.split('\n'));
        messageRef.current.value = "";
        updateChat(missions[iForChat], currentUser.token);
    }

    const setReaded = (readed, i) => {
        missions[iForChat].chat.messages.readed[i] = true;
        setMsgReaded([...missions[iForChat].chat.messages.readed]);
        updateChat(missions[iForChat], currentUser.token);
    }

    return (
        <>
            <div className="chat">
                <div className="top_chat text-light d-flex justify-content-between">
                    <div className="">
                        <h5 className="mb-0 mx-1">{missions ? missions[iForChat]?.title : "משימה"}</h5>
                        <div className="d-flex">
                            <div className="mx-1">
                                {missions[iForChat]?.responsibility.slice(0, 3).map((e) => e.split(' ')[0] + ', ')}
                            </div>
                        </div>
                    </div>
                    <div className="mx-1 my-2 mx-2 d-flex">
                        <div className="icon_searc mx-1" title='חפש'> <BiSearchAlt size={25} /></div>
                        <div className="icon_searc mx-1" title='סגור'> <AiOutlineClose size={25} onClick={() => setChatOpen(!chatOpen)} /></div>
                    </div>
                </div>
                <div className="middle_chat mx-1">
                    <div style={{ minHeight: "305px" }}>
                        {chat?.slice(0, chat.length - 1).map((msg, i) => (
                            <div key={i} className={`d-flex${msg.split("}")[0].slice(1) === currentUser.username ? " justify-content-start" : " justify-content-end"}`}>
                                <div className="the_message mx-1 p-1 mt-2 text-light">
                                    <samp>
                                        <div>{msg.split("}")[0].slice(1)}</div>
                                        <div className='my-1 mb-2 '>{msg.split("}")[1]}</div>
                                        {!msgReaded[i] && !(msg.split('}')[0].slice(1) === currentUser.username)
                                            ? <div className="form-check form-switch d-flex justify-content-between my-2 mx-2" dir='ltr' onChange={(e) => setCalled(e.target.checked)}>
                                                <input className="form-check-input cursor" title='אשר קריאה' onClick={(e) => setReaded(e.currentTarget.checked, i)} type="checkbox" role="switch" id="switchCheck" />
                                                <div className=''>{msgTime[i]}</div>
                                            </div>
                                            : <div className='d-flex justify-content-between my-1 mx-1'>{msgReaded[i]
                                                ?
                                                <div className="d-flex mx-2">
                                                <div>{msgTime[i]}</div>
                                                <div className="mx-2"><BsCheck2All color="skyblue" /></div>
                                              </div>
                                                :
                                                <div className="d-flex mx-2">
                                                <div className='mx-2'><div className="">{msgTime[i]}</div></div>
                                                <div className=""><div className=""><BsCheck2All color="white" /></div></div>
                                              </div>
                                                }
                                            </div>}
                                    </samp>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className='sticky-bottom' onClick={scrollToDown}>
                        <div className="d-flex justify-content-end mx-3"
                        ><KeyboardDoubleArrowDownIcon color='warning' title='למטה' className='icon_down mb-1 bg-light' /></div>
                    </div>
                    <div id='Down'></div>
                </div>
                <div className="bottom_chat d-flex">
                    <input ref={messageRef} className='bottom_chat_input mx-1' type="text" placeholder='הודעה' />
                    <div onClick={textUpdate} className="div_icon_send" title='שלח'> <AiOutlineSend className='icon_send' size={40} /></div>
                </div>
            </div>
        </>
    )
}
