import {
  findIconDefinition, icon as faIcon,
} from '@fortawesome/fontawesome-svg-core';
import missingIcon from './missingIcon';
import convert from './converter';

const PREFIXES = ['fa', 'fas', 'far', 'fal', 'fad', 'fab', 'pb'];

const SIZES = ['lg', 'xs', 'sm', '1x', '2x', '3x', '4x', '5x', '6x', '7x', '8x', '9x', '10x'];
const ROTATIONS = [90, 180, 270];
const FLIPS = ['horizontal', 'vertical', 'both'];
const ANIMATIONS = ['pulse', 'spin'];

const CLASSES = [
  ...SIZES.map(i => `fa-${i}`),
  ...ROTATIONS.map(i => `fa-rotate-${i}`),
  ...FLIPS.map(i => `fa-flip-${i}`),
  ...ANIMATIONS.map(i => `fa-${i}`),
  'fa-fw',
  'fa-stack',
  i => [
    'fa-flip-',
    'fa-layers-',
    'fa-pull-',
    'fa-stack-',
    'fa-swap-',
    'fa-w-',
  ].some(j => i.startsWith(j)),
];

export default {
  name: 'PbIcon',
  props: {
    icon: { type: String, default: '' },
  },
  data() {
    return {
      state: {
        iconAbstract: null,
        isFaIcon: true,
        classList: [],
      },
    };
  },
  watch: {
    icon() {
      this.$nextTick(() => this.renderIcon());
    },
  },
  // !!WARNING!! This component will re-render only for icons passed through props, the class-way is only for backward compatibility
  mounted() {
    this.renderIcon();
  },
  methods: {
    renderIcon() {
      this.state.classList = Array.from(this.$refs.content?.classList || []);

      const iconName = this.getIconName();
      const prefix = this.getIconPrefix();

      if (!iconName) {
        this.state.isFaIcon = true;
        this.showMissingIcon();
      } else if (prefix !== 'pb') {
        this.state.isFaIcon = true;
        const icon = findIconDefinition({ iconName: iconName.split('fa-')[1], prefix });

        if (!icon) {
          this.showMissingIcon();
        } else {
          // https://fontawesome.com/how-to-use/javascript-api/methods/icon
          // https://fontawesome.com/how-to-use/on-the-web/other-topics/accessibility
          this.setIcon(faIcon(icon, {
            title: this.$attrs.title || '',
          }));
        }
      } else {
        this.state.isFaIcon = false;
        this.setIcon();
      }
    },
    getClassList() {
      return this.icon ? this.icon.trim().split(/\s/g) : this.state.classList;
    },
    getIconName() {
      const possibilities = this.getClassList()
        .filter(c => (
          (c.includes('fa-') || c.includes('pb-'))
          && !CLASSES.some(cl => (typeof cl === 'function' && cl(c)) || cl === c)
        ));
      return possibilities.reverse()[0] || '';
    },
    getIconPrefix() {
      const possibilities = this.getClassList().filter(c => PREFIXES.includes(c));
      return possibilities.reverse()[0] || 'fa';
    },
    showMissingIcon() {
      this.setIcon(missingIcon);
    },
    setIcon(icon) {
      if (!icon) {
        this.state.iconAbstract = null;
        return;
      }

      this.state.iconAbstract = icon.abstract || icon;
    },
  },
  render(h) {
    // Normal icons rendering in a 'i' tag
    if (!this.state.isFaIcon || !this.state.iconAbstract) {
      return h('i', {
        ref: 'content',
        staticClass: this.icon,
        attrs: {
          'aria-hidden': true,
        },
        on: this.$listeners,
      });
    }

    const createConvertedElement = convert.bind(null, h);

    // FA icons rendering the svg content
    return createConvertedElement((this.state.iconAbstract && this.state.iconAbstract[0]) || this.state.iconAbstract, {}, {
      ref: 'content',
      staticClass: this.icon,
      on: this.$listeners,
    });
  },
};
