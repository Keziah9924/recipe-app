export default function UseImage({imgSrc, pt}){
    return(
        <div className="use-image" style={{paddingTop: pt}}>
            <img src={imgSrc} alt="" />
        </div>
    )
}