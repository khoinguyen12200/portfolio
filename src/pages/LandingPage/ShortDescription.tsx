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
    const scrollYProgress = useLandingScroll({target: ref});

    const [refHeight, setRefHeight] = useState(0);
    useEffect(() => {
        if (ref.current) {
            setRefHeight(ref.current.clientHeight)
        }
    }, [ref])

    const scaleY = useTransform(scrollYProgress, [0.3, 0.9], [1, 0]);

    return (
        <>
            <div ref={ref} className={"ShortDescription relative"}>
                <div className={"mainContainer"}>
                    <AvatarImage/>
                    <TextContainer/>
                </div>
                <motion.div
                    style={{scaleY: scaleY, transformOrigin: 'bottom'}}
                    className={"absolute bottom-0 w-screen"}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#1e1b4b" fill-opacity="1" d="M0,96L120,112C240,128,480,160,720,181.3C960,203,1200,213,1320,218.7L1440,224L1440,320L1320,320C1200,320,960,320,720,320C480,320,240,320,120,320L0,320Z"></path></svg>
                </motion.div>
            </div>

            <div className={"h-screen w-screen bg-indigo-950"}>

            </div>
        </>
    )
}

function AvatarImage() {
    const refImage = useRef(null);
    const scrollYProgress = useLandingScroll({target: refImage});

    const isInViewPhone = useMemo(() => (scrollYProgress.get() > -1.3), [scrollYProgress])
    const isInViewIcons = useMemo(() => (scrollYProgress.get() > -0.8), [scrollYProgress])
    const rotatePhone = useTransform(scrollYProgress, [-0.5, 1], [0, -15]);
    const yIcon1 = useTransform(scrollYProgress, [-0.5, 1], [0, + 300]);
    const yIcon2 = useTransform(scrollYProgress, [-0.5, 1], [0, + 200]);
    const yIcon3 = useTransform(scrollYProgress, [-0.5, 1], [0, + 100]);
    const yPhone = useTransform(scrollYProgress, [-0.5, 1], [0, + 200])
    const defaultIconAnimate = {scale: 0.5, rotate: -200, opacity: 0, top: '50%', left: '50%'};

    return (
        <div
            ref={refImage} className={"avatarContainer"}>
            <motion.img
                animate={isInViewPhone ? {scale: 1, y: 0} : {scale: 0, y: 200}}
                style={isInViewPhone && { y: yPhone}}
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
    const isInViewText = useMemo(() => (scrollYProgress.get() > -2.5), [scrollYProgress])

    return (
        <div ref={refText} className={"textContainer"}>
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
