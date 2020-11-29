export const data = (state = [], { payload, type }) => {

    switch (type) {
        case "INITIALIZE":
            return [...payload];
        case "ADD_PRODUCT":
            return [...state, payload]
        case "REMOVE_PRODUCT":
            return state
        case "EDIT_PRODUCT":
            return state
        default:
            return state
            break;
    }

}