
const cartState = {
    folowCart: true,
    addAlert: false,
    onCheckout: false,
}

const cartReducer = (state = cartState, action) => {
    switch (action.type) {
        case "ADD":
            let cartStorage = JSON.parse(localStorage.getItem('cart'));
            let items = [];
            let total = 0;
            if (cartStorage) {
                items = [...cartStorage.items];
                total = cartStorage.total;
                let tmp = items.findIndex((obj) => {
                    return obj.id == action.item.id;
                })
                if (tmp !== -1) items[tmp].count++;
                else items.push(action.item);
            }
            else items.push(action.item);
            localStorage.setItem('cart', JSON.stringify({
                total: total+1,
                items: items
            }));
            return { ...state, folowCart: !state.folowCart }
        case 'REMOVE':
            return state
        case 'SHOW_CART':
            return { ...state, onCheckout: !state.onCheckout }
        default:
            return state
    }
}

export default cartReducer;
