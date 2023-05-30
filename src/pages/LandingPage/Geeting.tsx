import bg1 from '../../assets/images/vector/parallaxbg/b1.svg'
import bg2 from '../../assets/images/vector/parallaxbg/b2.svg'
import bg3 from '../../assets/images/vector/parallaxbg/b3.svg'
import bg4 from '../../assets/images/vector/parallaxbg/b4.svg'
import bg5 from '../../assets/images/vector/parallaxbg/b5.svg'
import {useEffect, useMemo, useRef, useState} from "react";
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
    const y3 = useTransform(scrollYProgress, [0, 1], [0, refHeight / 2.5]);

    return (
        <div ref={ref} className={"GreetingPage"}>
            <motion.embed src={bg1} className={"parallaxbg"}/>
            <motion.img style={{y: isMobile ? 0 : y1, minHeight: isMobile && 'unset'}} src={bg2} alt={"bg2"}
                        className={"parallaxbg"}/>
            <motion.img
                initial={{scale: 2}}
                animate={{scale: 1}}
                transition={{duration: 2}}
                style={{y: y2}} src={bg3} alt={"bg3"} className={"parallaxbg"}/>

            <motion.img
                initial={{scale: 2}}
                animate={{scale: 1}}
                transition={{duration: 2}}
                style={{y: isMobile ? 0 : y3}} src={bg4} alt={"bg4"} className={"parallaxbg"}/>
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

            <HelloPage/>
        </div>
    )
}

const LIST_HELLO_TEXT = [
    'Hello',
    'Xin chào',
    'Bonjour',
    'Hola',
    'Ciao',
    'Hallo',
    'Olá',
    'Konnichiwa',
    'Guten Tag',
    'Namaste',
    'Salaam',
    'Merhaba',
    'Szia',
    'Hej',
    'Ahoj',
]

function HelloPage() {

    const [index, setIndex] = useState(0);
    const [isShow, setIsShow] = useState(true);

    useEffect(() => {
        if (index === LIST_HELLO_TEXT.length) {
            setTimeout(() => {
                setIsShow(false);
            },800)
            return;
        }

        if(index === 0) {
            setTimeout(() => {
                setIndex(index + 1)
            }, 1100)
            return;
        }

        const interval = setInterval(() => {
            setIndex(index + 1);
        }, 150);
        return () => clearInterval(interval);
    }, [index]);

    const helloText = useMemo(() => LIST_HELLO_TEXT[index % LIST_HELLO_TEXT.length], [index])

    return (
        <motion.div
            initial={{top: '100%'}}
            animate={{top: isShow ? '0%' : '-100%'}}
            transition={{duration: 1}}
            className={"HelloPage"}
        >
            <div className={"waveContainer"}>
                <motion.div
                    initial={{scaleY: 1}}
                    animate={{scaleY: 0}}
                    transition={{duration: 1, delay: 0.2}}
                    className={"sectionBg"}>
                    <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1366 481">
                        <path className="cls-1"
                              fill={"#1f212e"}
                              d="M1366,489.83c0,188.97-1366,188.97-1366,0S329.51,11,683.56,11s682.44,289.86,682.44,478.83Z"/>
                    </svg>
                </motion.div>
            </div>
            <div className={"Content"}>
                <h1>
                    . {helloText}
                </h1>
            </div>
            <div
            className={"botWaveContainer"}
            >
                <motion.div
                    animate={{scaleY: isShow ? 1 : 0}}
                    transition={{duration: 0.7, delay: 0.5}}
                    style={{transformOrigin: 'top'}}
                    className={"sectionBg"}>
                    <svg style={{rotate: '180deg'}} id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1366 481">
                        <path className="cls-1"
                              fill={"#1f212e"}
                              d="M1366,489.83c0,188.97-1366,188.97-1366,0S329.51,11,683.56,11s682.44,289.86,682.44,478.83Z"/>
                    </svg>
                </motion.div>
            </div>
        </motion.div>
    )
}
