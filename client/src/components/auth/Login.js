import React, {useState, useContext, useEffect} from 'react';
import AlertContext from '../../context/alert/alertContext';
import AuthContext from '../../context/auth/authContext';

const Login = (props) => {
    const [user, setUser] = useState({
        email: '',
        password: ''
    });

    const { email, password } = user;

    const alertContext = useContext(AlertContext);

    const {setAlert} = alertContext;

    const authContext = useContext(AuthContext);

    const {login, error, clearErrors, loadUser, isAuthenticated} = authContext;

    useEffect(() => {
        if(isAuthenticated){
            props.history.push('/');
        }
        
        if(error) {
            setAlert(error, 'danger');
            clearErrors();
        }
        // eslint-disable-next-line 
    }, [error, isAuthenticated, props.history]);

    const onChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    };

    const onSubmit = (e) => {
        e.preventDefault();
        if(email === '' || password === ''){
            setAlert('Please enter all fields', 'danger');
        } else {
            login({
               email,
               password 
            });

            //loadUser();
        }
    };

    return (
        <div className="form-container">
           <h1>
               Account <span className="text-primary">Login</span>
            </h1>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email Adress</label>
                    <input 
                        type="email" 
                        name="email" 
                        value={email} 
                        onChange={onChange} 
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input 
                        type="password" 
                        name="password" 
                        value={password} 
                        onChange={onChange} 
                    />
                </div>
                <input 
                    type="submit" 
                    value="Login" 
                    className="btn btn-primary btn-block"  
                />
            </form> 
        </div>
    );
}

export default Login;
