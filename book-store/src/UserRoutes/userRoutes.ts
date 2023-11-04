import Account from '../components/Account/Account';
//import PostSearchResults from '../components/Posts/PostLarge';
import NotFound from '../components/Pages/NotFoundPage';
import PostBookDetail from '../components/Posts/PostBookDetail/PostBookDetail';
import PostsFavorites from '../components/Posts/PostFavorites/PostsFavorites';


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
    // {
    //     id: 4,
    //     path: '/search',
    //     Component: PostSearchResults,
    //     title: 'Search',
    // },
    {
        id: 5,
        path: '/account',
        Component: Account,
        title: 'Account',
    },
    /*{
        id: 5,
        path: '/log-in',
        Component: LoginPage,
        title: 'Login',
    },*/
    {
        id: 324,
        path: '*',
        Component: NotFound,
    }
];
