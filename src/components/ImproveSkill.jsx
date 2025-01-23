export default function ImproveSkill(){
    const list = [
        "Learn new recipes",
        "Experiment with food",
        "Write your own recipes",
        "Know nutritious facts",
        "Get cooking tips",
        "Get ranked"
    ]
    return(
        <div className="section improve-skills">
            <div className="col img">
                <img src="/images/food/13.jpg" />
            </div>
                   <div className="col typography">
                    <h1 className="title">Improve Your Culinary Skills</h1>
                    { list.map((item, index) => (
                                <p className="skill-item" key={index}>{item}</p>  
                                ))}
                    <button className="btn">signup now</button>
                   </div>
                   
                </div>
    )
}