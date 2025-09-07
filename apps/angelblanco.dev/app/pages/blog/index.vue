<template>
  <div class="min-h-screen-content mx-auto max-w-ui p-4">
    <div v-for="post in posts" :key="post.id">
      <NuxtLink class="block" :to="post.path">
        <div class="text-2xl font-bold text-pretty">
          {{ post.title }}
        </div>
        <div class="text-xs mb-1">
          {{ post.date }}
        </div>
      </NuxtLink>

      <div class="text-sm text-pretty mb-4">
        {{ post.description }}
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const route = useRoute();

const { queryBlogCollection } = useBlog();

const { data: posts } = await useAsyncData(
  route.path,
  () => {
    return queryBlogCollection()
      // .select('path', 'title', 'description', 'date', 'id')
      .order('date', 'DESC')
      .all();
  },
);
</script>
