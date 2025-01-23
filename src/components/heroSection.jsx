import UseImage from "./UseImage"

export default function HeroSection(){
    const images = [
        "/images/food/1.jfif",
        "/images/food/2.jfif",
        "/images/food/3.jfif",
        "/images/food/4.jfif",
        "/images/food/10.jfif",
        "/images/food/6.jfif",
        "/images/food/7.jfif",
        "/images/food/8.jfif",
        "/images/food/9.jfif",
    ]
    return(
        <div className="section hero">
           <div className="col typography">
            <h1 className="title">What Are We About</h1>
            <p className="info">FoodiesHub is a place where you can please your soul and tummy with delicious food recipes of all cuisine. And our service is absolutely free. So start exploring now.</p>
            <button className="btn">explore now</button>
           </div>
           <div className="col gallery">
            { images.map((src, index) => (
                <UseImage key={index} imgSrc={src} pt={"90%"} />  
            ))}
            
            
           </div>
        </div>
    )
}