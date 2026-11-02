<template>
  <div class="mx-auto min-h-screen-content max-w-post p-4">
    <div class="space-y-24">
      <div v-for="post in posts" :key="post.id">
        <NuxtLink class="group block transition" :to="post.path">
          <div class="text-4xl font-bold tracking-tight text-pretty group-hover:gradient-text">
            {{ post.title }}
          </div>
          <div class="mb-3 text-sm opacity-75">
            {{ dayjs(post.date).format('LL') }}
          </div>
        </NuxtLink>

        <div class="mb-4 text-lg leading-8 text-pretty">
          {{ post.description }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const route = useRoute();

useLocalizedSeo({
  title: 'Blog',
  description: 'BlogDescription',
});

const { queryBlogCollection } = useBlog();

const { data: posts } = await useAsyncData(
  route.path,
  () => {
    return queryBlogCollection()
      .select('path', 'title', 'description', 'date', 'id')
      .order('date', 'DESC')
      .all();
  },
);
</script>
