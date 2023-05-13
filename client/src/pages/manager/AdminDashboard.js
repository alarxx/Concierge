import React from "react";
import AppBar from "../../shared/ui/app_bar/AppBar";
import Nav from "../../shared/ui/nav/Nav";
import NavLink from "../../shared/ui/nav/NavLink";
import Logo from "../../shared/ui/logo/Logo";
import Box from "../../shared/ui/box/Box";
import Container from "../../shared/ui/box/Container";
import Avatar from "../../shared/ui/avatar/Avatar";
import Typography from "../../shared/ui/typography/Typography";
import {useAppContext} from "../../context/AppContext";
import GroupInline from "../../shared/ui/group_inline/GroupInline";

export default function AdminDashboard() {

    const { authHandler } = useAppContext();
    const {user} = authHandler;

    return(<>
        <AppBar padding={'20px 0'}>
            <Container padding={'0 40px'}>
                <GroupInline width={'100%'} >
                    <GroupInline width={'100%'} >
                        <Logo/>
                        <Nav left={60}>
                            <NavLink text={'Заявки'} onClick={f=>f}/>
                            <NavLink text={'Отели'} onClick={f=>f}/>
                            <NavLink text={'Номера'} onClick={f=>f}/>
                            <NavLink text={'Сотрудники'} onClick={f=>f}/>
                        </Nav>
                    </GroupInline>
                    <GroupInline width={'auto'}>
                        <Avatar right={10}/>
                        <div><Typography>{user.name}</Typography></div>
                    </GroupInline>
                </GroupInline>
            </Container>
        </AppBar>
        <Box>
            <Container padding={'40px'}>

            </Container>
        </Box>
    </>)
}