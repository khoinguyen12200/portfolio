import useStateSlide from "../../hooks/useStateSlide";
import bootstrapIcon from '../../assets/images/bootstrap.png';
import dockerIcon from '../../assets/images/docker.webp';
import expressIcon from '../../assets/images/express.jpg';
import graphQLIcon from '../../assets/images/graphql.png';
import jenkinsIcons from '../../assets/images/jenkins.png';
import nextJsIcon from '../../assets/images/nextjs.jpeg';
import reduxIcon from '../../assets/images/redux.png';
import symfonyIcon from '../../assets/images/symfony.png';
import tailwindIcon from '../../assets/images/tailwind.png';
import typescriptIcon from '../../assets/images/typescript.svg';
import reactIcon from '../../assets/images/react.png';
import jiraIcon from '../../assets/images/jira.png';
import ubuntuIcon from '../../assets/images/ubuntu.png';
import laravelIcon from '../../assets/images/laravel.png';
import mongodbIcon from '../../assets/images/mongodb.png';
import nginxIcon from '../../assets/images/nginx.png';
import mysqlIcon from '../../assets/images/mysql.png';
import blackHoleIcon from '../../assets/images/black_hole.png';
import {useEffect, useRef, useState} from "react";
import {motion} from "framer-motion";
import {useAppDispatch, useAppSelector} from "../../redux/store";
import {setBlackHoleMode} from "../../redux/homeSliderSlice";
import useIsMobile from "../../hooks/useIsMobile";

interface SkillItem {
    name: string;
    icon: string;
}

const SKILL_LIST: SkillItem[] = [
    {
        name: 'React',
        icon: reactIcon
    },
    {
        name: 'Redux',
        icon: reduxIcon
    },
    {
        name: 'NextJS',
        icon: nextJsIcon
    },
    {
        name: 'GraphQL',
        icon: graphQLIcon
    },
    {
        name: 'TypeScript',
        icon: typescriptIcon
    },
    {
        name: 'Tailwind',
        icon: tailwindIcon
    },
    {
        name: 'Bootstrap',
        icon: bootstrapIcon
    },
    {
        name: 'Docker',
        icon: dockerIcon
    },
    {
        name: 'Jenkins',
        icon: jenkinsIcons
    },
    {
        name: 'Symfony',
        icon: symfonyIcon
    },
    {
        name: 'Express',
        icon: expressIcon
    },
    {
        name: 'Jira',
        icon: jiraIcon
    },
    {
        name: 'Ubuntu',
        icon: ubuntuIcon
    },
    {
        name: 'Laravel',
        icon: laravelIcon
    },
    {
        name: 'MongoDB',
        icon: mongodbIcon
    },
    {
        name: 'Nginx',
        icon: nginxIcon
    },
    {
        name: 'MySQL',
        icon: mysqlIcon
    }
];
export const SKILL_LIST_ID = 'SKILL_LIST';
export default function SkillList() {
    const [isActive, isLoading] = useStateSlide(SKILL_LIST_ID);
    const blackHoleModeRef = useRef<HTMLDivElement>(null);
    const blackHoleMode = useAppSelector(state => state.homeSlider.blackHoleMode);
    const dispatch = useAppDispatch();
    const toggleBlackHole = () => {
        dispatch(setBlackHoleMode(!blackHoleMode))
    }

    useEffect(() => {
        if (blackHoleModeRef.current) {
            blackHoleModeRef.current.addEventListener('click', toggleBlackHole);
        }
        return () => {
            if (blackHoleModeRef.current) {
                blackHoleModeRef.current.removeEventListener('click', toggleBlackHole);
            }
        }
    }, [blackHoleModeRef, toggleBlackHole])

    return (
        <div id={SKILL_LIST_ID} className={`SkillList ${isActive ? 'active' : 'deActive'}`}>
            <div className="area">
                <ul className="circles">
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                </ul>
            </div>
            <div className={"ListSkillDiv"}>
                <div ref={blackHoleModeRef} className={"blackHoleMode"}>
                    <div>
                        <b>Black Hole</b> Mode
                    </div>
                </div>
                <div className={"SkillListContent"}>
                    {
                        SKILL_LIST.map((item, index) => <SkillItem key={index} {...item} isActive={isActive}
                                                                   index={index}/>)
                    }
                </div>
                <BlackHole/>
                <div className={"title"}>
                    <h3>
                        Those are my skills, not my limit.
                    </h3>
                    <p>
                        I'm enjoying new challenges
                    </p>
                </div>
            </div>
        </div>
    )
}

function BlackHole() {
    const ref = useRef(null);
    const [isActive, isLoading] = useStateSlide(SKILL_LIST_ID);
    const [blackPos, setBlackPos] = useState({x: 0, y: 0});
    const blackHoleMode = useAppSelector(state => state.homeSlider.blackHoleMode);
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if(ref.current === null) return;
            const {x, y, width, height} = ref.current.getBoundingClientRect();
            const mousePos = {
                x: e.clientX,
                y: e.clientY
            }
            const blackPos = {
                x: mousePos.x - (width / 2),
                y: mousePos.y - (height / 2)
            }
            setBlackPos(blackPos);
        }
        window.addEventListener('mousemove', handleMouseMove);
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        }
    }, [])

    return (
        <motion.div
            className={"BlackHoleContainer"}
            ref={ref}
            animate={
                blackHoleMode ? {
                    left: blackPos.x,
                    top: blackPos.y,
                    scale: 1,
                } : {
                    left: blackPos.x,
                    top: blackPos.y,
                    scale: 0.4,
                }
            }
            transition={{duration: 0.0001}}
        >
            {
                isActive && (
                    <img className={"BlackHole"} src={blackHoleIcon} alt=""/>
                )
            }
        </motion.div>
    )
}


interface EffectRangeInterface {
    range: number,
    moveRange
        :
        number
}

const Effects: EffectRangeInterface[] = [
    {
        range: 100,
        moveRange: 25,
    },
    {
        range: 150,
        moveRange: 20,
    },
    {
        range: 200,
        moveRange: 15,
    }
    ,
    {
        range: 250,
        moveRange: 10,
    }
]

function SkillItem({name, icon, isActive, index}: SkillItem & {
    isActive: boolean, index: number
}) {
    const blackHoleMode = useAppSelector(state => state.homeSlider.blackHoleMode);

    const ref = useRef(null);
    const iconRef = useRef(null);

    const [xPos, setXPos] = useState(0);
    const [yPos, setYPos] = useState(0);

    const [isFinishFirst, setIsFinishFirst] = useState(false);
    const delayTime = isFinishFirst ? 0 : 1.2 + (0.075 * index);

    const [isMobile] = useIsMobile();

    useEffect(() => {
        if (isActive) {
            setTimeout(() => {
                setIsFinishFirst(true);
            }, 3000)
        } else {
            setIsFinishFirst(false);
        }
    }, [isActive])

    useEffect(() => {
        function checkMouseMove(e: MouseEvent) {
            const element = iconRef.current as any;
            const {x, y, width, height} = element.getBoundingClientRect();
            const {clientX, clientY} = e;

            for (let i = 0; i < Effects.length; i++) {
                let {range, moveRange} = Effects[i];
                if (isMobile) {
                    range = range / 2;
                }
                if (clientX >= x - range && clientX <= x + width + range && clientY >= y - range && clientY <= y + height + range) {
                    element.classList.add('active');
                    const {top, left} = element.getBoundingClientRect();
                    const {clientX, clientY} = e;
                    const xDist = clientX - left - width / 2;
                    const yDist = clientY - top - height / 2;
                    const x = xDist / width * moveRange;
                    const y = yDist / height * moveRange;
                    setXPos(x);
                    setYPos(y);
                    return;
                }
            }
            element.classList.remove('active');
            setXPos(0);
            setYPos(0);
        }

        window.addEventListener('mousemove', checkMouseMove);
        window.addEventListener('mouseout', checkMouseMove);
        return () => {
            window.removeEventListener('mousemove', checkMouseMove);
            window.removeEventListener('mouseout', checkMouseMove);
        }
    }, [isMobile])

    return (
        <motion.div
            initial={{scale: 0.6}}
            animate={
                blackHoleMode
                    ? {x: isFinishFirst ? xPos : 0, y: isFinishFirst ? yPos : 0, scale: isActive ? 1 : 0.6}
                    : {x: 0, y: 0, scale: isActive ? 1 : 0.6}
            }
            transition={{type: 'spring', damping: 10, delay: delayTime}}
            ref={ref} className={"SkillListContentItem"}>
            <motion.img src={icon} alt={name} className={"icon"} ref={iconRef}/>
            <div className={"name"}>
                {name}
            </div>
        </motion.div>
    )
}
