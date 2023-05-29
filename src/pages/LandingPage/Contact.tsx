import {BsEnvelope, BsLinkedin, BsTelephone, BsTelephoneFill} from "react-icons/bs";
import {MdEmail} from "react-icons/md";
import {GrLinkedinOption} from "react-icons/gr";
import {HiOutlineMail} from "react-icons/hi";
import {AiOutlinePhone} from "react-icons/ai";
import {GoPrimitiveDot} from "react-icons/go";
import {useEffect, useRef, useState} from "react";
import useLandingScroll from "../../hooks/useLandingScroll";
import {useTransform} from "framer-motion";
import {motion} from "framer-motion";

export default function Contact() {
    const contactRef = useRef(null);
    const progress = useLandingScroll({target: contactRef, startProgress: true});

    const scaleY = useTransform(progress, [0, 0.8], [0, 1]);
    const [isActive, setIsActive] = useState(false);
    useEffect(() => {
        const unsub = progress.on('change', (value) => {
            setIsActive(value > 0.7);
        })

        return () => {
            unsub();
        }
    }, [])

    return (
        <div ref={contactRef} className={"ContactSection bg-slate-900"}>
            <motion.div
                className={"sectionBg"}
                style={{scaleY}}>
                <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1366 481">
                    <path className="cls-1"
                          fill={"#0f172a"}
                          d="M1366,489.83c0,188.97-1366,188.97-1366,0S329.51,11,683.56,11s682.44,289.86,682.44,478.83Z"/>
                </svg>
            </motion.div>
            <motion.div
                animate={isActive ? {opacity: 1, y: 0} : {opacity: 0, y: 200}}
                transition={{type: 'spring', mass: 0.5, stiffness: 50}}
                className={"ContactMainSpace"}>
                <div className={"ContactText"}>
                    <h1>
                        Contact Me
                    </h1>
                    <p>
                        I'm currently looking for new challenge, my inbox is always open. Whether you have a question or
                        want to play LOL together, I'll try my best to get back to you!
                    </p>
                </div>
                <div className={"ContactList"}>
                    <div className={"ContactItem"}>
                        <div className={"ContactIcon"}>
                            <GoPrimitiveDot/>
                        </div>
                        <div className={"ContactInfo"}>
                            <a href="mailto:khoi.nguyen12200@gmail.com">
                                Email
                            </a>
                        </div>
                    </div>
                    <div className={"ContactItem"}>
                        <div className={"ContactIcon"}>
                            <GoPrimitiveDot/>
                        </div>
                        <div className={"ContactInfo"}>
                            <a href={"tel:096 459 960"}>
                                Phone
                            </a>
                        </div>
                    </div>
                    <div className={"ContactItem"}>
                        <div className={"ContactIcon"}>
                            <GoPrimitiveDot/>
                        </div>
                        <div className={"ContactInfo"}>
                            <a href={"https://www.linkedin.com/in/khoi-g-nguyen/"}>
                                Linkedin
                            </a>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}