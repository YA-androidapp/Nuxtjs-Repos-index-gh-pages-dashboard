<template>
  <v-content>
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4>
          <material-card
            color="success"
            elevation="12"
            title="User information"
          >
            <v-card-text>
              <v-form @submit.prevent="authenticate">
                <v-text-field
                  type="text"
                  v-model="username"
                  prepend-icon="person"
                  name="username"
                  label="Username"
                  :placeholder="DefaultUsername"
                ></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-layout justify-center align-center>
                <v-btn color="success" @click.prevent="authenticate"
                  >Enter</v-btn
                >
              </v-layout>
            </v-card-actions>
          </material-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
// Copyright (c) 2019 YA-androidapp(https://github.com/YA-androidapp) All rights reserved.

import { mapActions } from "vuex";
import materialCard from "~/components/material/AppCard";

export default {
  components: {
    materialCard
  },
  data() {
    return {
      DefaultUsername: "ya-androidapp",
      username: "admin"
    };
  },
  async asyncData(context) {
    console.log("index.vue", "asyncData()", "process", process);
    if (process.browser) {
      console.log(
        "index.vue",
        "asyncData()",
        "location.hostname",
        location.hostname
      );

      let usrname = location.username;
      if (usrname !== undefined && usrname !== null && usrname !== "") {
        console.log("index.vue", "asyncData()", "usrname", usrname);
        return {
          username: usrname
        };
      } else {
        const suffixGithubIo = ".github.io"; // "lhost"; // for test
        let hstname = location.hostname;
        if (hstname.indexOf(suffixGithubIo) > -1) {
          console.log(
            "index.vue",
            "asyncData()",
            "suffixGithubIo",
            hstname.indexOf(suffixGithubIo)
          );
          return {
            username: hstname.split(suffixGithubIo)[0]
          };
        } else {
          let pthname = location.pathname;
          if (hstname.indexOf("github.com") > -1 && pthname.length > 1) {
            console.log(
              "index.vue",
              "asyncData()",
              "github.com",
              hstname.indexOf("github.com")
            );
            return {
              username: pthname.substring(1).split("/")[0]
            };
          }
        }
      }
    }
    if (context) {
      console.log("index.vue", "asyncData()", "context", context);
      if (context.query) {
        console.log("index.vue", "asyncData()", "context.query", context.query);
        if (context.query.username) {
          console.log(
            "index.vue",
            "asyncData()",
            "context.query.username",
            context.query.username
          );

          await context.store.dispatch(
            "user/setUsername",
            context.query.username
          );
          console.log("index.vue", "asyncData()", "query", "dispatch");

          return {
            username: context.query.username
          };
        }
      }
    }
    console.log("index.vue", "asyncData()", "end");
  },
  computed: {},
  methods: {
    ...mapActions({
      setUsername: "user/setUsername"
    }),

    async authenticate() {
      console.log("index.vue", "authenticate()");

      if (
        this.username !== undefined &&
        this.username !== null &&
        this.username !== ""
      ) {
        console.log("index.vue", "authenticate()", "if");
        await this.setUsername(this.username);
        console.log(
          "index.vue",
          "authenticate()",
          "setUsername()",
          this.username
        );
        if (
          undefined !== this.$store.getters["user/getUsername"] &&
          null !== this.$store.getters["user/getUsername"] &&
          0 != this.$store.getters["user/getUsername"].length
        ) {
          console.log(
            'this.$store.getters["user/getUsername"]',
            this.$store.getters["user/getUsername"]
          );
        }
        this.$router.push({ path: "dashboard" });
        console.log("index.vue", "authenticate()", "push()");
      }
    },

    none() {
      return;
    }
  }
};
</script>
