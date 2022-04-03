<template>
  <div class="container">
    <div v-if="access">
      <div class="row justify-content-end">
        <router-link to="/new-superhero" class="but-link">
          <button class="btn btn-success">
              Create a new Superhero
          </button>
        </router-link>
      </div>
      <div v-if="!posts.error" class="offset">
        <table class="table table-bordered">
          <thead>
            <tr>
              <th>Image</th>
              <th>Nickname</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
          <tr v-for="p in displayedPosts" :key="p.id">
            <td>
              <router-link :to="`/superhero/${p.id}`">
                <img class="avatar" :src="p.images" alt="Wrong img" height="50px" />
              </router-link>
            </td>
            <td>
              <router-link :to="`/superhero/${p.id}`">
                {{p.nickname}}
              </router-link>
            </td>
            <td>
              <router-link :to="`/edit-superhero/${p.id}`">
                <button class="btn btn-warning btn-block">
                  Edit
                </button>
              </router-link>
            </td>
            <td>
              <button class="btn btn-danger btn-block" @click="deleteHero(p.id)">Delete</button>
            </td>
          </tr>
          </tbody>
        </table>
        <nav class="row justify-content-center">
          <ul class="pagination">
            <li class="page-item">
              <button type="button" class="page-link"  @click="page = 1"> First </button>
            </li>
            <li class="page-item" v-if="page != 1">
              <button type="button" class="page-link"  @click="page--"> Previous </button>
            </li>
            <li class="page-item">
              <button type="button" class="page-link" v-for="pageNumber in pages.slice(page-1, page+5)" :key="pageNumber._id" @click="page = pageNumber"> {{pageNumber}} </button>
            </li>
            <li class="page-item">
              <button type="button" @click="page++" v-if="page < pages.length" class="page-link"> Next </button>
            </li>
            <li class="page-item">
              <button type="button" @click="page = pages.length" class="page-link"> Last </button>
            </li>
          </ul>
        </nav>
        <p style="text-align: center;">Current Page: {{ page }}</p>
      </div>
      <div v-if="posts.error" class="posts-error">
      <h1>{{ posts.error }}</h1>
    </div>
    </div>
    <div style="padding: 0 30%">
      <div v-if="!access"
      class="alert"
      style="text-align: center;"
      :class="'alert-danger'"
      >
        Сторінка за даним запитом не доступна
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Admin',
  data() {
    return {
      content: '',
      access: false,
      posts : [''],
			page: 1,
			perPage: 5,
			pages: [],
    };
  },
  methods:{
    async deleteHero(id) {
      try{
        this.data = (await this.$store.dispatch('superheros/deleteById', id)).data;
        alert(this.data.message)
        window.location.reload();
      } catch(err) {
        alert(err.toString())
      }
    },
		getPosts () {	
      this.$store.dispatch('superheros/getAll').then(
        data => {
          this.posts = data.data;
          if(!this.posts.error) {
            this.posts = this.posts.map((el) => {
              return {
                id: el._id,
                nickname: el.nickname,
                images: el.images[0] || 'https://qui-cdn.azureedge.net/content/shared/default-image-620x600.jpg'
              }
            });
          }
        },
        error => {
          alert(JSON.stringify(error))
        }
      );
		},
		setPages () {
			let numberOfPages = Math.ceil(this.posts.length / this.perPage);
			for (let index = 1; index <= numberOfPages; index++) {
				this.pages.push(index);
			}
		},
		paginate (posts) {
			let page = this.page;
			let perPage = this.perPage;
			let from = (page * perPage) - perPage;
			let to = (page * perPage);
			return  posts.slice(from, to);
		}
	},
  mounted() {
    this.access = this.$store.state.auth.user ? true : false;
  },
	computed: {
		displayedPosts () {
			return this.paginate(this.posts);
		}
	},
	watch: {
		posts () {
			this.setPages();
		}
	},
	created(){
		this.getPosts();
	},
	filters: {
		trimWords(value){
			return value.split(" ").splice(0,20).join(" ") + '...';
		}
	}
};
</script>

<style scoped>

button.page-link {
	display: inline-block;
  font-size: 20px;
  color: #29b3ed;
}
.offset{
  width: 90% !important;
  margin: 20px auto;  
}

.container {
  margin-top: 1rem;
}

.avatar {
  height: 10em;
  border-radius: 100%;
}

.posts-error {
  text-align: center;
  margin: 100px 0 0 0;
}

</style>