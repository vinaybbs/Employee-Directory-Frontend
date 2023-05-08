import React from "react";

const Image=(props:any)=>{
  return(

        <img src={props.imageSrc} alt={props.altText} height={props.height} width={props.width} onClick={props.onClick}/>
      
  )
}
export default Image;