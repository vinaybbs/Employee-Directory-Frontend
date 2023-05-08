import { IconContext } from "react-icons";
import './icons.css'
const Icons=(props:any)=>{
    return(
        <IconContext.Provider value={{style:{color:props.color,height:props.height,width:props.width}}}>
          <props.icon/>
      </IconContext.Provider>
    )
}
export default Icons