
const cartState = {
    folowCart: true,
    addAlert: false,
    onCheckout: false,
    alertShow: false,
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
                total: total + 1,
                items: items
            }));
            return { ...state, folowCart: !state.folowCart, alertShow: true };
            
        case 'UPDATE':
            localStorage.setItem('cart', action.data);
            return { ...state, folowCart: !state.folowCart }

        case 'DELETE':
            let dCartStorage = JSON.parse(localStorage.getItem('cart'));
            let dItems = [...dCartStorage.items];
            let dTotal = dCartStorage.total;

            let i = dItems.findIndex((obj) => {
                return obj.id == action.item.id;
            })

            dItems.splice(i, 1);
            localStorage.setItem('cart', JSON.stringify({
                total: dTotal - action.item.count,
                items: dItems
            }));

            return { ...state, folowCart: !state.folowCart }

        case 'SHOW_CART':
            return { ...state, onCheckout: !state.onCheckout }

        case 'HIDE_ALERT':
            return { ...state, alertShow: false }

        default:
            return state
    }
}

export default cartReducer;
