import React, { createContext, useState, useEffect } from 'react'
import { db } from '../Config/Config'
import { collection, getDocs } from "firebase/firestore";
export const ProductsContext = createContext();

export const ProductsContextProvider = (props) => {
    const [products, setProducts] = useState([])

    useEffect(()=>{
        const querySnapshot = getDocs(collection(db, "Products")).then((querySnapsot) => {
            querySnapsot.forEach((doc) => {
                setProducts((prev)=> [...prev, doc.data()])
            });
        })
    },[])

    
    return (
        <ProductsContext.Provider value={{ products: [...products] }}>
            {props.children}
        </ProductsContext.Provider>
    )
}
