<script setup>
import HomeHeroSection from '../components/HomeHeroSection.vue'
import AmenitiesSection from '../components/AmenitiesSection.vue'
import RestaurantHighlightSection from '../components/RestaurantHighlightSection.vue'
import FeaturedRoomsSection from '../components/FeaturedRoomsSection.vue'
import RitualsSection from '../components/RitualsSection.vue'
import CtaSection from '../components/CtaSection.vue'
import MapSection from '../components/MapSection.vue'
</script>

<template>
  <main class="mx-auto max-w-6xl px-4 pb-20">
    <HomeHeroSection />
    <AmenitiesSection />
    <RestaurantHighlightSection />
    <FeaturedRoomsSection />
    <RitualsSection />
    <CtaSection />
  </main>
  <MapSection />
</template>
