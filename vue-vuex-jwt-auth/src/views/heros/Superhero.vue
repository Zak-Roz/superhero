<template>
<div>
  <div v-if="access">
    <h1 class="name-superhero">Nickname: {{ superhero.nickname }}</h1>
    <h3 class="name-superhero">Real name: {{ superhero.real_mame }}</h3>
    <div v-if="this.superhero.images.length" class="lingallery">
      <lingallery :iid.sync="currentId" :width="width" :height="height" :items="items"/>
    </div>

    <h5 class="origin_description">Origin description:</h5>
    <p class="origin_description">{{ superhero.origin_description }}</p>
    
    <h5 class="origin_description">Superpowers:</h5>
    <p class="origin_description">{{ superhero.superpowers }}</p>
    
    <h5 class="origin_description">Catch phrase:</h5>
    <p class="origin_description">{{ superhero.catch_phrase }}</p>

    <div class="row justify-content-center" style="margin: 3%">
      <div class="col-4">
        <router-link :to="`/edit-superhero/${superhero._id}`" class="but-link">
          <button class="btn btn-warning btn-block">
              Edit
          </button>
        </router-link>
      </div>
      <div class="col-4">
        <button class="btn btn-danger btn-block" @click="deleteHero()">Delete</button>
      </div>
    </div>
  </div>
</div>
  
</template>

<script>
import Lingallery from 'lingallery';

export default {
  data() {
    return {
      superhero: null,
      access: false,
      width: 600,
      height: 400,
      items: [],
      currentId: null,
      data: ''
    }
  },
  async created() {
    try {
      this.access = true;
      this.superhero = (await this.$store.dispatch('superheros/getById', this.$route.params.id)).data;
      this.items = this.superhero.images.map((el) => ({
        src: el,
        thumbnail: el.replace('data', 'data/thumbnail'),
      }))
    } catch(err) {
      alert(err.toString()); 
    }
  },
  methods: {
    async deleteHero() {
      try{
        this.data = (await this.$store.dispatch('superheros/deleteById', this.$route.params.id)).data;
        alert(this.data.message)
        this.$router.push({ path: `/superheros` })
      } catch(err) {
        alert(err.toString())
      }
    }
  },
  components: {
    Lingallery
  }

}
</script>

<style>
.lingallery {
  display: block;
  margin-left: auto;
  margin-right: auto;
}

.center-table {
  margin: 1% 0;
  margin-left: auto;
  margin-right: auto;
}

.origin_description {
  margin: 1% 0 1% 20%;
  text-align: left;
}

.name-superhero {
  margin: 1% 0;
  text-align: center;
}
</style>