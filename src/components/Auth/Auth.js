import React, { Component } from 'react'
import {
    Formik
} from 'formik'
export default class Auth extends Component {
    render() {
        return (
            <div>
                <Formik
                    initialValues={
                        {
                            username: '',
                            password: '',
                            passwordConfirm: ''
                        }
                    }
                    onSubmit={
                        (values) => {
                            console.log(values);
                        }
                    }
                    validate={
                        (values) => {
                            const errors = {};
                            if (!values.username) {
                                errors.username = 'Required';
                            } else if (/^[a-zA-Z0-9.! #$%&'*+/=? ^_`{|}~-]+@[a-zA-Z0-9-]+(?:\. [a-zA-Z0-9-]+)*$/.test(values.username)) {
                                errors.username = "Invalid Email"
                            }
                            if (!values.password) {
                                errors.password = "Required"
                            } else if (values.password.length < 4) {
                                errors.password = "Must be atlease 4 character"
                            }
                            if (!values.passwordConfirm) {
                                errors.password = "Required"
                            } else if (values.password !== values.passwordConfirm) {
                                errors.password = "Password field doesn't match"
                            }
                            console.log("Errors: ", errors);
                            return errors;
                        }
                    }
                >
                    {
                        // HandleChange,handleSubmit builtin function for formik
                        ({ values, handleChange, handleSubmit }) => (
                            <div style={{ width: '400px', margin: '20px auto', border: '1px solid black', padding: '20px', borderRadius: '10px' }}>
                                <form onSubmit={handleSubmit}>
                                    <input
                                        name='username'
                                        placeholder="Enter Your Username"
                                        className='form-control'
                                        value={values.username}
                                        onChange={handleChange}
                                    />
                                    <br />
                                    <input
                                        name='password'
                                        placeholder="Enter Your Password"
                                        className='form-control'
                                        value={values.password}
                                        onChange={handleChange}
                                        type='password'
                                    />
                                    <br />
                                    <input
                                        name='passwordConfirm'
                                        placeholder="Confirm Password"
                                        className='form-control'
                                        value={values.passwordConfirm}
                                        onChange={handleChange}
                                        type='password'
                                    />
                                    <br />
                                    <button type='submit' className='btn btn-success form-control'>Sign In</button>
                                </form>
                            </div>
                        )
                    }
                </Formik>
            </div >
        )
    }
}
