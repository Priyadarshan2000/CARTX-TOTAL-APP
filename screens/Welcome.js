import React from "react";
import { StatusBar } from 'expo-status-bar';
import Scanner from "./Scanner";
import {
    InnerContainer,
    PageLogo,
    PageTitle,
    SubTitle,
    StyledFromArea,
    StyledButton,
    ButtonText,
    Line,
    ExtraText,
    ExtraView,
    TextLink,
    TextLinkContent,
    WelcomeContainer,
    WelcomeImage,
    Avatar
} from './../components/styles';




const Welcome = ({navigation,route}) => {
    const {name,email} = route.params;
 
    return (
        
        <InnerContainer>
            <StatusBar Style="light" />
            <WelcomeImage resizeMode="cover" source={require('./../assets/img/logo3.png')} />
                <WelcomeContainer>
                <PageTitle Welcome={true}>Welcome!! Buddy</PageTitle>
                <SubTitle welcome={true}>{name ||'Priyadarshan Ghosh'}</SubTitle>
                <SubTitle welcome={true}>{email ||'PriyadarshanGhosh@gmail.com'}</SubTitle>
                <StyledFromArea>
                <Avatar resizeMode="cover" source={require('./../assets/img/logo.png')} />
                <Line/>
                <StyledButton  onPress={()=>{navigation.navigate("Scanner")}}>
                        <ButtonText>
                            Scan QR Code to Start Shopping
                        </ButtonText>
                    </StyledButton>
                    <StyledButton  onPress={()=>{navigation.navigate("Login")}}>
                        <ButtonText>
                            Logout
                        </ButtonText>
                    </StyledButton>
                    
                    
                   
                    
                </StyledFromArea>
                   
                </WelcomeContainer>
            </InnerContainer>
       
    );
};


export default Welcome;