<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent, SetupContext, provide } from '@vue/composition-api';

import useUser, { UserKey } from '@/composables/user';

export default defineComponent({
  setup(props: {}, context: SetupContext) {
    provide(UserKey, useUser());

    return {};
  },
});
</script>
