import React, { useState } from 'react';
import SignIn from './SignIn/SignIn';
import SignUpPage from './SignUpPage/SignUpPage';
//import Button from '../../Button/Button';
import {
  StylePostSignInUpBtn,
  StyledButtonSignIn,
  StyledModal,
} from './styles';
import IconArrowBack from '../../IconArrowBack/IconArrowBack';
//import CloseIcon from '@mui/icons-material/Close';

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
      <IconArrowBack />
      {isVisible && (
        <StyledModal>
          <StylePostSignInUpBtn>
            <StyledButtonSignIn
              active={activeTab === 'signIn'}
              onClick={() => {
                setActiveTab('signIn');
              }}
            >
              Sign In
            </StyledButtonSignIn>
            <StyledButtonSignIn
              active={activeTab === 'signUp'}
              onClick={() => {
                setActiveTab('signUp');
              }}
            >
              Sign Up
            </StyledButtonSignIn>
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
