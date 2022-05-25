<template>
  <div class="lode-catalog__slider">
    <h1
      class="lode-catalog__slider-loading"
      v-if="IS_PRODUCTS_LOADING"
    >Товары грузятся...</h1>
    <Carousel
      v-else
      :settings="carouselSettings"
    >
      <Slide
        v-for="product in products"
        :key="product._id"
      >
        <lode-catalog-item :product="product" />
      </Slide>
      <template #addons>
        <Navigation />
      </template>
    </Carousel>
  </div>
</template>

<script>
// Carousel
import "vue3-carousel/dist/carousel.css";
import { Carousel, Slide, Navigation } from "vue3-carousel";
// Others
import LodeCatalogItem from "@/components/catalog/LodeCatalogItem";
import { mapGetters } from "vuex";

export default {
  name: "LodeCatalogSlider",
  components: {
    LodeCatalogItem,
    Carousel,
    Slide,
    Navigation,
  },
  props: {
    products: {
      type: Array,
      default() {
        return [];
      },
      required: true,
    },
  },
  data() {
    return {
      phoneWidth: 768,
      smallPhoneWidth: 576,
      carouselSettings: {
        itemsToShow: 2,
        itemsToScroll: 2,
        mouseDrag: false,
        snapAlign: "start",
        transition: 500,
        // autoplay: 5000,
        // pauseAutoplayOnHover: true,
      },
    };
  },
  computed: {
    ...mapGetters(["IS_PRODUCTS_LOADING"]),
  },
  methods: {
    itemsToShowQuantity() {
      if (window.innerWidth > this.smallPhoneWidth) {
        return 3;
      } else if (window.innerWidth > this.phoneWidth) {
        return 4;
      } else {
        return 2;
      }
    },
  },
};
</script>

<style lang="scss">
.lode-catalog__slider {
  width: 100%;
  height: 49rem;

  &-loading {
    font-size: 1.6rem;
    font-weight: 500;
    text-align: center;
  }

  .carousel {
    &__viewport {
      height: 49rem;
    }

    // Arrows
    &__prev,
    &__next {
      top: auto;
      bottom: 2rem;
      z-index: 1;

      border-radius: 0;
      height: 2rem;
      width: 2rem;
    }

    &__prev {
      left: auto;
      right: 6rem;
    }

    &__next {
      right: 3rem;
    }
  }
}
</style>