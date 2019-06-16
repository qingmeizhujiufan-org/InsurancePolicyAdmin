import Redirect from 'umi/redirect';

const AuthComponent = ({children}) => {
    const isLogin = !!sessionStorage.userId;
    return (
        <>
            {
                isLogin ? children : <Redirect to="/login"/>
            }
        </>
    )
}

export default AuthComponent;
