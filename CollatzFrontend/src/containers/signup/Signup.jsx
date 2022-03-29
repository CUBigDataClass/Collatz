import React from 'react';
import './signup.css';
import { GoogleLogout } from 'react-google-login';

const clientId =
    '278153530350-ctpnhc5eaa2s5jsk90u9riajg6u7qfao.apps.googleusercontent.com';

function Signup() {
    const onSuccess = () => {
        console.log('Logout made successfully');
        alert('Logout made successfully.');
    };

    return (
        <div>
            <GoogleLogout
                clientId={clientId}
                buttonText="Log out"
                onLogoutSuccess={onSuccess}
            ></GoogleLogout>
        </div>
    );
}

export default Signup;


// const Signup = () => {
//     return (
//         <div className="Signup">
//             <div className="container">
//                 <h2>Welcome to Collatz New Friend!</h2>
//                 <div className="input-box">
//                     <label >Email</label>
//                     <input type = "text"></input>
//                 </div>
//                 <div className="input-box">
//                     <label >Password</label>
//                     <input type = "password"></input>
//                 </div>
//                 <div classname="click-btn">
//                     <button ><p><NavLink className="nav-link" to="/"><a>Finish</a></NavLink></p></button>
//                 </div>
//                 <div className="click-btn">
//                     <p><NavLink className="nav-link" to="/signin"><a>Already have account?</a></NavLink></p>
//                 </div>
//
//             </div>
//         </div>
//
//     );
// }
//
//
// export default Signup
