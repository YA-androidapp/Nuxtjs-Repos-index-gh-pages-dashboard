// Copyright (c) 2019 YA-androidapp(https://github.com/YA-androidapp) All rights reserved.
export default {
  ADD_REPOS(state, repos) {
    // console.log('ADD_REPOS state', state)
    // console.log('ADD_REPOS repos', repos)
    repos.forEach(function (value) {
      if (undefined !== value && null !== value) {
        // console.log("mutaions.js", "value", value);
        // if (undefined !== value.html_url && null !== value.html_url) {
        //   console.log("mutations.js", value.html_url);
        // }
        state.repos.splice(-1, 0, value);
      }
    });
    // state.repos = state.repos.concat(repos);
  },
  NOTIFY(state) {
    state.repos.splice();
    console.log('NOTIFY')
  }
}
