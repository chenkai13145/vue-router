const routers={
    state: {
        navlist:[]
    },
    mutations: {
        navlist(state,data){
            state.navlist=data
        }
    },
    actions: {
        navlist({commit},data){
            commit('navlist',data)
        }
    },
}

export default routers;