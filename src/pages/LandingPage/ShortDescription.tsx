import {MotionValue, useScroll, useTransform, motion} from "framer-motion";
import {useEffect, useMemo, useRef, useState} from "react";
import myAvatarPhone from '../../assets/images/my_avatar_phone.png'
import {AiFillDatabase} from "react-icons/ai";
import {MdDraw} from "react-icons/md";
import {GiGamepad} from "react-icons/gi";
import useLandingScroll from "../../hooks/useLandingScroll";

function useParallax(value: MotionValue<number>, distance: number) {
    return useTransform(value, [0, 1], [-distance, distance]);
}

export default function ShortDescription() {
    const ref = useRef(null);


    const [refHeight, setRefHeight] = useState(0);
    useEffect(() => {
        if (ref.current) {
            setRefHeight(ref.current.clientHeight)
        }
    }, [ref])

    return (
        <>
            <div ref={ref} className={"ShortDescription relative"}>
                <div className={"mainContainer"}>
                    <AvatarImage/>
                    <TextContainer/>
                </div>
            </div>
        </>
    )
}

function AvatarImage() {
    const refImage = useRef(null);
    const scrollYProgress = useLandingScroll({target: refImage});

    const [isInViewPhone, setInViewPhone] = useState(false);
    const [isInViewIcons, setInViewIcons] = useState(false);
    useEffect(() => {
        const unsub = scrollYProgress.on('change',(value) => {
            setInViewPhone(value > 0.2);
            setInViewIcons(value > 0.4);
        })

        return () => {
            unsub();
        }
    },[])

    const slowAnimateRange = [1.5, 3.5];



    const yIcon1 = useTransform(scrollYProgress, slowAnimateRange, [0, + window.screen.height * 0.5]);
    const yIcon2 = useTransform(scrollYProgress, slowAnimateRange, [0, + 190]);
    const yIcon3 = useTransform(scrollYProgress, slowAnimateRange, [0, - window.screen.height * 0.2]);
    const yPhone = useTransform(scrollYProgress, slowAnimateRange, [0, + 180])
    const rotatePhone = useTransform(scrollYProgress, slowAnimateRange, [0, 20])
    const defaultIconAnimate = {scale: 0.5, rotate: -200, opacity: 0, top: '50%', left: '50%'};

    return (
        <div
            ref={refImage} className={"avatarContainer"}>
            <motion.img
                animate={isInViewPhone ? {scale: 1, y: 0} : {scale: 0}}
                style={isInViewPhone && { y: yPhone, rotate: rotatePhone}}
                transition={{type: 'spring', mass: 0.5, stiffness: 50}}
                src={myAvatarPhone} alt={"myAvatar"} className={"avatar"}/>

            <div className={"IconsContainer"}>
                <motion.div
                    animate={isInViewIcons ? {scale: 1, rotate: -20, top: 0, left: -50} : defaultIconAnimate}
                    style={{y: yIcon1}}
                    transition={{type: 'spring', mass: 0.5, stiffness: 50}}
                    className={"Icon"}>
                    <AiFillDatabase/>
                </motion.div>
                <motion.div
                    animate={isInViewIcons ? {scale: 1, rotate: 25, top: -10, left: '105%'} : defaultIconAnimate}
                    style={{y: yIcon2}}
                    transition={{type: 'spring', mass: 0.5, stiffness: 50}}
                    className={"Icon"}>
                    <MdDraw/>
                </motion.div>
                <motion.div
                    animate={isInViewIcons ? {scale: 1, rotate: -30, top: '85%', left: '90%'} : defaultIconAnimate}
                    style={{y: yIcon3}}
                    transition={{type: 'spring', mass: 0.5, stiffness: 50}}
                    className={"Icon"}>
                    <GiGamepad/>
                </motion.div>
            </div>
        </div>
    )
}

function TextContainer() {
    const refText = useRef(null);
    const scrollYProgress = useLandingScroll({target: refText});
    const [isInViewText, setInViewText] = useState(false);
    useEffect(() => {
        const unsub = scrollYProgress.on('change',(value) => {
            setInViewText(scrollYProgress.get() > 0.1);
        })

        return () => {
            unsub();
        }
    },[])

    return (
        <div ref={refText} className={"textContainer"}>
            <div className={"waveContainer"}>
                <motion.div
                    className={"sectionBg"}>
                    <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1366 481">
                        <path className="cls-1"
                              fill={"#1f212e"}
                              d="M1366,489.83c0,188.97-1366,188.97-1366,0S329.51,11,683.56,11s682.44,289.86,682.44,478.83Z"/>
                    </svg>
                </motion.div>
            </div>

            <motion.div
                animate={isInViewText ? {opacity: 1} : {opacity: 0, y: 200}}
                transition={{type: 'spring', mass: 0.5, stiffness: 50}}
                className={"textContent"}>
                <h1 className={"title"}>
                    Hi there, I'm Khoi
                </h1>
                <h4 className={"desc"}>
                    I build scalable back-end,<br/>
                    Design fancy front-end <br/>
                    And play League of Legends.
                </h4>
            </motion.div>
        </div>
    )
}
