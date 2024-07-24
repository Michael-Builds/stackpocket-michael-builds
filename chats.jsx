import { useSession } from "next-auth/react"
import { useEffect, useRef, useState } from "react"
import { MdOutlineKeyboardArrowRight } from "react-icons/md"
import { useChatLobby } from "../ChatLobbyContext"
import styles from "./page.module.css"
import { Loader, Modal } from "@mantine/core"
import { IoCheckmarkDoneOutline } from "react-icons/io5"
import { CiClock2 } from "react-icons/ci"
import { chartUrl } from "@/utils/Endpoints"
import { HiOutlineCog6Tooth } from "react-icons/hi2"
import { useDisclosure } from "@mantine/hooks"
import RedEnvelop from "../modals/RedEnvelop"
import GroupAnnouncement from "../modals/GroupAnnouncement"
import EditGroup from "../modals/EditGroup"
import DisbandGroup from "../modals/DisbandGroup"
import MemberEdit from "../modals/MemberEdit"
import MemberInvite from "../modals/MemberInvite"

const Chats = () => {
  const {
    selectedChat,
    setSelectedChat,
    socket,
    chatLobbyDispatch,
    chatLobby,
    chatType,
  } = useChatLobby()
  const { data: session }: any = useSession()

  useEffect(() => {
    const fetchMessages = async () => {
      if (session?.user?.name?.username && selectedChat.user_name) {
        const response = await fetch(`${chartUrl}/api/chat/p2p/messages`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            senderId: session.user.name.username,
            recipientId: selectedChat.user_name,
          }),
        })
        const data = await response.json()
        console.log("ddddd", data)

        let recipientId = session.user.name.username
        let senderId = selectedChat.user_name

        if (chatType === "lower_user_chat") {
          chatLobbyDispatch({
            type: "UPDATE_MESSAGES",
            payload: { recipientId, senderId, data },
          })
        } else {
          chatLobbyDispatch({
            type: "UPDATE_MESSAGES_SENIOR_USER",
            payload: { recipientId, senderId, data },
          })
        }
      }
    }

    const userId = session.user.name.username
    const chatUser =
      chatLobby.lower_level_users[userId]?.[selectedChat.user_name]
    fetchMessages()
  }, [session, selectedChat])

  return (
    <section className={styles.bored}>
      {chatType === "lower_user_chat" ? (
        <LowerUserChat
          chatLobby={chatLobby}
          session={session}
          selectedChat={selectedChat}
          chatType={chatType}
          setSelectedChat={setSelectedChat}
          socket={socket}
        />
      ) : chatType === "senior_user_chat" ? (
        <SeniorUserChat
          chatLobby={chatLobby}
          session={session}
          selectedChat={selectedChat}
          setSelectedChat={setSelectedChat}
          socket={socket}
        />
      ) : chatType === "my_group_chat" ? (
        <MyGroupChat
          chatLobby={chatLobby}
          session={session}
          selectedChat={selectedChat}
          setSelectedChat={setSelectedChat}
          socket={socket}
        />
      ) : null}
    </section>
  )
}

export default Chats

function LowerUserChat({
  chatLobby,
  session,
  selectedChat,
  setSelectedChat,
  chatType,
  socket,
}) {
  const messagesEndRef = useRef(null)
  const userId = session.user.name.username
  const chatUser = chatLobby.lower_level_users[userId]?.[selectedChat.user_name]

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const joinChat = () => {
    if (session?.user?.name?.username) {
      socket.emit("joinP2P", session.user.name.username)
    }
  }

  useEffect(() => {
    joinChat()
  }, [session])

  useEffect(() => {
    scrollToBottom()
  }, [chatUser.messages])

  const renderMessages = () => {
    if (chatUser.messages.length === 0)
      return (
        <div className={styles.loadingContainer2}>
          <Loader size="lg" />
        </div>
      )
    return chatUser.messages.map((msg: any, index: any) => (
      <div
        key={index}
        className={msg.senderId === userId ? styles.sender : styles.recipient}
      >
        <p className={styles.content}>{msg.message} </p>
        <div className={styles.msgstatus}>
          <p className={styles.time}>{msg.time || "now"}</p>
          <p className={`${styles.time} ${styles.status}`}>
            {msg.senderId === userId && (
              <p className={`${styles.time} ${styles.status}`}>
                {msg?.status === "pending" ? (
                  <CiClock2 />
                ) : msg?.status === "success" ? (
                  <IoCheckmarkDoneOutline />
                ) : null}
              </p>
            )}
          </p>
        </div>
      </div>
    ))
  }

  return (
    <section className={styles.bored}>
      <div className={styles.topChat}>
        <p onClick={() => setSelectedChat({})} className={styles.arrow}>
          Back
          <MdOutlineKeyboardArrowRight />
        </p>
        <p className={styles.chat}>
          {selectedChat.label || selectedChat.user_name}
        </p>
      </div>
      <div className={styles.messageBox}>{renderMessages()}</div>
      <div ref={messagesEndRef} />
    </section>
  )
}
function SeniorUserChat({
  chatLobby,
  session,
  selectedChat,
  setSelectedChat,
  socket,
}) {
  const messagesEndRef = useRef(null)
  const userId = session.user.name.username
  const chatUser = chatLobby.senior_user

  const joinChat = () => {
    if (session?.user?.name?.username) {
      socket.emit("joinP2P", session.user.name.username)
    }
  }

  useEffect(() => {
    joinChat()
  }, [session])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [chatUser.messages])

  const renderMessages = () => {
    if (chatUser.messages.length === 0)
      return (
        <div className={styles.loadingContainer2}>
          <Loader size="lg" />
        </div>
      )
    return chatUser.messages.map((msg: any, index: any) => (
      <div
        key={index}
        className={msg.senderId === userId ? styles.sender : styles.recipient}
      >
        <p className={styles.content}>{msg.message} </p>
        <div className={styles.msgstatus}>
          <p className={styles.time}>{msg.time || "now"}</p>
          <p className={`${styles.time} ${styles.status}`}>
            {msg.senderId === userId && (
              <p className={`${styles.time} ${styles.status}`}>
                {msg?.status === "pending" ? (
                  <CiClock2 />
                ) : msg?.status === "success" ? (
                  <IoCheckmarkDoneOutline />
                ) : null}
              </p>
            )}
          </p>
        </div>
      </div>
    ))
  }

  return (
    <section className={styles.bored}>
      <div className={styles.topChat}>
        <p onClick={() => setSelectedChat({})} className={styles.arrow}>
          Back
          <MdOutlineKeyboardArrowRight />
        </p>
        <p className={styles.chat}>
          {selectedChat.label || selectedChat.user_name}
        </p>
      </div>
      <div className={styles.messageBox}>{renderMessages()}</div>
      <div ref={messagesEndRef} />
    </section>
  )
}
function MyGroupChat({
  chatLobby,
  session,
  selectedChat,
  setSelectedChat,
  socket,
}) {
  const messagesEndRef = useRef(null)
  const userId = session.user.name.username
  const chatUser = chatLobby.my_group_chat.find(
    (group) => group.group_id === selectedChat.group_id
  ) || { messages: [] }
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [opened, { open, close }] = useDisclosure(false)
  const [modalState, setModalState] = useState({ content: null, title: "" })
  const joinChat = () => {
    if (selectedChat?.group_id) {
      socket.emit("groupChat", selectedChat?.group_id)
    }
  }

  useEffect(() => {
    joinChat()
  }, [session])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
    console.log("new users", chatUser)
  }, [chatUser.messages])

  const renderMessages = () => {
    // console.log("Group chat messages", chatUser);
    if (chatUser.messages.length === 0)
      return (
        <div className={styles.loadingContainer2}>
          <Loader size="lg" />
        </div>
      )
    return chatUser.messages.map((msg: any, index: any) => (
      <div
        key={index}
        className={msg.senderId === userId ? styles.sender : styles.recipient}
      >
        <p className={styles.content}>{msg.message}</p>
        <div className={styles.msgstatus}>
          <p className={styles.time}>{msg.time || "now"}</p>
          <p className={`${styles.time} ${styles.status}`}>
            {msg.senderId === userId && (
              <p className={`${styles.time} ${styles.status}`}>
                {msg?.status === "pending" ? (
                  <CiClock2 />
                ) : msg?.status === "success" ? (
                  <IoCheckmarkDoneOutline />
                ) : null}
              </p>
            )}
          </p>
        </div>
      </div>
    ))
  }
  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev)
  }

  const handleDropdownItemClick = (content: any, title: any) => {
    setModalState({ content, title })
    open()
    setIsDropdownOpen(false)
  }

  const renderModalContent = () => {
    switch (modalState.content) {
      case "red-envelop":
        return <RedEnvelop closeModal={close} />
      case "group-announcement":
        return <GroupAnnouncement closeModal={close} />
      case "edit-group":
        return <EditGroup closeModal={close} />
      case "disband":
        return <DisbandGroup closeModal={close} />
      case "member-edit":
        return <MemberEdit closeModal={close} />
      case "member-invite":
        return <MemberInvite closeModal={close} />
      default:
        return null
    }
  }
  return (
    <section className={styles.bored}>
      <div className={styles.topChat}>
        <p onClick={() => setSelectedChat({})} className={styles.arrow}>
          Back
          <MdOutlineKeyboardArrowRight />
        </p>
        <div className={styles.groupTop}>
          <p className={styles.chat}>
            {selectedChat.label ||
              selectedChat.user_name ||
              selectedChat.group_name}
          </p>
          <HiOutlineCog6Tooth
            className={styles.icongroup}
            onClick={toggleDropdown}
          />
        </div>
        {isDropdownOpen && (
          <div className={styles.dropdownMenu}>
            <div
              className={styles.dropdownItem}
              onClick={() =>
                handleDropdownItemClick("red-envelop", "Red Envelop Record")
              }
            >
              Red Envelop Record
            </div>
            <div
              className={styles.dropdownItem}
              onClick={() =>
                handleDropdownItemClick(
                  "group-announcement",
                  "Set group announcement"
                )
              }
            >
              Set group announcement
            </div>
            <div
              className={styles.dropdownItem}
              onClick={() =>
                handleDropdownItemClick("edit-group", " Edit  Group Name")
              }
            >
              Edit Group Name
            </div>
            <div
              className={styles.dropdownItem}
              onClick={() => handleDropdownItemClick("disband", "Kind tips")}
            >
              Disband a group
            </div>
            <div
              className={styles.dropdownItem}
              onClick={() =>
                handleDropdownItemClick(
                  "member-edit",
                  "Change group chat membership"
                )
              }
            >
              Members Edit
            </div>
            <div
              className={styles.dropdownItem}
              onClick={() =>
                handleDropdownItemClick("member-invite", "Member invitation")
              }
            >
              Members Invitation
            </div>
          </div>
        )}
      </div>
      <div className={styles.messageBox}>{renderMessages()}</div>
      <div ref={messagesEndRef} />
      <Modal
        opened={opened}
        centered
        onClose={close}
        title={
          <span
            style={{
              fontFamily: "Nunito, sans-serif",
              fontSize: "16px",
            }}
          >
            {modalState.title}
          </span>
        }
        size="lg"
      >
        {renderModalContent()}
      </Modal>
    </section>
  )
}
