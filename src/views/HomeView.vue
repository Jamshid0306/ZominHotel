<script setup>
import HomeHeroSection from '../components/HomeHeroSection.vue'
import AboutNetworkSection from '../components/AboutNetworkSection.vue'
import TourSection from '../components/TourSection.vue'
import AmenitiesSection from '../components/AmenitiesSection.vue'
import RestaurantHighlightSection from '../components/RestaurantHighlightSection.vue'
import FeaturedRoomsSection from '../components/FeaturedRoomsSection.vue'
import MapSection from '../components/MapSection.vue'
</script>

<template>
  <main class="mx-auto max-w-6xl px-4 pb-20">
    <HomeHeroSection />
    <AboutNetworkSection />
    <TourSection />
    <!-- <AmenitiesSection /> -->
    <!-- <RestaurantHighlightSection /> -->
    <FeaturedRoomsSection />
  </main>
  <MapSection />
</template>
