import React, { Component } from 'react';
import classes from './modal.css';
import Auxiliary from '../../../hoc/Auxililary/Auxiliary';
import Backdrop from '../Backdorp/Backdrop';

class Modal extends Component {
    shouldComponentUpdate (nextProps, nextState) {
        return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
    }
    componentWillUpdate () {
        console.log('[Modal] WillUpdate');
    }
    render() {
        return (
            <Auxiliary>
                <Backdrop show ={this.props.show} clicked={this.props.modalClosed}/>
                <div 
                    className ={classes.Modal}
                    style ={{
                        transform:this.props.show ? 'translateY(0)': 'translateY(-100vh)',
                        opacity: this.props.show ? '1': '0'
                    }}>
                    {this.props.children}
                </div>
            </Auxiliary>
        )
    }
};

export default Modal;