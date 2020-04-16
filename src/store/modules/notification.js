export const namespaced = true

export const state = {
    notifications: []
}

let nextId = 1

export const mutations = {
    PUSH(state, notification) {
        state.notification.push({
            // when we push a new notification this code adds a new id
            ...notification,
            id: nextId++
        })
    },
    DELETE(state, notificationToRemove) {
        state.notifications = state.notifications.filter(
            notification => notification.id !== notificationToRemove
        )
    }
}

export const actions = {
    add({ commit }, notification) {
        commit('PUSH', notification)
    },
    remove({ commit }, notificationToRemove) {
        commit('DELETE', notificationToRemove)
    }
}