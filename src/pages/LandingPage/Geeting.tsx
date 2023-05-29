import bg1 from '../../assets/images/vector/parallaxbg/b1.svg'
import bg2 from '../../assets/images/vector/parallaxbg/b2.svg'
import bg3 from '../../assets/images/vector/parallaxbg/b3.svg'
import bg4 from '../../assets/images/vector/parallaxbg/b4.svg'
import bg5 from '../../assets/images/vector/parallaxbg/b5.svg'
import {useEffect, useRef, useState} from "react";
import useParallax from "../../hooks/useParallax";
import {motion, MotionValue, useScroll, useTransform} from "framer-motion";
import useLandingScroll from "../../hooks/useLandingScroll";
import useIsMobile from "../../hooks/useIsMobile";

export default function Greeting() {
    const ref = useRef(null);
    const [isMobile] = useIsMobile();
    const scrollYProgress = useLandingScroll({target: ref, startProgress: false});
    const [refHeight, setRefHeight] = useState(0);
    useEffect(() => {
        if (ref.current) {
            setRefHeight(ref.current.clientHeight)
        }
    }, [ref])
    const y1 = useTransform(scrollYProgress, [0, 1], [0, refHeight / 1.5]);
    const y2 = useTransform(scrollYProgress, [0, 1], [0, refHeight / 2.5]);
    const y3 = useTransform(scrollYProgress, [0, 1], [0, refHeight / 2]);
    const scaleLand = useTransform(scrollYProgress, [0, 1], [1, 1.5]);

    return (
        <div ref={ref} className={"GreetingPage"}>
            <motion.embed src={bg1} className={"parallaxbg"}/>
            <motion.img style={{y: isMobile ? 0 : y1, minHeight: isMobile && 'unset'}} src={bg2} alt={"bg2"} className={"parallaxbg"}/>
            <motion.img style={{y: isMobile ? 0 : y2, minHeight: isMobile && 'unset'}} src={bg3} alt={"bg3"} className={"parallaxbg"}/>

            <motion.img
                initial={{scale: 2}}
                animate={{scale: 1}}
                transition={{duration: 2}}
                style={{y: isMobile ? 0 : y3, scale: scaleLand}} src={bg4} alt={"bg4"} className={"parallaxbg"}/>
            <motion.div
                style={{y: isMobile ? 0 : y1}}
                className={"greetingText"}>
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
