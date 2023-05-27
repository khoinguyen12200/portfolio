import bg1 from '../../assets/images/vector/parallaxbg/bg1.svg'
import bg2 from '../../assets/images/vector/parallaxbg/bg2.svg'
import bg3 from '../../assets/images/vector/parallaxbg/bg3.svg'
import bg4 from '../../assets/images/vector/parallaxbg/bg4.svg'
import bg5 from '../../assets/images/vector/parallaxbg/bg5.svg'
import {useEffect, useRef, useState} from "react";
import useParallax from "../../hooks/useParallax";
import {motion, MotionValue, useScroll, useTransform} from "framer-motion";
import useLandingScroll from "../../hooks/useLandingScroll";
import useIsMobile from "../../hooks/useIsMobile";

export default function Greeting() {
    const ref = useRef(null);
    const [isMobile] = useIsMobile();
    const scrollYProgress = useLandingScroll({ target: ref });
    const [refHeight, setRefHeight] = useState(0);
    useEffect(() => {
        if(ref.current){
            setRefHeight(ref.current.clientHeight)
        }
    }, [ref])
    const y1 =  useTransform(scrollYProgress, [0, 1], [0, refHeight/1.5]);
    const y2 =  useTransform(scrollYProgress, [0, 1], [0, refHeight/2.5]);
    const y3 =  useTransform(scrollYProgress, [0, 1], [0, refHeight/2]);

    const scale = useTransform(scrollYProgress, [0, 1], [1 , 2]);

    return(
        <div ref={ref} className={"GreetingPage"}>
            <motion.img src={bg1} alt={"bg1"} className={"parallaxbg"}/>
            <motion.img style={{y: y1, minHeight: isMobile && 'unset'}} src={bg2} alt={"bg2"} className={"parallaxbg"}/>
            <motion.img style={{y: y2, minHeight: isMobile && 'unset'}} src={bg3} alt={"bg3"} className={"parallaxbg"}/>

            <motion.img
                initial={{scale: 2}}
                animate={{scale: 1}}
                transition={{duration: 2}}
                style={{y: y3}} src={bg4} alt={"bg4"} className={"parallaxbg"}/>
            <motion.div
                style={{y: y1}}
                className={"greetingText "}>
                <motion.div
                    className={"textContainer"}>
                    <p className={"title"}>
                        Full Stack Engineer - Can Tho, Viet Nam
                    </p>
                    <h1 className={"name"}>
                        Nguyen Gia Khoi
                    </h1>
                </motion.div>
            </motion.div>
            <motion.img
                initial={{scale: 2}}
                animate={{scale: 1}}
                transition={{duration: 2}}
                style={{}} src={bg5} alt={"bg5"} className={"parallaxbg"}/>

        </div>
    )
}

function BgImage({src, style}) {
    return (
        <motion.img src={src} style={style} alt={"bg1"} className={"parallaxbg"}/>
    )
}