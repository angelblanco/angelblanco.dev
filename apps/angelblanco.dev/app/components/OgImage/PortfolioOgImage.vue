<template>
  <div :style="containerStyle">
    <div :style="innerContainerStyle">
      <div :style="contentContainerStyle">
        <h1 :style="titleStyle">
          {{ title }}
        </h1>
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
const { title } = defineProps<{
  title?: string;
  description?: string;
}>();

// Calculate font size based on title length
function getFontSize() {
  if (!title)
    return '80px';
  const length = title.length;
  if (length > 70)
    return '60px';
  if (length > 50)
    return '70px';
  return '80px';
}

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
  fontWeight: '900',
  textAlign: 'left',
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
