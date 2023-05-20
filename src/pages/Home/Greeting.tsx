import Avatar from '../../assets/images/my_avatar.png';
import useStateSlide from "../../hooks/useStateSlide";

export const GREETING_ID = "GREETING";

export default function Greeting() {
    const [isActive, isLoading] = useStateSlide(GREETING_ID);

    return (
        <div id={GREETING_ID} className={`Greeting ${isActive ? 'active' : 'deActive'}`}>
            <div className={"avatarSpace"}>
                <img src={Avatar} alt={"Khoi"} className={"avatar"}/>
                <div className={"textSpace"}>
                    <h1 className={"name"}>
                        Nguyen Gia Khoi
                    </h1>
                    <p className={"title"}>
                        Full Stack Engineer - Can Tho, Viet Nam
                    </p>
                    <h4 className={"desc"}>
                        Hi there, I'm Khoi - 23 years old. <br/>
                        I build scalable back-end,<br/>
                        Design fancy front-end <br/>
                        And play League of Legends.
                    </h4>
                </div>
            </div>
        </div>
    )
}