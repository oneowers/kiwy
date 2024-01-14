import {Link} from 'react-router-dom'
import Logo from './kiwy_white.png';


export default function Example({style}) {

if(style == "small")   
return (
    <div className="hidden lg:flex lg:items-center">
        <Link to="/">
            <span className="sr-only">Your Company</span>
            <img className="h-9 w-auto brightness-100"
                src={Logo}
                alt="" />
        </Link>
    </div>
)
else if(style == "large")
return (
<Link to="/" className="lg:hidden brightness-100">
<img
    src={Logo}
    alt=""
    className="h-8 w-auto"
/>
</Link>
) 

}
