import React, { Component } from 'react';
import Auxilairy from '../Auxililary/Auxiliary';
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
    state ={ 
        showSideDrawer: false
    }
    SideDrawerCloseHnadler =() => {
        this.setState({showSideDrawer: false});
    }

    sideDrawerToggleHandler =() => {
        this.setState((prevState)=>{
            return{showSideDrawer: !prevState.showSideDrawer};
        });
    }
    render (){
        return(
            <Auxilairy>
            <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler}/>
            <SideDrawer open ={this.state.showSideDrawer} closed={this.SideDrawerCloseHnadler}/>
            <main className = {classes.Content}>
                {this.props.children}
            </main>
        </Auxilairy>
            )
    }
   
}

export default Layout; 