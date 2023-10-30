import React, { useState } from 'react';
import SignIn from '../SignIn/SignIn';
import SignUpPage from '../SignUpPage/SignUpPage';
import Button from '../Button/Button';
import { StylePostSignInUpBtn } from './styles';
import CloseIcon from '@mui/icons-material/Close';
import { StyledModal } from '../UserIcon/styles';

interface IPostSignInSignUpProps {
  onClose: () => void;
}

const PostSignInSignUp: React.FC<IPostSignInSignUpProps> = ({ onClose }) => {
  //const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('signIn');
  const [isVisible, setIsVisible] = useState(true);

  const closeModal = () => {
    setIsVisible(false);
  };

  return (
    <div>
      {isVisible && (
        <StyledModal>
          <StylePostSignInUpBtn>
            <Button
              onClick={() => {
                setActiveTab('signIn');
              }}
            >
              Sign In
            </Button>
            <Button
              onClick={() => {
                setActiveTab('signUp');
              }}
            >
              Sign Up
            </Button>
            <Button onClick={closeModal}>
              <CloseIcon />
            </Button>
          </StylePostSignInUpBtn>
          {activeTab === 'signIn' ? (
            <SignIn closeModal={closeModal} />
          ) : (
            <SignUpPage setIsVisible={setIsVisible} onClose={onClose} />
          )}
        </StyledModal>
      )}
    </div>
  );
};

export default PostSignInSignUp;
