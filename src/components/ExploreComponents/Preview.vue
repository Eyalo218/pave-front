<template>
    <section>
        <div class="hover-opacity"></div>
        <div class="h-list-item">
            <Active-pulse v-if="trip.isActive" class="active-pulse"></Active-pulse>
            <div ><img @click="toDetails(`${trip._id}`)" class="item-img" :src="trip.image"></div>
            <div class="flex column txt-container">
                <div class="location" @click="toDetails(`${trip._id}`)">{{trip.title}}</div>
                <div class="country" @click="toDetails(`${trip._id}`)">{{trip.country}}</div>
                <div class="flex space-between">
                     <star-rating class="stars" active-color="#44809e" :rating="trip.avgReviews" :read-only="true" :increment="0.5" :show-rating="false"  :star-size="13">
                    </star-rating> 
                    <div><font-awesome-icon  @click="pinTrip(trip._id)" class="pin" icon="thumbtack" size="1x" /></div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import { eventBus, PINNED_TRIP } from "../../service/eventBus.js";
import ActivePulse from "@/components/HomeComponents/ActivePulse.vue";

export default {
  name: "PreviewExplore",
  components: {
    ActivePulse
  },
  props: ["trip"],
  data() {
    return {
      trips: null,
      rating: 0
    };
  },
  created() {
    //  eventBus.$on(PHOTO_TAKEN, this.toggleScreen);
  },
  computed: {
    tripsForDisplay() {
      return this.$store.getters.tripsForDisplay;
    },
    UserLoggedIn() {
      return this.$store.getters.loggedIn;
    }
  },
  methods: {
    toDetails(tripId) {
      this.$router.push(`/trips/${tripId}`);
    },
    setRating() {
      console.log(this.rating);
    },
    pinTrip(tripId) {
      if (!this.UserLoggedIn) alert("log in");
      else {
        eventBus.$emit(PINNED_TRIP);
        console.log(this.UserLoggedIn.pins[0]);
        console.log(tripId);
        this.$store.dispatch({
          type: "addPinToUser",
          user: this.UserLoggedIn,
          tripId: tripId
        });
      }
    }
  }
};
</script>


<style lang="scss" scoped>
.h-list-item {
  position: relative;
  .active-pulse {
    position: absolute;
    top: 2%;
    left: 1%;
  }
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
  border: 1px solid lightgrey;
  height: 18rem;
  width: 15rem;
  .txt-container {
    padding: 0.5rem;
  }
  .item-img {
    width: 100%;
    height: 12rem;
    cursor: pointer;
  }
  .location {
    font-family: "roboto-medium";
    font-size: 1rem;
    cursor: pointer;
    margin-bottom: 0.4rem;
  }
  .reviews {
    font-family: "roboto-medium";
  }
  .country {
    font-size: 0.8rem;
    font-family: "roboto-medium";
    cursor: pointer;
    margin-bottom: 0.4rem;
  }
  .review-dot {
    width: 12px;
  }
  .stars {
    width: 50px;
  }
}
.card {
  display: inline-block;
}
.pin {
  color: #44809e;
  padding-right: 5px;
}
.pin {
  color: #44809e;
  cursor: pointer;
}
.pin:hover {
  color: #9e241f;
}
.h-list-item:hover {
  transform: scale(1.01);
}
</style>
