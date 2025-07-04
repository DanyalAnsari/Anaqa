// import { useContext, useEffect, useState } from "react";
// import { ShopContext } from "../../context/ShopContext";
// import Title from "@/components/common/Title";
// import { assets } from "@/assets/assets.js";
// import CartTotal from "@/components/CartTotal";

const Cart = () => {
//   const { products, currency, cartItem, updateQuantity, navigate } = useContext(ShopContext);
//   const [cartData, setCartData] = useState([]);

//   useEffect(() => {
//     if (products.length > 0) {
//       const tempData = [];
      
//       Object.entries(cartItem).forEach(([productId, sizes]) => {
//         Object.entries(sizes).forEach(([size, quantity]) => {
//           if (quantity > 0) {
//             tempData.push({
//               _id: productId,
//               size,
//               quantity,
//             });
//           }
//         });
//       });
      
//       setCartData(tempData);
//     }
//   }, [cartItem, products]);

//   const handleQuantityChange = (productId, size, value) => {
//     const quantity = Number(value);
//     if (quantity > 0) {
//       updateQuantity(productId, size, quantity);
//     }
//   };

//   const removeItem = (productId, size) => {
//     updateQuantity(productId, size, 0);
//   };

  return 
    // <div className="border-t pt-14">
    //   <div className="text-2xl mb-3">
    //     <Title text1="YOUR" text2="CART" />
    //   </div>
      
    //   <div>
    //     {cartData.map((item, index) => {
    //       const productData = products.find(product => product._id === item._id);
          
    //       if (!productData) return null;
          
    //       return (
    //         <div
    //           key={index}
    //           className="py-4 border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4"
    //         >
    //           <div className="flex items-start gap-6">
    //             <img
    //               src={productData.image[0]}
    //               className="w-16 sm:w-20"
    //               alt={productData.name}
    //             />
    //             <div>
    //               <p className="text-xs sm:text-lg font-medium">{productData.name}</p>
    //               <div className="flex items-center gap-5 mt-2">
    //                 <p>{currency}{productData.price}</p>
    //                 <p className="px-2 sm:px-3 sm:py-1 border bg-slate-50">{item.size}</p>
    //               </div>
    //             </div>
    //           </div>
              
    //           <input
    //             type="number"
    //             min="1"
    //             value={item.quantity}
    //             onChange={(e) => handleQuantityChange(item._id, item.size, e.target.value)}
    //             className="border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1"
    //           />
              
    //           <img
    //             onClick={() => removeItem(item._id, item.size)}
    //             src={assets.bin_icon}
    //             className="w-4 mr-4 sm:w-5 cursor-pointer"
    //             alt="Remove item"
    //           />
    //         </div>
    //       );
    //     })}
    //   </div>
      
    //   <div className="flex justify-end my-20">
    //     <div className="w-full sm:w-[450px]">
    //       <CartTotal />
    //       <div className="w-full text-end">
    //         <button
    //           onClick={() => navigate('/place-order')}
    //           className="bg-black text-white text-sm my-8 px-8 py-3"
    //         >
    //           PROCEED TO CHECKOUT
    //         </button>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  
};

export default Cart;