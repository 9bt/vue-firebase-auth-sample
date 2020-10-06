<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent, SetupContext } from '@vue/composition-api';

export default defineComponent({
  setup(props: {}, context: SetupContext) {
    return {};
  },
});
</script>
