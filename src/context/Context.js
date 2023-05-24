import { createContext, useState } from "react";

const Context = createContext()


const ContextFunction = ({children})=>{

    // user that select rating in filter option
    const [rating,setRating] = useState(0)
    // user select catagories from home page
    const[selectedCategories,setSelectedCategories] = useState("")
    // user select quantity
    const[selectedQuantity,setSelectedQuantity] = useState(0)
    // user select size
    const[selectedSize,setSelectedSize] = useState("")

    // user Total price
    const[cartData,setCartData] = useState([])

    // product name

    const[name,setName] = useState("")
    
    
    return(
            <Context.Provider value={{name,setName,cartData,setCartData,rating,setRating,selectedCategories,setSelectedCategories,
            selectedQuantity,setSelectedQuantity,selectedSize,setSelectedSize}}>
                {children}
            </Context.Provider>
        )
}

export default ContextFunction
export  {Context}