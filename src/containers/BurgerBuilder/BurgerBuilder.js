import React, { Component } from "react";
import Auxilairy from '../../hoc/Auxililary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-order';


const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}
class BurgerBuilder extends Component {

    state = {
        ingredients: null,
        totalPrice: 4,
        purchasable: false,
        purchassing: false,
        loading: false,
        error: false
    }

    componentDidMount() {
        axios.get('https://react-my-burger-1f325-default-rtdb.firebaseio.com/ingredients.json')
            .then(response => {
                this.setState({ingredients: response.data})
            })
            .catch(error => {
                this.setState({error: true});
            });
    }

    updatePurchaseState(ingredients) {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            })
            .reduce ((sum, el) => {
                return sum + el;
            }, 0);
        this.setState({purchasable: sum > 0});
    }

    addingredientHnadler = (type)=> {
        const oldCount = this.state.ingredients[type];  
        const updatedCount = oldCount +1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHnadler = (type)=> {
        const oldCount = this.state.ingredients[type];  
        if (oldCount <= 0 ) {
            return;
        }

        const updatedCount = oldCount -1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceDeduction;
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});

        this.updatePurchaseState(updatedIngredients);
    }

    purchaseHandler = () => {
        this.setState({purchassing: true});
    }

    purchasableCancelHandler = () => {
        this.setState({purchassing: false});
    }

    purchaseContinueHandler = () => {
        //alert('You continue!');
        this.setState({loading: true});
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer:{
                name: 'Bimal Pun',
                address: {
                    street: '1 London Road, London',
                    postcode: 'ab12 3cd',
                    country: 'U.K'
                },
                email: 'yahoo@gmail.com'
            },
            deliveryMethod: 'fastest'
        }
        axios.post('/orders.json', order)
            .then(response => {
                this.setState({loading: false, purchassing: false})
            })
            .catch(error => {
                this.setState({loading: false, purchassing: false})
            });

    }

    render(){
        const disabledInfo ={ 
            ...this.state.ingredients
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        };
        let orderSummary = null;

        let burger = this.state.error ? <p> Ingredients can't be loaded!</p> :<Spinner/>;

        if (this.state.ingredients){
            burger = (        
                <Auxilairy>
                    <Burger ingredients = {this.state.ingredients}/>
                    <BuildControls 
                        ingredientAdded = {this.addingredientHnadler}
                        ingredientRemoved = {this.removeIngredientHnadler}
                        disabled = {disabledInfo}
                        purchasable={this.state.purchasable}
                        ordered={this.purchaseHandler}
                        price ={this.state.totalPrice}/>
                </Auxilairy>
            );
            orderSummary =<OrderSummary 
                ingredients ={this.state.ingredients}
                price={this.state.totalPrice}
                purchaseCancelled = {this.purchasableCancelHandler}
                purchaseContinued ={this.purchaseContinueHandler}/>;
            }
            if (this.state.loading) {
                orderSummary = <Spinner/> ;
            }

        return(
            <Auxilairy>
                <Modal show={this.state.purchassing} modalClosed={this.purchasableCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Auxilairy>
        );
    }
}

export default withErrorHandler(BurgerBuilder, axios);