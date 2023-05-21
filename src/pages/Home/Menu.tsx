import {useEffect, useMemo, useRef, useState} from "react";
import MenuBackground from '../../assets/images/vector/MenuBackground.svg'
import {motion} from "framer-motion";
import useWindow from "../../hooks/useWindow";
import {GREETING_ID} from "./Greeting";
import {CONTACT_ID} from "./Contact";
import {SKILL_LIST_ID} from "./SkillList";
import {useAppDispatch} from "../../redux/store";
import {setActiveSlide} from "../../redux/homeSliderSlice";

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
            dispatch(setActiveSlide(id));
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
                    scale: 1.3,
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
                    scale: 1.3,
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
            <motion.img
                animate={backgroundAnimation}
                transition={{type: 'spring', damping: 18, stiffness: 80, delay: delayTime}}
                className={"MenuBackground"} src={MenuBackground} alt={"Menu Background"}/>
        </>
    )
}
