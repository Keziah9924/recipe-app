import ChiefCard from "./ChiefCard"

export default function ChiefSection (){
    const Chiefsb =[
        {
            name: "Juan Carlos",
            img: "/images/top chef/14.jpg",
            recipesCount: "10",
            cuisine: "Mexican",
        },
        {
            name: "John Doe",
            img: "/images/top chef/15.jpg",
            recipesCount: "05",
            cuisine: "Japanese"
        },
        {
            name: "Irich Maria",
            img: "/images/top chef/16.jpg",
            recipesCount: "13",
            cuisine: "Italian"
        },
        {
            name: "Chris Brown",
            img: "/images/top chef/17.jpg",
            recipesCount: "08",
            cuisine: "American"
        },
        {
            name: "Blake Lively",
            img: "/images/top chef/18.jpg",
            recipesCount: "09",
            cuisine: "French"
        },
        {
            name: "Ben Affleck",
            img: "/images/top chef/19.jpg",
            recipesCount: "04",
            cuisine: "Indian"
        },
    ]
    return(
        <div className="section chiefs">
            <h1 className="title">Our Top Chiefs</h1>
            <div className="top-chiefs-container">
                {/* <ChiefCard />
                <ChiefCard />
                <ChiefCard />
                <ChiefCard />
                <ChiefCard />
                <ChiefCard /> */}
                { Chiefsb.map(chief => <ChiefCard key={chief.name} chief={chief} />) }

            </div>

        </div>
    )
}