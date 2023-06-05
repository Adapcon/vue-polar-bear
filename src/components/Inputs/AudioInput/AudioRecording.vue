<template>
  <div
    class="audio-recording-container"
  >
    <div class="recording-ball">
      <PbIcon
        icon="fas fa-circle"
        style="color: var(--color-danger); width: 8px;"
      />
    </div>
    <div class="timeline">
      <hr>
    </div>
    <div class="duration">
      <p class="pb">{{ duration }}</p>
    </div>
  </div>
</template>

<script>
import PbIcon from '../../Miscellaneous/Icon/Icon';

export default {
  name: 'AudioRecording',

  components: {
    PbIcon,
  },

  props: {
    duration: { type: String, default: '0:00' },
  },
};
</script>

<style lang="scss" scoped>
.audio-recording-container {
  min-width: 300px;
  height: 100%;
  margin-inline: 28px;
  padding: 4px 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid var(--color-gray-5);
  border-radius: 8px;
  background-color: var(--color-gray);

  .recording-ball {
    border-radius: 50%;
    height: 34px;
    width: 34px;
    background-color: rgba(var(--color-danger-rgb), .2);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .timeline {
    hr {
      width: 200px;
      border: 1px dashed;
      border-color: var(--color-gray-10);
    }
  }

  .duration {
  }
}
</style>
