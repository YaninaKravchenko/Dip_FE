import { myFavoritesActions } from '../Actions/myFavoritesActions';
import { searchActions } from './../Actions/searchActions';
// import { addPost } from './../Actions/addPostAcsync';
// import { getMyPosts } from './../Actions/getPostsAsync';
// import { authorizeUser } from './../Actions/loginUser';
// import { logInActions } from './../Actions/loginActions';
// import { loginUser } from './../Actions/loginUser';
// import { signUpUser } from './../Actions/signUpUser';
// import { getPostsAsync } from './../Actions/getPostsAsync';
// import { tabsActions } from './../Actions/tabsActions';
// import { postsActions } from './../Actions/postsActions';
// import { themeActions } from './../Actions/themeActions';
// import { selectedPostActions } from './../Actions/selectedPostActions';
// import { counterActions } from '../Actions/counterActions';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';

export const useActions = () => {
    const dispatch = useDispatch();
    
    return bindActionCreators({ ...searchActions,
        ...myFavoritesActions,
        
    }, dispatch);
};
//...selectedPostActions,
        // ...themeActions,
        // ...postsActions,
        // ...tabsActions,
        // getPostsAsync,
        // addPost,
        // signUpUser,
        // loginUser,
        // authorizeUser,
        // logOut: logInActions.logOut,
        // getMyPosts,