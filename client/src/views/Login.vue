<template>
  <div>
    <b-button block variant="primary" @click="loginByGoogle">Google アカウントでログインする</b-button>
  </div>
</template>

<script lang="ts">
import { defineComponent, SetupContext } from '@vue/composition-api';

import useAuth from '@/composables/auth';

export default defineComponent({
  setup(props: {}, context: SetupContext) {
    return {
      ...useAuth(),
    };
  },
});
</script>
