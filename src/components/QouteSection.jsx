import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faQuoteLeft } from "@fortawesome/free-solid-svg-icons/faQuoteLeft"

export default function QouteSection(){
    return(
        <div className="section qoute">
            <p className="qoute-text"><FontAwesomeIcon icon={ faQuoteLeft } /> Food is everything we are. It's an extension of nationalist feeling. ethnic feeling, your personal history,your province, your religion, your tribe,your grandma, It's inseparable from those from the get-go.</p>
            <p className="qoute-auther">Anthony Bourdain</p>


        </div>
    )
}