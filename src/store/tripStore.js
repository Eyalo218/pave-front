import Vue from 'vue'
import Vuex from 'vuex'

import tripService from '../service/tripService.js'

export default {
    state: {
        trips: [],
        currTrip: null,
        currUserTrips: []
    },
    mutations: {
        loadTrips(state, { trips }) {
            state.trips = trips
        },
        setCurrTrip(state, { trip }) {
            state.currTrip = trip
        },
        userTripsToDisplay(state, {trips}) {
            console.log('his here, ', trips);
            state.currUserTrips = trips
        }
    },
    getters: {
        tripsForDisplay(state) {
            return state.trips;
        },
        getCurrTrip(state){
            console.log('lala',state.currTrip)
            return state.currTrip;
        },
        userTripsToDisplay(state){
            return state.currUserTrips;
        }
    },
    actions: {
        loadTrips(context, { searchedText }) {
            tripService.query(searchedText)
                .then(trips => {
                    context.commit({ type: 'loadTrips', trips })
                })
        },
        setCurrTrip(context, { currTripId }) {
            return tripService.getById(currTripId)
                .then(trip => context.commit({ type: 'setCurrTrip', trip }))
        },
        loadTripsByUserId(context, {userId}) {
            console.log('user id in store', userId)
            return tripService.query('' ,userId)
                .then(trips => context.commit({ type: 'userTripsToDisplay', trips }))
        }
    }
}
