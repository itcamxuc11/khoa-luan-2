const initialState = {
    location: {
        lat: '10.871326',
        lng: '106.789129'
    },
    address: '1 Võ Văn Ngân TP.HCM Việt Nam'
}

const searchReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SEARCH':
            return action.data
        default:
            return state
    }
}

export default searchReducer;