import { useState } from "react";

const useAnimationModal = (openCloseModal) => {
    const [fadeOut, setFadeOut] = useState(false);

    const animationModal = () => {
        setFadeOut(!fadeOut);
        setTimeout(() => {
            openCloseModal(false);
            setFadeOut(false);
        }, 900);
    };

    return { fadeOut, animationModal }
};

export default useAnimationModal;