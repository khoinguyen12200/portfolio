import {useEffect, useMemo, useRef, useState} from "react";
import MenuBackground from '../../assets/images/vector/MenuBackground.svg'
import {motion} from "framer-motion";
import useWindow from "../../hooks/useWindow";
import {GREETING_ID} from "./Greeting";
import {CONTACT_ID} from "./Contact";
import {SKILL_LIST_ID} from "./SkillList";
import {useAppDispatch} from "../../redux/store";
import {moveToSlide, setActiveSlide} from "../../redux/homeSliderSlice";

export default function Menu() {
    const menuIconRef = useRef<HTMLDivElement>(null);


    const [isOpen, setIsOpen] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const [step, setStep] = useState(1);

    const toggleOpen = () => {
        setIsAnimating(true);
        setIsOpen(!isOpen);
    }

    useEffect(() => {
        //if background is behind the icon and the system request to open menu
        if (step === 1 && isOpen) {
            setStep(2);
        }
        //if background is behind the screen and the system request to close menu
        if (step === 3 && !isOpen) {
            setStep(2);
        }
        //if is animating then wait for 2s then change step accordingly
        if (step === 2) {
            setTimeout(() => {
                setStep(isOpen ? 3 : 1);
            }, 1500)
        }
    }, [isOpen, step])


    return (
        <div className={"Menu"}>
            <div>
                <div ref={menuIconRef} onClick={toggleOpen} className={`MenuIcon step${step}`}>
                    <div className={"line line1"}></div>
                    <div className={"line line2"}></div>
                    <div className={"line line3"}></div>
                </div>
                <BackgroundImage step={step} menuIconRef={menuIconRef}/>
                <MenuNavigation step={step} isOpen={isOpen} setIsOpen={setIsOpen}/>
            </div>
        </div>
    )
}

export const SLIDE_NAMES = [
    {
        name: 'Greeting',
        id: GREETING_ID
    },
    {
        name: 'Experience',
        id: SKILL_LIST_ID
    },
    {
        name: 'Contact',
        id: CONTACT_ID
    }
];

function MenuNavigation({step, isOpen, setIsOpen}:{step: number, isOpen: boolean, setIsOpen: any}) {
    const dispatch = useAppDispatch();
    function navigateTo(id: string) {
        setIsOpen(false);

        setTimeout(() => {
            dispatch(moveToSlide(id));
        }, 1000)
    }
    return(
        <div className={`MenuNavigation ${isOpen && step ===3 && 'open'}`}>
            <div className={`MenuNavigationContent`}>
                {
                    SLIDE_NAMES.map((slide, index) => (
                        <motion.div onClick={() => {navigateTo(slide.id)}}>
                            <div className={"MenuNavigationItem"}>{slide.name}</div>
                        </motion.div>
                    ))
                }
            </div>
        </div>
    )
}


function BackgroundImage({step, menuIconRef}:{step: number, menuIconRef: any}) {
    const [windowSize] = useWindow();

    const backgroundAnimation = useMemo(() => {
        try {
            if (step === 1) {
                const {top, left, width, height} = menuIconRef.current?.getBoundingClientRect() as any;
                return {
                    top,
                    left,
                    width,
                    height,
                    scale: 1.9,
                };
            }
            if (step === 2) {
                const {width, height} = menuIconRef.current?.getBoundingClientRect() as any;
                return {
                    top: '50%',
                    left: '50%',
                    x: '-50%',
                    y: '-50%',
                    width,
                    height,
                    scale: 1.9,
                };
            }
            if (step === 3) {
                return {
                    top: '50%',
                    left: '50%',
                    x: '-50%',
                    y: '-50%',
                    width: '100vw',
                    height: '100vh',
                    scale: windowSize.width < 768 ? 4 : 3,
                };
            }
        } catch (e) {
            return {top: 0, left: 0, width: 0, height: 0, x: 0, y: 0};
        }
    }, [step, windowSize])

    const delayTime = useMemo(() => {
        if(step === 3 || step === 1) {
            return 0;
        } else {
            return 0.5;
        }
    },[step])

    return(
        <>
            <motion.div
                animate={backgroundAnimation}
                transition={{type: 'spring', damping: 18, stiffness: 80, delay: delayTime}}
                className={"MenuBackground"}
            >
                <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                    <path fill="#212529" d="M60.2,-45.8C76.3,-27.9,86.3,-3,81.6,19C76.9,40.9,57.4,59.9,35.4,68.6C13.4,77.4,-11.2,75.9,-32.1,66.1C-52.9,56.2,-69.9,38,-76.7,15.4C-83.6,-7.2,-80.1,-34.2,-65.6,-51.7C-51.1,-69.2,-25.6,-77.2,-1.7,-75.8C22.1,-74.4,44.2,-63.6,60.2,-45.8Z" transform="translate(100 100)" />
                </svg>
            </motion.div>
        </>
    )
}
