import './Button.scss'

function Button({msg,imgBtn,onClick}) {
    return (
        <div>
            <button onClick={onClick} className='button'>
               {/* <img src={btnicon} alt="" /> */}
               <span>{imgBtn}</span>
                <span>{msg}</span>
                
            </button>
        </div>
    )
}

export default Button;