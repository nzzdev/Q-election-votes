<script>
  export let threshold;
  export let base;

  let thresholdTextAlignClass =
    base === 0 || (threshold * 100) / base > 50 ? "right" : "left";
</script>

{#if threshold && base > 0}
  <div
    class="q-election-threshold s-color-gray-5"
    style="left: {(threshold * 100) / base}%;">
    <svg
      class="q-election-threshold-arrow"
      height="20"
      width="7"
      viewBox="0 0 7 20"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M4 5v15H3V5H0l3.5-5L7 5H4z"
        fill="currentColor"
        fill-rule="evenodd" />
    </svg>
    <div
      class="q-election-threshold-text q-election-threshold-text--{thresholdTextAlignClass}
      s-font-note-s">
       {threshold}-Prozent-Hürde
    </div>
  </div>
{/if}
