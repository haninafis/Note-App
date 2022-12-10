import React from 'react';
import PropTypes from 'prop-types';
import useInput from '../hooks/UseInput';
 
function LoginInput({ login }) {
  const [email, onEmailChangehandler] = useInput("");
  const [password, onPasswordChangeHandler] = useInput("");

  const onSubmitHandler = (event) => {
    event.preventDefault();

    login({
      email: email,
      password: password,
    });
  }

  return (
    <form onSubmit={onSubmitHandler} className='input-login'>
      <label htmlFor="name">Email</label>
      <input type="email" value={email} onChange={onEmailChangehandler} />
      <label htmlFor="name">Password</label>
      <input type="password" value={password} onChange={onPasswordChangeHandler} />
      <button>Login</button>
    </form>
  );
}

LoginInput.propTypes = {
  login: PropTypes.func.isRequired,
}
 
export default LoginInput;