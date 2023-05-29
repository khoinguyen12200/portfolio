import React, {useEffect, useMemo, useRef, useState} from "react";
import {motion, useMotionValue, useTransform} from "framer-motion";
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
    const scaleY = useTransform(scrollYProgressEnd, [-0.3, 0], [1.5, 0]);
    console.log(window.innerWidth, window.innerHeight)

    useEffect(() => {
        scrollYProgressEnd.on('change', (value) => {
            dispatch(setMyHelpYProgress(value))
        })
    }, [])

    return (
        <>
            <div ref={myHelpRef} className={"MyHelp h-screen w-screen bg-indigo-950"}>
                <motion.div
                    style={{scaleY: scaleY}}
                    className={"w-screen absolute origin-top-left"}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                        <path fill="#18103F" fill-opacity="1"
                              d="M0,256L120,250.7C240,245,480,235,720,240C960,245,1200,267,1320,277.3L1440,288L1440,0L1320,0C1200,0,960,0,720,0C480,0,240,0,120,0L0,0Z"></path>
                    </svg>
                </motion.div>
            </div>
        </>
    )
}

export function MyHelpContent() {
    const myHelpYProgress = useAppSelector(state => state.homeSlider.myHelpYProgress)
    const yProgress = useHelpProgressMotion();
    const y = useTransform(yProgress, [-0.3, 0], [window.innerHeight, 0]);
    const isShow = useMemo(() => myHelpYProgress > -0, [myHelpYProgress]);
    return (
        <motion.div
            style={{y: y}}
            className={"ContentWrapper"}>
            <motion.div
                animate={isShow ? {y: 0, opacity: 1} : {y: 200, opacity: 0}}
                transition={{type: 'spring', mass: 0.5, stiffness: 50}}
                className={"ContentContainer"}>
                <ProgressBar/>
                <div className={"ContentHelp"}>
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

    const realProgress = useTransform(progress, [0.15, 1], [0, 1]);

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
    const progress = useHelpStepProgress(1);

    return (
        <motion.div
            animate={isActive ? {opacity: 1, y: 0} : {opacity: 0, y: 100}}
            transition={{type: 'spring', mass: 0.5, stiffness: 50}}
            className={"HelpItem"}>
            <div className={"HelpContent"}>
                <h2 className={"subtitle"}>
                    UI/UX Design
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
    const XDefault = -200;
    const stepX = 100;

    const ZDefault = -200;
    const stepZ = 100;


    const x = useTransform(progress, [0.1, 0.6, 1], [0,0, XDefault + stepX * index]);
    const z = useTransform(progress, [0.1,0.6,  1], [0,0, ZDefault + stepZ * index]);
    const rotateY = useTransform(progress, [0.1, 0.6], [0, 45]);

    return(
        <motion.img
            style={{z, x, rotateY: rotateY}}
            src={image}
            className={"webApp"}
        />
    )
}


function BackEndBuild() {
    const isActive = useActiveHelp(2);

    return (
        <motion.div
            animate={isActive ? {opacity: 1, y: 0} : {opacity: 0, y: 100}}
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
    const y = useTransform(progress, [1,0], [0, yDefault + stepy * index]);
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

    return (
        <motion.div
            animate={isActive ? {opacity: 1, y: 0} : {opacity: 0, y: 100}}
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

    const y = useTransform(progress, [1,0], [0, yDefault + stepy * index]);
    const opacity = useTransform(y, [yDefault + stepy * index, 0], [0, 1])


    return(
        <motion.img
            style={{y, opacity}}
            src={image}
            className={"solutionScreen"}
        />
    )
}