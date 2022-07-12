import React,{useState} from "react";
import "./login.css";
import { Layout, Form, Input, Button } from "antd";
import { Link } from "react-router-dom";
import "antd/dist/antd.css";
import NavBar from "../../Component/NavBar";
import {ToastContainer,toast} from 'react-toastify'
import axios from 'axios'
import BaseUrl from '../../config/BaseUrl'
import { useNavigate } from "react-router-dom";

const { Content } = Layout;


const Login = () => {
  const navigate =useNavigate()
  const [userlogin,setuserlogin] =useState({email:'',password:''})

  const inputHandler =(event)=>{
      setuserlogin((preState)=>({
          ...preState,
          [event.target.name]:event.target.value
      }))
  }


const handleSubmit =(e)=>{
    const {email,password} =userlogin
     if(!email || !password){
         toast.error('All field required',{
          position: toast.POSITION.TOP_CENTER,
          autoClose:3000,
          theme: "colored"
         })
     }
     axios.post(`${BaseUrl.url}/login`,userlogin)
     .then((res)=>{
         window.localStorage.setItem("token",res.data.token)
         toast.success(res.data.message,{
            position: toast.POSITION.TOP_CENTER,
            autoClose:1500,
            theme: "colored"
         })
         navigate('/billgenreate')
     })
}


  return (
    <>
      <NavBar />
      <div className="container">
        <div className="body-form">
          <Content style={{ padding: "100px" }}>
            <Form  onFinish={handleSubmit} autoComplete="off">
              <Form.Item>
                <h1 className="demotext" align="center" style={{ fontSize: 35 }}>
                  Login
                </h1>
              </Form.Item>
              <Form.Item>
                <Input
                  size="large"
                  label="Username"
                  name="email"
                  rules={[
                     {
                      required: true,
                      message: 'Please input your username!',
                     }
                  ]}
                  placeholder="Username"
                  onChange={inputHandler}
                />
              </Form.Item>
              <Form.Item>
                <Input.Password
                  size="large"
                  label="Password"
                  name="password"
                  rules={[
                    {
                     required: true,
                     message: 'Please input your password!',
                    }
                 ]}
                  placeholder="Password"
                  onChange={inputHandler}
                />
                <Form.Item>
                  <Link className="login-form-forgot" to="">
                    Forgot password
                  </Link>
                </Form.Item>
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary" 
                  htmlType="submit"
                  align="middle"
                  style={{ width: "300px" }}
                >
                  Login
                </Button>
              </Form.Item>
            </Form>
          </Content>
        </div>
        <ToastContainer/>
      </div>
    </>
  );
};
export default Login;
