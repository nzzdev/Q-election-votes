<script>
  export let sources;
  export let notes;
  export let updatedDate;
  export let hideUpdatedDate;

  let updateInfo = getUpdateInfo(updatedDate);
  let shouldHaveUpdateInfo = updatedDate !== undefined && !hideUpdatedDate;
  let shouldHaveSources = sources !== undefined && sources.length > 0;

  function getUpdateInfo(updatedDate) {
    let updated = new Date(updatedDate);
    if (updated.getTime()) {
      let now = new Date();
      let diff = now.getTime() + now.getTimezoneOffset() - updated.getTime(); // "updated" of q item already in UTC => "now" has to be normalized with timezone offset
      let diffMinutes = Math.floor(diff / (1000 * 60));
      if (diffMinutes < 60) {
        // update less than an hour ago
        if (diffMinutes < 0) {
          diffMinutes = 0;
        }
        return `vor ${diffMinutes} Minute${
          diffMinutes > 1 || diffMinutes === 0 ? "n" : ""
        }`;
      } else if (diffMinutes < 60 * 24) {
        // update less than a day ago
        let hours = Math.floor(diffMinutes / 60);
        return `vor ${hours} Stunde${hours > 1 || hours === 0 ? "n" : ""}`;
      } else if (diffMinutes > 7 * 60 * 24) {
        // update more than 7 days ago -> show date
        return `am ${updated.getDate()}.${updated.getMonth() +
          1}.${updated.getFullYear()}`;
      } else {
        let days = Math.floor(diffMinutes / (60 * 24));
        return `vor ${days} Tag${days > 1 || days === 0 ? "en" : ""}`;
      }
    }
  }
</script>

<div class="s-q-item__footer">
  {#if notes}
    {notes}
    {#if shouldHaveSources || shouldHaveUpdateInfo}–{/if}
  {/if}
  {#if shouldHaveSources}
    {#if sources.length > 1}Quellen:{:else}Quelle:{/if}
    {#each sources as source, index}
      <!-- 	If you separate DOM siblings with newlines whitespaces cannot be removed by svelte renderer
            To avoid unwanted whitespaces around commas separating each source, we keep render infos for sources at one line here.
            See also: https://github.com/sveltejs/svelte/issues/189  -->
      {#if source.text !== ''}
        {#if source.link && source.link.url && source.link.isValid}<a href={source.link.url} target="blank" rel="noopener noreferrer">{source.text}</a>{:else}{source.text}{/if}{#if index !== sources.length - 1 && sources[index + 1] !== ''},{/if}
      {/if}
    {/each}
    {#if shouldHaveUpdateInfo}–{/if}
  {/if}
  {#if shouldHaveUpdateInfo}Update {updateInfo}{/if}
</div>
