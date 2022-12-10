import React from 'react';
import PropTypes from 'prop-types';
import useInput from '../hooks/UseInput';
import Swal from "sweetalert2";
 
function RegisterInput({ register }) {
  const [name, onNameChange] = useInput("");
  const [email, onEmailChange] = useInput("");
  const [password, onPasswordChange] = useInput("");
  const [confirmPassword, onConfirmPasswordChange] = useInput("");

  const onSubmitHandler = (event) => {
    event.preventDefault();

    password !== confirmPassword ? 
      Swal.fire({
        icon: "error",
        title: "Passwords must be the same",
      })
    : register({
      name: name,
      email: email,
      password: password,
    });
  }

  return (
    <form onSubmit={onSubmitHandler} className='input-register'>
      <label htmlFor="name">Nama</label>
      <input type="text" value={name} onChange={onNameChange} />
      <label htmlFor="name">Email</label>
      <input type="email" value={email} onChange={onEmailChange} />
      <label htmlFor="name">Password</label>
      <input type="password" autoComplete='current-password' value={password} onChange={onPasswordChange} />
      <label htmlFor="name">Confirm Password</label>
      <input type="password" autoComplete='current-password' value={confirmPassword} onChange={onConfirmPasswordChange} />
      <button>Register</button>
    </form>
  )
}

RegisterInput.propTypes = {
  register: PropTypes.func.isRequired,
};
 
export default RegisterInput;