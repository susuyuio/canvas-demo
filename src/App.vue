<template>
  <div id="app">
    <image-cutout></image-cutout>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import ImageCutout from '@/components/image-cutout';
@Component({
  components: {
    ImageCutout
  }
})
export default class App extends Vue {
}
</script>