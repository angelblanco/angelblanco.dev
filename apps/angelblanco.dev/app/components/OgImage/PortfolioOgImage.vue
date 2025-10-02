<template>
  <div :style="containerStyle">
    <div :style="innerContainerStyle">
      <div :style="contentContainerStyle">
        <div>
          <h1 :style="titleStyle">
            {{ title }}
          </h1>
          <p v-if="description" :style="descriptionStyle">
            {{ truncateDescription }}
          </p>
        </div>
        <p :style="footerStyle">
          angelblanco.dev
        </p>
      </div>
      <img
        src="/ablanco_2025_profile.webp"
        :style="imageStyle"
        alt="Angel Blanco Profile"
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  title?: string;
  description?: string;
}>();

// Calculate font size based on title length
function getFontSize() {
  if (!props.title)
    return '80px';
  const length = props.title.length;
  if (length > 70)
    return '60px';
  if (length > 50)
    return '70px';
  return '80px';
}

const truncateDescription = computed(() => {
  if (!props.description)
    return '';
  return props.description.length > 50
    ? `${props.description.substring(0, 50)}...`
    : props.description;
});

const containerStyle = {
  height: '100%',
  width: '100%',
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'flex-start',
  backgroundColor: '#f9fafb',
};

const innerContainerStyle = {
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'flex-start',
  height: '100%',
  position: 'relative' as const,
};

const contentContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  width: '100%',
  height: '100%',
};

const titleStyle = {
  fontSize: getFontSize(),
  padding: '80px',
  paddingTop: '80px',
  fontWeight: '900',
  textAlign: 'left',
  margin: '0',
};

const descriptionStyle = {
  fontSize: '32px',
  padding: '0 80px',
  fontWeight: '400',
  textAlign: 'left',
  marginTop: '0',
  marginBottom: '40px',
  color: '#6b7280',
};

const footerStyle = {
  fontSize: '3rem',
  paddingBottom: '40px',
  paddingLeft: '80px',
  paddingRight: '80px',
  fontWeight: '700',
  marginBottom: '0',
  color: '#ccc',
};

const imageStyle = {
  position: 'absolute' as const,
  bottom: '40px',
  right: '40px',
  width: '120px',
  height: '120px',
  borderRadius: '50%',
  objectFit: 'cover' as const,
};
</script>
