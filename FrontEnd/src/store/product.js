import { create}  from "zustand";

export const useProductStore = create((set) => ({
    products: [],
    setProduct: (product) => set({ product }),

    createProduct: async (newProduct) => {

        if (!newProduct.title || !newProduct.price || !newProduct.imgUrl) {
            return {sucess: false, message: "Please fill all fields"};
        }
        const response = await fetch("/api/products", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newProduct),
        });
        const data = await response.json();
        
        set((state) => ({ products: [...state.products, data.data] }));
        return {sucess: true, message: "Product created"};
    },

    fatchProducts: async () => {
        const response = await fetch("/api/products");
        const data = await response.json();
        set({ products: data.data });
    },

    deleteProduct: async (id) => {
        const response = await fetch(`/api/products/${id}`, {
            method: "DELETE",
        });
        const data = await response.json();
        if (!data.success) {
            return {sucess: false, message: data.message};
        }
        set((state) => ({
            products: state.products.filter((product) => product._id !== id),
        }));
        return { success: true, message: "Product delete successfully!" };
    },

    updateproduct: async (id, updateProduct) => {
      try {
        const response = await fetch(`/api/products/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updateProduct), // Send updated product details
        });
    
        // Handle non-OK responses
        if (!response.ok) {
          const error = await response.json();
          return { success: false, message: error.message || "Update failed." };
        }
    
        const data = await response.json();
    
        // Update the state with the new product data
        set((state) => ({
          products: state.products.map((product) => {
            if (product._id === id) {
              return data.data; // Replace the product with the updated one
            }
            return product; // Ensure to return the original product if no match
          }),
        }));
    
        return { success: true, message: "Product updated successfully!" };
      } catch (error) {
        console.error("Error updating product:", error);
        return { success: false, message: "An error occurred while updating the product." };
      }
    },
        
}));
        