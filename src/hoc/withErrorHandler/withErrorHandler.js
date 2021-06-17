import React, { Component } from 'react';

import Modal from '../../components/UI/Modal/Modal';
import Auxililary from '../Auxililary/Auxiliary';

const withErrorHandler = (WrappedComponent, axios ) => {
    return class extends Component{
        state ={
            error: null
        }
        componentDidMount () {
            axios.interceptors.request.use( req => {
                this.setState({error: null});
                return req;
            });
            axios.interceptors.response.use(res => res, error => {
                this.setState({error: error})
            });
        }
        errorConfirmHandler =() => {
            this.setState({error: null})
        }
        render () {
            return (
                <Auxililary>
                    <Modal 
                        show={this.state.error}
                        clicked={this.errorConfirmHandler}>
                        {this.state.error ?  this.state.error.message : null}
                              
                    </Modal>
                    <WrappedComponent {...this.props}/>               
                </Auxililary>

            )
        }
    } 
    
}
export default withErrorHandler;