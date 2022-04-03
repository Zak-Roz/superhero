<template>
  <div class="col-md-12">
      <div v-if="!successful">
      <h1>Edit superhero: {{superhero.nickname}}</h1>
      <form name="form" @submit.prevent="handleRegister">
          <table width="100%" cellpadding="5">
            <tbody>
            <tr>
              <td width="50%">
                <lable for="nickname">Nickname</lable>
              </td>
              <td width="50%">
                <lable for="real_mame">Real mame</lable>
              </td>
            </tr>
            <tr>
              <td>
                <input
                  v-model="superhero.nickname"
                  v-validate="'required'"
                  type="text"
                  class="form-control"
                  name="nickname"
                  placeholder="The Flash"
                />
                <div v-if="submitted && errors.has('nickname')" class="alert-danger"> 
                  {{errors.first('nickname')}}
                </div>
              </td>
              <td>
                <input
                  v-model="superhero.real_mame"
                  v-validate="'required'"
                  type="text"
                  class="form-control"
                  name="real_mame"
                  placeholder="Barry Allen"
                />
                <div v-if="submitted && errors.has('real_mame')" class="alert-danger">
                  {{errors.first('real_mame')}}
                </div>
              </td>
            </tr> 
            </tbody>
          </table>
          <!-- origin_description -->
          <div class="form-group">
            <label for="origin_description">Origin description</label>
            <textarea
            v-model="superhero.origin_description"
            v-validate="'required'"
            type="text"
            class="form-control"
            name="origin_description" 
            placeholder="Bartholomew Henry 'Barry' Allen (born March 14, 1989) is a scientist in the Criminal and Forensic Science Division of the Central City Police Department. He is the son of the late Henry and Nora Allen, the foster son turned son-in-law of Joe West, the husband of Iris West-Allen and the brother-in-law of Wally West, the archenemy of Eobard Thawne, as well as the father of his future children, Nora West-Allen and Bart Allen." 
            rows="2"></textarea>
            <div v-if="submitted && errors.has('origin_description')" class="alert-danger">
              {{errors.first('origin_description')}}
            </div>
          </div>
          <!-- superpowers -->
          <div class="form-group">
            <label for="superpowers">Superpowers</label>
            <textarea
            v-model="superhero.superpowers"
            v-validate="'required'"
            type="text"
            class="form-control"
            name="superpowers" 
            placeholder="Barry has the ability to run at super-human velocities. He was at times during the Silver Age described as faster than the speed of thought. The Flash #150, 'straining every muscle', he ran at ten times the speed of light.[] However, when he pushed himself further (during the Crisis on Infinite Earths) he appeared to waste away as he was converted into pure energy, traveled back in time, and was revealed in Secret Origins Annual #2 to be the very bolt of lightning that gave him his powers. This was later retconned in The Flash: Rebirth #1, where Barry stated that he 'ran into the Speed Force' and that, 'When he stopped the Anti-Monitor, when (he) ran into the 'Speed Force' and joined it, it was like shedding (his) identity'. His speed allows him, in certain circumstances, to 'vibrate' between dimensions. In Grant Morrison's Final Crisis, using the Speed Force, Allen was able to undo the effects of the Anti-Life Equation upon an individual: an ability he used on his wife Iris to free her from the bondage of Darkseid's mind control." 
            rows="2"></textarea>
            <div v-if="submitted && errors.has('superpowers')" class="alert-danger">
              {{errors.first('superpowers')}}
            </div>
          </div>
          <!-- catch_phrase -->
          <div class="form-group">
            <label for="catch_phrase">Catch phrase</label>
            <textarea
            v-model="superhero.catch_phrase"
            v-validate="'required'"
            type="text"
            class="form-control"
            name="catch_phrase" 
            placeholder="Run Barry, Run!" 
            rows="1"></textarea>
            <div v-if="submitted && errors.has('catch_phrase')" class="alert-danger">
              {{errors.first('catch_phrase')}}
            </div>
          </div>
          <!-- current Images -->
          <div class="form-group" v-if="this.superhero.images.length">
            <label for="image">Change images</label>
            <table class="table table-striped table-hover center-table" style="width: 80%;">
              <tbody>
                <tr v-for="image in superhero.images" :key="image">
                  <td><img class="avatar" :src="image" alt="Wrong img" height="100px" /></td>
                  <td>
                    <button class="btn btn-danger btn-block" @click="deleteImg(image)">Delete</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <!-- new Images -->
          <div class="form-group">
            <label for="image">Add images</label>
            <input type="file" @change="uploadFile" multiple>
          </div>
          <!-- Submit -->
          <div class="row justify-content-center" style="margin: 1% 0 2% 0;">
            <div class="col-3">
              <button type="submit" @submit.prevent="next" class="btn btn-success btn-block">Save changes</button>
            </div>
          </div>
      </form>
      </div>
      <div v-if="message" class="card card-container">
        <div
          class="alert"
          :class="successful ? 'alert-success' : 'alert-danger'"
        >{{message}}
        </div>
      </div>
  </div>
</template>

<script>
import Superhero from '../../models/superhero';

export default {
  name: 'Register',
  data() {
    return {
      files: null,
      user: null,
      superhero: new Superhero('', '', '', '', '', ''),
      submitted: false,
      successful: false,
      message: '',
      services: [],
    };
  },
  async created() {
    this.superhero = (await this.$store.dispatch('superheros/getById', this.$route.params.id)).data;
  },
  methods: {
    deleteImg (img) {
      this.superhero.images.splice(this.superhero.images.indexOf(img), 1)
    },
    uploadFile (event) {
      this.files = event.target.files
    },
    handleRegister() {
      try{
        this.message = '';
        this.submitted = true;
        this.$validator.validate().then(isValid => {
          if (isValid) {
            const formData = new FormData();
            if (this.files){
              for (const i of Object.keys(this.files)) {
                formData.append('files', this.files[i])
              }
            }
            formData.set('id', this.superhero._id)
            formData.set('nickname', this.superhero.nickname)
            formData.set('real_mame', this.superhero.real_mame)
            formData.set('origin_description', this.superhero.origin_description)
            formData.set('superpowers', this.superhero.superpowers)
            formData.set('catch_phrase', this.superhero.catch_phrase)
            formData.set('images', JSON.stringify(this.superhero.images))
            this.$store.dispatch('superheros/update', formData).then(
              data => {
                alert(data.message);
                this.$router.push({ path: `/superhero/${this.superhero._id}` })
              },
              error => {
                alert(JSON.stringify(error));
                this.message =
                  (error.response && error.response.data && error.response.data.message) ||
                  error.message ||
                  error.toString();
                this.successful = false;
              }
            );
          }
        });
      } catch(err) {
        alert(err.toString())
      }
    },
  },
};
</script>

<style scoped>
label {
  display: block;
  margin-top: 10px;
}

h1 {
  text-align: center;
  margin: 1%;
}

.card-container.card {
  max-width: 350px !important;
  padding: 40px 40px;
}

.checkmark {
  position: absolute;
  top: 0;
  left: 0;
  height: 25px;
  width: 25px;
  background-color: #eee;
}

.card {
  background-color: #f7f7f7;
  padding: 20px 25px 30px;
  margin: 0 auto 25px;
  margin-top: 50px;
  -moz-border-radius: 2px;
  -webkit-border-radius: 2px;
  border-radius: 2px;
  -moz-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  -webkit-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
}

.profile-img-card {
  width: 96px;
  height: 96px;
  margin: 0 auto 10px;
  display: block;
  -moz-border-radius: 50%;
  -webkit-border-radius: 50%;
  border-radius: 50%;
}
</style>