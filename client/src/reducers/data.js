export const data = (state = [], { payload, type }) => {

    switch (type) {
        case "INITIALIZE":
            console.log(payload);
            return [...payload];
        case "ADD_PRODUCT":
            console.log('Add product');
            return [...state, payload]
        case "REMOVE_PRODUCT":
            console.log('Add product');
            return state
        case "EDIT_PRODUCT":
            console.log('Add product');
            return state
        default:
            return state
            break;
    }

}