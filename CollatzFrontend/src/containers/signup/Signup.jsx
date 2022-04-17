import React from 'react';
import './signup.css';
import { GoogleLogout } from 'react-google-login';

const clientId =
    '278153530350-ctpnhc5eaa2s5jsk90u9riajg6u7qfao.apps.googleusercontent.com';

function Signup() {

    const onSuccess = () => {
        console.log('Logout made successfully');
        alert('Logout made successfully.');
        window.visitor='';
        window.location.reload(false);
    };

    return (
        <div>
            <GoogleLogout
                clientId={clientId}
                render = {renderProbs => (
                    <button onClick={renderProbs.onClick } disable={renderProbs.disable}>
                        Log out
                    </button>
                )}
                buttonText="Log out"
                onLogoutSuccess={onSuccess}

            ></GoogleLogout>

        </div>
    );
}

export default Signup;


