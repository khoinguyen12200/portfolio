import Greeting from "./Geeting";
import ShortDescription from "./ShortDescription";
import Scrollbar, {ScrollbarPlugin} from 'smooth-scrollbar';
import {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../redux/store";
import {setScrollY} from "../../redux/homeSliderSlice";

type Momentum = {
    x: number,
    y: number,
};



export default function LandingPage() {
    const scrollY = useAppSelector(state => state.homeSlider.scrollY)
    const dispatch = useAppDispatch();

    useEffect(() => {
    },[scrollY])

    useEffect(() => {
        class MyPlugin extends ScrollbarPlugin {
            static pluginName = 'MyPlugin';
            onRender(remainMomentum: Momentum) {
                const scrollY = this.scrollbar.offset.y;
                dispatch(setScrollY(scrollY));
            }
        }

        Scrollbar.use(MyPlugin);
        Scrollbar.init(document.querySelector('.LandingPage'), {
            damping: 0.06,
            plugins: [ MyPlugin ],
        });
    }, [])

    return (

            <div className={"LandingPage"}>
                <Greeting/>
                <ShortDescription/>
            </div>
    )
}
