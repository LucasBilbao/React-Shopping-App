import { useDispatch } from "react-redux";
import { clearCart } from "../features/cart/cartSlice";
import { closeModal } from "../features/modal/modalSlice";

function Modal() {
  const dispatch = useDispatch();

  const dispatchCloseModal = () => dispatch(closeModal());

  return (
    <aside className="modal-container">
      <div className="modal">
        <h4>remove all items from your shopping cart?</h4>
        <div className="btn-container">
          <button
            className="btn confirm-btn"
            type="button"
            onClick={() => {
              dispatch(clearCart());
              dispatchCloseModal();
            }}
          >
            confirm
          </button>
          <button
            className="btn clear-btn"
            type="button"
            onClick={() => dispatchCloseModal()}
          >
            cancel
          </button>
        </div>
      </div>
    </aside>
  );
}

export default Modal;
