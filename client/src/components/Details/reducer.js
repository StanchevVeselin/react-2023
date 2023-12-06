const reducer = (state,action) => {
    switch (action?.type) {
      case "GET_ALL_PRODUCTS":
            return [...action.payload];
      case "ADD_COMMENT":
            return [...state, action.payload]
      case "UPDATE_COMMENT":
        
        if (action.payload && action.payload._id) {
          return state.map((comment) =>
            comment._id === action.payload._id ? { ...comment, ...action.payload } : comment
          );
        } else {
          console.error("Invalid action payload for UPDATE_COMMENT:", action.payload);
          return state;
        }
        case "DELETE_COMMENT":
          return state.filter(comment => comment._id !== action.payload);
  default:
          return state;
      
    }
  }

  export default reducer;