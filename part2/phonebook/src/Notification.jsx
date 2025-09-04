const Notification = ({notification}) => {
    if (notification === null) {
        return null
    }
    const {message, isError} = notification

    const notificationStyle = {
        background: isError? '#FB5656' :'#68FB8F',
        color: isError? 'black': 'green',
        fontSize: "1.5em",
        padding: '10px',
    }

    return (
        <div style={notificationStyle}> {message} </div>
    )
}

export default Notification