import React, {useEffect, useMemo, useRef, useState} from "react";
import {motion, useMotionValue, useSpring, useTransform} from "framer-motion";
import useLandingScroll from "../../hooks/useLandingScroll";
import {useAppDispatch, useAppSelector} from "../../redux/store";
import {setMyHelpYProgress} from "../../redux/homeSliderSlice";

import webApp1 from '../../assets/images/vector/web_app_design/b1.svg';
import webApp2 from '../../assets/images/vector/web_app_design/b2.svg';
import webApp3 from '../../assets/images/vector/web_app_design/b3.svg';
import webApp4 from '../../assets/images/vector/web_app_design/b4.svg';
import webApp5 from '../../assets/images/vector/web_app_design/b5.svg';

import backEnd1 from '../../assets/images/vector/back_end_design/b1.svg';
import backEnd2 from '../../assets/images/vector/back_end_design/b2.svg';
import backEnd3 from '../../assets/images/vector/back_end_design/b3.svg';

import solution1 from '../../assets/images/vector/solution_design/b1.svg';
import solution2 from '../../assets/images/vector/solution_design/b2.svg';
import solution3 from '../../assets/images/vector/solution_design/b3.svg';

import {MdNavigateNext} from "react-icons/md";
export default function MyHelp() {
    const myHelpRef = useRef(null);
    const dispatch = useAppDispatch();
    const scrollYProgressEnd = useLandingScroll({target: myHelpRef, startProgress: false});
    const yProgressStart = useLandingScroll({target: myHelpRef, startProgress: true});
    const scaleY = useTransform(yProgressStart, [-0.5, 0.2], [1, 0]);

    useEffect(() => {
        const unsub = scrollYProgressEnd.on('change', (value) => {
            dispatch(setMyHelpYProgress(value))
        })

        return () => {
            unsub();
        }
    }, [])

    return (
        <>
            <div ref={myHelpRef} className={"MyHelp h-screen w-screen bg-slate-800"}>
                <div className={"waveContainer"}>
                    <motion.div
                        style={{scaleY}}
                        className={"sectionBg"}>
                        <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1366 481">
                            <path className="cls-1"
                                  fill={"#1E293B"}
                                  d="M1366,489.83c0,188.97-1366,188.97-1366,0S329.51,11,683.56,11s682.44,289.86,682.44,478.83Z"/>
                        </svg>
                    </motion.div>
                </div>
            </div>
        </>
    )
}

export function MyHelpContent() {
    const myHelpYProgress = useAppSelector(state => state.homeSlider.myHelpYProgress)
    const yProgress = useHelpProgressMotion();
    const y = useTransform(yProgress, [-0.3, 0], [window.innerHeight, 0]);
    const isShow = useMemo(() => myHelpYProgress > -0 && myHelpYProgress < 0.85, [myHelpYProgress]);
    const yOut = useMemo(() => {
        return myHelpYProgress > 0.85 ? -300 : 300;
    }, [myHelpYProgress]);

    const ContentContainerRef = useRef(null);
    return (
        <motion.div
            style={{y: y}}
            className={"ContentWrapper"}>
            <motion.div
                initial={{y: yOut, opacity: 0}}
                animate={isShow ? {y: 0, opacity: 1} : {y: yOut, opacity: 0}}
                transition={{type: 'spring', mass: 0.5, stiffness: 50}}
                className={"ContentContainer"}>
                <ProgressBar/>
                <div ref={ContentContainerRef} className={"ContentHelp"}>
                    <UiUxDesign/>
                    <BackEndBuild/>
                    <Solution/>
                </div>
            </motion.div>
        </motion.div>
    )
}

function ProgressBar() {
    const helpStepProgress = useHelpStepsProgress();
    const progress = useTransform(helpStepProgress, [0, 0.75], [0, 100]);
    const activePoint = useTransform(helpStepProgress, [0, 0.25, 0.5], [1, 2, 3]);

    return (
        <div className={"ProgressBar"}>
            {
                [1, 2, 3].map((item, index) => (
                    <div className={`Point ${activePoint.get() >= item && 'active'}`}>
                        <span>
                            0{item}
                        </span>
                    </div>
                ))
            }
            <div className={`Point`}>
                <span>
                    <MdNavigateNext/>
                </span>
            </div>
            <motion.div
                style={{width: `${progress.get()}%`}}
                className={"Progress"}
            >
            </motion.div>
        </div>
    )
}

function useHelpProgressMotion() {
    const myHelpYProgress = useAppSelector(state => state.homeSlider.myHelpYProgress)
    const yProgress = useMotionValue(0);
    useEffect(() => {
        yProgress.set(myHelpYProgress);
    }, [myHelpYProgress])

    return yProgress;
}


const TOTAL_STEP = 3;
const STEP_HELP = 1 / (TOTAL_STEP + 1);

function useHelpStepsProgress() {
    const myHelpYProgress = useAppSelector(state => state.homeSlider.myHelpYProgress)
    const progress = useMotionValue(0);
    useEffect(() => {
        progress.set(myHelpYProgress);
    }, [myHelpYProgress])

    const realProgress = useTransform(progress, [0.05, 1], [0, 1]);

    return realProgress;
}

function useHelpStepProgress(index: number) {
    const helpStepsProgress = useHelpStepsProgress();
    const progress = useTransform(helpStepsProgress, [STEP_HELP * (index - 1), STEP_HELP * index], [0, 1]);

    return progress;
}

function useActiveHelp(index: number) {
    const helpStepsProgress = useHelpStepsProgress();
    const [isActive, setIsActive] = useState(false);
    useEffect(() => {
        const unsubscribe = helpStepsProgress.on('change', (value) => {
            if (value - 0.00001 >= STEP_HELP * (index - 1) && value < STEP_HELP * (index)) {
                setIsActive(true);
            } else {
                setIsActive(false);
            }
        })

        return () => {
            unsubscribe();
        }
    }, [])

    return isActive;
}


function UiUxDesign() {
    const isActive = useActiveHelp(1);
    const isNextActive = useActiveHelp(2);

    return (
        <motion.div
            animate={isActive ? {opacity: 1, y: 0} : {opacity: 0, y: isNextActive ? -400 : 400}}
            transition={{type: 'spring', mass: 0.5, stiffness: 50}}
            className={"HelpItem"}>
            <div className={"HelpContent"}>
                <h2 className={"subtitle"}>
                    UI/UX Interactive
                </h2>
                <div className={"desc"}>
                    <div>
                        Focus on micro interactions, animations, and user experience.
                    </div>
                    <div>
                        I deliver strong and user-friendly digital designs.
                    </div>
                </div>
            </div>
            <div className={"HelpAnimation"}>

                <motion.div
                    className={"smartPhone"}
                >
                    {
                        [webApp1, webApp2, webApp3, webApp4, webApp5].map((item, index) => (
                            <PhoneScreen
                                image={item}
                                index={index}
                            />
                        ))
                    }
                </motion.div>
            </div>
        </motion.div>
    )
}

function PhoneScreen({image, index}: any) {
    const progress = useHelpStepProgress(1);
    const XDefault = -140;
    const stepX = 70;

    const ZDefault = -140;
    const stepZ = 70;


    const x = useTransform(progress, [0.3, 0.9], [0, XDefault + stepX * index]);
    const z = useTransform(progress, [0.3,  0.9], [0, ZDefault + stepZ * index]);
    const xSlower = useSpring(x, {stiffness: 30, damping: 10});
    const zSlower = useSpring(z, {stiffness: 30, damping: 10});
    const rotateY = useTransform(progress, [0, 0.9], [0, 50]);
    const rotateYSlower = useSpring(rotateY, {stiffness: 30, damping: 10});

    return(
        <motion.img
            style={{z: zSlower, x: xSlower, rotateY: rotateYSlower}}
            src={image}
            className={"webApp"}
        />
    )
}


function BackEndBuild() {
    const isActive = useActiveHelp(2);
    const isNextActive = useActiveHelp(3);

    return (
        <motion.div
            animate={isActive ? {opacity: 1, y: 0} : {opacity: 0, y: isNextActive ? -400 : 400}}
            transition={{type: 'spring', mass: 0.5, stiffness: 50}}
            className={"HelpItem"}>
            <div className={"HelpContent"}>
                <h2 className={"subtitle"}>
                    Trustworthy Back-end
                </h2>
                <div>
                    <div>
                        Experience in PHP and Node.js
                    </div>
                    <div>
                        Building back-ends with scalability, security, and SEO optimization.
                    </div>
                </div>
            </div>
            <div className={"HelpAnimation flex-col"}>
                <div className={"BackendBgContainer"}>
                    {
                        [backEnd1, backEnd2, backEnd3].map((item, index) => (
                            <BackEndScreen
                                image={item}
                                index={index}
                            />
                        ))
                    }
                </div>
            </div>
        </motion.div>
    )
}

function BackEndScreen({image, index}: any) {

    const progress = useHelpStepProgress(2);
    const yDefault = 0;
    const stepy = -100;
    const y = useTransform(progress, [0.9,0], [0, yDefault + stepy * index]);
    const opacity = useTransform(y, [yDefault + stepy * index, 0], [0, 1])

    return(
        <motion.img
            style={{y, opacity}}
            src={image}
            className={"backendScreen"}
        />
    )
}

function Solution() {
    const isActive = useActiveHelp(3);
    const isPrevActive = useActiveHelp(2);

    return (
        <motion.div
            animate={isActive ? {opacity: 1, y: 0} : {opacity: 0, y: isPrevActive ? 400 : -400}}
            transition={{type: 'spring', mass: 0.5, stiffness: 50}}
            className={"HelpItem"}>
            <div className={"HelpContent"}>
                <h2 className={"subtitle"}>
                    Solution Design
                </h2>
                <div>
                    <div>
                        Customized Solutions for Your Business Needs
                    </div>
                    <div>
                        Not only develop what you tell me to do, but also provide suggestions and solutions.
                    </div>
                </div>
            </div>
            <div className={"HelpAnimation"}>
                <div className={"SolutionDesignSpace"}>
                    {
                        [solution1, solution2, solution3].map((item, index) => (
                            <SolutionScreen
                                image={item}
                                index={index}
                            />
                        ))
                    }
                </div>
            </div>
        </motion.div>
    )
}

function SolutionScreen({image, index}: any) {
    const progress = useHelpStepProgress(3);

    const yDefault = 0;
    const stepy = -100;

    const y = useTransform(progress, [0.9,0], [0, yDefault + stepy * index]);
    const opacity = useTransform(y, [yDefault + stepy * index, 0], [0, 1])


    return(
        <motion.img
            style={{y, opacity}}
            src={image}
            className={"solutionScreen"}
        />
    )
}