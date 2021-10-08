export default {
  install(Vue) {
    Vue.directive('click-outside', {
      bind(el, binding, vnode) {
        setTimeout(() => {
          el.clickOutsideEvent = event => {
            // here I check that click was outside the el and his childrens
            if (
              !(
                el === event.target || el.contains(event.target)
              )
              && document.contains(event.target)
            ) {
              // and if it did, call method provided in attribute value
              vnode.context[binding.expression](event);
            }
          };
          document.body.addEventListener('click', el.clickOutsideEvent);
        });
      },
      unbind(el) {
        document.body.removeEventListener('click', el.clickOutsideEvent);
      },
    });

    Vue.directive('focus', {
      inserted(el, binding) {
        const { value } = binding;

        if (value !== false) {
          try {
            const element = $(el).find(':input');
            if (element) element.focus();
            else el.focus();
          } catch {
            el.focus();
          }
        }
      },
      update(el, binding) {
        const { value, oldValue } = binding || {};
        if (!oldValue && value === true) {
          Vue.nextTick(() => {
            try {
              const element = $(el).find(':input');
              if (element) element.focus();
              else el.focus();
            } catch {
              el.focus();
            }
          });
        }
      },
    });
  },
};
