<template>
    <section>
        <CtrPanel></CtrPanel>
        <Header></Header>
        <PersonalInfo></PersonalInfo>
        <Trips></Trips>
        <Footer></Footer>
    </section>
</template>

<script>

import userService from '../service/userService.js'
import CtrPanel from '../components/ProfileComponents/ctrPanel.vue'
import Header from '../components/ProfileComponents/Header.vue'
import PersonalInfo from '../components/ProfileComponents/PersonalInfo.vue'
import Trips from '../components/ProfileComponents/Trips.vue'
import Footer from '../components/ProfileComponents/Footer.vue'


export default {
    name: 'profilePage',
    components: {
        CtrPanel,
        Header,
        PersonalInfo,
        Trips,
        Footer
    },
    data(){
        return {
            user: null,
        }
    },
    created(){
        this.loadProfileInfo()
    },
    methods: {
        loadProfileInfo(){
            this.$store.dispatch({type: 'loadUserById', id: this.$route.params.userId})
        }
    },
    computed: {
        userToDisplay() {
            return this.$store.getters.userToDisplay
        },
        isExploreOpen() {
            return this.$store.getters.isExploreOpen
        }
    }
}
</script>

<style lang="scss" scoped>
    
</style>
