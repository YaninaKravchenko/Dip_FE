import React, { useState } from 'react';
//import { Link, useNavigate } from 'react-router-dom';
import SignIn from '../SignIn/SignIn';
import SignUpPage from '../SignUpPage/SignUpPage';
import Button from '../Button/Button';
import { StylePostSignInUpBtn } from './styles';

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
        <div>
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
          </StylePostSignInUpBtn>
          {activeTab === 'signIn' ? (
            <SignIn closeModal={closeModal} />
          ) : (
            <SignUpPage setIsVisible={setIsVisible} onClose={onClose} />
          )}
        </div>
      )}
    </div>
  );
};

export default PostSignInSignUp;
