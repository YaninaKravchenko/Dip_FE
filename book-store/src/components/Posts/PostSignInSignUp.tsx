import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SignIn from '../SignIn/SignIn';
import SignUpPage from '../SignUpPage/SignUpPage';

interface IPostSignInSignUpProps {
  onClose: () => void;
}

const PostSignInSignUp: React.FC<IPostSignInSignUpProps> = ({ onClose }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('signIn');
  const [isVisible, setIsVisible] = useState(true);

  return (
    <div>
      {isVisible && (
        <>
          <button
            onClick={() => {
              setActiveTab('signIn');
            }}
          >
            Sign In
          </button>
          <button
            onClick={() => {
              setActiveTab('signUp');
            }}
          >
            Sign Up
          </button>
          {activeTab === 'signIn' ? (
            <SignIn />
          ) : (
            <SignUpPage setIsVisible={setIsVisible} onClose={onClose} />
          )}
        </>
      )}
    </div>
  );
};

export default PostSignInSignUp;
