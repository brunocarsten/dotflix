<template>
  <div class="p-2">
    <div
      class="bg-secondary rounded-xl w-full sm:w-[18rem] border border-gray-700 flex flex-col overflow-hidden relative shimmer"
    >
      <div class="h-60 bg-gray-600 rounded-t-xl" />
      <div class="p-4 space-y-2 flex-1">
        <div class="h-4 bg-gray-500 rounded w-3/4" />
        <div class="h-3 bg-gray-600 rounded w-1/2" />
        <div class="h-3 bg-gray-600 rounded w-2/3" />
      </div>
      <div class="bg-indigo-500 h-9 w-full rounded-b-xl" />
    </div>
  </div>
</template>

<style scoped>
@keyframes shimmer {
  0% {
    background-position: -100% 0;
  }
  100% {
    background-position: 200% 0;
  }
}

.shimmer::before {
  content: "";
  position: absolute;
  inset: 0;
  background-image: linear-gradient(
    110deg,
    transparent 0%,
    rgba(255, 255, 255, 0.06) 50%,
    transparent 100%
  );
  background-size: 200% 100%;
  animation: shimmer 1.6s infinite;
  z-index: 1;
  pointer-events: none;
}
</style>
