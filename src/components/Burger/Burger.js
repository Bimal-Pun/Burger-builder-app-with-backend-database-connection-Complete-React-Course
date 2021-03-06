import React from 'react';
import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger =(props) => {
    let transformedIngredeints = Object.keys(props.ingredients)
        .map(igKey => {
            return [...Array(props.ingredients[igKey])].map((_, i) => {
                return <BurgerIngredient key = {igKey + 1} type ={igKey}/>;
            }); // [,]
         })
         .reduce ((arr, el) => {
             return arr.concat(el)
         }, []);
    if (transformedIngredeints.length === 0) {
        transformedIngredeints = <p>Please start adding ingredients!</p>
    }
    return(
        <div className = {classes.Burger}>
            <BurgerIngredient type = "bread-top"/>
            {transformedIngredeints}
            <BurgerIngredient type = "bread-bottom"/>
        </div>
    );
};

export default burger; 