import {useEffect, useState} from "react";

export default function useWindow() {
    const [size, setSize] = useState({
        width: 0,
        height: 0
    });

    useEffect(() => {
        function checkSize() {
            setSize({
                width: window.innerWidth,
                height: window.innerHeight
            });
        }

        window.addEventListener('resize', checkSize);
        checkSize();

        return () => {
            window.removeEventListener('resize', checkSize);
        }
    },[])

    return [size];
}