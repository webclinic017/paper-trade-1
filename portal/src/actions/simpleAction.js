export const simpleAction = () => dispatch => {
    console.log("hello")
    dispatch({
        type: 'SIMPLE_ACTION',
        payload: 'result_of_simple_action'
    })
}