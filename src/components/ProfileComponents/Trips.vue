<template>
    <section>
        <div class="trips-container">
            <div class="trips-display-ctr">
                <button @click="loadUserTrips" :class="{'trips-btn':true,'to-render': myTrips}">My trips</button>
                <button @click="getPins" :class="{'trips-btn':true,'to-render': !myTrips}">Pins</button>
            </div>
            <div class="trip-display">
            <div class="my-trips">
                <ul class="trip-render-container flex flex-wrap align-center">
                    <li v-if="myTrips" class="create-trip flex center align-center">
                        <div class="create-btn flex center align-center" @click="createTrip = true" >+</div>
                    </li>
                    <li v-for="(trip,idx) in userTripsToDisplay" :key="idx" class="trip flex column">
                        <div class="delete-container flex space-between">
                            <div>
                                <div class="active" v-if="trip.isActive = true"> <ActivePulse></ActivePulse></div>
                                <div class="complete" v-else>Complete</div>
                            </div>
                            <div @click="deleteTrip(trip._id)" id="delete-btn" class=" flex align-center center">X</div>
                        </div>
                        <div @click="directToTrip(trip._id)" class="trip-title">{{trip.title}}</div>
                    </li>
                </ul>
            </div>
            <div class="my-pins"></div>
            </div>
        </div>
            <div class="create-board-modal" v-if="createTrip">
                <button class="close-btn" @click="closeModal">X</button>
                <div class="new-title">New trip</div>
                <form @submit.prevent="submitTrip" class="flex column">
                    <input class="title" v-model="newTrip.country" type="text" placeholder="Country">
                    <input class="title" v-model="newTrip.title" type="text" placeholder="Title">
                    <textarea class="description" v-model="newTrip.desc" maxlength="300" placeholder="Description">
                    </textarea>
                    <button class="submit-btn" @click.prevent="submitTrip">Create</button>
                </form>
        </div>
    </section>
</template>

<script>
import tripService from "../../service/tripService.js";
import ActivePulse from "../HomeComponents/ActivePulse.vue";

export default {
  name: "Tripss",
  components: {
    ActivePulse
  },
  data() {
    return {
      newTrip: {
        country: "",
        title: "",
        desc: "",
        markers: [],
        traveledTime: Date.now,
        views: 0,
        userId: this.$route.params.userId,
        isComplete: false,
        isActive: true
      },
      createTrip: false,
      myTrips: true
    };
  },
  created() {
    this.loadUserTrips();
  },
  computed: {
    userToDisplay() {
      return this.$store.getters.userToDisplay;
    },
    userTripsToDisplay() {
      return this.$store.getters.userTripsToDisplay;
    }
  },
  methods: {
    submitTrip() {
      if (this.newTrip.title === "" || this.newTrip.desc === "") return;
      tripService.addTrip(this.newTrip).then(trip => {
        this.loadUserTrips();
        this.createTrip = false;
        this.newTrip.title = "";
        this.newTrip.desc = "";
      });
    },
    loadUserTrips() {
      this.myTrips = true;
      this.$store.dispatch({
        type: "loadTripsByUserId",
        userId: this.$route.params.userId
      });
    },
    directToTrip(tripId) {
      this.$router.push(`/trips/${tripId}`);
    },
    closeModal() {
      this.createTrip = false;
      this.newTrip.title = "";
      this.newTrip.desc = "";
    },
    getPins() {
      this.myTrips = false;
      console.log(this.$store.getters.loggedIn);
      this.$store.dispatch({ type: "getPins", pins: this.userToDisplay.pins });
    },
    deleteTrip(tripId) {
      console.log("delete");
      if (this.myTrips) {
        this.$store.dispatch({
          type: "deleteUserTrip",
          deleteFrom: "trips",
          userId: this.$route.params.userId,
          tripId: tripId
        });
      } else {
        this.$store.dispatch({
          type: "deleteUserPins",
          deleteFrom: "pins",
          userId: this.$route.params.userId,
          tripId: tripId
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
$main-blue: #44809e;
.trips-display-ctr {
  margin: 0 auto;
  width: 65%;
  margin-bottom: 1.2rem;

  button {
    color: #c9c9c9;
    background-color: transparent;
    border: none;
    font-family: "roboto-bold";
    font-size: 1.2rem;
    margin-right: 0.7rem;
    padding: 0.5rem 1rem;
    cursor: pointer;
    outline: none;
  }

  //         button:hover {
  // color: #383633;
  //             background-color: #EDEDED;
  //             border-radius: 2rem;
  //             border: none;
  //             font-size: 1.2rem;
  //             cursor: pointer;
  //         }
  .trips-btn {
    transition: all 0.3s;
    &:hover {
      color: $main-blue;
      transform: scale(1.03);
    }
  }
  .to-render {
    // color: #383633;
    background-color: #ededed;
    border-radius: 2rem;
    border: none;
    font-size: 1.2rem;
    cursor: pointer;
    color: $main-blue;
  }
}
.trip-render-container {
  margin: 0 auto;
  padding: 0;
  width: 80%;
  .create-trip {
    height: 200px;
    width: 300px;
    background-color: #ededed;
    border-radius: 10px;
    margin: 0.7rem;

    .create-btn {
      height: 40px;
      width: 40px;
      border-radius: 50%;
      color: #ededed;
      background-color: #44809e;
      font-size: 2rem;
      cursor: pointer;
      transition: all 0.2s;
    }

    .create-btn:hover {
      transform: scale(1.1);
    }
  }

  .trip {
    height: 200px;
    width: 300px;
    background-color: #383633;
    color: #44809e;
    border-radius: 10px;
    margin: 0.7rem;
    position: relative;

    .active {
      color: #4ec479;
    }

    .trip-title {
      font-family: "roboto-bold";
      font-size: 3rem;
      letter-spacing: 0.2rem;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      cursor: pointer;
      transition: all 0.2s;
      @media (max-width: 760px) {
        font-size: 2.3rem;
      }
      @media (max-width: 550px) {
        font-size: 2rem;
      }
      @media (max-width: 490px) {
        font-size: 1.5rem;
      }
    }

    .trip-title:hover {
      color: #dedede;
    }
  }
  @media (max-width: 1230px) {
    .create-trip,
    .trip {
      width: 280px;
      height: 180px;
    }
  }
  @media (max-width: 1150px) {
    .create-trip,
    .trip {
      width: 260px;
      height: 160px;
    }
  }
  @media (max-width: 1080px) {
    .create-trip,
    .trip {
      width: 100%;
      height: 150px;
    }
  }
  @media (max-width: 1080px) {
    .create-trip,
    .trip {
      width: 100%;
      height: 100px;
      margin: 0.3rem;
    }
  }
}
.create-board-modal {
  box-shadow: 1px 10px 55px 2px rgba(77, 73, 77, 1);
  background-color: #fff;
  width: 50%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  .close-btn {
    border: none;
    cursor: pointer;
    font-size: 1.25rem;
    font-family: "roboto-bold";
    padding: 0.5rem;
  }
  .close-btn:hover {
    color: #44809e;
  }
  .new-title {
    padding-top: 2.5rem;
    text-align: center;
    font-family: "roboto-bold";
    font-size: 2.5rem;
  }
  form {
    padding: 3rem 5rem 5rem 5rem;
    .title {
      padding: 0.8rem;
      margin-bottom: 1.2rem;
      border-radius: 5px;
      border: 1px solid #ededed;
    }
    .description {
      margin-bottom: 1.2rem;
      padding: 0.8rem;
      height: 4rem;
      border-radius: 5px;
      border: 1px solid #ededed;
    }
    .submit-btn {
      background-color: #383633;
      color: #44809e;
      font-family: "roboto-bold";
      font-size: 1.2rem;
      padding: 0.7rem;
      border-radius: 5px;
      cursor: pointer;
    }
  }
  @media (max-width: 880px) {
    width: 60%;
  }
  @media (max-width: 720px) {
    width: 70%;
  }
  @media (max-width: 600px) {
    width: 80%;
  }
  @media (max-width: 500px) {
    width: 90%;
  }
  @media (max-width: 460px) {
    form {
      padding: 3rem 3rem 5rem 3rem;
    }
  }
}

.delete-container {
  padding: 0.3rem 0.5rem 0 0.5rem;
}

#delete-btn {
  display: none;
  cursor: pointer;
  font-size: 1.2rem;
  border-radius: 50%;
  color: #fff;
}

#delete-btn:hover {
  color: #9e241f;
}

.trip:hover #delete-btn {
  display: block;
}
</style>
