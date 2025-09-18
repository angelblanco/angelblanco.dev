<template>
  <div class="min-h-screen-content mx-auto max-w-ui p-4">
    <div class="space-y-24">
      <div v-for="post in posts" :key="post.id">
        <NuxtLink class="block" :to="post.path">
          <div class="text-4xl font-bold text-pretty tracking-tight">
            {{ post.title }}
          </div>
          <div class="text-sm mb-3 opacity-75">
            {{ dayjs(post.date).format('LL') }}
          </div>
        </NuxtLink>

        <div class="text-pretty text-lg mb-4 leading-8">
          {{ post.description }}
        </div>
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
      .select('path', 'title', 'description', 'date', 'id')
      .order('date', 'DESC')
      .all();
  },
);
</script>
