import React, {useState} from "react"
import SidebarOptions from "./SidebarOption";
import "./sidebar.css"
import TwitterIcon from '@mui/icons-material/Twitter';
import HomeIcon from "@mui/icons-material/Home"
import SearchIcon from "@mui/icons-material/Search"
import NotificationsIcon from "@mui/icons-material/Notifications"
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder"
import  MailOutlineIcon  from "@mui/icons-material/MailOutline";
import ListAltIcon from "@mui/icons-material/ListAlt"
import PermIdentityIcon from "@mui/icons-material/PermIdentity"
import MoreIcon from "@mui/icons-material/More"
import {Avatar, Button, Divider, IconButton, ListItemIcon, Menu, MenuItem} from "@mui/material"
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import DoneIcon from "@mui/icons-material/Done"
import CustomeLink from "./CustomeLink.js";
import useLoggedInUser from "../../hooks/useLoggedInUser.js";



const Sidebar = ({handleLogout, user}) =>{

    const [anchorEl, setAnchorEl] =  useState(null);
    const openMenu = Boolean(anchorEl);
    const [loggedInUser] = useLoggedInUser();

    // console.log("logged in user in sidebar =>", loggedInUser);

    const handleClick = (e) =>{
        setAnchorEl(e.currentTarget);
    }

    const handleClose = () =>{
        setAnchorEl(null);
    }

    const result = user?.email?.split("@")[0] || "Guest";
    // console.log(result);

    return (
        <div className="sidebar">
            <TwitterIcon className="sidebar-twitterIcon"/>

            <CustomeLink to="/home">
              <SidebarOptions active Icon={HomeIcon} text="Home"/> 
            </CustomeLink>
           
            <CustomeLink to="/home/explore">
             <SidebarOptions active Icon={SearchIcon} text="Explore"/>
            </CustomeLink>
 
            <CustomeLink to="/home/notifications">
            <SidebarOptions active Icon={NotificationsIcon} text="Notifications"/>
            </CustomeLink>

            <CustomeLink to="/home/messages">
            <SidebarOptions active Icon={MailOutlineIcon} text="Message"/>
            </CustomeLink>

            <CustomeLink to="/home/bookmarks">  
            <SidebarOptions active Icon={BookmarkBorderIcon} text="Bookmarks"/>
            </CustomeLink>

            <CustomeLink to="/home/lists">  
            <SidebarOptions active Icon={ListAltIcon} text="Lists"/>
            </CustomeLink>

            <CustomeLink to="/home/profile">
             <SidebarOptions active Icon={PermIdentityIcon} text="Profile"/>
            </CustomeLink>

            <CustomeLink to="/home/more">
               <SidebarOptions active Icon={MoreIcon} text="More"/>
            </CustomeLink>
           
            
            <Button variant="outline" classname="sidebar_tweet">
               Tweet
            </Button>

            <div className="Profile-info">
               <Avatar src={
                 loggedInUser?.profilePhoto
                 ? loggedInUser?.profilePhoto
                  : user && user.photoURL 
                 
               } />
    
               <div className="user-info subUser-info">
                  <h4>
                        {
                            loggedInUser?.name 
                            ? loggedInUser.name
                            : user && user.displayName
                        }
                 </h4>
                  <h5>@{result}</h5>
               </div>
               <IconButton 
                size="small"
                sx={{ml:2}}
                aria-controls={openMenu ? "basic-menu": undefined}
                aria-haspopup = "true"
                aria-expanded={openMenu ? "true": undefined}
                onClick={handleClick}
                >
                    <MoreHorizIcon/>
               </IconButton>
              
               <Menu 
                id="basic-menu"
                anchorEl={anchorEl}
                open={openMenu}
                onClick={handleClose}
                onClose={handleClose}
                >
                  <MenuItem className="Profile_info1">
                          <Avatar src={
                 loggedInUser[0] ?.profileImage 
                 ? loggedInUser[0].profileImage
                 /* : user && user.photoURL */
                 : "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577900_960_720.png"

               } />
                
                    <div className="user_info subUser_info">
                      
                            <h4>
                            {
                                loggedInUser?.name 
                                ? loggedInUser.name
                                : user && user.displayName
                            }
                            </h4>
                            <h5>@{result}</h5>
                   
                        <ListItemIcon className="done_icon"><DoneIcon/></ListItemIcon>
                    </div>

                  </MenuItem>
                  <Divider/>
                  <MenuItem onClick={handleClose}>Add an existing account</MenuItem>
                  <MenuItem onClick={handleLogout}>Log out @{}</MenuItem>
              </Menu>
    
            </div>
        </div>
    )
}

export default Sidebar