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
                console.log(doc.data())
            });
        })  
        // db.collection('Products').onSnapshot(snapshot => {
        //     let changes = snapshot.docChanges();
        //     changes.forEach(change => {
        //         if (change.type === 'added') {
        //             prevProducts.push({
        //                 ProductID: change.doc.id,
        //                 ProductName: change.doc.data().ProductName,
        //                 ProductPrice: change.doc.data().ProductPrice,
        //                 ProductImg: change.doc.data().ProductImg,
        //                 ProductCategory: change.doc.data().ProductCategory
        //             })
        //         }
        //         setProducts()
        //     })
        // })
    },[])

    
    return (
        <ProductsContext.Provider value={{ products: [...products] }}>
            {props.children}
        </ProductsContext.Provider>
    )
}
