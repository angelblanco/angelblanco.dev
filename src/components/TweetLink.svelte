<script>
  export let id;
  export let extraClass = '';
  export let account = process.env.TWITTER_USER;

  $: url = `https://twitter.com/${account}/status/${id}`;
  $: linkClasses = `tweet-link ${extraClass}`;
</script>

<a href={url} target="__blank" class={linkClasses}>
  <slot />
</a>
