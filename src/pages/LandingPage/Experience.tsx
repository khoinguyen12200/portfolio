import {GoPrimitiveDot} from "react-icons/go";
import useLandingScroll from "../../hooks/useLandingScroll";
import {useTransform} from "framer-motion";
import useStateSlide from "../../hooks/useStateSlide";
import {useEffect, useRef, useState} from "react";
import {motion} from "framer-motion";
import {BackEndSkills, FRONT_END_SKILLS, OTHER_SKILLS, SKILL_LIST, SkillItemInterface} from "./SkillList";


export default function Experience() {
    const ExperienceRef = useRef(null);
    const progress = useLandingScroll({target: ExperienceRef, startProgress: true});

    const scaleY = useTransform(progress, [-0.5, 0.2], [1, 0]);
    const [isActive, setIsActive] = useState(false);
    useEffect(() => {
        const unsub = progress.on('change', (value) => {
            setIsActive(value > 0.2);
        })

        return () => {
            unsub();
        }
    }, [])

    const [height, setHeight] = useState(0);
    useEffect(() => {
        if (ExperienceRef.current) {
            setHeight(ExperienceRef.current.clientHeight);
        }
    }, [ExperienceRef.current])
    const yProgressEnd = useLandingScroll({target: ExperienceRef, startProgress: false})
    const y = useTransform(yProgressEnd, [0, 0.4], [0, height*0.4]);


    return (
        <div ref={ExperienceRef} className={"ExperienceSection bg-slate-950"}>
            <motion.div
                className={"sectionBg"}
                style={{scaleY}}>
                <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1366 481">
                    <path className="cls-1"
                          fill={"#020617"}
                          d="M1366,489.83c0,188.97-1366,188.97-1366,0S329.51,11,683.56,11s682.44,289.86,682.44,478.83Z"/>
                </svg>
            </motion.div>
            <motion.div
                animate={isActive ? {y: 0, opacity: 1} : {y: 200, opacity: 0}}
                transition={{ type: "spring", stiffness: 100, damping: 20}}
                className={"ExpContent"}>
                <motion.div
                    className={"ExpText"}>
                    <h1>
                        Experience
                    </h1>
                    <p>
                        Through my experience in undertaking a variety of projects, engaging in freelancing work, and
                        being employed by a company, I have cultivated a range of valuable skills.
                    </p>
                </motion.div>
                <div className={"SkillContent"}>
                    <div className={"SkillTitle"}>
                        Front-end Development
                    </div>
                    <div className={"SkillList"}>
                        {
                            FRONT_END_SKILLS.map((skill, index) => {
                                return <SkillItem skill={skill} key={index} index={index}/>
                            })
                        }
                    </div>
                    <div className={"SkillTitle"}>
                        Back-end Development
                    </div>
                    <div className={"SkillList"}>
                        {
                            BackEndSkills.map((skill, index) => {
                                return <SkillItem skill={skill} key={index} index={index}/>
                            })
                        }
                    </div>
                    <div className={"SkillTitle"}>
                        DevOps and Others
                    </div>
                    <div className={"SkillList"}>
                        {
                            OTHER_SKILLS.map((skill, index) => {
                                return <SkillItem skill={skill} key={index} index={index}/>
                            })
                        }
                    </div>
                </div>
            </motion.div>
        </div>
    )
}

function SkillItem({skill, index}: { skill: SkillItemInterface, index:number }) {
    const iconRef = useRef(null);
    const [isActive, setIsActive] = useState(false);
    const progress = useLandingScroll({target: iconRef, startProgress: true});

    useEffect(() => {
        const unsub = progress.on('change', (value) => {
            setIsActive(value > 0.2);
        })

        return () => {
            unsub();
        }
    }, [])

    return (
        <motion.div
            ref={iconRef}
            animate={isActive ? {y: 0, opacity: 1, scale:1} : {y: 200, opacity: 0, scale: 2}}
            transition={{ type: "spring", stiffness: 100, damping: 20, delay: index * 0.1}}
            className={"SkillItem"}>
            <div className={"SkillIcon"}>
                <img src={skill.icon} alt={skill.name} className={"Icon"}/>
            </div>
            <div className={"SkillInfo"}>
                {skill.name}
            </div>
        </motion.div>
    )
}
