import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const toShowSuccess = (title) => {
    toast.configure();
    toast.success(title, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
    });
}

export const toShowError = (title) => {
    toast.configure();
    toast.error(title, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
    });
}