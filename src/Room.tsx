import React from 'react'
import io from 'socket.io-client'

const socket = io.connect('http://localhost:4000')

export const Room = () => {
    const [state, setState] = React.useState({message: '', name: ''})
    const [chat, setChat] = React.useState<any>([])

    React.useEffect(() => {
        socket.on('message', ({name, message}:any) => {
            setChat([...chat, { name, message }])
        })
    }, [])

    const sendMessage = () => {
        // const {name, message} = state
        socket.emit('message', { name: "jared", message: `hello + ${Date.now()}` })
    }

    return (
        <>
            <button onClick={sendMessage}>send</button>
            <div>
                {chat.map((ch:any, idx:number) => (
                    <div key={idx}>{ch.name}: {ch.message}</div>
                ))}
            </div>
        </>
    )
}