<script>
  import ErrorMarginLegend from "./ErrorMarginLegend.svelte";

  export let title;
  export let subtitle;
  export let hideTitle;
  export let withErrorMargin;
  export let hasErrorMargin;
  export let errorMarginLabels;
</script>

{#if hideTitle !== true}
  <h3 class="s-q-item__title">{title}</h3>
{/if}
<div class="s-q-item__subtitle">
  {#if subtitle}{subtitle}{/if}
  {#if withErrorMargin}
    <ErrorMarginLegend {hasErrorMargin} {errorMarginLabels} />
  {/if}
</div>
