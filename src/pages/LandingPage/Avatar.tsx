import {MotionValue, useScroll, useTransform, motion} from "framer-motion";
import {useEffect, useMemo, useRef} from "react";
import myAvatarPhone from '../../assets/images/my_avatar_phone.png'
import {AiFillDatabase} from "react-icons/ai";
import {MdDraw} from "react-icons/md";
import {GiGamepad} from "react-icons/gi";
import useLandingScroll from "../../hooks/useLandingScroll";

function useParallax(value: MotionValue<number>, distance: number) {
    return useTransform(value, [0, 1], [-distance, distance]);
}

export default function Avatar() {
    const ref = useRef(null);
    const scrollYProgress = useLandingScroll({target: ref});

    const isInViewPhone = useMemo(() => (scrollYProgress.get() > -0.4 && scrollYProgress.get() < 1), [scrollYProgress])
    const isInViewText = useMemo(() => (scrollYProgress.get() > -0.2 && scrollYProgress.get() < 1), [scrollYProgress])
    const isInViewIcons = useMemo(() => {
        return scrollYProgress.get() > -0.2 && scrollYProgress.get() < 1;
    }, [scrollYProgress])

    const yIcon1 = useTransform(scrollYProgress, [0, 1], [0, 200]);
    const yIcon2 = useTransform(scrollYProgress, [0, 1], [0, 300]);
    const yIcon3 = useTransform(scrollYProgress, [0, 1], [0, 400]);
    const rotatePhone = useTransform(scrollYProgress, [0, 1], [0, -20]);
    const xPhone = useTransform(scrollYProgress, [0, 1], [0, -300]);
    const opacityText = useTransform(scrollYProgress, [0, 1], [1, 0]);

    return (
        <>
            <div ref={ref} className={"Avatar"}>
                <div className={"avatarContainer"}>
                    <motion.img
                        animate={isInViewPhone ? {scale: 1} : {scale: 0}}
                        style={{rotate: rotatePhone, x: xPhone}}
                        transition={{type: 'spring', mass: 0.5, stiffness: 50}}
                        src={myAvatarPhone} alt={"myAvatar"} className={"avatar"}/>
                    <div className={"textContainer"}>
                        <div className={"IconsContainer"}>
                            <motion.div
                                animate={isInViewIcons ? {scale: 1, rotate: -20} : {scale: 0.5, rotate: 0, x: 200}}
                                style={{y: yIcon1}}
                                transition={{type: 'spring', mass: 0.5, stiffness: 50}}
                                className={"Icon rounded-lg text-5xl w-24 h-24 flex items-center justify-center bg-gradient-to-r from-cyan-500 to-blue-500"}>
                                <AiFillDatabase/>
                            </motion.div>
                            <motion.div
                                animate={isInViewIcons ? {scale: 1, rotate: 25} : {scale: 0, rotate: 0, y: 300}}
                                style={{y: yIcon2}}
                                transition={{type: 'spring', mass: 0.5, stiffness: 50}}
                                className={"Icon rounded-lg text-8xl w-40 h-40 flex items-center justify-center bg-gradient-to-r from-rose-500 to-purple-500"}>
                                <MdDraw/>
                            </motion.div>
                            <motion.div
                                animate={isInViewIcons ? {scale: 1, rotate: -30} : {
                                    scale: 0,
                                    rotate: 0,
                                    x: 100,
                                    y: -200
                                }}
                                style={{y: yIcon3}}
                                transition={{type: 'spring', mass: 0.5, stiffness: 50}}
                                className={"Icon rounded-lg text-8xl w-32 h-32 flex items-center justify-center bg-gradient-to-r from-amber-500 to-orange-600"}>
                                <GiGamepad/>
                            </motion.div>
                        </div>
                        <motion.div
                            animate={isInViewText ? {opacity: 1} : {opacity: 0}}
                            transition={{type: 'spring', mass: 0.5, stiffness: 50}}
                            style={{opacity: opacityText}}
                            className={"textContent"}>
                            <h1 className={"title bold"}>
                                Hi, I'm Khoi, 23 years old.
                            </h1>
                            <h4 className={"desc"}>
                                I build scalable back-end,<br/>
                                Design fancy front-end <br/>
                                And play League of Legends.
                            </h4>
                        </motion.div>
                    </div>
                </div>
            </div>

            <div className={"h-screen w-screen bg-cyan-900"}>

            </div>
        </>
    )
}