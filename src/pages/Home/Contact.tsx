import {AiOutlineLinkedin, AiOutlineMail, AiOutlinePhone} from "react-icons/ai";
import {BsLinkedin} from "react-icons/bs";
import useStateSlide from "../../hooks/useStateSlide";
import {SKILL_LIST_ID} from "./SkillList";


export const CONTACT_ID = 'CONTACT';
export default function Contact() {
    const [isActive, isLoading] = useStateSlide(CONTACT_ID);
    return(
        <div className={`Contact ${isActive ? 'active' : 'deActive'}`}>
            <div className={"ContactText"}>
                <h1>
                    Contact Me
                </h1>
                <p>
                    I'm currently looking for new challenge, my inbox is always open. Whether you have a question or want to play LOL together, I'll try my best to get back to you!
                </p>
            </div>
            <div className={"ContactList"}>
                <div className={"ContactItem"}>
                    <AiOutlineMail/>
                    <div className={"ContactInfo"}>
                        <a href="mailto:khoi.nguyen12200@gmail.com">
                            khoi.nguyen12200@gmail.com
                        </a>
                    </div>
                </div>
                <div className={"ContactItem"}>
                    <AiOutlinePhone/>
                    <div className={"ContactInfo"}>
                        <a href={"tel:096 459 960"}>
                            +84 966 459 960 ( Telegram, Zalo )
                        </a>
                    </div>
                </div>
                <div className={"ContactItem"}>
                    <BsLinkedin/>
                    <div className={"ContactInfo"}>
                        <a href={"https://www.linkedin.com/in/khoi-g-nguyen/"}>
                            khoi-g-nguyen
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}