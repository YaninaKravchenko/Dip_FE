import NotFound from '../components/Pages/NotFoundPage';
import PostBookDetail from '../components/Posts/PostBookDetail';
import PostsFavorites from '../components/Posts/PostFavorites/PostsFavorites';
import SearchResults from '../components/SearchField/SearchResults';
import SignIn from '../components/SignIn/SignIn';
import SignUpPage from '../components/SignUpPage/SignUpPage';
//import LoginPage from '../components/LoginPage/LoginPage';
//import PostComponent from '../components/Posts/PostComponent';
//import SuccessSignUp from '../components/Success/SuccessSignUp';
//import PostFull from '../components/Posts/PostFull';
;
//import NewAddPost from '../components/Posts/NewAddPost';

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
        path: '/search',
        Component: SearchResults,
        title: 'Search',
    },

   {
        id: 3,
        path: '/sign-up',
        Component: SignUpPage,
        title: 'Sign Up',
    }, 
    {
        id: 4,
        path: '/sign-in',
        Component: SignIn,
        title: 'Sign In',
    },
   /* {
        id: 5,
        path: '/sign-up/register-success',
        Component: SignIn,
        title: 'Sign In',
    },*/

     /*{
        id: 5,
        path: '/log-in',
        Component: LoginPage,
        title: 'Login',
    },
   
    {
        id: 99,
        path: '/activate/:uid/:token',
        Component: SuccessSignUp,
        title: 'Activation',
    },*/
    {
        id: 324,
        path: '*',
        Component: NotFound,
    }
];
