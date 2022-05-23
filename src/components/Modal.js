import useAnimationModal from '../hooks/useAnimationModal';
import '../styles/Modals.css'

const Modal = ({ children, openCloseModal, isModal }) => {

    const { animationModal, fadeOut } = useAnimationModal(openCloseModal);

    return (
        <div className={`modals ${isModal ? 'fadeIn' : 'hidden'} ${fadeOut && 'fadeOut'}`}>
            <div className='layout' onClick={animationModal}>
            </div>
            {children}
        </div>
    );
};

export default Modal;