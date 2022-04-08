import React, {useState} from 'react';
import './signin.css';
import { GoogleLogin } from 'react-google-login';


const clientId = '278153530350-ctpnhc5eaa2s5jsk90u9riajg6u7qfao.apps.googleusercontent.com';

function Signin() {
    const [login,logstate] = useState(false);
    const Logedin = () => logstate(true);
    const notLogedin = () => logstate(false);
    const onSuccess = (res) => {
        console.log('Login Success: currentUser:', res.profileObj);
        login=true;
        if (!login){
            alert(`Logged in successfully. \nHello ${res.profileObj.name}, Welcome to Collatz!. `);
            Logedin();
        }

    };

    const onFailure = (res) => {
        console.log('Login failed: res:', res);
        alert(
            `Failed to login. :(`
        );
        notLogedin();

    };

    return (

        <div>
            <GoogleLogin
                clientId={clientId}
                render = {renderProbs => (
                        <button onClick={renderProbs.onClick} disable={renderProbs.disable}>
                            Log in
                        </button>

                    )}
                buttonText="Log in"
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={'single_host_origin'}
                style={{ marginTop: '100px' }}
                isSignedIn={true}
            />
        </div>
    );
}


export default Signin


