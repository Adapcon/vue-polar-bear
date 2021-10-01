<template>
  <div
    class="pb-col"
    :class="[
      `pb-col-xl-${xl >= 0 ? xl : size}`,
      `pb-col-lg-${lg >= 0 ? lg : size}`,
      `pb-col-md-${md >= 0 ? md : size}`,
      `pb-col-sm-${sm >= 0 ? sm : size}`,
      `pb-col-xs-${xs >= 0 ? xs : size}`
    ]"
    :style="!noPadding ? 'padding: 5px' : ''"
  >
    <slot />
  </div>
</template>

<script>
export default {
  name: 'PbCol',
  props: {
    xl: { type: Number, default: undefined },
    lg: { type: Number, default: undefined },
    md: { type: Number, default: undefined },
    sm: { type: Number, default: undefined },
    xs: { type: Number, default: undefined },
    size: { type: Number, default: 0 },
    noPadding: { type: Boolean, default: false },
  },
};
</script>

<style lang="scss" scoped>
@for $breakpoint from 1 through 5 {
  $size: 'xl';
  $min-width: 1200px;
  $max-width: 5000px;

  @if $breakpoint == 2 {
    $size: 'lg';
    $min-width: 992px;
    $max-width: 1199px;
  }
  @if $breakpoint == 3 {
    $size: 'md';
    $min-width: 768px;
    $max-width: 991px;
  }
  @if $breakpoint == 4 {
    $size: 'sm';
    $min-width: 576px;
    $max-width: 767px;
  }
  @if $breakpoint == 5 {
    $size: 'xs';
    $min-width: 0px;
    $max-width: 575px;
  }

  @media screen and (min-width: $min-width) and (max-width: $max-width) {
    @for $column from 1 through 24 {
      .pb-col-#{$size}-#{$column} {
        grid-column: span $column;
        display: flex !important;
        flex-direction: column;
      }
    }

    .pb-col-#{$size}-0 {
      display: none !important;
    }
  }
}
</style>
