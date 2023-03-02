<template>
  <div>
    <template v-if="pending">
      Loading
    </template>
    <template v-else>
      <template v-if="data">
        Api result: {{ data }}
      </template>
      <template v-else-if="error">
        Api ERROR: {{ error }}
      </template>
      <button @click="refresh()">refresh</button>
    </template>
  </div>
</template>

<script setup>
import { useApiRequest } from '../composables/api'

const { data, pending, error, refresh } = useApiRequest('/api/test')
</script>