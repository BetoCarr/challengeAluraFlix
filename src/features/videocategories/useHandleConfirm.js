// import { useDispatch } from "react-redux";
// import { deleteCategory, updateCategory } from "./videoCategoriesSlice";
// import { closeFeedback } from "../feedbackdialog/feedbackActions";

// export const useHandleConfirm = () => {

//     const dispatch = useDispatch();

//     const handleConfirm = (actionType, categoryId, editedData) => {
//         if (actionType === 'delete') {
//             console.log("Borrar Categoria")
//             dispatch(deleteCategory(categoryId));
        
//         } else if (actionType === 'edit') {
//             dispatch(updateCategory(editedData));
//         }
//         dispatch(closeFeedback());
//     };

//     return { handleConfirm };
// }