import {Link} from 'react-router-dom'

export default function Example({style}) {

if(style == "small")   
return (
    <div className="hidden lg:flex lg:items-center">
        <Link to="/">
            <span className="sr-only">Your Company</span>
            <img className="h-9 w-auto"
                src="https://humocard.uz/upload/iblock/b1b/ofpeoo9egzflg2rz6exo76yvs8fpsnoe/uzum.png"
                alt="" />
        </Link>
    </div>
)
else if(style == "large")
return (
<Link to="/" className="lg:hidden">
<img
    src="https://humocard.uz/upload/iblock/b1b/ofpeoo9egzflg2rz6exo76yvs8fpsnoe/uzum.png"
    alt=""
    className="h-8 w-auto"
/>
</Link>
) 

}
