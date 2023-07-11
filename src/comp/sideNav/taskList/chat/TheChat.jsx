import React, { useContext, useEffect, useRef, useState } from "react";
import "./TheChat.css";
import { AiOutlineSend } from "react-icons/ai";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import { BsCheck2All } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";
import { BiSearchAlt } from "react-icons/bi";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { MyContext } from "../../../../App";
import { GrPowerReset } from "react-icons/gr";

export default function TheChat({
  setChatOpen,
  chatOpen,
  iForChat,
  chat,
  setChat,
  msgTime,
  setMsgTime,
  msgReaded,
  setMsgReaded,
  allDataShow,
}) {
  const { currentUser, updateChat, socketIo } = useContext(MyContext);
  const [called, setCalled] = useState(false);
  const [originalMsgTime, setOriginalMsgTime] = useState([]);
  const [search, setSearch] = useState(false);
  const messageRef = useRef();

  // useEffect(() => {
  //   if (allDataShow[0]) {
  //     setChat(
  //       allDataShow[iForChat]?.chat.messages.msg
  //         ? allDataShow[iForChat].chat.messages.msg
  //             .split("\n")
  //             .slice(
  //               0,
  //               allDataShow[iForChat].chat.messages.msg.split("\n").length - 1
  //             )
  //         : []
  //     );
  //     setMsgTime(
  //       allDataShow[iForChat]?.chat.messages.time
  //         .split("\n")
  //         .slice(
  //           0,
  //           allDataShow[iForChat].chat.messages.time.split("\n").length - 1
  //         )
  //     );
  //     setMsgReaded(
  //       allDataShow[iForChat]?.chat.messages.readed.slice(
  //         0,
  //         allDataShow[iForChat].chat.messages.readed.length - 1
  //       )
  //     );

  //       let fixTime = msgTime?.map((item, index) => {
  //         let fixedDate = item.split('/').map(item => item.padStart(2, '0')).join('/');
  //         let fixedTime = fixedDate?.split(':').map(item => item.padStart(2, '0')).join(':');
  //         return fixedTime;
  //       });

  //       setMsgTime(fixTime && fixTime);
  //   }
  // }, [allDataShow]);


  useEffect(() => {
    if (allDataShow[0]) {
      const chatMessages = allDataShow[iForChat]?.chat.messages.msg;
      const msgTimeArr = allDataShow[iForChat]?.chat.messages.time;
      const msgReadedArr = allDataShow[iForChat]?.chat.messages.readed;

      if (chatMessages) {
        const chat = chatMessages
          .split("\n")
          .slice(0, chatMessages.split("\n").length - 1);
        setChat(chat);
      } else {
        setChat([]);
      }

      if (msgTimeArr) {
        const msgTime = msgTimeArr.split("\n").slice(0, msgTimeArr.split("\n").length - 1);
        const fixTime = msgTime.map((item) => {
          const fixedDate = item.split('/').map((item) => item.padStart(2, '0')).join('/');
          const fixedTime = fixedDate.split(':').map((item) => item.padStart(2, '0')).join(':');
          return fixedTime;
        });
        setMsgTime(fixTime);
        setOriginalMsgTime(fixTime);
      } else {
        setMsgTime([]);
      }

      if (msgReadedArr) {
        const msgReaded = msgReadedArr.slice(0, msgReadedArr.length - 1);
        setMsgReaded(msgReaded);
      } else {
        setMsgReaded([]);
      }
    }
  }, [allDataShow, iForChat]);




  useEffect(() => {
    if (chat[0]) {
      scrollToDown();
    }
  }, [chat]);

  const scrollToDown = () => {
    const element = document.getElementById("Down");
    element.scrollIntoView();
  };

  const textUpdate = () => {
    const newMessage = messageRef.current?.value;
    let time = new Date();
    time =
      time.getDate() +
      "/" +
      (time.getMonth() + 1) +
      "/" +
      time.getFullYear() +
      " " +
      time.getHours() +
      ":" +
      time.getMinutes();
    allDataShow[iForChat].chat.messages.msg +=
      "{" + currentUser.username + "}" + " " + newMessage + "\n";
    allDataShow[iForChat].chat.messages.time += time + "\n";
    allDataShow[iForChat].chat.messages.readed[
      allDataShow[iForChat].chat.messages.readed.length == 0
        ? 0
        : allDataShow[iForChat].chat.messages.readed.length
    ] = false;
    socketIo.emit("sendMessage", {
      mission: allDataShow[iForChat],
      token: currentUser.token,
    });
    setMsgReaded(allDataShow[iForChat].chat.messages.readed);
    setChat(
      allDataShow[iForChat].chat.messages.msg
        .split("\n")
        .slice(
          0,
          allDataShow[iForChat].chat.messages.msg.split("\n").length - 1
        )
    );
    setMsgTime(
      allDataShow[iForChat].chat.messages.time
        .split("\n")
        .slice(
          0,
          allDataShow[iForChat].chat.messages.time.split("\n").length - 1
        )
    );
    messageRef.current.value = "";
  };

  const setReaded = (readed, i) => {
    allDataShow[iForChat].chat.messages.readed[i] = readed;
    setMsgReaded([...allDataShow[iForChat].chat.messages.readed]);
    updateChat(allDataShow[iForChat], currentUser.token);
  };

  const chatFilter = (filter) => {
    const theChat = allDataShow[iForChat].chat.messages.msg.split("\n").slice(0, allDataShow[iForChat].chat.messages.msg.split("\n").length - 1)
    setMsgTime(msgTime);
    // console.log(theChat)

    const searchResults = theChat.filter((item) => item.includes(filter));
    setChat(searchResults);
    // console.log(searchResults)

    const newChatPosition = [];
    theChat.forEach((position, i) => { if (searchResults.includes(position)) { newChatPosition.push(i); } });
    // console.log(newChatPosition)

    const newTime = [];
    newChatPosition.forEach((position) => { if (position >= 0 && position < originalMsgTime.length) { newTime.push(originalMsgTime[position]); } });
    setMsgTime(newTime);
  };

  return (
    <>
      <div className="chat">
        <div className="top_chat text-light d-flex justify-content-between">
          <div className="">
            <h5 className="mb-0 mx-1">
              {allDataShow ? allDataShow[iForChat]?.title : "משימה"}
            </h5>
            <div className="d-flex">
              <div className="mx-1">
                {allDataShow[iForChat]?.responsibility
                  .slice(0, 3)
                  .map((e) => e.split(" ")[0] + ", ")}
              </div>
            </div>
          </div>
          <div className="mx-1 my-2 mx-2 d-flex">
            <div
              className="icon_searc mx-1"
              onClick={() => {
                setSearch(!search);
              }}
            >
              {search
                ? <AiOutlineCloseCircle title="סגור חיפוש" size={25} />
                : <BiSearchAlt title="חיפוש" size={25} />
              }
            </div>
            {search && (
              <div className="div_chat_search p-2">
                <input
                  type="text"
                  className="chat_search"
                  onChange={(e) => {
                    chatFilter(e.target.value);
                  }}
                  placeholder="הקלד כדי לחפש..."
                />
              </div>
            )}
            <div className="icon_searc mx-1" title="סגור">
              <AiOutlineClose
                size={25}
                onClick={() => setChatOpen(!chatOpen)}
              />
            </div>
          </div>
        </div>
        <div className="middle_chat mx-1">
          {chat[0] ? (
            <div style={{ minHeight: "305px" }}>
              {chat.map((msg, i) => (
                <div
                  key={i}
                  className={`d-flex${msg.split("}")[0].slice(1) === currentUser.username
                    ? " justify-content-start"
                    : " justify-content-end"
                    }`}
                >
                  <div className="the_message mx-1 p-1 mt-2 text-light">
                    <samp>
                      <div className="d-flex justify-content-between">
                        <div className="chat_name">
                          {msg.split("}")[0].slice(1)}
                        </div>
                        <div className="">
                          {" "}
                          {currentUser.access === "admin" && "מנהל"}
                        </div>
                      </div>
                      <div className="my-1 mb-2 fs-5">{msg.split("}")[1]}</div>
                      {!msgReaded[i] &&
                        !(msg.split("}")[0].slice(1) === currentUser.username) ? (
                        <div
                          className="form-check form-switch d-flex justify-content-between mx-2"
                          dir="ltr"
                          onChange={(e) => setCalled(e.target.checked)}
                        >
                          <input
                            className="form-check-input cursor"
                            title="אשר קריאה"
                            onClick={(e) =>
                              setReaded(e.currentTarget.checked, i)
                            }
                            type="checkbox"
                            role="switch"
                            id="switchCheck"
                          />
                          <div dir="rtl" className="fs-6">{msgTime[i]}</div>
                        </div>
                      ) : (
                        <div>
                          {msgReaded[i] ? (
                            <div className="d-flex justify-content-between mx-2">
                              <div dir="rtl" className="fs-6">{msgTime[i]}</div>
                              <div className="">
                                <BsCheck2All color="skyblue" />
                              </div>
                            </div>
                          ) : (
                            <div className="d-flex justify-content-between mx-2">
                              <div dir="rtl" className="fs-6">{msgTime[i]}</div>
                              <div className="">
                                <BsCheck2All color="white" />
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </samp>
                  </div>
                </div>
              ))}
            </div>
          ) : originalMsgTime[0] ? (
            <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "305px" }}>
              <div>לא נמצאו תוצאות</div>
            </div>
          ) : (
            <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "305px" }}>
              <div>ברוכים הבאים {currentUser?.username}!</div>
            </div>
          )}
          <div className="sticky-bottom" onClick={scrollToDown}>
            <div className="d-flex justify-content-end mx-3">
              <KeyboardDoubleArrowDownIcon
                color="dark"
                title="להודעה אחרונה"
                className="icon_down mb-1 bg-light"
              />
            </div>
          </div>
          <div id="Down"></div>
        </div>
        <div className="bottom_chat d-flex">
          <input
            ref={messageRef}
            className="bottom_chat_input mx-1"
            type="text"
            placeholder="הודעה"
          />
          <div
            onClick={() => messageRef.current?.value && textUpdate()}
            className="div_icon_send"
            title={"שלח"}
          >
            <AiOutlineSend className="icon_send" size={40} />
          </div>
        </div>
      </div>
    </>
  );
}
