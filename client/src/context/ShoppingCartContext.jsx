/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { useContext, createContext, useState, useCallback, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuthContext } from "./AuthContext";

const CartContext = createContext({});


export const CartProvider = ({ children }) => {
    const { userProfile } = useAuthContext();
    const [cart, setCart] = useState([]);
    const [cartCount, setCartCount] = useState(undefined);
    const [isCartLoading, setIsCartLoading] = useState(true);
    const [openCartModal, setOpenCartModal] = useState(false);
    const [totalPrice, setTotalPrice] = useState(undefined);
    const [exchangeRate, setExchangeRate] = useState(null);
    const [isRateLoading, setIsRateLoading] = useState(false);

    /** fetch cart */
    const fetchUserCartProfile = useCallback(async () => {
        setIsCartLoading(true);

        try {
            const { data } = await axios.get(`/cart/${userProfile?._id}`);
            setCart(data)
        } catch (error) {
            console.log(error);
        } finally {
            setIsCartLoading(false);
        }
    }, [userProfile]);

    useEffect(() => {
        fetchUserCartProfile();
    }, [fetchUserCartProfile]);

    /** update cart */
    const updateCartItemQuantity = async (itemId, newQuantity) => {
        try {
            await axios.put(`/cart/update/${itemId}`, { quantity: newQuantity });
            fetchUserCartProfile();
        } catch (error) {
            console.log(error);
        }
    }

    /** increase product quantity */
    const handleIncrementCartItemQuantity = (itemId) => {
        const cartItem = cart.find((item) => item._id === itemId);
        if (cartItem) {
            const newQuantity = cartItem.quantity + 1;
            updateCartItemQuantity(itemId, newQuantity);
        }
    }

    /** decrease product quantity */
    const handleDecreaseCartItemQuantity = (itemId) => {
        const cartItem = cart.find((item) => item._id === itemId);
        if (cartItem) {
            const newQuantity = cartItem.quantity - 1;
            updateCartItemQuantity(itemId, newQuantity);
        }
    }

    /** delete product cart item */
    const handleDeleteCart = async (itemId) => {
        try {
            const { status, data } = await axios.delete(`/cart/delete/${userProfile?._id}/${itemId}`);
            console.log({data})
            if (status === 200) {
                fetchUserCartProfile();
                toast.success(data);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.error)
        }
    }

    /** calculate the total price of all products in the cart */

    /** recalculate total price whenever cart changes */
    useEffect(() => {
        const calculateTotalPrice = async() => {
            const total = cart?.reduce((accumulatedPrice, item) => {
                return accumulatedPrice + item?.price * item?.quantity;
            }, 0);
            setTotalPrice(total);
        }
        calculateTotalPrice();
    }, [cart, exchangeRate])

    /** recalculate total cart quantity whenever cart changes */
    useEffect(() => {
        const calulateTotalQuantity = async () => {
            const total = cart?.reduce((accumulatedQty, item) => {
                return accumulatedQty + item?.quantity;
            }, 0);
            setCartCount(total);
        };
        calulateTotalQuantity();
    }, [cart])


    /** handle dollar exchange rate */
    useEffect(() => {
        const fetchExchangeRate = async () => {
            setIsRateLoading(true);
            try {
                const response = await fetch('https://api.exchangerate-api.com/v4/latest/UGX');
                const { rates } = await response.json();
               
                setExchangeRate(rates?.USD);
            } catch (error) {
                console.log(error);
            } finally {
                setIsRateLoading(false);
            }
        };
        fetchExchangeRate();
    }, [])

    return (
        <CartContext.Provider
            value={{
                cart,
                setCart,
                fetchUserCartProfile,
                isCartLoading,
                setIsCartLoading,
                cartCount,
                setCartCount,
                handleIncrementCartItemQuantity,
                handleDecreaseCartItemQuantity,
                handleDeleteCart,
                openCartModal,
                setOpenCartModal,
                totalPrice,
                setTotalPrice,
                exchangeRate,
                isRateLoading
            }}
        >
            {children}
        </CartContext.Provider>
    )
}

export default CartProvider;


export const useCartContext = () => {
    return useContext(CartContext)
}
