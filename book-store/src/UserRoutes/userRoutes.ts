import Account from '../components/Account/Account';
import SearchResults from '../components/SearchField/SearchResults';
import NotFound from '../components/Pages/NotFoundPage';
import PostBookDetail from '../components/Posts/PostBookDetail';
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
    {
        id: 4,
        path: '/search',
        Component: SearchResults,
        title: 'Search',
    },
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
