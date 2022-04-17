import React, {useState} from 'react';
import './signin.css';
import { GoogleLogin } from 'react-google-login';


const clientId = '278153530350-ctpnhc5eaa2s5jsk90u9riajg6u7qfao.apps.googleusercontent.com';


function Signin() {
    const [login,logstate] = useState(false);
    const Logedin = () => logstate(true);
    const notLogedin = () => logstate(false);
    const [customerID,setID] = useState(0)
    const [buttonname,setbuttonname] = useState('Log in')
    const changeText = (text) => setbuttonname(text);

    const onSuccess = (res) => {
        setID(res.profileObj.googleId)
        window.username=0;
        window.username=res.profileObj.googleId
        window.visitor=res.profileObj.name
        setbuttonname(window.visitor)
        let login=true;
        if (login){
            alert(`Logged in as ${res.profileObj.name}. `);
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
                            {buttonname}
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


