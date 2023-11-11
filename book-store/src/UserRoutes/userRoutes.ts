import Account from '../components/Account/Account';
//import PostSearchResults from '../components/Posts/PostLarge';
import NotFound from '../components/Pages/NotFoundPage';
import PostBookDetail from '../components/Posts/PostBookDetail/PostBookDetail';
import PostsFavorites from '../components/Posts/PostFavorites/PostsFavorites';
import PostSignInSignUp from '../components/Posts/PostSignInSignUp/PostSignInSignUp';
import NewPassword from '../components/Posts/PostSignInSignUp/ResetPassword/NewPassword';
//import NewPassword from '../components/Posts/PostSignInSignUp/ResetPassword/NewPassword';
import ResetPassword from '../components/Posts/PostSignInSignUp/ResetPassword/ResetPassword';
import SignUpSuccessModal from '../components/Posts/PostSignInSignUp/SignUpPage/SignUpSuccessModal';


type UserRoutes = {
    id: string | number,
    path: string,
    Component: React.FC<any>,
    componentAdditionalProps?: any,
    index?: boolean,
    strict?: boolean,
    title?: string,
};

export const userRoutes: UserRoutes[] = [
    {
        id: 2,
        path: '/book/:isbn13',
        Component: PostBookDetail,
        title: 'Book Detail',
    },
    {
        id: 3,
        path: '/books/:favorites',
        Component: PostsFavorites,
        title: 'My Favorites',
    },
    {
        id: 4,
        path: '/sign-in-up',
        Component: PostSignInSignUp,
        title: 'SignIn_SignUp',
    },
    {
        id: 5,
        path: '/account',
        Component: Account,
        title: 'Account',
    },
    {
        id: 6,
        path: '/reset-password',
        Component: ResetPassword,
        title: 'Reset_Password',
    },
    {
        id: 7,
        path: '/activate/:userId/:token',
        Component: SignUpSuccessModal,
        title: 'Activation',
    },
    {
        id: 8,
        path: '/password/reset/confirm/:userId/:token',
        Component: NewPassword,
        title: 'New_Password',
    },
    {
        id: 324,
        path: '*',
        Component: NotFound,
    }
];
