<script context="module">
  import trimEnd from 'lodash/trimEnd.js';

  export async function load({ page, fetch }) {
    const allowedLangs = [
      { locale: 'en', title: 'English' },
      { locale: 'es', title: 'Spanish' },
    ];

    const { params, path } = page;
    const res = await fetch(`/api/about`);
    const data = await res.json();

    const lang = params.lang ? trimEnd(params.lang, '/') : 'en';

    const isAllowedLang = allowedLangs.some(
      (allowedLang) => allowedLang.locale === lang
    );

    const translation = data[lang];

    if (res.status === 200 && isAllowedLang && translation) {
      return {
        props: { translation, lang, allowedLangs, path },
      };
    }

    return {
      status: 500,
      error: new Error(`Unable to find locale ${lang}`),
    };
  }
</script>

<script>
  export let lang;
  export let allowedLangs;
  export let translation;
  export let path;
  import Content from '../../components/Content.svelte';
  import Head from '../../components/Head.svelte';
  import { setTitle, setOgDescription, setOgUrl } from '../../stores/meta';

  setMeta();

  function setMeta() {
    setOgUrl(path);

    if (lang === 'es') {
      setTitle('Sobre mí!');
      setOgDescription(
        'Hola! Échale un vistazo a mi perfil de Ingeniero en Informática.'
      );
    } else {
      setTitle('About me!');
      setOgDescription('Hello! Checkout my software engineer profile.');
    }
  }

  $: {
    setMeta();
  }
</script>

<Head />

<section class="section reading-width">
  <div class="columns is-centered">
    <div class="column is-narrow">
      <figure class="image is-128x128">
        <img
          class="is-rounded"
          src="/images/me-650x650.jpeg"
          alt="It's me, Ángel!"
        />
      </figure>
    </div>
  </div>

  <div>
    <div class="buttons has-addons is-pulled-right mt-2 mb-0 lang-button">
      {#each allowedLangs as allowedLang}
        <a
          rel="preload"
          href={`/about/${allowedLang.locale}/`}
          class="button is-rounded is-small"
          class:is-active={lang === allowedLang.locale}
          class:is-primary={lang === allowedLang.locale}>{allowedLang.title}</a
        >
      {/each}
    </div>

    <Content>
      {@html translation.aboutMe}
    </Content>
  </div>
</section>

<style lang="scss">
  @media print {
    .lang-button {
      display: none;
    }
  }
</style>