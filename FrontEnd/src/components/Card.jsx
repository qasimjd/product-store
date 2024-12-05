import { useProductStore } from "../store/product";
import { useState } from "react";

const Card = ({ item }) => {
  const { imgUrl, title, price } = item;
  const { deleteProduct, updateproduct } = useProductStore();

  // Delete product handler
  const handleDeleteProduct = async () => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (isConfirmed) {
      const { success, message } = await deleteProduct(item._id);
      if (!success) {
        alert(message);
      } else {
        alert("Product deleted successfully!");
      }
    }
  };

  // Update product handler
  const handleUpdateProduct = async () => {
    // Validate input fields
    if (!updateProduct.title || !updateProduct.price || !updateProduct.imgUrl) {
      alert("Please fill all fields before saving.");
      return;
    }

    const { success, message } = await updateproduct(item._id, updateProduct);
    if (!success) {
      alert(message);
    } else {
      document.getElementById(`modal_${item._id}`).close(); // Close modal on success
    }
  };

  // State for updating the product
  const [updateProduct, setupdateProduct] = useState(item);

  return (
    <div className="card card-compact bg-base-300 w-96 shadow-xl transform transition-transform duration-300 hover:scale-105 hover:ease-in-out">
      <figure>
        <img className="w-full h-60 object-cover" src={imgUrl} alt={title} />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p>${price}</p>
        <div className="card-actions justify-end">
          <button onClick={handleDeleteProduct} className="btn btn-outline">
            Delete
          </button>

          {/* Open the modal */}
          <button
            className="btn btn-primary"
            onClick={() =>
              document.getElementById(`modal_${item._id}`).showModal()
            }
          >
            Edit
          </button>
          <dialog
            id={`modal_${item._id}`} // Unique modal ID for each card
            className="modal modal-bottom sm:modal-middle"
          >
            <div className="modal-box">
              <h3 className="font-bold text-lg">Update Product</h3>
              <div className="flex flex-col gap-4 my-5">
                <input
                  type="text"
                  placeholder="Title"
                  value={updateProduct.title}
                  className="input input-bordered input-primary w-full max-w-xs"
                  onChange={(e) =>
                    setupdateProduct({ ...updateProduct, title: e.target.value })
                  }
                />
                <input
                  type="number"
                  placeholder="Price"
                  value={updateProduct.price}
                  className="input input-bordered input-primary w-full max-w-xs"
                  onChange={(e) =>
                    setupdateProduct({ ...updateProduct, price: e.target.value })
                  }
                />
                <input
                  type="text"
                  placeholder="ImgUrl"
                  value={updateProduct.imgUrl}
                  className="input input-bordered input-primary w-full max-w-xs"
                  onChange={(e) =>
                    setupdateProduct({
                      ...updateProduct,
                      imgUrl: e.target.value,
                    })
                  }
                />
              </div>
              <div className="modal-action">
                <button
                  onClick={handleUpdateProduct}
                  className="btn btn-primary mr-2"
                >
                  Save
                </button>
                <button
                  className="btn"
                  onClick={() =>
                    document.getElementById(`modal_${item._id}`).close()
                  }
                >
                  Close-
                </button>
              </div>
            </div>
          </dialog>
        </div>
      </div>
    </div>
  );
};

export default Card;
