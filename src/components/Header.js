import React, { useEffect } from 'react'
import { auth, provider } from '../firebase'
import styled from 'styled-components'
import { useHistory } from 'react-router'
import {
    selectUserName,
    selectUserPhoto,
    setUserLogin,
    setSignOut,
} from "../features/user/userSlice"
import { useSelector, useDispatch } from 'react-redux' 

function Header() {
    const dispatch = useDispatch();
    const history = useHistory();
    const userName = useSelector(selectUserName);
    const userPhoto = useSelector(selectUserPhoto);

    useEffect(() => {
        auth.onAuthStateChanged(async (user) => {
            if(user) {
                dispatch(setUserLogin({
                    name: user.displayName,
                    email: user.email,
                    photo: user.photoURL
                }));
                history.push("/");
            }
        })
    }, [])

    const signIn = () => {
        auth.signInWithPopup(provider)
        .then((result) => {
            let user = result.user;
            dispatch(setUserLogin({
                name: user.displayName,
                email: user.email,
                photo: user.photoURL
            }));
            history.push("/");
        })
    }

    const signOut = () => {
        auth.signOut()
        .then(() => {
            dispatch(setSignOut());
            history.push("/login");
        })
    }

    return (
        <Nav>
            <Logo src="/images/logo.png" alt="" />
            { !userName ? (
                <LoginContainer>
                    <Login onClick={signIn}>Login</Login>
                </LoginContainer> ) :
                <>
                <NavMenu>
                    <a href="/">
                        <img src="/images/home-icon.svg" alt="" />
                        <span>HOME</span>
                    </a>
                    <a>
                        <img src="/images/search-icon.svg" alt="" />
                        <span>SEARCH</span>
                    </a>
                    <a>
                        <img src="/images/watchlist-icon.svg" alt="" />
                        <span>WATCHLIST</span>
                    </a>
                    <a>
                        <img src="/images/original-icon.svg" alt="" />
                        <span>ORIGINALS</span>
                    </a>
                    <a>
                        <img src="/images/movie-icon.svg" alt="" />
                        <span>MOVIES</span>
                    </a>
                    <a>
                        <img src="/images/series-icon.svg" alt="" />
                        <span>SERIES</span>
                    </a>
                </NavMenu>

                <UserImg onClick={signOut} src={userPhoto} alt={userName} />
                </>
            }
        </Nav>  
    )
}

export default Header

const Nav = styled.nav`
    /*height: 70px;
    background-color: #090b13;
    display: flex;
    align-items: center;
    padding: 0 36px;
    overflow-x: hidden;*/


    top: 0;
    left: 0;
    right: 0;
    height: 70px;
    background-color: #090b13;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 36px;
    transition: opacity .5s ease-out;
    letter-spacing: 16px;
    // background: transparent;
    overflow-x: hidden;
`

const Logo = styled.img`
    /*width: 80px;*/

    padding: 0;
    width: 80px;
    margin-top: 4px;
    max-height: 70px;
    transition: all .2s ease 0s;
    font-size: 0;
    display: inline-block;

    img {
        display: block;
        width: 100%;
    }
`

const NavMenu = styled.div`
    /*display: flex;
    flex: 1;
    margin-left: 25px;
    align-items: center;

    @media (max-width: 768px) {
        display: none;
    }

    a {
        display: flex;
        align-items: center;
        padding: 0 12px;
        cursor: pointer;
        img {
            height: 20px;
            z-index: auto;
        }
        span {
            font-size: 13px;
            letter-spacing: 1.42px;
            position: relative;

            &:after {
                content: "";
                height: 2px;
                background-color: #ffffff;
                position: absolute;
                left: 0;
                right: 0;
                bottom: -6px;
                opacity: 0;
                transform-origin: left center;
                transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
                transform: scaleX(0);
            }
        }

        &:hover {
            span:after {
                transform: scaleX(1);
                opacity: 1;
            }
        }
    }*/

    align-items: center;
    display: flex;
    flex-flow: row nowrap;
    height: 100%;
    justify-content: flex-end;
    margin: 0px;
    padding: 0px;
    position: relative;
    margin-right: auto;
    margin-left: 25px;

    @media (max-width: 768px) {
        display: none;
    }

    a {
        display: flex;
        align-items: center;
        padding: 0 12px;
        cursor: pointer;
        text-decoration: none;

        img {
            height: 20px;
            min-width: 20px;
            width: 20px;
            z-index: auto;
        }

        span {
            color: rgb(249, 249, 249);
            font-size: 13px;
            letter-spacing: 1.42px;
            line-height: 1.08;
            margin-left: 8px;
            padding: 2px 0px;
            white-space: nowrap;
            position: relative;

            &:before {
                background-color: rgb(249, 249, 249);
                border-radius: 0px 0px 4px 4px;
                bottom: -6px;
                content: "";
                height: 2px;
                left: 0px;
                opacity: 0;
                position: absolute;
                right: 0px;
                transform-origin: left center;
                transform: scaleX(0);
                transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
                visibility: hidden;
                width: auto;
            }

        }
        &:hover {
            span:before {
                transform: scaleX(1);
                visibility: visible;
                opacity: 1 !important;
            }
        }
    }
`

const UserImg = styled.img`
    width: 48px;
    height: 48px;
    border-radius: 50%;
    cursor: pointer;
`

const LoginContainer = styled.div`
    flex: 1;
    display: flex;
    justify-content: flex-end;
`

const Login = styled.div`
    /*border: 1px solid #f9f9f9;
    padding: 8px 16px;
    border-radius: 4px;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    background-color: rgba(0, 0, 0, 0.6);
    transition: all 0.2s ease 0s;
    cursor: pointer;

    &:hover {
        background-color: #f9f9f9;
        color: #000000;
        border-color: transparent;
    }*/

    background-color: rgba(0,0,0,.6);
    padding: 8px 16px;
    text-transform: uppercase;
    letter-spacing: 1.5px;
    border: 1px solid #f9f9f9;
    border-radius: 4px;
    transition: all .2s ease 0s;

    &:hover {
        background-color: #f9f9f9;
        color: #000;
        border-color: transparent;
    }
`