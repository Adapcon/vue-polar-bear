<template>
  <div class="pb-audio-input-container">
    <PbIcon
      class="pb-audio-delete-icon"
      icon="fas fa-trash"
      size="fa-md"
      @click="clearAudio"
    />

    <div class="pb-player-and-recording">
      <template v-if="audio.state === 'paused'">
        <div class="play-pause-button">
          <PbIcon
            :icon="playerIcon"
            size="fa-xs"
            class="pb-audio-player-icon"
            @click.native="togglePlay"
          />
        </div>

        <div class="pb-timeline-player">
          <div class="lines">
            <div
              class="progress"
              :style="`width: ${layerX}px`"
            />

            <div
              class="remaining"
              :style="`width: ${audio.width - layerX}px`"
            />
          </div>

          <div
            class="ball"
            :style="`margin-left: ${layerX}px`"
            @drag="dragTimer"
          />
        </div>

        <div class="duration">
          <p class="pb">{{ formattedDuration }}</p>
        </div>
      </template>

      <template v-else>
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
          <p class="pb">{{ formattedDuration }}</p>
        </div>
      </template>
    </div>

    <PbIcon
      :icon="rightIcon"
      class="pb-audio-change-state-icon"
      size="fa-md"
      @click="toggleRecorder"
    />
  </div>
</template>

<script>
import PbIcon from '../../Miscellaneous/Icon/Icon';

export default {
  name: 'PbAudioInput',

  components: {
    PbIcon,
  },

  props: {
    startRecording: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      mediaRecorder: null,
      audio: {
        chunks: [],
        recorded: null,
        state: 'paused',
        width: 200,
        element: null,
        duration: 0,
        timeline: 0,
        layerX: 0,
        isPlaying: false,
        interval: null,
      },
    };
  },

  computed: {
    rightIcon() {
      return this.audio.state === 'paused' ? 'fas fa-microphone' : 'fas fa-pause';
    },

    playerIcon() {
      return this.audio.isPlaying ? 'fas fa-pause' : 'fas fa-play';
    },

    audioSource() {
      return this.audio.src ?? '';
    },

    duration() {
      return this.audio.element?.duration !== Infinity && !!this.audio.element?.duration
        ? this.audio.element?.duration
        : this.audio.duration;
    },

    formattedDuration() {
      const minutes = this.duration > 60 ? Math.floor(this.duration / 60) : 0;
      const seconds = this.duration > 60
        ? String(Math.floor(this.duration - minutes * 60)).padStart(2, '0')
        : String(Math.floor(this.duration)).padStart(2, '0');

      return `${minutes}:${seconds}`;
    },

    layerX() {
      return this.audio.timeline;
    },

  },

  mounted() {
    if (this.startRecording) this.toggleRecorder();
  },

  breforeDestroy() {
    this.mediaRecorder.stop();

    this.clearAudio();
  },

  methods: {
    setupMediaRecorderEventListeners() {
      this.mediaRecorder.addEventListener('dataavailable', event => {
        this.audio.chunks.push(event.data);
      });

      this.mediaRecorder.addEventListener('stop', this.formatAudio);
      this.mediaRecorder.addEventListener('pause', this.formatAudio);
    },

    setupAudio(src) {
      const audio = new Audio(src);
      this.audio.element = audio;

      audio.addEventListener('timeupdate', () => {
        const porcentDuration = (audio.currentTime * 100) / this.duration;

        this.audio.timeline = (porcentDuration / 100) * this.audio.width;
      });

      audio.addEventListener('ended', () => {
        this.audio.isPlaying = false;
        this.audio.timeline = 0;
      });

      audio.addEventListener('playing', () => {
        this.audio.isPlaying = true;
      });

      audio.addEventListener('pause', () => {
        this.audio.isPlaying = false;
      });
    },

    clearAudio() {
      this.audio = {
        chunks: [],
        recorded: null,
        state: 'paused',
        width: 200,
        element: null,
        duration: 0,
        timeline: 0,
        layerX: 0,
        isPlaying: false,
        interval: null,
      };
    },

    toggleRecorder() {
      if (this.audio.state === 'paused') {
        if (this.mediaRecorder?.state === 'paused') this.resumeRecord();
        else this.startRecord();
      } else {
        this.pauseRecord();
      }

      this.audio.state = this.audio.state === 'paused' ? 'recording' : 'paused';
      this.$emit('changeState', this.audio.state);
    },

    startRecord() {
      this.audio.duration += 1;
      this.audio.interval = setInterval(() => {
        this.audio.duration += 1;
      }, 1000);

      navigator.mediaDevices.getUserMedia({ audio: true })
        .then(stream => {
          this.mediaRecorder = new MediaRecorder(stream);
          this.setupMediaRecorderEventListeners();
          this.mediaRecorder.start(1);
        });
    },

    resumeRecord() {
      this.audio.interval = setInterval(() => {
        this.audio.duration += 1;
      }, 1000);

      this.mediaRecorder.resume();
    },

    pauseRecord() {
      this.mediaRecorder.pause();
      clearInterval(this.audio.interval);
    },

    async formatAudio() {
      const blob = new Blob(this.audio.chunks, { type: 'audio/ogg; codecs=opus' });

      await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onload = () => {
          this.setupAudio(reader.result);
          resolve();
        };
        reader.onerror = reject;
      });
    },

    togglePlay() {
      if (this.audio.element === null) return;

      if (this.audio.isPlaying) this.audio.element.pause();
      else this.audio.element.play();

      this.audio.isPlaying = !this.audio.isPlaying;
    },

    dragTimer(e) {
      if (this.audio.element === null) return;

      let { layerX } = e;

      layerX += this.layerX;

      if (layerX < -(this.audio.width) || layerX > this.audio.width) return;

      if (layerX < 0)
        layerX = this.layerX + layerX < 0 ? 0 : this.layerX + layerX;

      if (layerX > this.audio.width)
        layerX = this.layerX + layerX > this.audio.width ? this.audio.width : this.layerX + layerX;

      const porcentDuration = (layerX * 100) / this.audio.width;
      const duration = (porcentDuration / 100) * this.audio.duration;

      console.log(layerX, porcentDuration, duration);

      this.audio.layerX = layerX;
      this.audio.element.currentTime = duration;
    },
  },
};
</script>

<style lang="scss" scoped>
.pb-audio-input-container {
  display: flex;
  align-items: center;
  height: 50px;

  .pb-audio-delete-icon {
    cursor: pointer;
    color: var(--color-danger);
  }

  .pb-player-and-recording {
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

    .pb-audio-player-icon{
      cursor: pointer;
      color: var(--color-white);
    }

    .recording-ball, .play-pause-button {
      border-radius: 50%;
      height: 34px;
      width: 34px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .recording-ball {
      background-color: rgba(var(--color-danger-rgb), .2);
    }

    .play-pause-button {
      background-color: var(--color-primary);
      cursor: pointer;
    }

    .pb-timeline-player {
      width: 200px;
      position: relative;

      .lines {
        display: flex;
        position: absolute;

        .remaining {
          height: 3px;
          background-color: var(--color-gray-10);
        }

        .progress {
          height: 3px;
          background-color: var(--color-primary);
        }
      }

       .ball {
        position: absolute;
        cursor: pointer;
        top: -2px;
        height: 7px;
        width: 7px;
        border-radius: 50%;
        background-color: var(--color-primary);
      }
    }

    .timeline {
      hr {
        width: 200px;
        border: 1px dashed;
        border-color: var(--color-gray-10);
      }
    }
  }

  .pb-audio-change-state-icon {
    cursor: pointer;
    color: var(--color-primary);
  }

  @import "@pb/variables.scss";
  @each $color in $colors {
    .pb-input-#{$color} {
      color: var(--color-#{$color});

      &::placeholder {
        color: var(--color-#{$color});
      }
    }
  }
}
</style>