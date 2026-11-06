export function appStateReducer(state, action) {
    switch (action.type) {
        case "SHOW_NOTIFICATION":
            return {
                ...state,
                notification: { notificationStack: [action.payload, ...state.notification.notificationStack] }
            };
        case "CLOSE_NOTIFICATION": {

            let notification = state.notification.notificationStack;
            let deletedNotification = notification.filter((ele) => { return ele.id != action.idToDelete });


            return {
                ...state,
                notification: { ...state.notification, notificationStack: [...deletedNotification] }
            };
        }
        default:
            return state;
    }
}