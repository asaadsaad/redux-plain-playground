const { createStore, combineReducers, applyMiddleware } = require('redux')
const { logger } = require('redux-logger')
const axios = require('axios')
// const thunk = require('redux-thunk').default
const promiseMiddleware = require('redux-promise-middleware').default


// const InitialState1 = { data: [] };
// const InitialState2 = { counter: 0 };

// function reducer1(state = InitialState1, action) {
//     switch (action.type) {
//         case 'ADD_TODO': return { data: [...state.data, action.payload] }
//         case 'DELETE_LAST_TODO': {
//             const newData = state.data.filter((item, index) => index !== state.data.length - 1)
//             return { data: newData }
//         }
//         default: return state;
//     }
// }
// function reducer2(state = InitialState2, action) {
//     switch (action.type) {
//         case 'INC': return { counter: ++state.counter }
//         case 'DEC': return { counter: --state.counter }
//         default: return state;
//     }
// }
const InitialState = { data: [] }
function reducer(state = InitialState, action) {
    switch (action.type) {
        // case 'FETCH_USER': return { data: [...state.data] }
        case 'FETCH_USER_PROMISE_PENDING': console.log('Fetching User In Progress...'); return { data: [...state.data] };
        case 'FETCH_USER_PROMISE_FULFILLED': return { data: [...state.data, action.payload.data.name] }
        case 'FETCH_USER_PROMISE_REJECTED': console.log('Fetching User Failed...'); return { data: [...state.data] }
        case 'DISPLAY_USER': return { data: [...state.data, action.payload] }
        default: return state;
    }
}


const loggerMiddleware = store => next => action => {
    console.log(`dispatching new action ${action.type}`);
    next(action);
}



// const ALL_REDUCERS = combineReducers({ reducer1, reducer2 })
// const store = createStore(ALL_REDUCERS, applyMiddleware(thunk));
// const store = createStore(reducer, applyMiddleware(thunk, loggerMiddleware));
const store = createStore(reducer, applyMiddleware(promiseMiddleware(), loggerMiddleware));


// store.subscribe(() => console.log('Ohhh State has Changed'))
store.subscribe(() => console.log(JSON.stringify(store.getState())))

// store.dispatch({
//     type: 'ADD_TODO',
//     payload: { message: 'Walk the dog' }
// })
// store.dispatch({
//     type: 'ADD_TODO',
//     payload: { message: 'Pet the cat' }
// })

// store.dispatch({
//     type: 'INC'
// })
// store.dispatch({
//     type: 'INC'
// })

// store.dispatch(dispatch => {
//     dispatch({ type: 'FETCH_USER' })
//     axios.get('https://jsonplaceholder.typicode.com/users/1')
//         .then((res) => dispatch({ type: 'DISPLAY_USER', payload: res.data.name }))
// })

// store.dispatch(dispatch => {
//     dispatch({ type: 'FETCH_USER' })
//     axios.get('https://jsonplaceholder.typicode.com/users/2')
//         .then((res) => dispatch({ type: 'DISPLAY_USER', payload: res.data.name }))
// })


store.dispatch({
    type: 'FETCH_USER_PROMISE',
    payload: axios.get('https://jsonplaceholder.typicode.com/users/1')
})




// store.dispatch({
//     type: 'DISPLAY_USER',
//     payload: 'Asaad Saad'
// })
