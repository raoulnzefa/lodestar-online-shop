<template>
  <section class="lode-register">
    <div class="container">
      <h1 class="lode-register__title">
        Хотите использовать <span>полный</span> функционал магазина?
      </h1>

      <router-link :to="{path: '/registration'}">
        <lode-button class="btn--accent-color  btn--hover-lighten">
          Зарегистрируйтесь!
        </lode-button>
      </router-link>

      <div class="lode-register__advantages">
        <h2 class="lode-register__advantages-title">Преимущества регистрации:</h2>
        <ul class="lode-register__advantages-list">
          <li
            v-for="advantage in advantages"
            :key="advantage"
            class="lode-register__advantages-item"
          >{{advantage}}</li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script>
import LodeButton from "@/components/UI/LodeButton.vue";

export default {
  components: { LodeButton },
  data() {
    return {
      advantages: [
        "Сохранение личных данных",
        "Отслеживание заказов на персональной странице",
        "Возможность настроить магазин под себя для более удобных покупок",
        "Ускоренное оформление последующих заказов",
      ],
    };
  },
};
</script>

<style lang="scss">
.lode-register {
  padding: 3rem;
  border-top: 2px solid $grey;

  &__title {
    margin-bottom: 2rem;

    font-size: 2rem;
    font-weight: 500;
    text-transform: uppercase;
    span {
      color: $accent;
    }
  }

  &__advantages {
    margin: 2rem auto 0 auto;
    max-width: 40%;

    &-title {
      font-size: 1.8rem;
      margin-bottom: 1rem;
    }

    &-list {
      list-style: circle;
      text-align: start;
    }

    &-item {
      font-size: 1.4rem;
    }
  }

  @include for-phone-down {
    &__advantages {
      max-width: 80%;
    }
  }

  @include for-small-phone-down {
    &__title {
      font-size: 1.8rem;
    }

    &__advantages {
      max-width: 100%;
      &-title {
        font-size: 1.6rem;
      }
    }
  }
}
</style>