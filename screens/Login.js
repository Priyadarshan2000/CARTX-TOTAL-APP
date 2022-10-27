import React,{useState} from "react";
import { StatusBar } from 'expo-status-bar';
//formik

import { Formik } from "formik";


//icons
import { Octicons,Ionicons,Fontisto } from '@expo/vector-icons';


import {
    StyledContainer,
    InnerContainer,
    PageLogo,
    PageTitle,
    SubTitle,
    StyledFromArea,
    LeftIcon,
    StyledInputLabel,
    StyledTextInput,
    RightIcon,
    StyledButton,
    ButtonText,
    Colors,
    MsgBox,
    Line,
    ExtraText,
    ExtraView,
    TextLink,
    TextLinkContent
} from './../components/styles';

import { View,ActivityIndicator } from 'react-native';

//Colors
const { brand, darkLight,primary } = Colors;

//keyboard
import KeyboardAvoidingWrapper from "./../components/KeyboardAvoidingWrapper";

//API

import axios from 'axios';

import * as Google from 'expo-google-app-auth';

const Login = ({navigation}) => {
    const [hidePassword, setHidePassword] = useState(true);
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState();
    const[googleSubmitting,setGoogleSubmitting]=useState(false);

    const handleLogin = (credentials,setSubmitting) => {
        handleMessage(null);
        const url = 'https://nrestapi.herokuapp.com/user/signin';
        axios
        .post(url,credentials)
        .then((response) => {
            const result = response.data;
            const {message,status,data} = result;

            if(status !== 'SUCCESS'){
                handleMessage(message,status);
            }else{
                navigation.navigate('Welcome',{params: data});
            }
                setSubmitting(false);


        }) .catch(error => {
            console.log(error);
            setSubmitting(false);
            handleMessage("An error occured .Check your Network and try Again");
    });

    }

const handleMessage = (message,type ='FAILED') => {

    setMessage(message);
    setMessageType(type);
  
};


const handleGooglesignin = () => {
    setGoogleSubmitting(true);
    const config =
    {
        iosClientId:`42608822571-4rrd8tl41q83roef7jdpfpjhk2htd0rf.apps.googleusercontent.com`,
        androidClientId:`42608822571-vgqvkk1ov0ovc57nogjakqc3q1kk5dii.apps.googleusercontent.com`,
        scopes:['profile','email']
    };
    Google.logInAsync(config).then((result) => {
        const{type,user} = result;
        if(type === 'success'){
            const {email,name,photourl} = user;
            handleMessage("Google Signin Successful");
            setTimeout(()=> navigation.navigate('Welcome',{email,name,photourl}),1000);

        }else
        {
           handleMessage("Google Signin was Cancelled");
        }
        setGoogleSubmitting(false);
    })
        .catch(error => {
            console.log(error);
            handleMessage("An error occured .Check your Network and try Again");
            setGoogleSubmitting(false);

        });

   
};

    return (
        
        // <KeyboardAvoidingWrapper>
        <StyledContainer>
            <StatusBar Style="dark" />


            <InnerContainer>
                <PageLogo resizeMode="cover" source={require('./../assets/img/logo.png')} />
                <PageTitle>CartX</PageTitle>
                <SubTitle>Account Login</SubTitle>
                <Formik
                    initialValues={{ email: '', password: '' }}
                    onSubmit={(values,{setSubmitting}) => {
                   if (values.email ==''|| values.password=='')
                     {
                          handleMessage("Please fill all the fields");
                          setSubmitting(false);
                     }
                        else
                        {
                            handleLogin(values,setSubmitting);
                        
                        }
                    }}
                >{({ handleChange, handleBlur, handleSubmit, values,isSubmitting }) =>
                (<StyledFromArea>
                    <MyTextInput
                        label="Email Address"
                        icon="mail"
                        placeholder="Priyadarshanghosh26@gmail.com"
                        placeholderTextColor={darkLight}
                        onChangeText={handleChange('email')}
                        onBlur={handleBlur('email')}
                        value={values.email}
                        keyboardType="email-address"

                    />

                    <MyTextInput
                        label="Password"
                        icon="lock"
                        placeholder="* * * * * *"
                        placeholderTextColor={darkLight}
                        onChangeText={handleChange('password')}
                        onBlur={handleBlur('password')}
                        value={values.password}
                        secureTextEntry={hidePassword}
                        isPassword={true}
                        hidePassword={hidePassword}
                        setHidePassword={setHidePassword}

                    />
                     <MsgBox type={messageType}>{message}</MsgBox>
                     {!isSubmitting && (<StyledButton  onPress={handleSubmit}>
                        <ButtonText>
                            Login
                        </ButtonText>
                    </StyledButton>)}

                    {isSubmitting && ( <StyledButton disable={true}>
                        <ActivityIndicator size="large" color={primary} />

                       
                    </StyledButton>)}

                    <Line/>
                    

                        {!googleSubmitting && (
                            <StyledButton google={true}  onPress={handleGooglesignin}>
                            <Fontisto name="google" color={primary} size={25} />
                            <ButtonText google={true}>
                                Sign in with Google
                            </ButtonText>
                        </StyledButton>
                        )}

                        {googleSubmitting && (
                            <StyledButton google={true}  disabled={true}>
                            <ActivityIndicator size="large" color={primary} />
                        </StyledButton>
                        )}

                    <ExtraView>
                        <ExtraText>
                            Don't have an Account already?
                        </ExtraText>
                        <TextLink onPress={()=> navigation.navigate("Signup")}>
                            <TextLinkContent>
                                 SignUp 
                            </TextLinkContent>
                        </TextLink>
                    </ExtraView>
                </StyledFromArea>)
                    }

                </Formik>
            </InnerContainer>
        </StyledContainer>
    
    );
};

const MyTextInput = ({ label, icon,isPassword,hidePassword,setHidePassword,...props }) => {
    return (
        <View>
            <LeftIcon>
                <Octicons name={icon} size={30} color={brand} />
            </LeftIcon>
            <StyledInputLabel>
                {label}
            </StyledInputLabel>
            <StyledTextInput {...props} />
            {isPassword && (
                <RightIcon onPress={()=> setHidePassword(!hidePassword)}>
                    <Ionicons name={hidePassword ? 'md-eye-off':'md-eye'} size={30} color={darkLight} />
                </RightIcon>
            )}
        </View>
    );
};
export default Login;